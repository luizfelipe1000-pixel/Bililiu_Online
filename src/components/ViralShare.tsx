import React, { useState } from "react";
import { Share2, Sparkles, MessageCircle, Quote, Check } from "lucide-react";
import { shareBililiu } from "../utils/share.ts";

interface ViralShareProps {
  onScrollToChat: () => void;
}

export const ViralShare: React.FC<ViralShareProps> = ({ onScrollToChat }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const res = await shareBililiu();
    if (res.method === "clipboard") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const viralQuotes = [
    "Converse com o Bililiu e veja até onde essa prosa vai.",
    "Pergunta qualquer trem. Mas já aviso: o Bililiu pode responder 😂",
    "Esse trem aqui é melhor que ficar olhando o pasto crescer.",
    "Você conversa com IA todo dia. Mas já tentou conversar com uma IA mineira?",
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F4F1EA] border-b border-stone-300/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Viralize essa resenha
          </div>

          <h2 className="font-serif-brand text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-3">
            Prosa boa a gente não guarda sozinho
          </h2>

          <p className="text-sm sm:text-base text-stone-600">
            Manda pro compadre, pra comadre e pro grupo da família pra ver quem aguenta o humor do homem!
          </p>
        </div>

        {/* Grade de Frases Marcantes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {viralQuotes.map((quote, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-sm transition-shadow flex items-start gap-3.5"
            >
              <Quote className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-stone-800 leading-snug">
                  "{quote}"
                </p>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  — Sabedoria do Bililiu Online
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bloco de Ação Principal */}
        <div className="bg-gradient-to-r from-emerald-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-lg border border-emerald-800">
          <div className="max-w-xl mx-auto relative z-10">
            <h3 className="font-serif-brand text-xl sm:text-2xl font-bold mb-2">
              Você conversa com IA todo dia. Mas já tentou conversar com uma IA mineira?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 mb-6">
              Chega de respostas sem sal de robô engravatado. Aqui a prosa é de verdade, sô!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-800" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "Link Copiado pro Zap! 🚜" : "Compartilhar o Bililiu 🚜"}</span>
              </button>

              <button
                onClick={onScrollToChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-700/80 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl border border-emerald-600/60 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-amber-300" />
                <span>Prosear com o Bililiu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
