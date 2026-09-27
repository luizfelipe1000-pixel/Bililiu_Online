import React from "react";
import { Instagram, Play, Heart, ShieldCheck, ArrowUp, Zap } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

interface FooterProps {
  onOpenPrivacy: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onScrollToTop }) => {
  return (
    <footer className="bg-[#050806] text-stone-400 text-xs border-t border-emerald-950/80">
      {/* Banner de CTA Final */}
      <div className="bg-gradient-to-b from-stone-950 to-[#050806] py-14 px-4 sm:px-6 text-center border-b border-stone-850">
        <div className="max-w-2xl mx-auto">
          <span className="text-4xl mb-3 inline-block animate-bounce">🌾</span>
          <h3 className="font-brand text-2xl sm:text-4xl font-extrabold text-white mb-3">
            A prosa não acaba aqui.
          </h3>
          <p className="text-stone-300 text-sm sm:text-base mb-8 font-light">
            Segue o Bililiu e acompanha os próximos trem da roça e dos vídeos!
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href={bililiuConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold transition-all shadow-md shadow-pink-950/40"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram Oficial</span>
            </a>
            <a
              href={bililiuConfig.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold border border-stone-700 transition-all shadow-md"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>TikTok Oficial</span>
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé institucional com destaque para Frisquila */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-stone-400 text-center sm:text-left">
          <span className="font-brand font-bold text-white text-sm">
            Converse com Bililiu
          </span>
          <span>·</span>
          <span>Minas Gerais, Brasil</span>
        </div>

        <div className="flex items-center gap-5 text-stone-400">
          <button
            onClick={onOpenPrivacy}
            className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Privacidade & Sessão</span>
          </button>

          <a
            href={bililiuConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors font-medium"
          >
            @bililiuonline
          </a>

          <button
            onClick={onScrollToTop}
            title="Voltar ao topo"
            className="p-2 rounded-xl bg-stone-900 hover:bg-emerald-950 text-stone-400 hover:text-emerald-300 border border-stone-800 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Assinatura oficial Frisquila */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 text-center text-xs text-stone-400 border-t border-stone-900/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          Feito com café coado, pão de queijo quentinho e muita resenha mineira.
        </p>
        <p className="font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Criado e desenvolvido por <strong>Frisquila</strong></span>
        </p>
      </div>
    </footer>
  );
};
