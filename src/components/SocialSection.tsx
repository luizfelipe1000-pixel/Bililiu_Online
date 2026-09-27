import React from "react";
import { Instagram, Play, Sparkles, ExternalLink, ArrowRight, Flame } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

export const SocialSection: React.FC = () => {
  return (
    <section id="redes-sociais" className="py-16 sm:py-24 bg-[#080d0a] text-white relative overflow-hidden">
      {/* Luz ambiente e grade de fundo */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Kicker */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          Acompanhe os próximos trem
        </div>

        {/* Título Principal */}
        <h2 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          Curtiu a prosa? Então segue o homem!
        </h2>

        {/* Subtítulo / CTA Viral */}
        <p className="text-base sm:text-xl text-stone-300 max-w-xl mx-auto mb-10 font-light">
          Se esse trem te fez rir, imagina os vídeos 😂
        </p>

        {/* Cards das Redes Sociais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
          {/* Card Instagram */}
          <a
            href={bililiuConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-7 bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-pink-500/50 rounded-3xl shadow-xl transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden backdrop-blur-md"
          >
            <div className="absolute top-4 right-4 text-stone-600 group-hover:text-pink-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Instagram className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-brand font-bold text-xl text-white mb-1.5">
                Instagram Oficial
              </h3>
              <p className="text-xs text-stone-400 mb-5 leading-relaxed">
                Stories diários, bastidores da fazenda e resenha direta nos reels.
              </p>
            </div>

            <span className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm rounded-2xl shadow-md transition-all group-hover:shadow-pink-500/30">
              <span>Seguir no Instagram 📸</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Card TikTok */}
          <a
            href={bililiuConfig.socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-7 bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-cyan-400/50 rounded-3xl shadow-xl transition-all duration-300 flex flex-col items-center justify-between text-center overflow-hidden backdrop-blur-md"
          >
            <div className="absolute top-4 right-4 text-stone-600 group-hover:text-cyan-400 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-cyan-400 fill-cyan-400" />
            </div>

            <div>
              <h3 className="font-brand font-bold text-xl text-white mb-1.5">
                TikTok Oficial
              </h3>
              <p className="text-xs text-stone-400 mb-5 leading-relaxed">
                Vídeos curtos, situações hilárias do interior e virais agro.
              </p>
            </div>

            <span className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 bg-stone-800 hover:bg-stone-750 border border-stone-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all group-hover:border-cyan-400">
              <span>Ver no TikTok 🎵</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* CTA Intermediário */}
        <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-emerald-500/30 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div>
            <p className="text-sm font-bold text-white">
              Quer ver o homem ao vivo?
            </p>
            <p className="text-xs text-stone-400">
              @bililiuonline em todas as redes oficiais.
            </p>
          </div>
          <a
            href={bililiuConfig.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 rounded-xl transition-all shadow-md shadow-amber-950/40 whitespace-nowrap cursor-pointer"
          >
            Conhecer o Bililiu 🤠
          </a>
        </div>
      </div>
    </section>
  );
};
