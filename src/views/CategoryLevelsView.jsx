import React from 'react';
import { Gamepad2, PenTool } from 'lucide-react';
import LevelCard from '../components/LevelCard';

const META = {
  platformers: {
    title: 'Cinematic Platformers',
    blurb: 'Levels where movement, camera, and set-pieces read like action choreography.',
    Icon: Gamepad2,
    accent: 'from-violet-600 to-blue-600',
  },
  layouts: {
    title: 'Cinematic Layouts',
    blurb: 'High-quality layouts where composition, blocking, and pacing carry the story.',
    Icon: PenTool,
    accent: 'from-blue-600 to-cyan-500',
  },
};

export default function CategoryLevelsView({ variant, levels, filteredLevels, onSelectLevel }) {
  const { title, blurb, Icon, accent } = META[variant];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
      <aside className="w-full lg:w-72 shrink-0">
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 p-8 rounded-[2rem] shadow-xl sticky top-28">
          <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${accent} mb-6 shadow-lg`}>
            <Icon className="text-white" size={22} />
          </div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.35em] mb-3">Collection</p>
          <p className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">{title}</p>
          <p className="text-zinc-400 text-sm leading-relaxed">{blurb}</p>
          <div className="mt-8 pt-8 border-t border-zinc-800/80">
            <p className="text-4xl font-black italic text-white">{levels.length}</p>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-2">Cataloged</p>
          </div>
        </div>
      </aside>

      <div className="flex-grow">
        <header className="mb-10">
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">{title}</h2>
          <div className={`h-1.5 w-28 rounded-full mt-4 bg-gradient-to-r ${accent} shadow-[0_0_18px_rgba(139,92,246,0.45)]`} />
        </header>

        <div className="grid gap-8">
          {filteredLevels.map((level) => (
            <LevelCard key={level.id} level={level} onClick={() => onSelectLevel(level)} />
          ))}
        </div>

        {filteredLevels.length === 0 && (
          <div className="py-16 px-8 text-center border border-dashed border-zinc-800 rounded-[2rem] bg-zinc-900/20 backdrop-blur-md">
            <p className="text-zinc-300 font-bold mb-2">Nothing in this collection yet</p>
            <p className="text-zinc-500 text-sm max-w-lg mx-auto leading-relaxed">
              Add a <code className="text-purple-400">category</code> column on{' '}
              <code className="text-purple-400">cinematic_levels</code> and tag rows with{' '}
              <code className="text-purple-400">{variant === 'platformers' ? 'platformer' : 'layout'}</code>. See{' '}
              <code className="text-zinc-400">supabase/migrations/20260510000000_tabs_and_categories.sql</code>.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
