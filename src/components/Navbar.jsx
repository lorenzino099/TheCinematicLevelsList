import React from 'react';
import cllLogo from '../../cll.png';
import {
  Search,
  List,
  Gamepad2,
  PenTool,
  Layers,
  Users,
  Info,
  Sun,
  Moon,
} from 'lucide-react';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

const TABS = [
  { id: 'main', label: 'Main List', icon: List },
  { id: 'platformers', label: 'Platformers', icon: Gamepad2 },
  { id: 'layouts', label: 'Layouts', icon: PenTool },
  { id: 'packs', label: 'Collections', icon: Layers },
  { id: 'creators', label: 'Creators', icon: Users },
  { id: 'about', label: 'About', icon: Info },
];

const LEVEL_TABS = new Set(['main', 'platformers', 'layouts']);

export default function Navbar({
  searchQuery,
  setSearchQuery,
  currentTab,
  onTabChange,
}) {
  const showSearch = LEVEL_TABS.has(currentTab);
  const [theme, setTheme] = React.useState(() => {
    const el = document.documentElement;
    return el?.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  });

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (_) {
      // ignore
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-[rgb(var(--border)/0.55)] bg-[rgb(var(--bg)/0.72)] backdrop-blur-md supports-[backdrop-filter]:bg-[rgb(var(--bg)/0.55)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-4 relative">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgb(var(--card)/0.35)] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgb(var(--accent)/0.18)] transition-transform hover:rotate-2 hover:scale-[1.04] shrink-0 border border-[rgb(var(--border)/0.55)] overflow-hidden">
              <img
                src={cllLogo}
                alt="CLL"
                className="w-full h-full object-cover"
                draggable="false"
                decoding="async"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-black italic tracking-tighter uppercase leading-none text-[rgb(var(--fg))] truncate">
                The Cinematic
              </h1>
              <p className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.4em] font-bold text-[rgb(var(--accent))] uppercase leading-none mt-1">
                Levels List
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0 pr-12">
            {showSearch && (
              <div className="relative group">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-2))] group-focus-within:text-[rgb(var(--accent))] transition-colors pointer-events-none"
                />
                <input
                  type="text"
                  placeholder="Search by title or creator..."
                  className="bg-[rgb(var(--card)/0.40)] border border-[rgb(var(--border)/0.8)] rounded-full pl-11 pr-6 py-2.5 text-sm w-56 lg:w-72 focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-1 focus:ring-[rgb(var(--accent)/0.20)] transition-all text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted-2))]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full border border-[rgb(var(--border)/0.7)] bg-[rgb(var(--card)/0.35)] hover:bg-[rgb(var(--card)/0.55)] backdrop-blur-md shadow-sm transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: theme === 'dark' ? -45 : 45, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: theme === 'dark' ? 45 : -45, scale: 0.8 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="text-[rgb(var(--muted))]"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {showSearch && (
          <div className="md:hidden pb-3">
            <div className="relative group">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-2))] group-focus-within:text-[rgb(var(--accent))] transition-colors pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search levels..."
                className="w-full bg-[rgb(var(--card)/0.40)] border border-[rgb(var(--border)/0.8)] rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-[rgb(var(--accent))] focus:ring-1 focus:ring-[rgb(var(--accent)/0.20)] transition-all text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted-2))]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex overflow-x-auto sm:overflow-visible gap-1 sm:gap-2 pb-0 -mb-px hide-scrollbar">
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
                    ? 'text-[rgb(var(--fg))] border-[rgb(var(--accent))] shadow-[0_1px_0_0_rgb(var(--accent)/0.85)]'
                    : 'text-[rgb(var(--muted))] border-transparent hover:text-[rgb(var(--fg))] hover:border-[rgb(var(--border)/0.9)]'
                )}
              >
                <Icon
                  size={16}
                  className={active ? 'text-[rgb(var(--accent))]' : 'text-[rgb(var(--muted))]'}
                  strokeWidth={2.25}
                />
                <span className="whitespace-nowrap">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
