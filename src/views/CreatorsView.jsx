import React from 'react';
import { Users } from 'lucide-react';

export default function CreatorsView({ creators }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-blue-600/15 border border-blue-500/25">
            <Users className="text-blue-400" size={24} />
          </div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.35em]">Hall of vision</p>
        </div>
        <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
          Best Cinematic Creators
        </h2>
        <div className="h-1.5 w-28 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full mt-6 shadow-[0_0_20px_rgba(59,130,246,0.35)]" />
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((c) => (
          <article
            key={c.id}
            className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/55 rounded-[2rem] p-8 text-center transition-all duration-300 hover:border-purple-500/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-zinc-700/80 shadow-lg mb-6 ring-2 ring-purple-500/20">
              <img
                src={
                  c.avatar_url ||
                  `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(c.name)}&backgroundColor=1e1b4b`
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">{c.name}</h3>
            <p className="text-zinc-400 text-sm mt-4 leading-relaxed">{c.bio}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
