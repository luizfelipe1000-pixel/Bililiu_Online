import { useState, useEffect, useRef, useCallback } from "react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
  isError?: boolean;
}

const INACTIVITY_TIMEOUT_MS = bililiuConfig.limits.sessionTimeoutMinutes * 60 * 1000;

export function useBililiuChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-greeting",
      role: "model",
      text: bililiuConfig.initialGreeting,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string>("");
  const [requestCount, setRequestCount] = useState<number>(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Voz de áudio (Speech Synthesis nativo pt-BR)
  const speakText = useCallback(
    (text: string) => {
      if (!isVoiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      try {
        window.speechSynthesis.cancel();
        // Remove emojis da leitura para soar mais limpo
        const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "");
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = "pt-BR";
        utterance.rate = 1.05;
        utterance.pitch = 0.95;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Erro ao reproduzir voz:", err);
        setIsSpeaking(false);
      }
    },
    [isVoiceEnabled]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Reinicia o timer de inatividade
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      setIsExpired(true);
      stopSpeaking();
    }, INACTIVITY_TIMEOUT_MS);
  }, [stopSpeaking]);

  // Monitora atividade inicial
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      stopSpeaking();
    };
  }, [resetInactivityTimer, stopSpeaking]);

  // Envio de mensagem
  const sendMessage = useCallback(
    async (rawText: string) => {
      const text = rawText.trim();
      if (!text || isLoading || isExpired) return;

      if (requestCount >= bililiuConfig.limits.maxRequestsPerSession) {
        setError("Uai, compadre! Cê já proseou bastante por essa sessão. Dá um descanso e clica em 'Começar nova prosa' logo abaixo!");
        return;
      }

      setError(null);
      resetInactivityTimer();
      setLastUserMessage(text);

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        text,
        timestamp: new Date(),
      };

      // Atualiza mensagens no estado local (sem salvar no banco)
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setRequestCount((c) => c + 1);

      try {
        // Envia apenas as mensagens mais recentes para não inflar tokens
        const historyForApi = messages
          .slice(-bililiuConfig.limits.maxHistoryMessages)
          .map((m) => ({
            role: m.role,
            text: m.text,
          }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            history: historyForApi,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const modelMsg: Message = {
            id: `model-${Date.now()}`,
            role: "model",
            text: data.reply,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, modelMsg]);
          speakText(data.reply);
        } else {
          const fallbackText = data.reply || bililiuConfig.phrases.error;
          setError(fallbackText);
          const errorMsg: Message = {
            id: `error-${Date.now()}`,
            role: "model",
            text: fallbackText,
            timestamp: new Date(),
            isError: true,
          };
          setMessages((prev) => [...prev, errorMsg]);
        }
      } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
        setError(bililiuConfig.phrases.error);
        const errorMsg: Message = {
          id: `error-${Date.now()}`,
          role: "model",
          text: bililiuConfig.phrases.error,
          timestamp: new Date(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
        resetInactivityTimer();
      }
    },
    [isLoading, isExpired, requestCount, messages, resetInactivityTimer, speakText]
  );

  // Tentar novamente a última mensagem
  const retryLastMessage = useCallback(() => {
    if (lastUserMessage) {
      sendMessage(lastUserMessage);
    }
  }, [lastUserMessage, sendMessage]);

  // Limpar a conversa e reiniciar
  const resetChat = useCallback(() => {
    stopSpeaking();
    setMessages([
      {
        id: `initial-greeting-${Date.now()}`,
        role: "model",
        text: bililiuConfig.initialGreeting,
        timestamp: new Date(),
      },
    ]);
    setIsLoading(false);
    setIsExpired(false);
    setError(null);
    setLastUserMessage("");
    setRequestCount(0);
    resetInactivityTimer();
  }, [resetInactivityTimer, stopSpeaking]);

  // Finalizar a conversa explicitamente
  const endSession = useCallback(() => {
    stopSpeaking();
    setIsExpired(true);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
  }, [stopSpeaking]);

  // Alternar narração de voz
  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled((prev) => {
      const next = !prev;
      if (!next) {
        stopSpeaking();
      }
      return next;
    });
  }, [stopSpeaking]);

  return {
    messages,
    isLoading,
    isExpired,
    error,
    requestCount,
    isVoiceEnabled,
    isSpeaking,
    sendMessage,
    retryLastMessage,
    resetChat,
    endSession,
    toggleVoice,
    speakMessage: speakText,
  };
}
