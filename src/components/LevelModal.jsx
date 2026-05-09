import React from 'react';
import { X, Music, Hash, User } from 'lucide-react';

export default function LevelModal({ level, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-[3rem] w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-[0_0_120px_rgba(168,85,247,0.15)] flex flex-col lg:flex-row animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-zinc-400 hover:text-white z-20 bg-zinc-900/80 hover:bg-zinc-800 p-4 rounded-full transition-all border border-zinc-700/50">
          <X size={24} />
        </button>

        <div className="lg:w-3/5 bg-black aspect-video lg:aspect-auto">
          <iframe 
            width="100%" height="100%" 
            src={level.video_url?.replace("watch?v=", "embed/") || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
            title={level.title} frameBorder="0" allowFullScreen className="w-full h-full"
          ></iframe>
        </div>

        <div className="lg:w-2/5 p-12 flex flex-col overflow-y-auto bg-zinc-950">
          <div className="mb-10 text-white">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">{level.title}</h2>
            <p className="text-zinc-400 text-xl font-medium">Directed by <span className="text-white underline decoration-purple-600 decoration-2 underline-offset-8">{level.creator}</span></p>
          </div>

          <div className="flex-grow space-y-10">
            <section>
              <h4 className="text-purple-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6 flex items-center gap-3 italic">
                <div className="w-2 h-2 bg-purple-500 rounded-full" /> Artistic Analysis
              </h4>
              <p className="text-zinc-300 text-lg leading-relaxed italic border-l-2 border-zinc-800 pl-8 py-2">
                "{level.description || "The directorial excellence of this piece is self-evident."}"
              </p>
            </section>
            
            <div className="grid grid-cols-2 gap-6 text-white">
              <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50">
                <Music size={22} className="text-purple-500 mb-3"/>
                <p className="text-zinc-100 font-black truncate">{level.song_name || "Custom"}</p>
              </div>
              <div className="bg-zinc-900/40 p-6 rounded-[2rem] border border-zinc-800/50">
                <Hash size={22} className="text-purple-500 mb-3"/>
                <p className="text-zinc-100 font-black">{level.level_id || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800/50 flex justify-between items-center">
             <button 
              onClick={() => navigator.clipboard.writeText(level.level_id)}
              className="bg-zinc-100 text-zinc-950 text-[10px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all transform active:scale-95"
             >
               Copy ID
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}