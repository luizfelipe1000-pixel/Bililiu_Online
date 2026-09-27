import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Trash2,
  PowerOff,
  Volume2,
  VolumeX,
  Sparkles,
  Share2,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { ChatMessageBubble } from "./ChatMessageBubble.tsx";
import { useBililiuChat } from "../hooks/useBililiuChat.ts";
import { bililiuConfig } from "../config/bililiuConfig.ts";
import { shareBililiu } from "../utils/share.ts";

export const ChatContainer: React.FC = () => {
  const {
    messages,
    isLoading,
    isExpired,
    error,
    requestCount,
    isVoiceEnabled,
    sendMessage,
    retryLastMessage,
    resetChat,
    endSession,
    toggleVoice,
    speakMessage,
  } = useBililiuChat();

  const [inputVal, setInputVal] = useState("");
  const [showShareNudge, setShowShareNudge] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Rolagem automática para o final da conversa
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Exibe sugestão viral de compartilhamento após 4 mensagens trocadas
  useEffect(() => {
    if (messages.length >= 5 && !nudgeDismissed && !showShareNudge) {
      setShowShareNudge(true);
    }
  }, [messages.length, nudgeDismissed, showShareNudge]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isLoading || isExpired) return;

    sendMessage(inputVal);
    setInputVal("");

    // Reajusta a altura da caixa de texto
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value.slice(0, bililiuConfig.limits.maxMessageLength);
    setInputVal(val);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleShareClick = async () => {
    const res = await shareBililiu();
    if (res.method === "clipboard") {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
    setShowShareNudge(false);
    setNudgeDismissed(true);
  };

  return (
    <div id="chat-bililiu" className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {/* Container Principal do Chat */}
      <div className="bg-[#FCFBF9] border border-stone-300/80 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden flex flex-col h-[78vh] min-h-[550px] max-h-[750px] relative">
        {/* Cabeçalho do Chat */}
        <div className="bg-stone-900 text-white px-4 sm:px-5 py-3.5 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={bililiuConfig.avatarUrl}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
                }}
                alt="Bililiu"
                className="w-11 h-11 rounded-full object-cover object-top border-2 border-emerald-500 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-stone-900 animate-agro-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-wide text-white">
                  {bililiuConfig.name}
                </span>
                <span title="Verificado Agro">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-950" />
                </span>
              </div>
              <p className="text-xs text-stone-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Online na roça · Responde ligeiro
              </p>
            </div>
          </div>

          {/* Botões de Ação do Chat */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Voz / Áudio */}
            <button
              onClick={toggleVoice}
              title={isVoiceEnabled ? "Desativar voz do Bililiu" : "Ativar voz do Bililiu"}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isVoiceEnabled
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
              }`}
            >
              {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Limpar Conversa */}
            <button
              onClick={() => setShowClearConfirm(true)}
              title="Limpar conversa"
              className="p-2 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Finalizar Conversa */}
            <button
              onClick={endSession}
              title="Finalizar conversa"
              className="p-2 text-stone-400 hover:text-amber-400 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <PowerOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal / Confirmação de Limpar Conversa */}
        {showClearConfirm && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs z-30 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-stone-200 text-center animate-bubble">
              <h3 className="font-serif-brand font-bold text-lg text-stone-900 mb-2">
                Limpar a prosa?
              </h3>
              <p className="text-xs text-stone-600 mb-4">
                Uai, se cê limpar agora, todas as mensagens vão sumir e nóis começa do zero. Quer mesmo?
              </p>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                >
                  Continuar proseando
                </button>
                <button
                  onClick={() => {
                    resetChat();
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl transition-colors cursor-pointer"
                >
                  Limpar tudo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Área de Mensagens (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 chat-scrollbar bg-[#FAF8F5]/50 flex flex-col justify-between">
          <div className="space-y-1">
            {/* Aviso de privacidade discreto no topo */}
            <div className="text-center my-2">
              <span className="inline-block text-[11px] text-stone-500 bg-stone-200/60 px-3 py-1 rounded-full border border-stone-200/80">
                🔒 Prosa segura e privativa: nada fica gravado no banco de dados.
              </span>
            </div>

            {/* Mensagens */}
            {messages.map((msg) => (
              <ChatMessageBubble
                key={msg.id}
                message={msg}
                onSpeak={speakMessage}
                onRetry={msg.isError ? retryLastMessage : undefined}
              />
            ))}

            {/* Sugestões Rápidas no início da prosa */}
            {messages.length <= 2 && !isExpired && (
              <div className="pt-3 pb-2">
                <p className="text-xs font-semibold text-stone-500 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Sugestões de prosa pro Bililiu responder:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {bililiuConfig.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="text-left text-xs bg-white hover:bg-amber-50 hover:border-amber-400 active:bg-amber-100 border border-stone-200 text-stone-700 hover:text-emerald-900 px-3 py-1.5 rounded-full transition-all shadow-2xs hover:shadow-xs cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card de Compartilhamento Viral Sutil durante a prosa */}
            {showShareNudge && !isExpired && (
              <div className="my-4 p-3.5 bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-3 animate-bubble shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">🚜</span>
                  <div>
                    <p className="text-xs font-bold text-stone-800">
                      {bililiuConfig.phrases.shareViralPrompt}
                    </p>
                    <p className="text-[11px] text-stone-600">
                      Manda no grupo do zap ou pros amigos darem risada!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleShareClick}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Compartilhar
                  </button>
                  <button
                    onClick={() => {
                      setShowShareNudge(false);
                      setNudgeDismissed(true);
                    }}
                    className="p-1.5 text-stone-400 hover:text-stone-600 text-xs rounded"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Indicador de Digitação do Bililiu */}
            {isLoading && (
              <div className="flex items-end gap-2.5 my-3 justify-start animate-bubble">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-700/40 shadow-xs mb-1">
                  <img
                    src={bililiuConfig.avatarUrl}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
                    }}
                    alt="Bililiu"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs p-3.5 shadow-xs flex items-center gap-2.5">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs font-medium text-stone-600 italic">
                    Bililiu tá pensando nesse trem... 😂
                  </span>
                </div>
              </div>
            )}

            {/* Card de Sessão Expirada / Finalizada */}
            {isExpired && (
              <div className="my-6 p-5 bg-amber-50 border border-amber-300 rounded-2xl text-center animate-bubble shadow-sm">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-xl mb-2">
                  ☕
                </div>
                <h4 className="font-serif-brand font-bold text-base text-amber-950 mb-1">
                  {bililiuConfig.phrases.sessionExpired}
                </h4>
                <p className="text-xs text-amber-800 max-w-md mx-auto mb-4">
                  Por economia e respeito à sua privacidade, a sessão foi encerrada e as mensagens foram liberadas da memória.
                </p>
                <button
                  onClick={resetChat}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Começar nova conversa</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Rodapé / Barra de Envio */}
        <div className="p-2.5 sm:p-3.5 bg-white border-t border-stone-200/90 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-end gap-2">
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={inputVal}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isExpired}
                rows={1}
                placeholder={
                  isExpired
                    ? "Sessão finalizada. Clique acima para começar de novo!"
                    : "Manda sua pergunta pro Bililiu aqui..."
                }
                className="w-full resize-none rounded-xl sm:rounded-2xl border border-stone-300 bg-stone-50/60 focus:bg-white focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 py-3 pl-3.5 pr-14 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none transition-all disabled:opacity-50 disabled:bg-stone-100"
                style={{ maxHeight: "120px" }}
              />

              {/* Contador de Caracteres */}
              <div className="absolute right-2.5 bottom-2.5 text-[10px] text-stone-400 select-none">
                {inputVal.length}/{bililiuConfig.limits.maxMessageLength}
              </div>
            </div>

            {/* Botão Enviar */}
            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading || isExpired}
              className="h-11 w-11 shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white disabled:opacity-40 disabled:hover:bg-emerald-800 shadow-sm transition-all transform active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Enviar mensagem"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </form>

          {/* Dica de teclado e contagem */}
          <div className="flex items-center justify-between px-1 mt-1 text-[11px] text-stone-400">
            <span className="hidden sm:inline">Pressione Enter para enviar (Shift+Enter para pular linha)</span>
            <span className="sm:hidden">Toque na seta para enviar</span>
            <span>{requestCount} perguntas nesta prosa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
