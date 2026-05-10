-- Run in Supabase SQL editor (or via CLI) so Platformers / Layouts tabs can filter server-side.
-- Main list continues to show every row; use category only for specialized tabs.

alter table public.cinematic_levels
  add column if not exists category text;

comment on column public.cinematic_levels.category is
  'Optional: platformer | layout (and future values). Null = listed on main rankings only.';

create index if not exists cinematic_levels_category_idx
  on public.cinematic_levels (category);

-- Featured creators grid
create table if not exists public.cinematic_creators (
  id bigint generated always as identity primary key,
  name text not null,
  avatar_url text,
  bio text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.cinematic_creators enable row level security;

create policy "Public read cinematic_creators"
  on public.cinematic_creators for select
  using (true);

-- Level packs (grouped experiences)
create table if not exists public.cinematic_level_packs (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  cover_url text,
  levels_count int default 0,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.cinematic_level_packs enable row level security;

create policy "Public read cinematic_level_packs"
  on public.cinematic_level_packs for select
  using (true);

grant usage on schema public to anon, authenticated;
grant select on public.cinematic_creators to anon, authenticated;
grant select on public.cinematic_level_packs to anon, authenticated;
