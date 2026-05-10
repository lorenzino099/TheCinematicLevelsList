import React from 'react';

export default function About() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <div className="bg-zinc-900/25 backdrop-blur-md border border-zinc-800/50 rounded-[2rem] p-10 md:p-14">
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-6">
          Our mission
        </h1>
        <div className="h-1 w-24 bg-purple-600 rounded-full mb-10 shadow-[0_0_16px_rgba(168,85,247,0.45)]" />

        <div className="space-y-8 text-zinc-300 leading-relaxed text-base md:text-lg">
          <p>
            The Cinematic Levels List celebrates Geometry Dash levels that feel directed—where every
            cut, color shift, and camera beat serves a mood or story. We spotlight work that treats the
            editor like a lens, not just a toolbox.
          </p>
          <p>
            Rankings and collections here prioritize atmosphere, visual flow, and bold creative choices over raw
            difficulty. The goal is a living archive players can browse when they want something memorable,
            not only something hard.
          </p>
          <p className="text-zinc-500 text-sm border-l-2 border-purple-500/40 pl-6">
            This project is curated and evolving. If you build levels with a clear cinematic voice, you
            belong in the conversation—whether your piece is a platformer, a layout study, or part of a
            larger pack.
          </p>
        </div>
      </div>
    </main>
  );
}
