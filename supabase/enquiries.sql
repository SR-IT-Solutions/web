-- ============================================================
-- enquiries: walk-in / phone / WhatsApp customer enquiries
--
-- Admin-only. Unlike `products`, nothing here is public: these are
-- customer names and phone numbers, so `anon` gets no access at all.
--
-- Run the WHOLE file in Supabase -> SQL Editor.
-- ============================================================

create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  item        text,
  status      text not null default 'new',
  source      text not null default 'walk-in',
  note        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint enquiries_status_check
    check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  constraint enquiries_source_check
    check (source in ('walk-in', 'phone', 'whatsapp', 'other'))
);

create index if not exists enquiries_created_at_idx
  on public.enquiries (created_at desc);

create index if not exists enquiries_status_idx
  on public.enquiries (status);

-- Keep updated_at honest without relying on the client to send it.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enquiries_set_updated_at on public.enquiries;

create trigger enquiries_set_updated_at
  before update on public.enquiries
  for each row execute function public.set_updated_at();

-- ---- RLS ---------------------------------------------------
alter table public.enquiries enable row level security;
alter table public.enquiries force row level security;

drop policy if exists "authenticated read"   on public.enquiries;
drop policy if exists "authenticated insert" on public.enquiries;
drop policy if exists "authenticated update" on public.enquiries;
drop policy if exists "authenticated delete" on public.enquiries;

create policy "authenticated read"
  on public.enquiries for select
  to authenticated
  using (true);

create policy "authenticated insert"
  on public.enquiries for insert
  to authenticated
  with check (true);

create policy "authenticated update"
  on public.enquiries for update
  to authenticated
  using (true)
  with check (true);

create policy "authenticated delete"
  on public.enquiries for delete
  to authenticated
  using (true);

-- ---- Grants ------------------------------------------------
-- anon must not touch this table: it holds customer contact details
-- and the publishable key ships in the storefront bundle.
revoke all on public.enquiries from anon;
grant select, insert, update, delete on public.enquiries to authenticated;

-- Confirm what exists:
select policyname, cmd, roles
from pg_policies
where schemaname = 'public' and tablename = 'enquiries'
order by cmd;
