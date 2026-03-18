-- ============================================================
-- Schema para: Aniversariantes - A.M.E Luz das Nações
-- Banco de dados: Supabase (PostgreSQL)
-- ============================================================

-- Tabela principal de membros / aniversariantes
CREATE TABLE IF NOT EXISTS aniversariantes (
  id         BIGSERIAL       PRIMARY KEY,
  nome       TEXT            NOT NULL,
  dia        SMALLINT        NOT NULL CHECK (dia BETWEEN 1 AND 31),
  mes        SMALLINT        NOT NULL CHECK (mes BETWEEN 1 AND 12),
  endereco   TEXT,
  criado_em  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  atualizado_em TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Índice para buscas por mês (aniversariantes do mês)
CREATE INDEX IF NOT EXISTS idx_aniversariantes_mes ON aniversariantes (mes);

-- Índice para buscas por dia e mês (aniversariantes do dia)
CREATE INDEX IF NOT EXISTS idx_aniversariantes_dia_mes ON aniversariantes (dia, mes);

-- Trigger para atualizar automaticamente o campo atualizado_em
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualiza_timestamp
BEFORE UPDATE ON aniversariantes
FOR EACH ROW EXECUTE FUNCTION atualizar_timestamp();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE aniversariantes ENABLE ROW LEVEL SECURITY;

-- Leitura pública (qualquer usuário autenticado ou anônimo pode visualizar)
CREATE POLICY "Leitura publica"
  ON aniversariantes FOR SELECT
  USING (true);

-- Inserção pública (anon e autenticado)
CREATE POLICY "Inserir publico"
  ON aniversariantes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Atualização pública (anon e autenticado)
CREATE POLICY "Atualizar publico"
  ON aniversariantes FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Exclusão pública (anon e autenticado)
CREATE POLICY "Excluir publico"
  ON aniversariantes FOR DELETE
  TO anon, authenticated
  USING (true);

-- ============================================================
-- Dados iniciais (seed)
-- ============================================================
INSERT INTO aniversariantes (nome, dia, mes) VALUES
  ('Amélia Gomes',             4,  1),
  ('Fernanda Gomes',          15,  1),
  ('Janaína',                 19,  1),
  ('Humberto',                19,  1),
  ('Márcio',                  21,  1),
  ('Rodrigo',                 26,  1),
  ('Lilian',                  27,  1),
  ('Sofia',                   30,  1),
  ('Bernardo',                30,  1),
  ('Antonella Gonçalves',      7,  2),
  ('Tita',                    14,  2),
  ('Simone',                  18,  2),
  ('Cristiane Gonçalves',     19,  2),
  ('Davi Cipriano',           23,  2),
  ('Helena',                  26,  2),
  ('Luiza',                    1,  3),
  ('Valcir',                   3,  3),
  ('Sarti',                    9,  3),
  ('Vantuir',                 10,  3),
  ('Michele Cipriano',        10,  3),
  ('Ana',                     18,  3),
  ('Erika Gomes',             18,  3),
  ('Laura Barcelos',          20,  3),
  ('Gabriel',                 25,  3),
  ('Gisa',                    26,  3),
  ('Gabrieli',                 4,  4),
  ('Marli',                   12,  4),
  ('Kaliane',                 13,  4),
  ('Ceuza',                   16,  4),
  ('Wagner F. Dalla Lana',    22,  4),
  ('Dryelle David',           24,  4),
  ('Mayelle',                  5,  5),
  ('Lucas Dorneles',           7,  5),
  ('Danusa',                  13,  5),
  ('Daniel',                  20,  5),
  ('Airton',                  24,  5),
  ('Bruno',                   24,  5),
  ('Tiago',                   15,  6),
  ('Letícia Fernanda',        19,  6),
  ('Terezinha',               27,  6),
  ('Jessika Gomes',            6,  7),
  ('Lusardo Neves',            9,  7),
  ('Március',                 10,  7),
  ('Pedro Dutra',             12,  7),
  ('Naomi Gomes',             14,  7),
  ('Felipe',                  18,  7),
  ('Marcelo Uberti',          20,  7),
  ('Duda A',                   7,  8),
  ('Rodrigo',                 12,  8),
  ('Duda P',                  20,  8),
  ('Valnei',                  21,  8),
  ('Alice',                   24,  8),
  ('Gabriel Souza',           24,  8),
  ('Janine',                  30,  8),
  ('Paulo',                    3,  9),
  ('Grazi',                    9,  9),
  ('Mariane',                 14,  9),
  ('Luísa Neves',             20,  9),
  ('Natália',                 27,  9),
  ('Ísis Barreto',            27,  9),
  ('Andrieli',                28,  9),
  ('Vithor',                  28,  9),
  ('Eliane',                   2, 10),
  ('Patrícia',                15, 10),
  ('Adria Barreto',           17, 10),
  ('Fernanda Argenta',        22, 10),
  ('Naira',                   27, 10),
  ('Alcionir',                 4, 11),
  ('Franciele',                8, 11),
  ('Francisca',               15, 11),
  ('Jemima Vautero',          20, 11),
  ('Christyn',                25, 11),
  ('Carina Schwarke',         29, 11),
  ('Fernanda Barcelos',        3, 12),
  ('Márcia Rosângela Freitas', 9, 12),
  ('Matheus Lara',            11, 12),
  ('Grazi',                   15, 12),
  ('Pietro',                  17, 12),
  ('Fabiana Ramos',           21, 12);
