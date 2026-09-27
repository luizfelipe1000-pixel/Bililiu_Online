-- ====================================================================
-- Converse com Bililiu - Esquema Neon PostgreSQL (Econômico e Opcional)
-- ====================================================================
-- IMPORTANTE: Conforme os requisitos de privacidade e economia extrema:
-- 1. NENHUMA MENSAGEM OU CONVERSA É ARMAZENADA NO BANCO.
-- 2. As conversas vivem 100% na memória do navegador do usuário.
-- 3. O banco fica disponível para futuras extensões (ex: contador de prosas).
-- ====================================================================

-- Tabela opcional e ultraleve para métricas globais agregadas (sem dados pessoais)
CREATE TABLE IF NOT EXISTS bililiu_stats (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(50) UNIQUE NOT NULL,
    counter BIGINT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserção inicial de registro de métricas se não existir
INSERT INTO bililiu_stats (key_name, counter)
VALUES ('total_prosas_iniciadas', 1)
ON CONFLICT (key_name) DO NOTHING;
