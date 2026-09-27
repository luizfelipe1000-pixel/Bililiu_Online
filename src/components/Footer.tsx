import React from "react";
import { Instagram, Play, Heart, ShieldCheck, ArrowUp } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

interface FooterProps {
  onOpenPrivacy: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onScrollToTop }) => {
  return (
    <footer className="bg-stone-950 text-stone-400 text-xs border-t border-stone-850">
      {/* Banner de CTA Final */}
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 py-12 px-4 sm:px-6 text-center border-b border-stone-800">
        <div className="max-w-2xl mx-auto">
          <span className="text-3xl mb-2 inline-block">🌾</span>
          <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold text-white mb-2">
            A prosa não acaba aqui.
          </h3>
          <p className="text-stone-300 text-sm mb-6">
            Segue o Bililiu e acompanha os próximos trem da roça e do agro!
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={bililiuConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-semibold transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href={bililiuConfig.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-semibold border border-stone-700 transition-colors"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé institucional */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-stone-500">
          <span className="font-serif-brand font-bold text-stone-300 text-sm">
            Converse com Bililiu
          </span>
          <span>·</span>
          <span>Minas Gerais, Brasil</span>
        </div>

        <div className="flex items-center gap-4 text-stone-400">
          <button
            onClick={onOpenPrivacy}
            className="hover:text-stone-200 transition-colors cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Privacidade & Sessão</span>
          </button>

          <a
            href={bililiuConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-stone-200 transition-colors"
          >
            @bililiuonline
          </a>

          <button
            onClick={onScrollToTop}
            title="Voltar ao topo"
            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6 text-center text-[11px] text-stone-600">
        <p>
          Feito com café coado, pão de queijo quentinho e inteligência artificial. Conversas 100% efêmeras.
        </p>
      </div>
    </footer>
  );
};
