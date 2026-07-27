
CREATE TABLE IF NOT EXISTS public.alert_config (
  id INT PRIMARY KEY DEFAULT 1,
  alert_queue_threshold INT NOT NULL DEFAULT 25,
  email_enabled BOOLEAN NOT NULL DEFAULT true,
  slack_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT alert_config_singleton CHECK (id = 1)
);

GRANT ALL ON public.alert_config TO service_role;

ALTER TABLE public.alert_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_only_alert_config" ON public.alert_config
  FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO public.alert_config (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.marketing_optin_sync_attempts
  ALTER COLUMN optin_id DROP NOT NULL;
