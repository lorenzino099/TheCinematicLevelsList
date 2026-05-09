import React from 'react';
import { Eye, Search, Settings } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, isAdmin, setIsAdmin }) {
  return (
    <nav className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-transform hover:rotate-3 hover:scale-105">
            <Eye className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase leading-none text-white">The Cinematic</h1>
            <p className="text-[10px] tracking-[0.4em] font-bold text-purple-500 uppercase leading-none mt-1">Levels List</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by title or creator..."
              className="bg-zinc-900/40 border border-zinc-800 rounded-full pl-11 pr-6 py-2.5 text-sm w-72 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder:text-zinc-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black tracking-widest transition-all ${
              isAdmin 
              ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' 
              : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-400'
            }`}
          >
            <Settings size={14} className={isAdmin ? 'animate-spin-slow' : ''} />
            {isAdmin ? 'ADMIN ACTIVE' : 'ADMIN LOGIN'}
          </button>
        </div>
      </div>
    </nav>
  );
}