-- The "authenticated delete" policy is missing, so DELETE silently affects
-- zero rows (PostgREST still returns 204). Re-create it, and re-assert the
-- grants in case only part of the earlier script was run.

drop policy if exists "authenticated delete" on public.products;

create policy "authenticated delete"
  on public.products for delete
  to authenticated
  using (true);

grant select, insert, update, delete on public.products to authenticated;

-- Confirm what now exists:
select policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename = 'products'
order by cmd;
