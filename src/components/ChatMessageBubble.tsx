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
      {/* Avatar do Bililiu à esquerda para mensagens da IA */}
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-emerald-700/40 shadow-xs mb-1">
          <img
            src={bililiuConfig.avatarUrl}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
            }}
            alt="Bililiu"
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      {/* Balão de Mensagem */}
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 sm:p-4 text-sm leading-relaxed shadow-xs transition-all ${
          isUser
            ? "bg-emerald-800 text-white rounded-br-xs"
            : message.isError
            ? "bg-amber-50 border border-amber-300 text-amber-950 rounded-bl-xs"
            : "bg-white border border-stone-200/90 text-stone-900 rounded-bl-xs"
        }`}
      >
        {/* Identificação de quem está falando */}
        {!isUser && (
          <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-stone-100">
            <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              Bililiu
              <span className="text-[10px] text-amber-700 font-normal">🤠 Roça Online</span>
            </span>

            {/* Ações da mensagem (Áudio & Copiar) */}
            <div className="flex items-center gap-1 text-stone-400">
              {onSpeak && !message.isError && (
                <button
                  onClick={() => onSpeak(message.text)}
                  title="Ouvir resposta com sotaque"
                  className="p-1 hover:text-emerald-700 transition-colors cursor-pointer rounded"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={handleCopy}
                title="Copiar mensagem"
                className="p-1 hover:text-stone-700 transition-colors cursor-pointer rounded"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* Conteúdo textual da mensagem */}
        <div className="whitespace-pre-wrap break-words font-normal">
          {message.text}
        </div>

        {/* Se for erro, mostra botão de retry */}
        {message.isError && onRetry && (
          <div className="mt-2.5 pt-2 border-t border-amber-200 flex items-center justify-between">
            <span className="text-xs text-amber-800 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
              Falha de conexão
            </span>
            <button
              onClick={onRetry}
              className="text-xs font-semibold px-2 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded transition-colors cursor-pointer"
            >
              Tentar novamente ↻
            </button>
          </div>
        )}

        {/* Rodapé com horário de envio */}
        <div
          className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
            isUser ? "text-emerald-200" : "text-stone-400"
          }`}
        >
          <span>{formattedTime}</span>
          {isUser && <span>✓✓</span>}
        </div>
      </div>
    </div>
  );
};
