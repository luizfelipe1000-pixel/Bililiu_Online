/**
 * Utilitário de Conexão Neon PostgreSQL
 * 
 * Filosofia de Economia Extrema:
 * - NENHUMA mensagem de chat é enviada para o banco.
 * - Conexões são abertas apenas sob demanda, ideais para Vercel Serverless.
 * - Se DATABASE_URL não estiver configurado, a aplicação opera em modo 100% in-memory
 *   sem falhas ou bloqueios.
 */

export interface NeonStatus {
  connected: boolean;
  message: string;
}

export async function checkNeonHealth(): Promise<NeonStatus> {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!dbUrl) {
    return {
      connected: false,
      message: "DATABASE_URL não configurado. Modo economia total (in-memory) ativo.",
    };
  }

  try {
    // Verificação de URL segura
    const url = new URL(dbUrl);
    return {
      connected: true,
      message: `Neon configurado para o host: ${url.hostname}`,
    };
  } catch (error) {
    return {
      connected: false,
      message: "URL de banco inválida ou inacessível.",
    };
  }
}
