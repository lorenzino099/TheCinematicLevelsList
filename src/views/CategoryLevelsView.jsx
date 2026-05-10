import React from 'react';
import { Gamepad2, PenTool } from 'lucide-react';
import LevelCard from '../components/LevelCard';
import FloatingPagination from '../components/FloatingPagination';

const META = {
  platformers: {
    title: 'Cinematic Platformers',
    blurb: 'Levels where movement, camera, and set-pieces read like action choreography.',
    Icon: Gamepad2,
    accent: 'from-[rgb(var(--accent))] to-[rgb(var(--accent-2))]',
  },
  layouts: {
    title: 'Cinematic Layouts',
    blurb: 'High-quality layouts where composition, blocking, and pacing carry the story.',
    Icon: PenTool,
    accent: 'from-[rgb(var(--accent-2))] to-[rgb(var(--accent))]',
  },
};

const PER_PAGE = 100;

export default function CategoryLevelsView({
  variant,
  levels,
  filteredLevels,
  onSelectLevel,
  page,
  onPageChange,
}) {
  const { title, blurb, Icon, accent } = META[variant];
  const total = filteredLevels.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const end = Math.min(start + PER_PAGE, total);
  const pageItems = filteredLevels.slice(start, end);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-[rgb(var(--card)/0.32)] backdrop-blur-md border border-[rgb(var(--border)/0.65)] p-8 rounded-[2rem] shadow-xl sticky top-28">
          <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${accent} mb-6 shadow-lg`}>
            <Icon className="text-white" size={22} />
          </div>
          <p className="text-[10px] font-black text-[rgb(var(--muted))] uppercase tracking-[0.35em] mb-3">Collection</p>
          <p className="text-3xl font-black italic text-[rgb(var(--fg))] uppercase tracking-tighter leading-none mb-4">{title}</p>
          <p className="text-[rgb(var(--muted))] text-sm leading-relaxed">{blurb}</p>
          <div className="mt-8 pt-8 border-t border-[rgb(var(--border)/0.8)]">
            <p className="text-4xl font-black italic text-[rgb(var(--fg))]">{levels.length}</p>
            <p className="text-[10px] text-[rgb(var(--muted))] uppercase font-bold tracking-widest mt-2">Cataloged</p>
          </div>
        </div>
      </aside>

      <div className="flex-grow">
        <header className="mb-10">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-[rgb(var(--fg))]">{title}</h2>
          <div
            className={`h-1.5 w-28 rounded-full mt-4 bg-gradient-to-r ${accent} shadow-[0_0_18px_rgb(var(--accent)/0.35)]`}
          />
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-[rgb(var(--muted))]">
            Showing {total === 0 ? 0 : start + 1}-{end} of {total} levels
          </p>
        </header>

        <div className="grid gap-8">
          {pageItems.map((level) => (
            <LevelCard key={level.id} level={level} onClick={() => onSelectLevel(level)} />
          ))}
        </div>

        {filteredLevels.length === 0 && (
          <div className="py-16 px-8 text-center border border-dashed border-[rgb(var(--border)/0.9)] rounded-[2rem] bg-[rgb(var(--card)/0.22)] backdrop-blur-md">
            <p className="text-[rgb(var(--muted))] font-bold mb-2">Nothing in this collection yet</p>
            <p className="text-[rgb(var(--muted-2))] text-sm max-w-lg mx-auto leading-relaxed">
              Add a <code className="text-[rgb(var(--accent))]">category</code> column on{' '}
              <code className="text-[rgb(var(--accent))]">cinematic_levels</code> and tag rows with{' '}
              <code className="text-[rgb(var(--accent))]">{variant === 'platformers' ? 'platformer' : 'layout'}</code>. See{' '}
              <code className="text-[rgb(var(--muted))]">supabase/migrations/20260510000000_tabs_and_categories.sql</code>.
            </p>
          </div>
        )}
      </div>

      <FloatingPagination
        totalItems={total}
        perPage={PER_PAGE}
        page={safePage}
        onPageChange={onPageChange}
      />
    </main>
  );
}
