import type { IncomingMessage, ServerResponse } from "http";
import { generateBililiuReply } from "../src/services/ai/bililiuAiService.ts";
import { bililiuConfig } from "../src/config/bililiuConfig.ts";

export default async function handler(req: any, res: any) {
  // CORS & Methods
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      success: false,
      reply: "Uai, cê mandou uma mensagem inválida, sô!",
    });
  }

  const sanitizedMessage = message.trim().slice(0, bililiuConfig.limits.maxMessageLength);

  try {
    const result = await generateBililiuReply({
      message: sanitizedMessage,
      history: Array.isArray(history) ? history : [],
    });

    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Erro no Vercel Handler:", error);
    return res.status(500).json({
      success: false,
      reply: bililiuConfig.phrases.error,
    });
  }
}
