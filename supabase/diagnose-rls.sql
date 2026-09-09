-- Paste into Supabase -> SQL Editor and Run. Shows the real RLS state.

-- 1. Is RLS actually on? rls_enabled must be true.
select
  n.nspname  as schema,
  c.relname  as table,
  c.relrowsecurity  as rls_enabled,
  c.relforcerowsecurity as rls_forced
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where c.relname = 'products';

-- 2. Which policies exist, and for which command?
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'products'
order by cmd;

-- 3. Direct table grants can bypass the need for policies entirely.
--    `anon` should NOT have INSERT / UPDATE / DELETE here.
select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'products'
  and grantee in ('anon','authenticated','public')
order by grantee, privilege_type;
