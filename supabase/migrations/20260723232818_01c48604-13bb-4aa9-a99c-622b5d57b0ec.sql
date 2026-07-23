
CREATE TABLE public.marketing_optin (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telefone TEXT NOT NULL UNIQUE,
  origem TEXT NOT NULL DEFAULT 'whatsapp',
  tipo TEXT NOT NULL DEFAULT 'remarketing',
  status TEXT NOT NULL DEFAULT 'autorizado',
  campaign_source TEXT,
  data_cadastro TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data_aceite TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip TEXT,
  user_agent TEXT,
  ultimo_template_enviado TEXT,
  ultima_campanha TEXT,
  quantidade_campanhas INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE, DELETE ON public.marketing_optin TO authenticated;
GRANT ALL ON public.marketing_optin TO service_role;

ALTER TABLE public.marketing_optin ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read optin" ON public.marketing_optin
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update optin" ON public.marketing_optin
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete optin" ON public.marketing_optin
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "No public read optin" ON public.marketing_optin
  FOR SELECT TO anon, authenticated USING (false);

CREATE TRIGGER update_marketing_optin_updated_at
  BEFORE UPDATE ON public.marketing_optin
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.submit_marketing_optin(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_tel_raw TEXT := payload->>'telefone';
  v_tel_norm TEXT := regexp_replace(coalesce(v_tel_raw,''), '\D', '', 'g');
  v_ip TEXT := payload->>'ip';
  v_ua TEXT := payload->>'user_agent';
  v_campaign TEXT := payload->>'campaign_source';
  v_existing UUID;
  v_id UUID;
BEGIN
  IF length(v_tel_norm) < 10 OR length(v_tel_norm) > 13 THEN
    RAISE EXCEPTION 'INVALID_PHONE';
  END IF;

  SELECT id INTO v_existing FROM public.marketing_optin
    WHERE regexp_replace(telefone, '\D', '', 'g') = v_tel_norm
    LIMIT 1;

  IF v_existing IS NOT NULL THEN
    RETURN jsonb_build_object('ok', false, 'duplicate', true);
  END IF;

  INSERT INTO public.marketing_optin (
    telefone, origem, tipo, status, campaign_source, ip, user_agent
  ) VALUES (
    v_tel_norm, 'whatsapp', 'remarketing', 'autorizado', v_campaign, v_ip, v_ua
  ) RETURNING id INTO v_id;

  RETURN jsonb_build_object('ok', true, 'id', v_id);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.submit_marketing_optin(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_marketing_optin(jsonb) TO service_role;
