import React from "react";
import { Share2, Sparkles, ShieldCheck } from "lucide-react";
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
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Marca */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-emerald-700/30 group-hover:ring-emerald-700 transition-all shadow-sm">
            <img
              src={bililiuConfig.avatarUrl}
              onError={(e) => {
                // Fallback de imagem caso o arquivo webp demore
                (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
              }}
              alt="Bililiu com chapéu e óculos escuros"
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-agro-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-brand font-bold text-lg sm:text-xl text-stone-900 tracking-tight group-hover:text-emerald-800 transition-colors">
                Converse com Bililiu
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                IA Agro
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              Direto de Minas Gerais 🌾 Resenha & Prosa
            </p>
          </div>
        </a>

        {/* Ações e Navegação */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onScrollToChat}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Prosear</span>
          </button>

          <a
            href="#quem-e-o-bililiu"
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Quem é o Bililiu?
          </a>

          <a
            href="#redes-sociais"
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            Redes Sociais
          </a>

          <button
            onClick={onOpenPrivacy}
            title="Privacidade da conversa"
            className="inline-flex items-center gap-1 p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span className="text-xs hidden lg:inline">Privacidade</span>
          </button>

          {/* Botão de Compartilhar */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-sm transition-all transform active:scale-95 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Compartilhar</span>
              <span>🚜</span>
            </button>

            {copiedToast && (
              <div className="absolute right-0 top-11 bg-stone-900 text-white text-xs px-2.5 py-1.5 rounded shadow-lg whitespace-nowrap animate-bubble z-50">
                Link da prosa copiado! 🌾
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
