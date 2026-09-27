import React from "react";
import { Instagram, Play, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

export const SocialSection: React.FC = () => {
  return (
    <section id="redes-sociais" className="py-14 sm:py-20 bg-stone-900 text-white relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-700/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Acompanhe os próximos trem
        </div>

        {/* Título Principal */}
        <h2 className="font-serif-brand text-3xl sm:text-5xl font-bold tracking-tight mb-3">
          Curtiu a prosa? Então segue o homem!
        </h2>

        {/* Subtítulo / CTA Viral */}
        <p className="text-base sm:text-xl text-stone-300 max-w-xl mx-auto mb-8 font-light">
          Se esse trem te fez rir, imagina os vídeos 😂
        </p>

        {/* Cards das Redes Sociais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
          {/* Botão / Card Instagram */}
          <a
            href={bililiuConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-stone-800 to-stone-850 hover:from-[#833ab4]/20 hover:to-[#fd1d1d]/20 border border-stone-700 hover:border-pink-500/50 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-stone-500 group-hover:text-pink-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <Instagram className="w-7 h-7" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-white mb-1">
                Instagram
              </h3>
              <p className="text-xs text-stone-400 mb-4">
                Stories diários, bastidores da fazenda e resenha direta nos reels.
              </p>
            </div>

            <span className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all group-hover:shadow-pink-500/20">
              <span>Seguir no Instagram 📸</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>

          {/* Botão / Card TikTok */}
          <a
            href={bililiuConfig.socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-6 bg-gradient-to-br from-stone-800 to-stone-850 hover:from-cyan-900/20 hover:to-red-900/20 border border-stone-700 hover:border-cyan-400/50 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden"
          >
            <div className="absolute top-3 right-3 text-stone-500 group-hover:text-cyan-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>

            <div className="w-14 h-14 rounded-2xl bg-stone-950 border border-stone-700 flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-cyan-400 fill-cyan-400" />
            </div>

            <div>
              <h3 className="font-bold text-lg text-white mb-1">
                TikTok
              </h3>
              <p className="text-xs text-stone-400 mb-4">
                Vídeos curtos, situações hilárias do interior e virais agro.
              </p>
            </div>

            <span className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-700 border border-stone-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all group-hover:border-cyan-400">
              <span>Ver no TikTok 🎵</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* CTA Intermediário */}
        <div className="p-4 rounded-xl bg-stone-800/60 border border-stone-700/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div>
            <p className="text-xs font-bold text-stone-200">
              Quer ver o homem ao vivo?
            </p>
            <p className="text-[11px] text-stone-400">
              @bililiuonline em todas as redes oficiais.
            </p>
          </div>
          <a
            href={bililiuConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg transition-colors whitespace-nowrap"
          >
            Conhecer o Bililiu 🤠
          </a>
        </div>
      </div>
    </section>
  );
};
