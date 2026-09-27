import React from "react";
import { ShieldCheck, X, Lock, Clock, DatabaseZap, UserCheck, Award } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-bubble">
      <div className="bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-emerald-500/40 relative max-h-[90vh] overflow-y-auto chat-scrollbar text-white">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-brand text-xl font-bold text-white">
              Privacidade da sua Prosa
            </h3>
            <p className="text-xs text-stone-400">
              Criado e desenvolvido por Frisquila
            </p>
          </div>
        </div>

        {/* Conteúdo Explicativo */}
        <div className="space-y-3.5 text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
          <div className="p-4 bg-stone-950/70 rounded-2xl border border-stone-800 flex items-start gap-3.5">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Sem Armazenamento de Mensagens</p>
              <p className="text-xs text-stone-400 mt-1">
                Nenhuma mensagem trocada com o Bililiu é salva em bancos de dados. A prosa existe apenas na memória temporária do seu navegador enquanto a sessão estiver ativa.
              </p>
            </div>
          </div>

          <div className="p-4 bg-stone-950/70 rounded-2xl border border-stone-800 flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Encerramento Automático em 15 Minutos</p>
              <p className="text-xs text-stone-400 mt-1">
                Após 15 minutos sem interação, a sessão se encerra automaticamente e todo o histórico local é apagado por completo.
              </p>
            </div>
          </div>

          <div className="p-4 bg-stone-950/70 rounded-2xl border border-stone-800 flex items-start gap-3.5">
            <UserCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Zero Cadastro ou Coleta de Dados</p>
              <p className="text-xs text-stone-400 mt-1">
                Você não precisa fornecer nome, e-mail, telefone nem qualquer dado pessoal. Não existem contas nem rastreamentos invasivos.
              </p>
            </div>
          </div>

          <div className="p-4 bg-stone-950/70 rounded-2xl border border-emerald-500/30 flex items-start gap-3.5">
            <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-white text-xs sm:text-sm">Desenvolvimento Exclusivo</p>
              <p className="text-xs text-stone-400 mt-1">
                Esta plataforma foi desenhada, criada e desenvolvida por Frisquila com foco em rapidez, humor mineiro e respeito total à sua privacidade.
              </p>
            </div>
          </div>
        </div>

        {/* Botão de Fechar */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold text-sm rounded-2xl shadow-lg transition-colors cursor-pointer"
          >
            Entendido, bora voltar pra prosa! 🤠
          </button>
        </div>
      </div>
    </div>
  );
};
