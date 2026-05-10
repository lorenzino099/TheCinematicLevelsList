import React from 'react';
import { Layers } from 'lucide-react';

export default function PacksView({ packs }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-14 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-[rgb(var(--accent)/0.14)] border border-[rgb(var(--accent)/0.25)]">
            <Layers className="text-[rgb(var(--accent))]" size={24} />
          </div>
          <p className="text-[10px] font-black text-[rgb(var(--muted))] uppercase tracking-[0.35em]">Curated collections</p>
        </div>
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-[rgb(var(--fg))]">Collections</h2>
        <p className="text-[rgb(var(--muted))] mt-4 text-lg leading-relaxed">
          Grouped cinematic experiences—sequels, shared soundtracks, and anthology arcs in one place.
        </p>
        <div className="h-1.5 w-28 bg-[rgb(var(--accent))] rounded-full mt-6 shadow-[0_0_20px_rgb(var(--accent)/0.40)]" />
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {packs.map((pack) => (
          <article
            key={pack.id}
            className="group relative bg-[rgb(var(--card)/0.30)] backdrop-blur-md border border-[rgb(var(--border)/0.55)] rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[rgb(var(--accent)/0.35)] hover:shadow-[0_24px_50px_-20px_rgb(0_0_0/0.30)]"
          >
            <div className="aspect-[21/9] overflow-hidden bg-[rgb(var(--card-2))]">
              <img
                src={
                  pack.cover_url ||
                  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80'
                }
                alt=""
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--bg))] via-[rgb(var(--bg)/0.40)] to-transparent" />
            </div>
            <div className="p-8 -mt-16 relative">
              <h3 className="text-3xl font-black italic text-[rgb(var(--fg))] uppercase tracking-tight">{pack.title}</h3>
              {pack.levels_count > 0 && (
                <p className="text-[10px] font-black text-[rgb(var(--accent))] uppercase tracking-widest mt-2">
                  {pack.levels_count} levels
                </p>
              )}
              <p className="text-[rgb(var(--muted))] mt-4 leading-relaxed">{pack.description}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
