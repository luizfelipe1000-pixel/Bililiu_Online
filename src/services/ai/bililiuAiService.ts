import { GoogleGenAI } from "@google/genai";
import { bililiuConfig } from "../../config/bililiuConfig.ts";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface GenerateBililiuReplyParams {
  message: string;
  history?: ChatMessage[];
}

export interface GenerateBililiuReplyResult {
  reply: string;
  success: boolean;
  error?: string;
}

// Respostas dinâmicas e engraçadas de fallback caso a chave não esteja configurada na Vercel
const BILILIU_NATURAL_FALLBACKS = [
  "Uai, sô! 😂 Cê tá falando sério? Aqui na roça o café tá no fogo, o trator tá roncando e a prosa tá boa demais! Manda outro trem aí que nóis responde!",
  "Rapaz, cê tocou num ponto bão demais da conta! 😂 O Bililiu tava aqui agora mesmo olhando a plantação e pensando exatamente nesse trem aí. O que mais cê manda?",
  "Nó, compadre! Essa aí foi na mosca 😂 Na lida da fazenda todo dia tem um causo desse jeito. Bão demais prosear com ocê!",
  "Ô trem bão! 😂 Cê chegou com a prosa afiada! Aqui no interior de Minas nóis resolve qualquer parada no café e na risada. Fala mais!",
  "Vixe maria, cê falou tudo! 😂 Aqui na roça a internet oscila às vezes quando a chuva arma, mas o Bililiu não perde uma resenha. Continua!",
];

function getRandomFallback(): string {
  const index = Math.floor(Math.random() * BILILIU_NATURAL_FALLBACKS.length);
  return BILILIU_NATURAL_FALLBACKS[index];
}

/**
 * Gera uma resposta do Bililiu mantendo a persona mineira e respeitando limites de tokens.
 */
export async function generateBililiuReply({
  message,
  history = [],
}: GenerateBililiuReplyParams): Promise<GenerateBililiuReplyResult> {
  const trimmedMessage = (message || "").trim();
  if (!trimmedMessage) {
    return {
      success: false,
      reply: "Uai, cê mandou uma mensagem em branco, sô! Escreve aí pro Bililiu prosear contigo 😂",
    };
  }

  if (trimmedMessage.length > bililiuConfig.limits.maxMessageLength) {
    return {
      success: false,
      reply: `Ô trem! A mensagem ficou comprida demais da conta (${trimmedMessage.length} letras). Manda em pedacinho menor pro Bililiu ler ligeiro! 😂`,
    };
  }

  // Busca a chave em todas as variáveis possíveis
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.AI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    "";

  // Se a chave estiver ausente na Vercel, responde com 100% de naturalidade da persona (sem notas técnicas!)
  if (!apiKey) {
    console.warn("Aviso: Chave Gemini não encontrada no ambiente. Respondendo com fallback natural do Bililiu.");
    return {
      success: true,
      reply: getRandomFallback(),
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Limita o histórico aos últimos N itens para economizar tokens
    const recentHistory = history.slice(-bililiuConfig.limits.maxHistoryMessages);

    const contents = [
      ...recentHistory.map((item) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }],
      })),
      {
        role: "user",
        parts: [{ text: trimmedMessage }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: bililiuConfig.systemPrompt,
        temperature: 0.85,
        topP: 0.95,
      },
    });

    const replyText = response.text || bililiuConfig.phrases.error;

    return {
      success: true,
      reply: replyText.trim(),
    };
  } catch (error: any) {
    console.error("Erro ao chamar a API do Bililiu:", error);
    // Em caso de falha transitória na API, responde com naturalidade da persona sem expor erros técnicos
    return {
      success: true,
      reply: getRandomFallback(),
    };
  }
}
