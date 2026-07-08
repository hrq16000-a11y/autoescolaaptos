
CREATE OR REPLACE FUNCTION public.submit_triagem(payload jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_ip TEXT := payload->>'ip';
  v_nome TEXT := payload->>'nome';
  v_tel  TEXT := payload->>'telefone';
  v_email TEXT := lower(nullif(trim(payload->>'email'), ''));
  v_tel_norm TEXT := regexp_replace(coalesce(v_tel,''), '\D', '', 'g');
  v_hp TEXT := payload->>'honeypot';
  v_elapsed INT := COALESCE((payload->>'tempo_gasto_segundos')::INT, 0);
  v_recent INT;
  v_id UUID;
  v_existing_id UUID;
  v_existing_status TEXT;
  v_action TEXT := 'created';
BEGIN
  IF v_hp IS NOT NULL AND length(v_hp) > 0 THEN
    RETURN jsonb_build_object('ok', true, 'skipped', true);
  END IF;
  IF (payload->>'lgpd_aceite') IS DISTINCT FROM 'true' THEN
    RAISE EXCEPTION 'LGPD_REQUIRED';
  END IF;
  IF v_elapsed < 2 THEN
    RAISE EXCEPTION 'TOO_FAST';
  END IF;
  IF v_nome IS NULL OR length(trim(v_nome)) < 5 OR length(v_nome) > 120 THEN
    RAISE EXCEPTION 'INVALID_NAME';
  END IF;
  IF v_ip IS NOT NULL THEN
    SELECT COUNT(*) INTO v_recent
      FROM public.triagem_leads
     WHERE ip = v_ip AND created_at > now() - interval '10 minutes';
    IF v_recent >= 5 THEN
      RAISE EXCEPTION 'RATE_LIMIT';
    END IF;
  END IF;

  -- Dedupe: procura lead recente (60 dias) por telefone OU e-mail
  SELECT id, status_funil
    INTO v_existing_id, v_existing_status
    FROM public.triagem_leads
   WHERE created_at > now() - interval '60 days'
     AND (
       (length(v_tel_norm) >= 10 AND regexp_replace(coalesce(telefone,''), '\D', '', 'g') = v_tel_norm)
       OR (v_email IS NOT NULL AND lower(trim(email)) = v_email)
     )
   ORDER BY created_at DESC
   LIMIT 1;

  IF v_existing_id IS NOT NULL THEN
    UPDATE public.triagem_leads SET
      nome = v_nome,
      telefone = COALESCE(v_tel, telefone),
      email = COALESCE(payload->>'email', email),
      experiencia = COALESCE(payload->>'experiencia', experiencia),
      conhece_procedimento = COALESCE(payload->>'conhece_procedimento', conhece_procedimento),
      servico = COALESCE(payload->>'servico', servico),
      categoria = COALESCE(payload->>'categoria', categoria),
      prazo = COALESCE(payload->>'prazo', prazo),
      aceita_whats = COALESCE((payload->>'aceita_whats')::BOOLEAN, aceita_whats),
      aceita_email = COALESCE((payload->>'aceita_email')::BOOLEAN, aceita_email),
      utm_source   = COALESCE(payload->>'utm_source', utm_source),
      utm_medium   = COALESCE(payload->>'utm_medium', utm_medium),
      utm_campaign = COALESCE(payload->>'utm_campaign', utm_campaign),
      utm_term     = COALESCE(payload->>'utm_term', utm_term),
      utm_content  = COALESCE(payload->>'utm_content', utm_content),
      referrer     = COALESCE(payload->>'referrer', referrer),
      user_agent   = COALESCE(payload->>'user_agent', user_agent),
      device       = COALESCE(payload->>'device', device),
      tempo_gasto_segundos = GREATEST(COALESCE(tempo_gasto_segundos,0), v_elapsed),
      ip = COALESCE(v_ip, ip),
      -- só reseta status se ainda estivesse 'new'; preserva progresso do funil
      status_funil = CASE WHEN v_existing_status IN ('won','lost') THEN v_existing_status ELSE v_existing_status END,
      updated_at = now()
    WHERE id = v_existing_id;
    v_id := v_existing_id;
    v_action := 'updated';
  ELSE
    INSERT INTO public.triagem_leads (
      nome, telefone, email, experiencia, conhece_procedimento, servico,
      categoria, prazo, aceita_whats, aceita_email, lgpd_aceite,
      origem, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      referrer, user_agent, device, tempo_gasto_segundos, ip, status, status_funil
    ) VALUES (
      v_nome, v_tel, payload->>'email',
      payload->>'experiencia', payload->>'conhece_procedimento', payload->>'servico',
      payload->>'categoria', payload->>'prazo',
      COALESCE((payload->>'aceita_whats')::BOOLEAN, true),
      COALESCE((payload->>'aceita_email')::BOOLEAN, false),
      true,
      COALESCE(payload->>'origem', '1contato'),
      payload->>'utm_source', payload->>'utm_medium', payload->>'utm_campaign',
      payload->>'utm_term', payload->>'utm_content',
      payload->>'referrer', payload->>'user_agent', payload->>'device',
      v_elapsed, v_ip, 'Novo', 'new'
    ) RETURNING id INTO v_id;
  END IF;

  RETURN jsonb_build_object('ok', true, 'id', v_id, 'action', v_action);
END;
$function$;
