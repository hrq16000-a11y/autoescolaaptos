\set ON_ERROR_STOP on
-- Disposable local PostgreSQL 16 only. DO NOT use production credentials.
BEGIN;
CREATE TABLE public.triagem_leads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 nome text, telefone text, email text, experiencia text,
 conhece_procedimento text, servico text, categoria text, prazo text,
 aceita_whats boolean, aceita_email boolean, lgpd_aceite boolean,
 origem text, utm_source text, utm_medium text, utm_campaign text,
 utm_term text, utm_content text, referrer text, user_agent text,
 device text, tempo_gasto_segundos integer, ip text, status text,
 status_funil text DEFAULT 'new',
 created_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now()
);
\ir ../supabase/migrations/20260708003426_481b4227-40d4-426a-8112-a9a7cbadd5f0.sql

DO $check$
DECLARE
 base jsonb := jsonb_build_object(
  'nome','Pessoa de Teste APTOS', 'telefone','00000000001',
  'lgpd_aceite',true,'tempo_gasto_segundos',15,
  'ip','192.0.2.10','servico','Renovação de CNH','origem','1contato'
 );
 answer jsonb;
 receipt_id uuid;
 n int;
 i int;
 current_status text;
BEGIN
 answer := public.submit_triagem(base || '{"honeypot":"robot"}'::jsonb);
 IF answer->>'ok' <> 'true' OR answer->>'skipped' <> 'true' OR answer ? 'id'
 THEN RAISE EXCEPTION 'Honeypot contract failed: %',answer; END IF;
 SELECT count(*) INTO n FROM public.triagem_leads;
 IF n <> 0 THEN RAISE EXCEPTION 'Honeypot persisted data'; END IF;

 BEGIN
  PERFORM public.submit_triagem(base || '{"lgpd_aceite":false}'::jsonb);
  RAISE EXCEPTION 'Expected LGPD_REQUIRED';
 EXCEPTION WHEN OTHERS THEN
  IF SQLERRM <> 'LGPD_REQUIRED' THEN RAISE EXCEPTION 'Consent guard: %',SQLERRM; END IF;
 END;
 BEGIN
  PERFORM public.submit_triagem(base || '{"tempo_gasto_segundos":1}'::jsonb);
  RAISE EXCEPTION 'Expected TOO_FAST';
 EXCEPTION WHEN OTHERS THEN
  IF SQLERRM <> 'TOO_FAST' THEN RAISE EXCEPTION 'Time guard: %',SQLERRM; END IF;
 END;
 BEGIN
  PERFORM public.submit_triagem(base || '{"nome":"abc"}'::jsonb);
  RAISE EXCEPTION 'Expected INVALID_NAME';
 EXCEPTION WHEN OTHERS THEN
  IF SQLERRM <> 'INVALID_NAME' THEN RAISE EXCEPTION 'Name guard: %',SQLERRM; END IF;
 END;
 SELECT count(*) INTO n FROM public.triagem_leads;
 IF n <> 0 THEN RAISE EXCEPTION 'Rejected requests persisted data'; END IF;

 answer := public.submit_triagem(base);
 IF answer->>'ok' <> 'true' OR answer->>'action' <> 'created' OR answer->>'id' IS NULL
 THEN RAISE EXCEPTION 'Creation contract failed: %',answer; END IF;
 receipt_id := (answer->>'id')::uuid;
 SELECT count(*) INTO n FROM public.triagem_leads WHERE id=receipt_id;
 IF n <> 1 THEN RAISE EXCEPTION 'Receipt lacks persisted row'; END IF;

 UPDATE public.triagem_leads SET status_funil='won' WHERE id=receipt_id;
 answer := public.submit_triagem(base || '{"servico":"Inclusão de Categoria"}'::jsonb);
 IF answer->>'action' <> 'updated' OR (answer->>'id')::uuid <> receipt_id
 THEN RAISE EXCEPTION 'Deduplication failed: %',answer; END IF;
 SELECT status_funil INTO current_status FROM public.triagem_leads WHERE id=receipt_id;
 IF current_status <> 'won' THEN RAISE EXCEPTION 'Sales status reset'; END IF;
 SELECT count(*) INTO n FROM public.triagem_leads;
 IF n <> 1 THEN RAISE EXCEPTION 'Duplicate created second row'; END IF;

 FOR i IN 1..5 LOOP
  answer := public.submit_triagem(base || jsonb_build_object(
    'ip','192.0.2.20','telefone',lpad((200+i)::text,11,'0')));
  IF answer->>'action' <> 'created' THEN RAISE EXCEPTION 'Rate-limit setup failed: %',answer; END IF;
 END LOOP;
 BEGIN
  PERFORM public.submit_triagem(base || '{"ip":"192.0.2.20","telefone":"00000000206"}'::jsonb);
  RAISE EXCEPTION 'Expected RATE_LIMIT';
 EXCEPTION WHEN OTHERS THEN
  IF SQLERRM <> 'RATE_LIMIT' THEN RAISE EXCEPTION 'Rate guard: %',SQLERRM; END IF;
 END;
 SELECT count(*) INTO n FROM public.triagem_leads;
 IF n <> 6 THEN RAISE EXCEPTION 'Unexpected rows after rate limit: %',n; END IF;
 RAISE NOTICE 'PASS SQL RPC: honeypot, consent, time, name, receipt, dedupe, won status, rate limit';
END
$check$;
ROLLBACK;
