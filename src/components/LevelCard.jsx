import React from 'react';
import { Hash, ChevronRight } from 'lucide-react';

export default function LevelCard({ level, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-zinc-900/20 backdrop-blur-md border border-zinc-800/40 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:translate-y-[-6px] hover:border-purple-500/40 hover:bg-zinc-900/40 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
    >
      <div className="flex flex-col md:flex-row">
        <div className="absolute top-8 left-8 z-20 pointer-events-none">
          <span className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.4em] block mb-1">Position</span>
          <span className="text-5xl font-black italic text-white leading-none tracking-tighter drop-shadow-lg">#{level.position}</span>
        </div>

        <div className="relative w-full md:w-96 h-64 overflow-hidden shrink-0">
          <img 
            src={level.thumbnail_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800"} 
            alt={level.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
             <Hash size={12} className="text-purple-400" />
             <span className="text-[10px] font-black tracking-widest text-zinc-300">{level.level_id || '0000000'}</span>
          </div>
        </div>

        <div className="p-10 flex-grow flex flex-col justify-center">
          <h3 className="text-4xl font-black text-white group-hover:text-purple-400 transition-colors uppercase italic tracking-tighter leading-tight">
            {level.title}
          </h3>
          <p className="text-zinc-500 text-[11px] font-black uppercase tracking-[0.2em] mt-2">
            BY <span className="text-zinc-100">{level.creator}</span>
          </p>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="bg-purple-900/30 text-purple-400 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-purple-500/20">
              {level.tier || "Masterpiece"}
            </span>
          </div>

          <div className="mt-8 flex items-center text-zinc-600 group-hover:text-zinc-300 transition-colors gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
            View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}