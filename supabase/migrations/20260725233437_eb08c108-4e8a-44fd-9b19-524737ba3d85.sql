
ALTER TABLE public.marketing_optin
  ADD COLUMN IF NOT EXISTS sheet_updated_range TEXT;

CREATE TABLE IF NOT EXISTS public.marketing_optin_sync_attempts (
  id BIGSERIAL PRIMARY KEY,
  optin_id UUID NOT NULL REFERENCES public.marketing_optin(id) ON DELETE CASCADE,
  telefone TEXT NOT NULL,
  attempted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ok BOOLEAN NOT NULL,
  http_status INT,
  error TEXT,
  updated_range TEXT,
  source TEXT
);

CREATE INDEX IF NOT EXISTS idx_moa_optin ON public.marketing_optin_sync_attempts(optin_id, attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_moa_tel ON public.marketing_optin_sync_attempts(telefone, attempted_at DESC);

GRANT ALL ON public.marketing_optin_sync_attempts TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.marketing_optin_sync_attempts_id_seq TO service_role;

ALTER TABLE public.marketing_optin_sync_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_only_moa" ON public.marketing_optin_sync_attempts
  FOR ALL TO service_role USING (true) WITH CHECK (true);
