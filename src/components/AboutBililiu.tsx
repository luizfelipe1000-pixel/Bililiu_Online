import React from "react";
import { Wheat, Laugh, Coffee, MapPin, Sparkles } from "lucide-react";
import { bililiuConfig } from "../config/bililiuConfig.ts";

export const AboutBililiu: React.FC = () => {
  return (
    <section id="quem-e-o-bililiu" className="py-12 sm:py-16 bg-white border-y border-stone-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Coluna da Imagem / Caricatura do Bililiu */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Moldura estilizada com inspiração na terra e agro */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-600 via-emerald-600 to-amber-400 rounded-3xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden bg-stone-900 border-4 border-white shadow-2xl">
                <img
                  src={bililiuConfig.avatarUrl}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/bililiu-avatar.jpg";
                  }}
                  alt="Bililiu com chapéu estilo boiadeiro e óculos escuros"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge sobre a imagem */}
                <div className="absolute bottom-3 left-3 right-3 bg-stone-950/80 backdrop-blur-md rounded-xl p-2.5 border border-white/20 text-white flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold flex items-center gap-1">
                      Bililiu
                      <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400/40">
                        Criador Agro
                      </span>
                    </p>
                    <p className="text-[10px] text-stone-300">Minas Gerais, Brasil</p>
                  </div>
                  <span className="text-xl">🤠</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna de Texto e Apresentação */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              Orgulho de Minas Gerais
            </div>

            <h2 className="font-serif-brand text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
              Mas afinal, quem é o Bililiu?
            </h2>

            {/* Texto de apresentação autêntico */}
            <div className="space-y-3.5 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Bililiu é um criador de conteúdo mineiro que tá chegando pra mostrar que o mundo agro também tem espaço pra humor, resenha e muita prosa boa.
              </p>
              <p>
                Entre um trem e outro, ele compartilha sua visão do agro, da vida no interior e das situações que só quem é de Minas entende.
              </p>
              <p className="font-semibold text-emerald-900">
                E olha... esse trem tá só começando.
              </p>
            </div>

            {/* Três pilares do Bililiu */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-stone-200/80">
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60">
                <Wheat className="w-5 h-5 text-emerald-700 mb-1.5" />
                <h4 className="font-bold text-xs text-stone-900 mb-0.5">Mundo Agro</h4>
                <p className="text-[11px] text-stone-500">
                  A lida do campo com um olhar leve, dinâmico e descomplicado.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60">
                <Laugh className="w-5 h-5 text-amber-600 mb-1.5" />
                <h4 className="font-bold text-xs text-stone-900 mb-0.5">Humor & Resenha</h4>
                <p className="text-[11px] text-stone-500">
                  Os causos que só o interior e a roça mineira conseguem render.
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200/60">
                <Coffee className="w-5 h-5 text-amber-800 mb-1.5" />
                <h4 className="font-bold text-xs text-stone-900 mb-0.5">Alma Mineira</h4>
                <p className="text-[11px] text-stone-500">
                  Aquele sotaque inconfundível, acolhimento e café coado na hora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
