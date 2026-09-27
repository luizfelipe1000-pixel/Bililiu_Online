import React from "react";
import { MessageSquare, Sparkles, MapPin, Coffee, Wheat, Flame, ArrowRight } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

interface HeroProps {
  onStartChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartChat }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-8 sm:pt-16 sm:pb-12 bg-cyber-grid border-b border-emerald-950/60">
      {/* Luzes neon futuristas de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-emerald-600/15 via-amber-500/10 to-emerald-400/20 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Badges futuristas no topo */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs mb-6 shadow-lg shadow-emerald-950/50 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
            <Wheat className="w-3.5 h-3.5 text-emerald-400" />
            Mundo Agro Futurista
          </span>
          <span className="text-emerald-700">|</span>
          <span className="flex items-center gap-1.5 text-amber-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Minas Gerais
          </span>
          <span className="text-emerald-700">|</span>
          <span className="flex items-center gap-1 text-stone-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Desenvolvido por Frisquila
          </span>
        </div>

        {/* Título Principal com Tipografia Syne / Futurista */}
        <h1 className="font-brand text-3xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-5">
          Bora prosear com o{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-glow-emerald">
            Bililiu?
            <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-500 rounded-full" />
          </span>
        </h1>

        {/* Subtítulo Descontraído */}
        <p className="text-base sm:text-xl text-stone-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
          A resenha mais autêntica do agro mineiro, maquinários de ponta e muita conversa boa. Chega mais!
        </p>

        {/* Card do Personagem com Caricatura e Estilo Futurista */}
        <div className="max-w-lg mx-auto mb-8 p-3 sm:p-4 rounded-3xl bg-stone-900/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-lg bg-stone-950">
                <img
                  src={bililiuConfig.avatarUrl}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
                  }}
                  alt="Caricatura do Bililiu"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-stone-950 text-xs font-black px-1.5 py-0.5 rounded-full border border-stone-950 shadow-sm">
                🤠
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-brand font-bold text-white text-base sm:text-lg">
                  Bililiu Online
                </h3>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-cyber bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                O homem do chapéu e dos óculos escuros na roça
              </p>
              <p className="text-[11px] text-amber-300/90 font-medium flex items-center gap-1 mt-1">
                <span>🌾 Direto de MG</span>
                <span>·</span>
                <span>Prosa rápida & afiada</span>
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end shrink-0 pr-2">
            <span className="text-2xl animate-bounce">🚜</span>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider font-cyber">
              Cyber-Roça
            </span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartChat}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/25 transition-all transform active:scale-98 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 text-stone-950 fill-stone-950" />
            <span>Começar a Conversa</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </button>

          <a
            href="#quem-e-o-bililiu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-stone-900/90 hover:bg-stone-850 text-stone-200 hover:text-white font-semibold text-sm rounded-2xl border border-stone-800 hover:border-emerald-500/40 transition-all"
          >
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>Conhecer a História</span>
          </a>
        </div>
      </div>
    </section>
  );
};
