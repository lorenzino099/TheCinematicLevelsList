import React from 'react';
import { Layers } from 'lucide-react';

export default function PacksView({ packs }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-14 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30">
            <Layers className="text-purple-400" size={24} />
          </div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.35em]">Curated sets</p>
        </div>
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">Level Packs</h2>
        <p className="text-zinc-400 mt-4 text-lg leading-relaxed">
          Grouped cinematic experiences—sequels, shared soundtracks, and anthology arcs in one place.
        </p>
        <div className="h-1.5 w-28 bg-purple-600 rounded-full mt-6 shadow-[0_0_20px_rgba(168,85,247,0.45)]" />
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {packs.map((pack) => (
          <article
            key={pack.id}
            className="group relative bg-zinc-900/25 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-purple-500/35 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)]"
          >
            <div className="aspect-[21/9] overflow-hidden bg-zinc-900">
              <img
                src={
                  pack.cover_url ||
                  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80'
                }
                alt=""
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>
            <div className="p-8 -mt-16 relative">
              <h3 className="text-3xl font-black italic text-white uppercase tracking-tight">{pack.title}</h3>
              {pack.levels_count > 0 && (
                <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mt-2">
                  {pack.levels_count} levels
                </p>
              )}
              <p className="text-zinc-400 mt-4 leading-relaxed">{pack.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
