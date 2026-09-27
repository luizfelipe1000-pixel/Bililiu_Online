import React from "react";
import { ShieldCheck, X, Check, Lock, Clock, DatabaseZap, UserCheck } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-bubble">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto chat-scrollbar">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-750 hover:bg-stone-100 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-brand text-xl font-bold text-stone-900">
              Privacidade da sua Prosa
            </h3>
            <p className="text-xs text-stone-500">
              Transparência total e respeito com ocê
            </p>
          </div>
        </div>

        {/* Conteúdo Explicativo */}
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-800 text-xs sm:text-sm">Sem Armazenamento de Mensagens</p>
              <p className="text-xs text-stone-600 mt-0.5">
                Nenhuma pergunta ou resposta que ocê troca com o Bililiu é salva em banco de dados ou histórico permanente. A conversa existe apenas na memória temporária do seu navegador enquanto a sessão estiver ativa.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-800 text-xs sm:text-sm">Encerramento Automático em 15 Minutos</p>
              <p className="text-xs text-stone-600 mt-0.5">
                Se ocê ficar 15 minutos sem interagir, a sessão expira automaticamente e todo o histórico da prosa é apagado por completo.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-800 text-xs sm:text-sm">Zero Cadastro ou Coleta de Dados</p>
              <p className="text-xs text-stone-600 mt-0.5">
                Não pedimos seu nome, e-mail, telefone, CPF nem cartão. Não criamos contas, senhas ou perfis.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200 flex items-start gap-3">
            <DatabaseZap className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-800 text-xs sm:text-sm">Economia e Simplicidade</p>
              <p className="text-xs text-stone-600 mt-0.5">
                Nossa arquitetura foi desenhada para ter o menor custo de servidor e banco possível, com comunicação direta e enxuta.
              </p>
            </div>
          </div>
        </div>

        {/* Botão de Fechar */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Entendido, bora voltar pra prosa! 🤠
          </button>
        </div>
      </div>
    </div>
  );
};
