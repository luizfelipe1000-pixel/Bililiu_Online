import React from "react";
import { MessageCircle, Sparkles, MapPin, Coffee, Wheat } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

interface HeroProps {
  onStartChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartChat }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-6 sm:pt-12 sm:pb-8">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-100/60 to-emerald-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Badges de autenticidade no topo */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100/90 border border-stone-200/90 text-stone-700 text-xs mb-5 shadow-xs">
          <span className="flex items-center gap-1 text-emerald-800 font-medium">
            <Wheat className="w-3.5 h-3.5 text-emerald-700" />
            Mundo Agro
          </span>
          <span className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-amber-900 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            Minas Gerais
          </span>
          <span className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-stone-600">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            IA Mineira
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif-brand text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15] mb-4">
          Bora prosear com o{" "}
          <span className="text-emerald-800 relative inline-block">
            Bililiu?
            <svg
              className="absolute -bottom-1 left-0 w-full h-2 text-amber-400"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
            </svg>
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto mb-6 leading-relaxed">
          Um trem de IA, uma prosa mineira e muita resenha.
        </p>

        {/* Apresentação rápida do influenciador com avatar circular */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative">
            <img
              src={bililiuConfig.avatarUrl}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
              }}
              alt="Bililiu influencer agro"
              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-700 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-stone-900 text-[10px] font-bold px-1 rounded-full border border-stone-800">
              🤠
            </span>
          </div>
          <div className="text-left">
            <div className="font-bold text-stone-800 text-sm flex items-center gap-1.5">
              Bililiu
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span className="text-xs text-emerald-700 font-normal">Ao vivo da roça</span>
            </div>
            <p className="text-xs text-stone-500">
              Pronto pra responder qualquer trem do agro ou da vida!
            </p>
          </div>
        </div>

        {/* Botão de Chamada para Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartChat}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-semibold text-base rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-98 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-amber-300" />
            <span>Começar a conversa</span>
          </button>

          <a
            href="#quem-e-o-bililiu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 text-stone-800 font-medium text-sm rounded-xl border border-stone-200 transition-colors"
          >
            <Coffee className="w-4 h-4 text-amber-700" />
            <span>Conhecer o Bililiu</span>
          </a>
        </div>
      </div>
    </section>
  );
};
