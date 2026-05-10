import React from 'react';
import {
  Eye,
  Search,
  Settings,
  List,
  Gamepad2,
  PenTool,
  Layers,
  Users,
  Info,
} from 'lucide-react';
import { clsx } from 'clsx';

const TABS = [
  { id: 'main', label: 'Main List', icon: List },
  { id: 'platformers', label: 'Platformers', icon: Gamepad2 },
  { id: 'layouts', label: 'Layouts', icon: PenTool },
  { id: 'packs', label: 'Packs', icon: Layers },
  { id: 'creators', label: 'Creators', icon: Users },
  { id: 'about', label: 'About', icon: Info },
];

const LEVEL_TABS = new Set(['main', 'platformers', 'layouts']);

export default function Navbar({
  searchQuery,
  setSearchQuery,
  isAdmin,
  setIsAdmin,
  currentTab,
  onTabChange,
}) {
  const showSearch = LEVEL_TABS.has(currentTab);

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800/50 bg-zinc-950/70 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-transform hover:rotate-3 hover:scale-105 shrink-0">
              <Eye className="text-white" size={22} />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-black italic tracking-tighter uppercase leading-none text-white truncate">
                The Cinematic
              </h1>
              <p className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-bold text-purple-500 uppercase leading-none mt-1">
                Levels List
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0">
            {showSearch && (
              <div className="relative group">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search by title or creator..."
                  className="bg-zinc-900/40 border border-zinc-800 rounded-full pl-11 pr-6 py-2.5 text-sm w-56 lg:w-72 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder:text-zinc-600"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsAdmin(!isAdmin)}
              className={clsx(
                'flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-full border text-[10px] font-black tracking-widest transition-all',
                isAdmin
                  ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-400'
              )}
            >
              <Settings size={14} className={isAdmin ? 'animate-spin-slow' : ''} />
              <span className="hidden lg:inline">{isAdmin ? 'ADMIN ACTIVE' : 'ADMIN LOGIN'}</span>
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="md:hidden pb-3">
            <div className="relative group">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search levels..."
                className="w-full bg-zinc-900/40 border border-zinc-800 rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder:text-zinc-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex overflow-x-auto gap-1 sm:gap-2 pb-0 -mb-px [scrollbar-width:thin]">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = currentTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onTabChange(id)}
                className={clsx(
                  'flex items-center gap-2 shrink-0 px-3 sm:px-4 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-300 border-b-2 -mb-px',
                  active
                    ? 'text-white border-purple-500 shadow-[0_1px_0_0_rgba(168,85,247,0.9)]'
                    : 'text-zinc-500 border-transparent hover:text-zinc-200 hover:border-zinc-600/80'
                )}
              >
                <Icon size={16} className={active ? 'text-purple-400' : 'text-zinc-500'} strokeWidth={2.25} />
                <span className="whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
