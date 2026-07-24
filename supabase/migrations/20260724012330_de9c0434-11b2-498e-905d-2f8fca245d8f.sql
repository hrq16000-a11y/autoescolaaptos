-- Enable extensions for scheduled worker
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Unschedule any prior version (idempotent)
DO $$
BEGIN
  PERFORM cron.unschedule(jobid) FROM cron.job WHERE jobname = 'optin-sync-worker-5min';
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Schedule sync worker every 5 minutes
SELECT cron.schedule(
  'optin-sync-worker-5min',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://jbvepseodqytqxxckgtu.supabase.co/functions/v1/optin-sync-worker?limit=200',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);