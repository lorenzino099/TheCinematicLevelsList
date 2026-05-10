import React from 'react';
import { X, Music, Hash, User } from 'lucide-react';

export default function LevelModal({ level, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-[rgb(var(--bg)/0.82)] backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[rgb(var(--bg))] border border-[rgb(var(--border)/0.7)] rounded-[3rem] w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-[0_0_120px_rgb(var(--accent)/0.16)] flex flex-col lg:flex-row animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] z-20 bg-[rgb(var(--card)/0.80)] hover:bg-[rgb(var(--card-2)/0.85)] p-4 rounded-full transition-all border border-[rgb(var(--border)/0.6)]">
          <X size={24} />
        </button>

        <div className="lg:w-3/5 bg-[rgb(var(--bg))] aspect-video lg:aspect-auto">
          <iframe 
            width="100%" height="100%" 
            src={level.video_url?.replace("watch?v=", "embed/") || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
            title={level.title} frameBorder="0" allowFullScreen className="w-full h-full"
          ></iframe>
        </div>

        <div className="lg:w-2/5 p-12 flex flex-col overflow-y-auto bg-[rgb(var(--bg))]">
          <div className="mb-10 text-[rgb(var(--fg))]">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">{level.title}</h2>
            <p className="text-[rgb(var(--muted))] text-xl font-medium">
              Directed by{' '}
              <span className="text-[rgb(var(--fg))] underline decoration-[rgb(var(--accent))] decoration-2 underline-offset-8">
                {level.creator}
              </span>
            </p>
          </div>

          <div className="flex-grow space-y-10">
            <section>
              <h4 className="text-[rgb(var(--accent))] font-black uppercase tracking-[0.3em] text-[10px] mb-6 flex items-center gap-3 italic">
                <div className="w-2 h-2 bg-[rgb(var(--accent))] rounded-full" /> Artistic Analysis
              </h4>
              <p className="text-[rgb(var(--muted))] text-lg leading-relaxed italic border-l-2 border-[rgb(var(--border)/0.7)] pl-8 py-2">
                "{level.description || "The directorial excellence of this piece is self-evident."}"
              </p>
            </section>
            
            <div className="grid grid-cols-2 gap-6 text-[rgb(var(--fg))]">
              <div className="bg-[rgb(var(--card)/0.45)] p-6 rounded-[2rem] border border-[rgb(var(--border)/0.55)]">
                <Music size={22} className="text-[rgb(var(--accent))] mb-3"/>
                <p className="text-[rgb(var(--fg))] font-black truncate">{level.song_name || "Custom"}</p>
              </div>
              <div className="bg-[rgb(var(--card)/0.45)] p-6 rounded-[2rem] border border-[rgb(var(--border)/0.55)]">
                <Hash size={22} className="text-[rgb(var(--accent))] mb-3"/>
                <p className="text-[rgb(var(--fg))] font-black">{level.level_id || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[rgb(var(--border)/0.55)] flex justify-between items-center">
             <button 
              onClick={() => navigator.clipboard.writeText(level.level_id)}
              className="bg-[rgb(var(--fg))] text-[rgb(var(--bg))] text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-[rgb(var(--accent))] hover:text-white transition-all transform active:scale-95"
             >
               Copy ID
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}