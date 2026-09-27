# 🌾 Converse com Bililiu - O Agro do Futuro

Uma aplicação web completa, moderna, responsiva e pronta para produção que coloca os visitantes para prosear diretamente com o **Bililiu**, influenciador digital agro direto do interior de Minas Gerais.

**Criado e desenvolvido por Frisquila.**

---

## 1. 📂 Estrutura Completa de Arquivos

```text
├── .env.example                     # Modelo de variáveis de ambiente
├── .gitignore                       # Arquivos ignorados pelo Git
├── index.html                       # HTML5 semântico com meta tags, OpenGraph e SEO
├── metadata.json                    # Metadados e permissões da aplicação no AI Studio
├── package.json                     # Scripts e dependências instaladas
├── tsconfig.json                    # Configurações TypeScript
├── vite.config.ts                   # Configurações Vite + Tailwind CSS
├── vercel.json                      # Configuração de roteamento e build na Vercel
├── server.ts                        # Servidor full-stack Express + Vite Middleware (Dev/Prod)
├── api/
│   └── chat.ts                      # Serverless Function pronta para Vercel
├── public/
│   ├── bililiu-avatar.webp          # Caricatura/avatar oficial do Bililiu
│   ├── bililiu-avatar.jpg           # Fallback JPEG em alta resolução
│   ├── robots.txt                   # Instruções de indexação para buscadores
│   └── sitemap.xml                  # Mapa do site para SEO
└── src/
    ├── main.tsx                     # Ponto de entrada React 19
    ├── App.tsx                      # Layout mestre integrando todas as seções
    ├── index.css                    # Tailwind CSS v4, animações e tipografia
    ├── config/
    │   └── bililiuConfig.ts         # CONFIGURAÇÃO CENTRAL (Persona, sotaque, limites, redes)
    ├── hooks/
    │   └── useBililiuChat.ts        # Hook de mensagens, inatividade 15min e síntese de voz
    ├── services/
    │   └── ai/
    │       └── bililiuAiService.ts  # Camada de comunicação com @google/genai (Gemini)
    ├── db/
    │   ├── neon.ts                  # Conexão opcional e econômica com Neon PostgreSQL
    │   └── schema.sql               # Esquema SQL minimalista para estatísticas opcionais
    ├── utils/
    │   └── share.ts                 # Utilitário de compartilhamento nativo (Web Share API)
    └── components/
        ├── Header.tsx               # Barra de navegação, status e compartilhamento
        ├── Hero.tsx                 # Chamada inicial e badges de autenticidade
        ├── ChatContainer.tsx        # Interface conversacional estilo zap com sotaque
        ├── ChatMessageBubble.tsx    # Balões de mensagem com áudio e cópia
        ├── AboutBililiu.tsx         # Seção "Mas afinal, quem é o Bililiu?"
        ├── SocialSection.tsx        # Seção de conversão para Instagram e TikTok
        ├── ViralShare.tsx           # Chamadas virais e compartilhamento
        ├── PrivacyModal.tsx         # Modal de transparência e sessão 100% efêmera
        └── Footer.tsx               # Rodapé com CTA final
```

---

## 2. 🧩 Componentes Reutilizáveis

- **`ChatContainer`**: Container principal do chat com controle de estado, scroll automático, sugestões rápidas, indicador de digitação mineiro e alerta de expiração.
- **`ChatMessageBubble`**: Balão de fala otimizado com distinção visual entre usuário e Bililiu, áudio integrado, botão de copiar e tratamento de retry.
- **`Header`**: Cabeçalho fixo com avatar do personagem, status online pulsante e botão de compartilhamento viral.
- **`Hero`**: Seção de apresentação inicial com forte apelo visual, tipografia serifada acolhedora e CTA direto pro chat.
- **`AboutBililiu`**: Landing page card apresentando a história do Bililiu, sua paixão pelo campo e pelos causos do interior.
- **`SocialSection`**: Seção focada em conversão para Instagram (`@bililiuonline`) e TikTok (`@bililiuonline`).
- **`ViralShare`**: Cartões com frases mineiras marcantes e botão acionando a Web Share API nativa do dispositivo.
- **`PrivacyModal`**: Explicação acessível sobre como as mensagens não são persistidas e como a privacidade é respeitada.
- **`Footer`**: Rodapé com mensagem de encerramento acolhedora e links rápidos.

---

## 3. 🧠 Backend e API para Comunicação com a IA

- **Tecnologia**: SDK oficial `@google/genai` executado **estritamente no backend** (`server.ts` e `api/chat.ts`).
- **Segurança**: A chave `GEMINI_API_KEY` nunca é exposta no frontend nem em bundles JavaScript.
- **Modelo utilizado**: `gemini-3.8-flash` (ou aliases rápidos como `gemini-flash-latest`), oferecendo velocidade quase instantânea e custo mínimo por requisição.
- **Proteção contra Abuso e Spam**:
  - Rate limiting econômico em memória (máximo 20 mensagens por minuto por IP).
  - Sanitização de entrada e corte rigoroso em 500 caracteres.
  - Janela deslizante de contexto com envio de no máximo 8 mensagens recentes para a IA.

---

## 4. 🗄️ Configuração para Neon PostgreSQL

O projeto foi concebido sob o princípio de **Economia Extrema de Banco e Networking**:
- **NENHUMA mensagem de conversa é gravada no banco de dados**.
- As conversas existem 100% no estado de sessão local do navegador.
- Caso você deseje utilizar o Neon para futuras funcionalidades (ex: contador de prosas), o arquivo `src/db/neon.ts` e o script `src/db/schema.sql` já vêm prontos. Se `DATABASE_URL` não for fornecida, a aplicação opera em modo autônomo sem gerar erros.

---

## 5. 🔐 Variáveis de Ambiente (`.env.example`)

```env
# GEMINI_API_KEY: Chave da API do Google AI Studio para o modelo Gemini
GEMINI_API_KEY="sua_chave_aqui"

# APP_URL: URL oficial da aplicação
APP_URL="https://conversecombililiu.com.br"

# DATABASE_URL: URL do banco Neon PostgreSQL (Opcional - modo economia total ativo por padrão)
DATABASE_URL="postgres://user:password@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require"

# PORT: Porta padrão do servidor Express
PORT=3000
```

---

## 6. 🚀 Como Instalar e Rodar Localmente

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <seu-repositorio>
   cd converse-com-bililiu
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Crie seu arquivo de variáveis `.env`:**
   ```bash
   cp .env.example .env
   # Adicione sua GEMINI_API_KEY no arquivo .env
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000`.

---

## 7. ☁️ Instruções para Deploy na Vercel

O projeto possui suporte nativo para a Vercel através de `vercel.json` e a serverless function `api/chat.ts`:

1. Conecte seu repositório no dashboard da [Vercel](https://vercel.com).
2. Na tela de importação:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Em **Environment Variables**, adicione:
   - `GEMINI_API_KEY` = `(sua chave do Google AI Studio)`
   - `DATABASE_URL` = `(sua URL do Neon, se desejar)`
4. Clique em **Deploy**. A Vercel criará automaticamente os endpoints estáticos e a API `/api/chat`.

---

## 8. 🤠 Como Trocar a Personalidade ou Sotaque do Bililiu

Toda a persona está centralizada em um único arquivo:
👉 **`src/config/bililiuConfig.ts`**

Para alterar o vocabulário, adicione ou remova termos no `systemPrompt`:
```typescript
export const bililiuConfig = {
  name: "Bililiu",
  state: "Minas Gerais",
  systemPrompt: `Você é a inteligência artificial do Bililiu...`,
  // ...
};
```
Você também pode editar as frases de saudação inicial (`initialGreeting`) e as perguntas sugeridas (`suggestedQuestions`).

---

## 9. 🖼️ Como Trocar a Imagem ou Avatar do Bililiu

O projeto já vem com o avatar padrão estilizado baseado na foto com chapéu boiadeiro e óculos escuros:
- O arquivo principal fica em: **`/public/bililiu-avatar.webp`**
- O arquivo alternativo fica em: **`/public/bililiu-avatar.jpg`**

Para trocar:
1. Basta substituir o arquivo `/public/bililiu-avatar.webp` por qualquer imagem quadrada (1:1) de sua preferência.
2. Se quiser alterar a URL do arquivo, altere a propriedade `avatarUrl` em `src/config/bililiuConfig.ts`.

---

## 10. 🔗 Como Alterar os Links das Redes Sociais

Edite os links diretamente em `src/config/bililiuConfig.ts`:
```typescript
socialLinks: {
  instagram: "https://www.instagram.com/bililiuonline?stkn=MTF6a2F1MjZ2ajZmZg==",
  tiktok: "https://www.tiktok.com/@bililiuonline?_r=1&_t=ZS-9A4Gn11f3Lg",
}
```
Todos os botões da página (Header, seção de redes, footer e cards) serão atualizados automaticamente.

---

## 11. 💰 Estratégias de Economia Extrema (Tokens, Banco e Networking)

1. **Zero Banco para Mensagens**: Nenhuma conversa é persistida em banco de dados; todo o chat ocorre na memória volátil do navegador do usuário.
2. **Janela de Contexto Reduzida**: Em vez de enviar o histórico infinito, enviamos apenas as últimas 8 mensagens (`maxHistoryMessages: 8`).
3. **Limite de Caracteres por Mensagem**: As entradas são travadas no frontend e validadas no backend em 500 caracteres (`maxMessageLength: 500`).
4. **Sem Polling ou WebSockets Desnecessários**: Utiliza requisições HTTP POST padrão sob demanda, consumindo zero recursos enquanto o usuário apenas lê a tela.
5. **Rate Limiting em Memória**: Janela deslizante de 20 requisições por minuto por IP sem necessidade de Redis ou conexões de rede externas.
6. **Encerramento Automático após 15 Minutos**: Se o usuário esquecer a aba aberta, o timer encerra a sessão e limpa a memória local automaticamente.

---

## 12. 📜 Licença e Créditos

Desenvolvido para o influenciador agro **Bililiu Online** (Minas Gerais, Brasil).
**Criado e desenvolvido por Frisquila.** Prosa boa, café coado e resenha mineira! ☕🌾
