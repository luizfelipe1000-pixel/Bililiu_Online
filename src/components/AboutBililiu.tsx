import React from "react";
import { Wheat, Laugh, Coffee, MapPin, Zap, Award } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

export const AboutBililiu: React.FC = () => {
  return (
    <section id="quem-e-o-bililiu" className="py-14 sm:py-20 bg-stone-950 border-y border-emerald-950/80 relative overflow-hidden">
      {/* Detalhes luminosos de fundo */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-emerald-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Coluna da Imagem / Caricatura em Destaque */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-tr from-emerald-500 via-amber-400 to-teal-500 rounded-3xl opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl overflow-hidden bg-stone-900 border-2 border-emerald-400/50 shadow-2xl">
                <img
                  src={bililiuConfig.avatarUrl}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
                  }}
                  alt="Caricatura oficial do Bililiu"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/85 backdrop-blur-md rounded-2xl p-3 border border-emerald-500/30 text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold flex items-center gap-1.5 text-emerald-300">
                      Bililiu
                      <span className="text-[10px] bg-amber-400 text-stone-950 font-bold px-1.5 py-0.5 rounded">
                        O Homem do Agro
                      </span>
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Criado e desenvolvido por Frisquila</p>
                  </div>
                  <span className="text-2xl">🤠</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna de Apresentação */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Minas Gerais · Edição Especial
            </div>

            <h2 className="font-brand text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              Mas afinal, quem é o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">
                Bililiu?
              </span>
            </h2>

            <div className="space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              <p>
                Bililiu é um criador de conteúdo mineiro que tá chegando pra mostrar que o mundo agro também tem espaço pra humor, resenha e muita prosa boa.
              </p>
              <p>
                Entre um trem e outro, ele compartilha sua visão do agro, da vida no interior e das situações que só quem é de Minas entende.
              </p>
              <p className="font-bold text-emerald-400 text-base">
                E olha... esse trem tá só começando.
              </p>
            </div>

            {/* Crédito de desenvolvimento Frisquila */}
            <div className="mt-5 p-3.5 rounded-2xl bg-stone-900/90 border border-emerald-500/30 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-xs">
                <span className="text-stone-400">Projeto exclusivo:</span>{" "}
                <strong className="text-white">Criado e desenvolvido por Frisquila</strong>
                <p className="text-[11px] text-stone-400">Uma experiência imersiva e divertida de prosa mineira.</p>
              </div>
            </div>

            {/* Três Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-stone-800">
              <div className="bg-stone-900/70 p-4 rounded-2xl border border-stone-800 hover:border-emerald-500/30 transition-colors">
                <Wheat className="w-6 h-6 text-emerald-400 mb-2" />
                <h4 className="font-bold text-xs text-white mb-1">Mundo Agro</h4>
                <p className="text-[11px] text-stone-400 leading-snug">
                  A lida no campo com um olhar moderno, leve e descontraído.
                </p>
              </div>

              <div className="bg-stone-900/70 p-4 rounded-2xl border border-stone-800 hover:border-emerald-500/30 transition-colors">
                <Laugh className="w-6 h-6 text-amber-400 mb-2" />
                <h4 className="font-bold text-xs text-white mb-1">Humor & Resenha</h4>
                <p className="text-[11px] text-stone-400 leading-snug">
                  Os causos que só o interior e as estradas de terra conseguem render.
                </p>
              </div>

              <div className="bg-stone-900/70 p-4 rounded-2xl border border-stone-800 hover:border-emerald-500/30 transition-colors">
                <Coffee className="w-6 h-6 text-amber-300 mb-2" />
                <h4 className="font-bold text-xs text-white mb-1">Alma Mineira</h4>
                <p className="text-[11px] text-stone-400 leading-snug">
                  Aquele sotaque gostoso de ouvir, acolhimento e café coado na hora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
