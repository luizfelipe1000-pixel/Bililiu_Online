import { GoogleGenAI } from "@google/genai";
import { bililiuConfig } from "../../config/bililiuConfig.js";

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

// Iniciação segura do cliente Google GenAI
const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || "";

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

/**
 * Gera uma resposta do Bililiu mantendo a persona mineira e respeitando limites de tokens.
 */
export async function generateBililiuReply({
  message,
  history = [],
}: GenerateBililiuReplyParams): Promise<GenerateBililiuReplyResult> {
  // Validação preventiva de tamanho da mensagem
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

  // Se não tiver chave configurada (ex: ambiente de teste inicial), dá uma resposta amigável de fallback
  if (!apiKey) {
    console.warn("Aviso: GEMINI_API_KEY não configurada no ambiente.");
    return {
      success: true,
      reply: `Uai, compadre! Recebi seu recado: "${trimmedMessage}". Aqui na roça tá tudo bão demais! (Nota técnica: configure a GEMINI_API_KEY no arquivo .env para a prosa com IA fluir 100% 😂)`,
    };
  }

  try {
    // Limita o histórico aos últimos N itens para economizar tokens
    const recentHistory = history.slice(-bililiuConfig.limits.maxHistoryMessages);

    // Mapeia para o formato de contents do SDK @google/genai
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
    console.error("Erro ao chamar o modelo Gemini do Bililiu:", error);
    return {
      success: false,
      reply: bililiuConfig.phrases.error,
      error: error?.message || "Erro desconhecido ao processar resposta",
    };
  }
}
