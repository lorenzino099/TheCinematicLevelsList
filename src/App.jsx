import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LevelModal from './components/LevelModal';
import MainRankingsView from './views/MainRankingsView';
import CategoryLevelsView from './views/CategoryLevelsView';
import PacksView from './views/PacksView';
import CreatorsView from './views/CreatorsView';
import About from './pages/About';
import { fetchCinematicLevels } from './lib/cinematicLevelsApi';
import { fetchLevelPacks, fetchCreators } from './lib/cinematicExtrasApi';

function filterBySearch(levels, q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return levels;
  return levels.filter(
    (level) =>
      level.title?.toLowerCase().includes(needle) || level.creator?.toLowerCase().includes(needle)
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('main');
  const [loading, setLoading] = useState(true);
  const [levelsMain, setLevelsMain] = useState([]);
  const [levelsPlatformers, setLevelsPlatformers] = useState([]);
  const [levelsLayouts, setLevelsLayouts] = useState([]);
  const [packs, setPacks] = useState([]);
  const [creators, setCreators] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [main, platformers, layouts, packList, creatorList] = await Promise.all([
          fetchCinematicLevels({}),
          fetchCinematicLevels({ category: 'platformer' }),
          fetchCinematicLevels({ category: 'layout' }),
          fetchLevelPacks(),
          fetchCreators(),
        ]);
        if (!cancelled) {
          setLevelsMain(main);
          setLevelsPlatformers(platformers);
          setLevelsLayouts(layouts);
          setPacks(packList);
          setCreators(creatorList);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredMain = useMemo(
    () => filterBySearch(levelsMain, searchQuery),
    [levelsMain, searchQuery]
  );
  const filteredPlatformers = useMemo(
    () => filterBySearch(levelsPlatformers, searchQuery),
    [levelsPlatformers, searchQuery]
  );
  const filteredLayouts = useMemo(
    () => filterBySearch(levelsLayouts, searchQuery),
    [levelsLayouts, searchQuery]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-black uppercase tracking-[0.3em] animate-pulse">Syncing Masterpieces...</p>
        </div>
      </div>
    );
  }

  let tabContent = null;
  switch (currentTab) {
    case 'main':
      tabContent = (
        <MainRankingsView
          levels={levelsMain}
          filteredLevels={filteredMain}
          onSelectLevel={setSelectedLevel}
        />
      );
      break;
    case 'platformers':
      tabContent = (
        <CategoryLevelsView
          variant="platformers"
          levels={levelsPlatformers}
          filteredLevels={filteredPlatformers}
          onSelectLevel={setSelectedLevel}
        />
      );
      break;
    case 'layouts':
      tabContent = (
        <CategoryLevelsView
          variant="layouts"
          levels={levelsLayouts}
          filteredLevels={filteredLayouts}
          onSelectLevel={setSelectedLevel}
        />
      );
      break;
    case 'packs':
      tabContent = <PacksView packs={packs} />;
      break;
    case 'creators':
      tabContent = <CreatorsView creators={creators} />;
      break;
    case 'about':
      tabContent = <About />;
      break;
    default:
      tabContent = null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {tabContent}
          </motion.div>
        </AnimatePresence>
      </div>

      {selectedLevel && (
        <LevelModal level={selectedLevel} onClose={() => setSelectedLevel(null)} />
      )}

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #7c3aed; }
      `}</style>
    </div>
  );
}
