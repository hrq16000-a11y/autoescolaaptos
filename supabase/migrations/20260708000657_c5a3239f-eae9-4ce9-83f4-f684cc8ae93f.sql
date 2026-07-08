
CREATE TABLE public.triagem_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT,
  telefone TEXT,
  email TEXT,
  experiencia TEXT,
  conhece_procedimento TEXT,
  servico TEXT,
  categoria TEXT,
  situacao TEXT,
  prazo TEXT,
  data_inicio DATE,
  aceita_whats BOOLEAN DEFAULT false,
  aceita_email BOOLEAN DEFAULT false,
  lgpd_aceite BOOLEAN NOT NULL DEFAULT false,
  origem TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  user_agent TEXT,
  device TEXT,
  tempo_gasto_segundos INTEGER,
  status TEXT NOT NULL DEFAULT 'Novo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.triagem_leads TO authenticated;
GRANT INSERT ON public.triagem_leads TO anon;
GRANT ALL ON public.triagem_leads TO service_role;

ALTER TABLE public.triagem_leads ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode enviar uma triagem (formulário público)
CREATE POLICY "Anyone can submit triagem"
  ON public.triagem_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Leitura/edição/exclusão bloqueadas para clientes; só service_role acessa (bypassa RLS)
CREATE POLICY "No public read"
  ON public.triagem_leads
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_triagem_leads_updated_at
  BEFORE UPDATE ON public.triagem_leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_triagem_leads_created_at ON public.triagem_leads(created_at DESC);
CREATE INDEX idx_triagem_leads_status ON public.triagem_leads(status);
