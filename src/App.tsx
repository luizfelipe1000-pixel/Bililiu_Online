import React, { useState } from "react";
import { Header } from "./components/Header.tsx";
import { Hero } from "./components/Hero.tsx";
import { ChatContainer } from "./components/ChatContainer.tsx";
import { AboutBililiu } from "./components/AboutBililiu.tsx";
import { SocialSection } from "./components/SocialSection.tsx";
import { ViralShare } from "./components/ViralShare.tsx";
import { PrivacyModal } from "./components/PrivacyModal.tsx";
import { Footer } from "./components/Footer.tsx";

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollToChat = () => {
    const el = document.getElementById("chat-bililiu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const textarea = el.querySelector("textarea");
      if (textarea) {
        setTimeout(() => textarea.focus(), 400);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200">
      {/* Cabeçalho Fixo */}
      <Header
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onScrollToChat={scrollToChat}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* Seção Hero */}
        <Hero onStartChat={scrollToChat} />

        {/* Seção de Conversa com Bililiu */}
        <ChatContainer />

        {/* Seção Quem é o Bililiu */}
        <AboutBililiu />

        {/* Seção de Redes Sociais */}
        <SocialSection />

        {/* Seção Viral de Compartilhamento */}
        <ViralShare onScrollToChat={scrollToChat} />
      </main>

      {/* Modal de Privacidade e Sessão Efêmera */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Rodapé */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onScrollToTop={scrollToTop}
      />
    </div>
  );
}
