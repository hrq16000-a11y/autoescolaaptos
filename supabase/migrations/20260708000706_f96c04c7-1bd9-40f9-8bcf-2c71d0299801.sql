
DROP POLICY IF EXISTS "Anyone can submit triagem" ON public.triagem_leads;

CREATE POLICY "Public can submit triagem with LGPD consent"
  ON public.triagem_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    lgpd_aceite = true
    AND (nome IS NULL OR char_length(nome) <= 120)
    AND (email IS NULL OR char_length(email) <= 200)
    AND (telefone IS NULL OR char_length(telefone) <= 40)
  );
