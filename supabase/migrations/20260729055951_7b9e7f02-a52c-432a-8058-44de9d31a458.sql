CREATE TABLE public.alert_config_audit_log (
  id BIGSERIAL PRIMARY KEY,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor TEXT,
  source TEXT,
  ip TEXT,
  user_agent TEXT,
  old_values JSONB,
  new_values JSONB,
  changed_fields TEXT[]
);

GRANT ALL ON public.alert_config_audit_log TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.alert_config_audit_log_id_seq TO service_role;

ALTER TABLE public.alert_config_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_only_alert_audit" ON public.alert_config_audit_log
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX idx_alert_audit_changed_at ON public.alert_config_audit_log (changed_at DESC);