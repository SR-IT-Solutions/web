do $$
declare
  processor_type regtype;
  storage_type regtype;
  gen text;
  tier text;
  size text;
begin
  select coalesce(nullif(t.typelem, 0), t.oid)::regtype into processor_type
  from pg_attribute a
  join pg_type t on t.oid = a.atttypid
  where a.attrelid = 'public.products'::regclass and a.attname = 'Supported Processors';

  select coalesce(nullif(t.typelem, 0), t.oid)::regtype into storage_type
  from pg_attribute a
  join pg_type t on t.oid = a.atttypid
  where a.attrelid = 'public.products'::regclass and a.attname = 'Supported Storage';

  foreach tier in array array['i3', 'i5', 'i7'] loop
    foreach gen in array array['5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th'] loop
      execute format('alter type %s add value if not exists %L', processor_type, format('Intel %s %s Gen', tier, gen));
    end loop;
  end loop;

  foreach size in array array['128GB', '256GB', '512GB', '1TB', '2TB', '4TB'] loop
    execute format('alter type %s add value if not exists %L', storage_type, size || ' NVMe SSD');
  end loop;

  raise notice 'Updated % and %', processor_type, storage_type;
end $$;

select 'processors' as kind, e.enumlabel
from pg_enum e
join pg_type t on t.oid = e.enumtypid
join pg_type col on col.oid = (select atttypid from pg_attribute where attrelid = 'public.products'::regclass and attname = 'Supported Processors')
where t.oid = coalesce(nullif(col.typelem, 0), col.oid)
union all
select 'storage', e.enumlabel
from pg_enum e
join pg_type t on t.oid = e.enumtypid
join pg_type col on col.oid = (select atttypid from pg_attribute where attrelid = 'public.products'::regclass and attname = 'Supported Storage')
where t.oid = coalesce(nullif(col.typelem, 0), col.oid);
