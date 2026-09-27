import React, { useState } from "react";
import { Share2, Sparkles, MessageSquare, Quote, Check, Zap } from "lucide-react";
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
    "A resenha mineira definitiva na roça mais moderna do Brasil.",
  ];

  return (
    <section className="py-14 sm:py-20 bg-stone-950 border-t border-emerald-950/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Viralize essa resenha
          </div>

          <h2 className="font-brand text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Prosa boa a gente não guarda sozinho
          </h2>

          <p className="text-sm sm:text-base text-stone-300">
            Manda pro compadre, pra comadre e pro grupo da família pra ver quem aguenta o humor do homem!
          </p>
        </div>

        {/* Grade de Frases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {viralQuotes.map((quote, idx) => (
            <div
              key={idx}
              className="bg-stone-900/90 p-5 sm:p-6 rounded-3xl border border-emerald-950 hover:border-emerald-500/40 shadow-lg transition-all flex items-start gap-4"
            >
              <Quote className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <p className="text-sm sm:text-base font-medium text-stone-200 leading-snug">
                  "{quote}"
                </p>
                <span className="text-[11px] text-emerald-400 mt-2 block font-brand">
                  — Bililiu Online
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bloco de Ação Principal */}
        <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-7 sm:p-10 text-center relative overflow-hidden shadow-2xl border border-emerald-500/40">
          <div className="max-w-xl mx-auto relative z-10">
            <h3 className="font-brand text-2xl sm:text-3xl font-extrabold mb-3">
              Você já viu de tudo na internet. Mas já proseou com o Bililiu?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mb-7">
              Aqui a prosa é de verdade, cheia de sotaque, risadas e resenha mineira!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-950/50 transition-all cursor-pointer active:scale-98"
              >
                {copied ? <Check className="w-4 h-4 text-stone-950" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "Link Copiado pro Zap! 🚜" : "Compartilhar o Bililiu 🚜"}</span>
              </button>

              <button
                onClick={onScrollToChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-stone-900 hover:bg-stone-850 text-white font-bold text-sm rounded-2xl border border-emerald-500/40 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Prosear com o Bililiu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
