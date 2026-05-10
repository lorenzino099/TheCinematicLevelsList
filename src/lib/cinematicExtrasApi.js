import { supabase } from './supabase';

const FALLBACK_CREATORS = [
  {
    id: 'demo-1',
    name: 'Featured Curator',
    avatar_url: null,
    bio: 'Connect the cinematic_creators table in Supabase to showcase real profiles here.',
  },
  {
    id: 'demo-2',
    name: 'Visual Director',
    avatar_url: null,
    bio: 'Run the migration in supabase/migrations to enable live creator bios and avatars.',
  },
];

const FALLBACK_PACKS = [
  {
    id: 'demo-pack-1',
    title: 'Anthology I',
    description: 'A curated run of levels that share one narrative arc—add rows to cinematic_level_packs to replace this.',
    cover_url: null,
    levels_count: 0,
  },
  {
    id: 'demo-pack-2',
    title: 'Director’s Cut',
    description: 'Grouped cinematic experiences: extended mixes, sequels, and companion levels in one place.',
    cover_url: null,
    levels_count: 0,
  },
];

function isMissingRelation(error) {
  const code = error?.code;
  const msg = error?.message ?? '';
  return (
    code === 'PGRST205' ||
    code === '42P01' ||
    msg.includes('Could not find the table') ||
    msg.includes('does not exist') ||
    msg.includes('schema cache')
  );
}

export async function fetchCreators() {
  const { data, error } = await supabase
    .from('cinematic_creators')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error && isMissingRelation(error)) {
    return FALLBACK_CREATORS;
  }
  if (error) {
    console.error('cinematic_creators:', error);
    return FALLBACK_CREATORS;
  }
  if (!data?.length) {
    return FALLBACK_CREATORS;
  }
  return data;
}

export async function fetchLevelPacks() {
  const { data, error } = await supabase
    .from('cinematic_level_packs')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error && isMissingRelation(error)) {
    return FALLBACK_PACKS;
  }
  if (error) {
    console.error('cinematic_level_packs:', error);
    return FALLBACK_PACKS;
  }
  if (!data?.length) {
    return FALLBACK_PACKS;
  }
  return data;
}
