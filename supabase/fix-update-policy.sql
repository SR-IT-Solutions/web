-- UPDATE affects zero rows for signed-in admins because the update policy is
-- missing. PostgREST still answers 204, so the admin panel's "Save" appears
-- to work while changing nothing.
--
-- An UPDATE policy needs BOTH clauses:
--   using       -> which existing rows may be updated
--   with check  -> what the row is allowed to look like afterwards

drop policy if exists "authenticated update" on public.products;

create policy "authenticated update"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

-- Show every policy on the table so nothing else is silently absent.
select policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename = 'products'
order by cmd;
