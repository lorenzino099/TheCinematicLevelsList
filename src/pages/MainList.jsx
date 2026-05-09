import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import LevelCard from '../components/LevelCard';
import { Loader2 } from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function MainList({ onSelectLevel }) {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLevels() {
      const { data } = await supabase
        .from('levels')
        .select('*')
        .order('position', { ascending: true });
      if (data) setLevels(data);
      setLoading(false);
    }
    fetchLevels();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-16">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          The List
        </h1>
        <div className="flex gap-8 text-zinc-500 font-medium uppercase tracking-widest text-sm">
          <div>Ranking Atmosphere & Design</div>
          <div className="text-purple-500">{levels.length} Levels Cataloged</div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {levels.map((level) => (
          <LevelCard 
            key={level.id} 
            level={level} 
            onClick={() => onSelectLevel(level)} 
          />
        ))}
      </div>
    </div>
  );
}