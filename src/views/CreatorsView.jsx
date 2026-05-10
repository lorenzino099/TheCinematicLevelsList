import React from 'react';
import { Users } from 'lucide-react';

export default function CreatorsView({ creators }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-[rgb(var(--accent-2)/0.12)] border border-[rgb(var(--accent-2)/0.22)]">
            <Users className="text-[rgb(var(--accent-2))]" size={24} />
          </div>
          <p className="text-[10px] font-black text-[rgb(var(--muted))] uppercase tracking-[0.35em]">Hall of vision</p>
        </div>
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-[rgb(var(--fg))]">
          Best Cinematic Creators
        </h2>
        <div className="h-1.5 w-28 bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-2))] rounded-full mt-6 shadow-[0_0_20px_rgb(var(--accent-2)/0.30)]" />
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((c) => (
          <article
            key={c.id}
            className="bg-[rgb(var(--card)/0.32)] backdrop-blur-md border border-[rgb(var(--border)/0.62)] rounded-[2rem] p-8 text-center transition-all duration-300 hover:border-[rgb(var(--accent)/0.30)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.28)]"
          >
            <div className="mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-[rgb(var(--border)/0.9)] shadow-lg mb-6 ring-2 ring-[rgb(var(--accent)/0.20)]">
              <img
                src={
                  c.avatar_url ||
                  `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(c.name)}&backgroundColor=1e1b4b`
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-black text-[rgb(var(--fg))] uppercase tracking-tight italic">{c.name}</h3>
            <p className="text-[rgb(var(--muted))] text-sm mt-4 leading-relaxed">{c.bio}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
