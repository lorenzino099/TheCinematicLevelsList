import React from 'react';
import { Trophy } from 'lucide-react';
import LevelCard from '../components/LevelCard';

export default function MainRankingsView({ levels, filteredLevels, onSelectLevel }) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
      <aside className="w-full lg:w-80 shrink-0 space-y-8">
        <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/60 p-8 rounded-[2rem] shadow-xl">
          <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <Trophy size={14} className="text-purple-500" /> Stats
          </h2>
          <div className="space-y-8 text-white">
            <div className="group">
              <p className="text-6xl font-black italic group-hover:text-purple-400 transition-colors leading-none tracking-tighter">
                {levels.length}
              </p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-3">Total Entries</p>
            </div>
            <div className="h-px bg-gradient-to-r from-zinc-800 to-transparent" />
            <div>
              <p className="text-xl font-black uppercase tracking-tighter truncate leading-tight">
                {levels[0]?.title || 'Awaiting Data'}
              </p>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Current #1 Rank</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/20 to-zinc-900/40 border border-purple-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-purple-600/10 transition-colors" />
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 italic flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            The Criterion
          </h3>
          <p className="text-zinc-400 text-[13px] leading-relaxed font-medium">
            Rankings are curated based on <span className="text-zinc-100">Directorial Vision</span>,{' '}
            <span className="text-zinc-100">Visual Flow</span>, and{' '}
            <span className="text-zinc-100">Atmospheric Innovation</span>.
            <br />
            <br />
            Difficulty level is irrelevant; cinematic impact is everything.
          </p>
        </div>
      </aside>

      <div className="flex-grow">
        <header className="mb-12">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white">The Rankings</h2>
          <div className="h-1.5 w-32 bg-purple-600 rounded-full mt-4 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
        </header>

        <div className="grid gap-8">
          {filteredLevels.map((level) => (
            <LevelCard key={level.id} level={level} onClick={() => onSelectLevel(level)} />
          ))}

          {filteredLevels.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-zinc-800 rounded-[2.5rem]">
              <p className="text-zinc-500 font-bold uppercase tracking-widest">No entries match your search</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
