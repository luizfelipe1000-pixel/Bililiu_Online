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

  // Referência específica para a caixa de rolagem das mensagens (NÃO a janela toda)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Rolagem suave estritamente INTERNA ao chat, sem rolar a página inteira
  const scrollToBottomOfChat = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottomOfChat();
  }, [messages, isLoading]);

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

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      // Mantém o foco no campo de digitação sem mover a página
      inputRef.current.focus({ preventScroll: true });
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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
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
    <div id="chat-bililiu" className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      {/* Container Principal do Chat Ampliado (Maior largura max-w-5xl e altura até 860px) */}
      <div className="bg-[#0b120e]/95 border-2 border-emerald-500/50 rounded-3xl shadow-2xl shadow-emerald-950/60 overflow-hidden flex flex-col h-[85vh] min-h-[640px] max-h-[860px] relative backdrop-blur-xl">
        {/* Cabeçalho do Chat */}
        <div className="bg-stone-950/95 px-4 sm:px-6 py-4 flex items-center justify-between border-b border-emerald-900/50 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-13 h-13 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md bg-stone-900">
                <img
                  src={bililiuConfig.avatarUrl}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
                  }}
                  alt="Bililiu Caricatura"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-stone-950 animate-cyber-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand font-bold text-lg sm:text-xl tracking-wide text-white">
                  {bililiuConfig.name}
                </span>
                <span title="Verificado Agro">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 fill-emerald-950" />
                </span>
                <span className="text-[11px] font-cyber px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  ONLINE NA ROÇA
                </span>
              </div>
              <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                <span>Direto de Minas Gerais</span>
                <span className="text-emerald-500 font-bold">·</span>
                <span className="text-emerald-300 font-medium">Criado por Frisquila</span>
              </p>
            </div>
          </div>

          {/* Botões de Ação do Chat */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleVoice}
              title={isVoiceEnabled ? "Desativar voz do Bililiu" : "Ativar voz do Bililiu"}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                isVoiceEnabled
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-sm shadow-amber-500/20"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-900"
              }`}
            >
              {isVoiceEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setShowClearConfirm(true)}
              title="Limpar conversa"
              className="p-2.5 text-stone-400 hover:text-stone-200 hover:bg-stone-900 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={endSession}
              title="Finalizar conversa"
              className="p-2.5 text-stone-400 hover:text-amber-400 hover:bg-stone-900 rounded-xl transition-colors cursor-pointer"
            >
              <PowerOff className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Modal de Limpar Conversa */}
        {showClearConfirm && (
          <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-md z-30 flex items-center justify-center p-4">
            <div className="bg-stone-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-emerald-500/40 text-center animate-bubble">
              <h3 className="font-brand font-bold text-lg text-white mb-2">
                Limpar a prosa?
              </h3>
              <p className="text-xs text-stone-300 mb-5 leading-relaxed">
                Uai, se cê limpar agora, todas as mensagens vão sumir e nóis começa a prosa do zero. Quer mesmo?
              </p>
              <div className="flex items-center justify-center gap-2.5">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-300 bg-stone-800 hover:bg-stone-750 rounded-xl transition-colors cursor-pointer"
                >
                  Continuar proseando
                </button>
                <button
                  onClick={() => {
                    resetChat();
                    setShowClearConfirm(false);
                  }}
                  className="px-4 py-2.5 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-950/50"
                >
                  Limpar tudo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Área de Mensagens com scroll local e isolado */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 chat-scrollbar bg-[#080d0a]/75 flex flex-col justify-between"
        >
          <div className="space-y-2">
            {/* Aviso de privacidade */}
            <div className="text-center my-2">
              <span className="inline-block text-[11px] text-emerald-300/80 bg-emerald-950/50 px-4 py-1.5 rounded-full border border-emerald-500/30 font-medium">
                🔒 Prosa direta e segura: nada é compartilhado ou gravado.
              </span>
            </div>

            {/* Mensagens do Chat */}
            {messages.map((msg) => (
              <ChatMessageBubble
                key={msg.id}
                message={msg}
                onSpeak={speakMessage}
                onRetry={msg.isError ? retryLastMessage : undefined}
              />
            ))}

            {/* Sugestões Rápidas de Perguntas */}
            {messages.length <= 2 && !isExpired && (
              <div className="pt-4 pb-2">
                <p className="text-xs font-semibold text-stone-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sugestões rápidas pro Bililiu responder:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {bililiuConfig.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(q)}
                      disabled={isLoading}
                      className="text-left text-xs sm:text-sm bg-stone-900/90 hover:bg-emerald-950/80 hover:border-emerald-400 active:bg-emerald-900 border border-emerald-900/60 text-stone-200 hover:text-emerald-300 px-4 py-2.5 rounded-2xl transition-all shadow-xs cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Nudge Viral de Compartilhamento */}
            {showShareNudge && !isExpired && (
              <div className="my-4 p-4 bg-gradient-to-r from-emerald-950/90 to-stone-900/90 border border-emerald-500/40 rounded-3xl flex items-center justify-between gap-3 animate-bubble shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚜</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">
                      {bililiuConfig.phrases.shareViralPrompt}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Manda no zap pros amigos darem risada com o homem!
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareClick}
                    className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Compartilhar
                  </button>
                  <button
                    onClick={() => {
                      setShowShareNudge(false);
                      setNudgeDismissed(true);
                    }}
                    className="p-1.5 text-stone-400 hover:text-stone-200 text-xs rounded"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Indicador de Digitação com Caricatura */}
            {isLoading && (
              <div className="flex items-end gap-2.5 my-3 justify-start animate-bubble">
                <div className="w-10 h-10 rounded-2xl overflow-hidden border border-emerald-500/50 shadow-md mb-1 bg-stone-900">
                  <img
                    src={bililiuConfig.avatarUrl}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
                    }}
                    alt="Bililiu"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="bg-stone-900 border border-emerald-900/80 rounded-2xl rounded-bl-xs p-4 shadow-md flex items-center gap-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-emerald-300 italic">
                    Bililiu tá calibrando as ideia... 😂
                  </span>
                </div>
              </div>
            )}

            {/* Sessão Expirada */}
            {isExpired && (
              <div className="my-6 p-6 bg-stone-900/95 border border-amber-500/40 rounded-3xl text-center animate-bubble shadow-xl">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center text-2xl mb-3 border border-amber-400/40">
                  ☕
                </div>
                <h4 className="font-brand font-bold text-base text-white mb-1">
                  {bililiuConfig.phrases.sessionExpired}
                </h4>
                <p className="text-xs text-stone-300 max-w-md mx-auto mb-4 leading-relaxed">
                  A sessão foi encerrada e as mensagens foram liberadas.
                </p>
                <button
                  onClick={resetChat}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Começar nova conversa</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Rodapé / Barra de Envio com Campo Ampliado */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-emerald-900/50 shrink-0">
          <form onSubmit={handleSend} className="relative flex items-end gap-3">
            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={inputVal}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                disabled={isLoading || isExpired}
                rows={2}
                placeholder={
                  isExpired
                    ? "Sessão finalizada. Clique acima para começar de novo!"
                    : "Manda sua pergunta pro Bililiu aqui..."
                }
                className="w-full resize-none rounded-2xl border-2 border-emerald-900/70 bg-stone-900/90 focus:bg-stone-900 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 py-3.5 pl-4 pr-16 text-sm sm:text-base text-stone-100 placeholder:text-stone-500 focus:outline-none transition-all disabled:opacity-50"
                style={{ minHeight: "56px", maxHeight: "140px" }}
              />

              <div className="absolute right-3.5 bottom-3.5 text-[11px] text-stone-500 select-none font-mono">
                {inputVal.length}/{bililiuConfig.limits.maxMessageLength}
              </div>
            </div>

            <button
              type="submit"
              disabled={!inputVal.trim() || isLoading || isExpired}
              className="h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 disabled:opacity-30 shadow-lg shadow-emerald-950/50 transition-all transform active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Enviar mensagem"
            >
              <Send className="w-6 h-6 text-stone-950 fill-stone-950" />
            </button>
          </form>

          <div className="flex items-center justify-between px-1 mt-2.5 text-[11px] text-stone-500">
            <span className="hidden sm:inline">Pressione Enter para enviar (Shift+Enter para pular linha)</span>
            <span className="sm:hidden">Toque na seta para enviar</span>
            <span className="text-emerald-400/90 font-medium">⚡ Resposta imediata na roça</span>
          </div>
        </div>
      </div>
    </div>
  );
};
