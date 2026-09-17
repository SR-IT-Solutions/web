-- Adds created_at to products so the admin panel can list previously
-- uploaded images newest-first.
--
-- Existing rows all get the same backfill timestamp: the real upload times
-- were never recorded, so they sort as one batch. Rows created from now on
-- sort correctly.
--
-- Run the WHOLE file in Supabase -> SQL Editor.

alter table public.products
  add column if not exists created_at timestamptz not null default now();

create index if not exists products_created_at_idx
  on public.products (created_at desc);

-- Confirm:
select column_name, data_type, column_default
  from information_schema.columns
 where table_schema = 'public'
   and table_name = 'products'
   and column_name = 'created_at';
