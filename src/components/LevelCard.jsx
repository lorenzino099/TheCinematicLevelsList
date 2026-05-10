import React from 'react';
import { Hash, ChevronRight } from 'lucide-react';

export default function LevelCard({ level, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-[rgb(var(--card)/0.28)] backdrop-blur-md border border-[rgb(var(--border)/0.45)] rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:translate-y-[-6px] hover:border-[rgb(var(--accent)/0.45)] hover:bg-[rgb(var(--card)/0.42)] hover:shadow-[0_30px_60px_-15px_rgb(0_0_0/0.35)]"
    >
      <div className="flex flex-col md:flex-row">
        <div className="absolute top-8 left-8 z-20 pointer-events-none">
          <span className="text-[rgb(var(--muted-2))] font-black text-[10px] uppercase tracking-[0.4em] block mb-1">Position</span>
          <span className="text-5xl font-black italic text-white leading-none tracking-tighter drop-shadow-[0_6px_18px_rgb(0_0_0/0.75)]">
            #{level.position}
          </span>
        </div>

        <div className="relative w-full md:w-96 h-64 overflow-hidden shrink-0">
          <img 
            src={level.thumbnail_url || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800"} 
            alt={level.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--media-fade))] via-[rgb(var(--media-fade)/0.15)] to-transparent" />
          <div className="absolute bottom-6 left-6 bg-[rgb(var(--bg)/0.65)] backdrop-blur-md px-3 py-1.5 rounded-lg border border-[rgb(var(--border)/0.45)] flex items-center gap-2">
             <Hash size={12} className="text-[rgb(var(--accent))]" />
             <span className="text-[10px] font-black tracking-widest text-[rgb(var(--muted))]">{level.level_id || '0000000'}</span>
          </div>
        </div>

        <div className="p-10 flex-grow flex flex-col justify-center">
          <h3 className="text-4xl font-black text-[rgb(var(--fg))] group-hover:text-[rgb(var(--accent))] transition-colors uppercase italic tracking-tighter leading-tight">
            {level.title}
          </h3>
          <p className="text-[rgb(var(--muted))] text-[11px] font-black uppercase tracking-[0.2em] mt-2">
            BY <span className="text-[rgb(var(--fg))]">{level.creator}</span>
          </p>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="bg-[rgb(var(--accent)/0.14)] text-[rgb(var(--accent))] text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-[rgb(var(--accent)/0.25)]">
              {level.tier || "Masterpiece"}
            </span>
          </div>

          <div className="mt-8 flex items-center text-[rgb(var(--muted-2))] group-hover:text-[rgb(var(--muted))] transition-colors gap-2 text-[10px] font-black uppercase tracking-[0.3em]">
            View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}