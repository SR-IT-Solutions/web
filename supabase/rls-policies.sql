-- ============================================================
-- products: public reads, authenticated writes
--
-- The storefront (web) ships a publishable key in its JS bundle, so `anon`
-- is fully public: SELECT only. The admin panel signs a user in, so its
-- writes arrive as `authenticated`.
--
-- Run the WHOLE file in Supabase -> SQL Editor.
-- ============================================================

alter table public.products enable row level security;

-- A table owner bypasses its own policies unless RLS is forced. Supabase's
-- API roles aren't the owner, but forcing it removes all doubt.
alter table public.products force row level security;

-- ---- Policies (re-runnable) --------------------------------
drop policy if exists "public read"          on public.products;
drop policy if exists "authenticated insert" on public.products;
drop policy if exists "authenticated update" on public.products;
drop policy if exists "authenticated delete" on public.products;

create policy "public read"
  on public.products for select
  to anon, authenticated
  using (true);

create policy "authenticated insert"
  on public.products for insert
  to authenticated
  with check (true);

create policy "authenticated update"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated delete"
  on public.products for delete
  to authenticated
  using (true);

-- ---- Grants ------------------------------------------------
-- Policies only filter privileges a role already has. Supabase grants ALL
-- to anon by default, so revoke the write privileges outright: belt and
-- braces alongside the policies above.
revoke insert, update, delete on public.products from anon;
grant  select                 on public.products to   anon;
grant  select, insert, update, delete on public.products to authenticated;
