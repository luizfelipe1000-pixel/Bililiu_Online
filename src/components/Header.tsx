import React from "react";
import { Share2, Zap, ShieldCheck, Flame } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";
import { shareBililiu } from "../utils/share.ts";

interface HeaderProps {
  onOpenPrivacy: () => void;
  onScrollToChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPrivacy, onScrollToChat }) => {
  const [copiedToast, setCopiedToast] = React.useState(false);

  const handleShare = async () => {
    const res = await shareBililiu();
    if (res.method === "clipboard") {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080d0a]/90 backdrop-blur-xl border-b border-emerald-900/40 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Logo / Marca Futurista com Caricatura Oficial */}
        <a href="#" className="flex items-center gap-3.5 group focus:outline-none rounded-xl p-1">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden ring-2 ring-emerald-500/50 group-hover:ring-emerald-400 transition-all shadow-lg shadow-emerald-950/60 bg-stone-900">
            <img
              src={bililiuConfig.avatarUrl}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
              }}
              alt="Caricatura oficial do Bililiu de chapéu e óculos escuros"
              className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
            />
            <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-stone-950 animate-cyber-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-brand font-extrabold text-lg sm:text-xl text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                CONVERSE COM BILILIU
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-cyber font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                AGRO 2.0
              </span>
            </div>
            <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
              <span>Minas Gerais</span>
              <span className="text-emerald-500 font-bold">·</span>
              <span className="text-stone-300 font-medium">Por Frisquila</span>
            </p>
          </div>
        </a>

        {/* Navegação e Ações */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onScrollToChat}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-xl transition-all shadow-xs"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Prosear Agora</span>
          </button>

          <a
            href="#quem-e-o-bililiu"
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-emerald-300 transition-colors"
          >
            Quem é o Bililiu?
          </a>

          <a
            href="#redes-sociais"
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-emerald-300 transition-colors"
          >
            Redes Sociais
          </a>

          <button
            onClick={onOpenPrivacy}
            title="Privacidade e dados"
            className="inline-flex items-center gap-1 p-2 text-stone-400 hover:text-emerald-300 rounded-xl hover:bg-emerald-950/40 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs hidden lg:inline">Privacidade</span>
          </button>

          {/* Botão de Compartilhar Viral */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 active:scale-95 rounded-xl shadow-md shadow-amber-950/40 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Compartilhar</span>
              <span>🚜</span>
            </button>

            {copiedToast && (
              <div className="absolute right-0 top-12 bg-emerald-900 text-white border border-emerald-500/40 text-xs px-3 py-2 rounded-xl shadow-2xl whitespace-nowrap animate-bubble z-50">
                Link da prosa copiado! 🌾
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
