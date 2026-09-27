import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { generateBililiuReply } from "./src/services/ai/bililiuAiService.ts";
import { bililiuConfig } from "./src/config/bililiuConfig.ts";
import { checkNeonHealth } from "./src/db/neon.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === "production";

// Headers de Segurança e Proteção (OWASP / Hardening)
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

// Middleware para JSON com limite seguro de payload
app.use(express.json({ limit: "32kb" }));

// Rate limiter em memória super econômico e seguro contra DoS
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 25;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  record.count += 1;
  return true;
}

// Limpeza periódica do mapa de rate limit a cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 10 * 60 * 1000);

// Endpoint de Chat com a persona do Bililiu (100% isolado na memória, sem risco de injeção SQL)
app.post("/api/chat", async (req, res) => {
  const clientIp = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "anonymous";

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      reply: bililiuConfig.phrases.rateLimitReached,
      error: "Muitas requisições em pouco tempo. Espere um momento.",
    });
  }

  const { message, history } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({
      success: false,
      reply: "Uai, cê mandou uma mensagem inválida, sô!",
    });
  }

  // Sanitização rigorosa contra payloads abusivos
  const sanitizedMessage = message.trim().slice(0, bililiuConfig.limits.maxMessageLength);

  try {
    const result = await generateBililiuReply({
      message: sanitizedMessage,
      history: Array.isArray(history) ? history : [],
    });

    return res.json(result);
  } catch (error: any) {
    console.error("Erro seguro no /api/chat:", error?.message || error);
    return res.status(500).json({
      success: false,
      reply: bililiuConfig.phrases.error,
    });
  }
});

// Endpoint seguro de verificação de status e saúde
app.get("/api/health", async (_req, res) => {
  const neonStatus = await checkNeonHealth();
  res.json({
    status: "ok",
    app: "Converse com Bililiu",
    author: "Frisquila",
    neon: neonStatus,
    timestamp: new Date().toISOString(),
  });
});

// Rota para metadados públicos
app.get("/api/config", (_req, res) => {
  res.json({
    name: bililiuConfig.name,
    subtitle: bililiuConfig.subtitle,
    avatarUrl: bililiuConfig.avatarUrl,
    initialGreeting: bililiuConfig.initialGreeting,
    suggestedQuestions: bililiuConfig.suggestedQuestions,
    socialLinks: bililiuConfig.socialLinks,
    limits: bililiuConfig.limits,
  });
});

// Inicialização do Vite ou Arquivos Estáticos
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 [Bililiu Server] Rodando na porta ${PORT} (Ambiente: ${isProduction ? "Produção" : "Desenvolvimento"})`);
  });
}

startServer().catch((err) => {
  console.error("Falha ao iniciar o servidor do Bililiu:", err);
  process.exit(1);
});
