CREATE TABLE public.campaign_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign TEXT NOT NULL CHECK (campaign ~ '^[a-z0-9_\-]{2,80}$'),
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'whatsapp_click')),
  source TEXT,
  page_path TEXT NOT NULL,
  anon_id TEXT,
  device TEXT CHECK (device IS NULL OR device IN ('mobile', 'tablet', 'desktop')),
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.campaign_events TO service_role;

ALTER TABLE public.campaign_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_campaign_events_campaign_created
  ON public.campaign_events (campaign, created_at DESC);
CREATE INDEX idx_campaign_events_type_created
  ON public.campaign_events (event_type, created_at DESC);