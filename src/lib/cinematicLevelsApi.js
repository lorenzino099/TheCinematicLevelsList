import { supabase } from './supabase';

const LEVELS_TABLE = 'cinematic_levels';

function isMissingCategoryColumn(error) {
  const msg = error?.message ?? '';
  return (
    error?.code === '42703' ||
    (msg.includes('category') && msg.includes('does not exist')) ||
    msg.includes('schema cache')
  );
}

/**
 * Fetches levels ordered by position.
 * When `category` is set, uses `.eq('category', category)` on the server.
 * If the `category` column is not migrated yet, falls back to a full list
 * and filters in memory so the UI still works after you add the column.
 */
export async function fetchCinematicLevels({ category = null } = {}) {
  if (!category) {
    const { data, error } = await supabase
      .from(LEVELS_TABLE)
      .select('*')
      .order('position', { ascending: true });
    if (error) {
      console.error('cinematic_levels fetch failed:', error);
      return [];
    }
    return data ?? [];
  }

  const filtered = await supabase
    .from(LEVELS_TABLE)
    .select('*')
    .eq('category', category)
    .order('position', { ascending: true });

  if (!filtered.error) {
    return filtered.data ?? [];
  }

  if (isMissingCategoryColumn(filtered.error)) {
    const { data, error } = await supabase
      .from(LEVELS_TABLE)
      .select('*')
      .order('position', { ascending: true });
    if (error) {
      console.error('cinematic_levels fallback fetch failed:', error);
      return [];
    }
    const rows = data ?? [];
    return rows.filter(
      (row) => (row.category ?? '').toLowerCase() === category.toLowerCase()
    );
  }

  console.error('cinematic_levels category fetch failed:', filtered.error);
  return [];
}
