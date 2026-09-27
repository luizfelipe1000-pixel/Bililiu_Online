import React, { useState } from "react";
import { Copy, Check, Volume2, AlertCircle } from "lucide-react";
import { Message } from "../hooks/useBililiuChat.ts";
import { bililiuConfig } from "../config/bililiuConfig.ts";

interface ChatMessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
  onRetry?: () => void;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  onSpeak,
  onRetry,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedTime = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(message.timestamp));

  return (
    <div
      className={`flex items-end gap-2.5 my-3 ${
        isUser ? "justify-end" : "justify-start"
      } animate-bubble`}
    >
      {/* Caricatura do Bililiu para as mensagens dele */}
      {!isUser && (
        <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden border border-emerald-500/50 shadow-md mb-1 bg-stone-900">
          <img
            src={bililiuConfig.avatarUrl}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
            }}
            alt="Caricatura do Bililiu"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Balão de Mensagem Futurista */}
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-4.5 text-sm leading-relaxed shadow-lg transition-all ${
          isUser
            ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-br-xs shadow-emerald-950/40"
            : message.isError
            ? "bg-stone-900 border border-amber-500/60 text-amber-200 rounded-bl-xs"
            : "bg-stone-900/95 border border-emerald-900/70 text-stone-100 rounded-bl-xs shadow-stone-950/60"
        }`}
      >
        {/* Identificação de quem está falando */}
        {!isUser && (
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-stone-800">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-brand">
              Bililiu
              <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded text-amber-300 border border-emerald-800">
                🤠 Roça Online
              </span>
            </span>

            {/* Ações da mensagem */}
            <div className="flex items-center gap-1.5 text-stone-400">
              {onSpeak && !message.isError && (
                <button
                  onClick={() => onSpeak(message.text)}
                  title="Ouvir resposta com sotaque"
                  className="p-1 hover:text-emerald-400 transition-colors cursor-pointer rounded-lg hover:bg-stone-800"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={handleCopy}
                title="Copiar mensagem"
                className="p-1 hover:text-stone-200 transition-colors cursor-pointer rounded-lg hover:bg-stone-800"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* Conteúdo textual da mensagem */}
        <div className="whitespace-pre-wrap break-words font-normal tracking-wide">
          {message.text}
        </div>

        {/* Botão de retry caso falhe */}
        {message.isError && onRetry && (
          <div className="mt-3 pt-2.5 border-t border-amber-900/60 flex items-center justify-between">
            <span className="text-xs text-amber-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Sinal da roça oscilou
            </span>
            <button
              onClick={onRetry}
              className="text-xs font-bold px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg transition-colors cursor-pointer"
            >
              Mandar de novo ↻
            </button>
          </div>
        )}

        {/* Rodapé com horário de envio */}
        <div
          className={`flex items-center justify-end gap-1 mt-1.5 text-[10px] ${
            isUser ? "text-emerald-200" : "text-stone-500"
          }`}
        >
          <span>{formattedTime}</span>
          {isUser && <span className="text-emerald-300 font-bold">✓✓</span>}
        </div>
      </div>
    </div>
  );
};
