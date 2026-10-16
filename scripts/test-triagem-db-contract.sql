-- Rodada 18 — executable contract of the actual versioned PostgreSQL RPC.
-- This runs ONLY in a fresh GitHub Actions PostgreSQL service. Never point
-- PGHOST/PGDATABASE at production. All input values are synthetic.
\set ON_ERROR_STOP on
CREATE ROLE anon NOLOGIN;
CREATE ROLE authenticated NOLOGIN;
CREATE ROLE service_role NOLOGIN BYPASSRLS;

-- Reapply the historical migrations required to instantiate the same table,
-- IP/rate limit, funnel status, deduplication and RPC privilege boundaries.
\i supabase/migrations/20260708000657_c5a3239f-eae9-4ce9-83f4-f684cc8ae93f.sql
\i supabase/migrations/20260708000706_f96c04c7-1bd9-40f9-8bcf-2c71d0299801.sql
\i supabase/migrations/20260708001119_06803168-3925-4950-b549-7a310215c2cd.sql
\i supabase/migrations/20260708002441_7c3744e1-c41b-42ed-a4ee-8b1045b44f19.sql
\i supabase/migrations/20260708003426_481b4227-40d4-426a-8112-a9a7cbadd5f0.sql
-- The same security migration also hardens has_role(app_role), which is
-- unrelated to this isolated RPC fixture. Apply its two triage statements
-- verbatim instead of fabricating the application's auth enum.
REVOKE ALL ON FUNCTION public.submit_triagem(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_triagem(jsonb) TO service_role;

BEGIN;
DO $contract$
DECLARE
  base jsonb := jsonb_build_object(
    'nome','Pessoa Ficticia de Teste',
    'telefone','(41) 90000-0001',
    'email','aluno1@example.invalid',
    'lgpd_aceite',true,
    'tempo_gasto_segundos',10,
    'origem','1contato'
  );
  answer jsonb;
  original uuid;
  another uuid;
  n integer;
  i integer;
BEGIN
  IF has_function_privilege('anon', 'public.submit_triagem(jsonb)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.submit_triagem(jsonb)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.submit_triagem(jsonb)', 'EXECUTE') THEN
    RAISE EXCEPTION 'RPC EXECUTE roles do not match expected security boundary';
  END IF;
  RAISE NOTICE 'PASS RPC execute privileges';

  answer := public.submit_triagem(base || '{"honeypot":"trap"}'::jsonb);
  IF answer->>'ok' <> 'true' OR answer->>'skipped' <> 'true' OR answer ? 'id' THEN
    RAISE EXCEPTION 'Honeypot receipt is incorrect: %', answer;
  END IF;
  SELECT count(*) INTO n FROM public.triagem_leads;
  IF n <> 0 THEN RAISE EXCEPTION 'Honeypot persisted a row'; END IF;
  RAISE NOTICE 'PASS honeypot discards without ID';

  BEGIN
    PERFORM public.submit_triagem(base || '{"lgpd_aceite":false}'::jsonb);
    RAISE EXCEPTION 'Consent guard failed';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'LGPD_REQUIRED' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.submit_triagem(base || '{"tempo_gasto_segundos":1}'::jsonb);
    RAISE EXCEPTION 'Minimum elapsed guard failed';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'TOO_FAST' THEN RAISE; END IF;
  END;
  BEGIN
    PERFORM public.submit_triagem(base || '{"nome":"X"}'::jsonb);
    RAISE EXCEPTION 'Name length guard failed';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'INVALID_NAME' THEN RAISE; END IF;
  END;
  SELECT count(*) INTO n FROM public.triagem_leads;
  IF n <> 0 THEN RAISE EXCEPTION 'Rejected request persisted a row'; END IF;
  RAISE NOTICE 'PASS LGPD, elapsed time, name validity and atomic rejection';

  answer := public.submit_triagem(base);
  IF answer->>'ok' <> 'true' OR answer->>'action' <> 'created' OR answer->>'id' IS NULL THEN
    RAISE EXCEPTION 'Creation receipt incorrect: %', answer;
  END IF;
  original := (answer->>'id')::uuid;
  SELECT count(*) INTO n FROM public.triagem_leads WHERE id=original AND lgpd_aceite=true;
  IF n <> 1 THEN RAISE EXCEPTION 'Creation receipt does not represent a saved row'; END IF;
  RAISE NOTICE 'PASS saved receipt and created action';

  answer := public.submit_triagem(base || jsonb_build_object(
    'telefone','41900000001', 'email','aluno2@example.invalid',
    'categoria','B'
  ));
  IF (answer->>'id')::uuid <> original OR answer->>'action' <> 'updated' THEN
    RAISE EXCEPTION 'Phone dedup failed: %', answer;
  END IF;
  SELECT count(*) INTO n FROM public.triagem_leads WHERE id=original AND categoria='B';
  IF n <> 1 THEN RAISE EXCEPTION 'Phone dedup did not update existing row'; END IF;
  RAISE NOTICE 'PASS phone normalization and update action';

  answer := public.submit_triagem(base || jsonb_build_object(
    'telefone','41988887777', 'email','ALUNO2@EXAMPLE.INVALID',
    'categoria','AB'
  ));
  IF (answer->>'id')::uuid <> original OR answer->>'action' <> 'updated' THEN
    RAISE EXCEPTION 'Case-insensitive email dedup failed: %', answer;
  END IF;
  SELECT count(*) INTO n FROM public.triagem_leads;
  IF n <> 1 THEN RAISE EXCEPTION 'Dedup created additional row'; END IF;
  RAISE NOTICE 'PASS email dedup ignoring case';

  UPDATE public.triagem_leads SET status_funil='won' WHERE id=original;
  answer := public.submit_triagem(base || jsonb_build_object(
    'telefone','41988887777', 'email','aluno2@example.invalid','prazo','imediato'
  ));
  SELECT count(*) INTO n FROM public.triagem_leads
    WHERE id=original AND status_funil='won' AND prazo='imediato';
  IF (answer->>'id')::uuid <> original OR n <> 1 THEN
    RAISE EXCEPTION 'Won funnel status was reset on update';
  END IF;
  RAISE NOTICE 'PASS preserve won status during dedup update';

  -- Old records are excluded from the 60-day matching window.
  UPDATE public.triagem_leads SET created_at=now()-interval '61 days' WHERE id=original;
  answer := public.submit_triagem(base || jsonb_build_object(
    'telefone','41988887777', 'email','aluno2@example.invalid'
  ));
  another := (answer->>'id')::uuid;
  IF another=original OR answer->>'action' <> 'created' THEN
    RAISE EXCEPTION '60-day dedup horizon failed: %', answer;
  END IF;
  RAISE NOTICE 'PASS 60-day boundary';

  -- Rate-limit counts 5 *distinct* recent rows from the same synthetic IP.
  FOR i IN 1..5 LOOP
    answer := public.submit_triagem(base || jsonb_build_object(
      'ip','192.0.2.55',
      'telefone','4199900'||lpad(i::text,4,'0'),
      'email','quota'||i::text||'@example.invalid'
    ));
    IF answer->>'action' <> 'created' THEN
      RAISE EXCEPTION 'Rate-limit setup deduplicated unexpectedly: %', answer;
    END IF;
  END LOOP;
  SELECT count(*) INTO n FROM public.triagem_leads WHERE ip='192.0.2.55';
  IF n<>5 THEN RAISE EXCEPTION 'Rate-limit setup expected 5 rows, got %', n; END IF;
  BEGIN
    PERFORM public.submit_triagem(base || jsonb_build_object(
      'ip','192.0.2.55','telefone','41999000006','email','quota6@example.invalid'
    ));
    RAISE EXCEPTION 'IP rate limit failed';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'RATE_LIMIT' THEN RAISE; END IF;
  END;
  SELECT count(*) INTO n FROM public.triagem_leads WHERE ip='192.0.2.55';
  IF n<>5 THEN RAISE EXCEPTION 'Rate-limit violation wrote a row'; END IF;
  RAISE NOTICE 'PASS five-per-ten-minute IP limit';

  -- The RPC is not proven concurrency-safe by these sequential assertions.
  RAISE NOTICE 'PASS isolated PostgreSQL RPC contract (sequential scenarios only)';
END
$contract$;
ROLLBACK;
