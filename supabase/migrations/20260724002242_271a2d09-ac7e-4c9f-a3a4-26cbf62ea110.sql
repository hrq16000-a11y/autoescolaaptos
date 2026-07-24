
ALTER TABLE public.marketing_optin
  ADD COLUMN IF NOT EXISTS origem_url TEXT;

CREATE INDEX IF NOT EXISTS idx_marketing_optin_campaign_source
  ON public.marketing_optin (campaign_source);
CREATE INDEX IF NOT EXISTS idx_marketing_optin_created_at
  ON public.marketing_optin (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_marketing_optin_status
  ON public.marketing_optin (status);

CREATE OR REPLACE FUNCTION public.submit_marketing_optin(payload jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_tel_raw TEXT := payload->>'telefone';
  v_tel_norm TEXT := regexp_replace(coalesce(v_tel_raw,''), '\D', '', 'g');
  v_ip TEXT := nullif(trim(coalesce(payload->>'ip','')), '');
  v_ua TEXT := nullif(trim(coalesce(payload->>'user_agent','')), '');
  v_campaign TEXT := nullif(trim(coalesce(payload->>'campaign_source','')), '');
  v_origem_url TEXT := nullif(trim(coalesce(payload->>'origem_url','')), '');
  v_template TEXT := nullif(trim(coalesce(payload->>'ultimo_template_enviado','')), '');
  v_lgpd BOOLEAN := COALESCE((payload->>'lgpd_aceite')::BOOLEAN, false);
  v_existing UUID;
  v_id UUID;
BEGIN
  IF NOT v_lgpd THEN
    RAISE EXCEPTION 'LGPD_REQUIRED';
  END IF;

  IF length(v_tel_norm) < 10 OR length(v_tel_norm) > 13 THEN
    RAISE EXCEPTION 'INVALID_PHONE';
  END IF;

  IF v_campaign IS NOT NULL AND length(v_campaign) > 120 THEN
    RAISE EXCEPTION 'INVALID_CAMPAIGN';
  END IF;
  IF v_origem_url IS NOT NULL AND length(v_origem_url) > 500 THEN
    v_origem_url := left(v_origem_url, 500);
  END IF;
  IF v_ua IS NOT NULL AND length(v_ua) > 500 THEN
    v_ua := left(v_ua, 500);
  END IF;
  IF v_template IS NOT NULL AND length(v_template) > 120 THEN
    RAISE EXCEPTION 'INVALID_TEMPLATE';
  END IF;

  SELECT id INTO v_existing FROM public.marketing_optin
    WHERE regexp_replace(telefone, '\D', '', 'g') = v_tel_norm
    LIMIT 1;

  IF v_existing IS NOT NULL THEN
    RETURN jsonb_build_object('ok', false, 'duplicate', true, 'id', v_existing);
  END IF;

  INSERT INTO public.marketing_optin (
    telefone, origem, tipo, status, campaign_source, ip, user_agent,
    origem_url, ultimo_template_enviado, data_aceite
  ) VALUES (
    v_tel_norm, 'whatsapp', 'remarketing', 'autorizado', v_campaign, v_ip, v_ua,
    v_origem_url, v_template, now()
  ) RETURNING id INTO v_id;

  RETURN jsonb_build_object('ok', true, 'id', v_id);
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.submit_marketing_optin(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_marketing_optin(jsonb) TO service_role;
