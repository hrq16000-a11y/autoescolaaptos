
ALTER TABLE public.triagem_leads ADD COLUMN IF NOT EXISTS ip TEXT;
CREATE INDEX IF NOT EXISTS idx_triagem_leads_ip_created ON public.triagem_leads(ip, created_at DESC);

CREATE OR REPLACE FUNCTION public.submit_triagem(payload JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ip TEXT := payload->>'ip';
  v_nome TEXT := payload->>'nome';
  v_hp TEXT := payload->>'honeypot';
  v_elapsed INT := COALESCE((payload->>'tempo_gasto_segundos')::INT, 0);
  v_recent INT;
  v_id UUID;
BEGIN
  -- honeypot: se preenchido, aceita silenciosamente e descarta
  IF v_hp IS NOT NULL AND length(v_hp) > 0 THEN
    RETURN jsonb_build_object('ok', true, 'skipped', true);
  END IF;

  -- LGPD obrigatório
  IF (payload->>'lgpd_aceite') IS DISTINCT FROM 'true' THEN
    RAISE EXCEPTION 'LGPD_REQUIRED';
  END IF;

  -- tempo mínimo (bots costumam enviar em <2s)
  IF v_elapsed < 2 THEN
    RAISE EXCEPTION 'TOO_FAST';
  END IF;

  -- validações mínimas
  IF v_nome IS NULL OR length(trim(v_nome)) < 5 OR length(v_nome) > 120 THEN
    RAISE EXCEPTION 'INVALID_NAME';
  END IF;

  -- rate limit por IP: máx 5 envios em 10 min
  IF v_ip IS NOT NULL THEN
    SELECT COUNT(*) INTO v_recent
      FROM public.triagem_leads
     WHERE ip = v_ip AND created_at > now() - interval '10 minutes';
    IF v_recent >= 5 THEN
      RAISE EXCEPTION 'RATE_LIMIT';
    END IF;
  END IF;

  INSERT INTO public.triagem_leads (
    nome, telefone, email, experiencia, conhece_procedimento, servico,
    categoria, prazo, aceita_whats, aceita_email, lgpd_aceite,
    origem, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    referrer, user_agent, device, tempo_gasto_segundos, ip, status
  ) VALUES (
    v_nome,
    payload->>'telefone',
    payload->>'email',
    payload->>'experiencia',
    payload->>'conhece_procedimento',
    payload->>'servico',
    payload->>'categoria',
    payload->>'prazo',
    COALESCE((payload->>'aceita_whats')::BOOLEAN, true),
    COALESCE((payload->>'aceita_email')::BOOLEAN, false),
    true,
    COALESCE(payload->>'origem', '1contato'),
    payload->>'utm_source',
    payload->>'utm_medium',
    payload->>'utm_campaign',
    payload->>'utm_term',
    payload->>'utm_content',
    payload->>'referrer',
    payload->>'user_agent',
    payload->>'device',
    v_elapsed,
    v_ip,
    'Novo'
  ) RETURNING id INTO v_id;

  RETURN jsonb_build_object('ok', true, 'id', v_id);
END;
$$;

REVOKE ALL ON FUNCTION public.submit_triagem(JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_triagem(JSONB) TO service_role;
