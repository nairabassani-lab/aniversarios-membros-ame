-- Corrige as políticas RLS para permitir acesso anônimo (anon) em escrita.
-- Execute este script no SQL Editor do Supabase.

-- Remove as políticas antigas que só permitiam 'authenticated'
DROP POLICY IF EXISTS "Inserir autenticado" ON aniversariantes;
DROP POLICY IF EXISTS "Atualizar autenticado" ON aniversariantes;
DROP POLICY IF EXISTS "Excluir autenticado" ON aniversariantes;

-- Cria novas políticas permitindo anon e authenticated
CREATE POLICY "Inserir publico"
  ON aniversariantes FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Atualizar publico"
  ON aniversariantes FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Excluir publico"
  ON aniversariantes FOR DELETE
  TO anon, authenticated
  USING (true);
