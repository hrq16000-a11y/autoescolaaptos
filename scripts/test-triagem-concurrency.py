#!/usr/bin/env python3
"""Only runs against ephemeral local aptos_ci PostgreSQL in GitHub Actions."""
import concurrent.futures
import json
import os
import subprocess
import sys

if not (os.getenv("APTOS_ISOLATED_DB_TEST") == "1"
        and os.getenv("PGDATABASE") == "aptos_ci"
        and os.getenv("PGHOST") in ("127.0.0.1", "localhost")):
    raise SystemExit("Refusing to run outside the isolated aptos_ci database")

def query(sql):
    done = subprocess.run(
        ["psql", "-X", "-A", "-t", "-v", "ON_ERROR_STOP=1", "-c", sql],
        capture_output=True, text=True, timeout=35, check=False
    )
    return done.returncode, done.stdout.strip(), done.stderr.strip()

def require(sql):
    code, out, err = query(sql)
    if code:
        raise AssertionError("SQL execution failed: " + err[-450:])
    return out

def payload(phone, email, ip, index):
    return {
        "nome": "Pessoa Ficticia " + str(index),
        "telefone": phone, "email": email, "ip": ip,
        "lgpd_aceite": True, "tempo_gasto_segundos": 12,
        "origem": "teste_concorrencia_descartavel",
    }

def submit(item):
    body = json.dumps(item, separators=(",", ":")).replace("'", "''")
    code, out, err = query("SELECT public.submit_triagem('" + body + "'::jsonb)::text")
    if code:
        return {"error": err}
    try:
        return json.loads(out)
    except Exception as e:
        raise AssertionError("Invalid RPC receipt: " + repr(out)) from e

def concurrent(items):
    with concurrent.futures.ThreadPoolExecutor(max_workers=len(items)) as pool:
        futures = [pool.submit(submit, item) for item in items]
        return [future.result(timeout=35) for future in futures]

# The delay occurs after the RPC has searched for duplicates. With the old
# unlocked implementation two requests both read "not found" and insert.
require("""
CREATE OR REPLACE FUNCTION pg_temp.delayed_insert() RETURNS trigger
LANGUAGE plpgsql AS $$ BEGIN PERFORM pg_sleep(0.7); RETURN NEW; END $$;
""".replace("pg_temp.delayed_insert", "public.r19_delayed_insert"))
require("""
CREATE TRIGGER r19_delay_before_insert
BEFORE INSERT ON public.triagem_leads
FOR EACH ROW EXECUTE FUNCTION public.r19_delayed_insert();
""")

try:
    phone = concurrent([
        payload("(41) 99991-1111", "p1@example.invalid", "192.0.2.1", 1),
        payload("41999911111", "p2@example.invalid", "192.0.2.2", 2),
    ])
    ids = {v.get("id") for v in phone}
    assert len(ids) == 1 and None not in ids, "Concurrent phone dedupe failed: " + repr(phone)
    assert sorted(v.get("action") for v in phone) == ["created", "updated"], repr(phone)
    assert require("SELECT count(*) FROM public.triagem_leads WHERE regexp_replace(telefone, '\\D','','g')='41999911111'") == "1"
    print("PASS concurrent normalized phone deduplication", flush=True)

    email = concurrent([
        payload("41988881111", "e1@example.invalid", "192.0.2.3", 3),
        payload("41988882222", "E1@EXAMPLE.INVALID", "192.0.2.4", 4),
    ])
    ids = {v.get("id") for v in email}
    assert len(ids) == 1 and None not in ids, "Concurrent email dedupe failed: " + repr(email)
    assert sorted(v.get("action") for v in email) == ["created", "updated"], repr(email)
    assert require("SELECT count(*) FROM public.triagem_leads WHERE lower(trim(email))='e1@example.invalid'") == "1"
    print("PASS concurrent case-insensitive email deduplication", flush=True)

    ip = "198.51.100.19"
    quota = concurrent([
        payload("4197777" + str(i).zfill(4), "limit" + str(i) + "@example.invalid", ip, i+10)
        for i in range(6)
    ])
    created = [v for v in quota if v.get("action") == "created" and v.get("id")]
    blocked = [v for v in quota if "RATE_LIMIT" in v.get("error", "")]
    assert len(created) == 5 and len(blocked) == 1, "Concurrent IP limit failed: " + repr(quota)
    assert require("SELECT count(*) FROM public.triagem_leads WHERE ip='198.51.100.19'") == "5"
    print("PASS concurrent IP limit five of six accepted", flush=True)
finally:
    require("DROP TRIGGER IF EXISTS r19_delay_before_insert ON public.triagem_leads")
    require("DROP FUNCTION IF EXISTS public.r19_delayed_insert()")
