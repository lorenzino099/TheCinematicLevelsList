import React from 'react';
import { Trophy } from 'lucide-react';
import LevelCard from '../components/LevelCard';
import FloatingPagination from '../components/FloatingPagination';

const PER_PAGE = 100;
const PLAYLISTS = [
  {
    title: 'Cinematic Geometry Dash Levels',
    url: 'https://www.youtube.com/playlist?list=PLKeMcFoghc691HVq-rM6j6aEpNCQNeUF_',
  },
  {
    title: 'Iconic Diverse Geometry Dash Levels',
    url: 'https://www.youtube.com/playlist?list=PLKeMcFoghc6-c-FTl1GSpTacWlrQDDLzQ',
  },
  {
    title: 'Gameplay',
    url: 'https://www.youtube.com/playlist?list=PLKeMcFoghc6-XhxO8pV9qX40oaWNUinlf',
  },
];

function getEmbed(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // YouTube playlist
    if (u.hostname.includes('youtube.com') && u.searchParams.get('list')) {
      const list = u.searchParams.get('list');
      return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}`;
    }
    // YouTube share link to playlist (rare)
    if (u.hostname === 'youtu.be' && u.searchParams.get('list')) {
      const list = u.searchParams.get('list');
      return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}`;
    }
    return null;
  } catch {
    return null;
  }
}

export default function MainRankingsView({ levels, filteredLevels, onSelectLevel, page, onPageChange }) {
  const total = filteredLevels.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const end = Math.min(start + PER_PAGE, total);
  const pageItems = filteredLevels.slice(start, end);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
      <aside className="w-full lg:w-80 shrink-0 space-y-8">
        <div className="bg-[rgb(var(--card)/0.32)] backdrop-blur-md border border-[rgb(var(--border)/0.65)] p-8 rounded-[2rem] shadow-xl">
          <h2 className="text-xs font-black text-[rgb(var(--muted))] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <Trophy size={14} className="text-[rgb(var(--accent))]" /> Stats
          </h2>
          <div className="space-y-8 text-[rgb(var(--fg))]">
            <div className="group">
              <p className="text-6xl font-black italic group-hover:text-[rgb(var(--accent))] transition-colors leading-none tracking-tighter">
                {levels.length}
              </p>
              <p className="text-[10px] text-[rgb(var(--muted))] uppercase font-bold tracking-widest mt-3">Total Entries</p>
            </div>
            <div className="h-px bg-gradient-to-r from-[rgb(var(--border))] to-transparent" />
            <div>
              <p className="text-xl font-black uppercase tracking-tighter truncate leading-tight">
                {levels[0]?.title || 'Awaiting Data'}
              </p>
              <p className="text-[10px] text-[rgb(var(--muted))] uppercase font-bold tracking-widest mt-1">Current #1 Rank</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[rgb(var(--accent)/0.12)] to-[rgb(var(--card)/0.45)] border border-[rgb(var(--accent)/0.22)] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[rgb(var(--accent)/0.07)] blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-[rgb(var(--accent)/0.12)] transition-colors" />
          <h3 className="text-xs font-black text-[rgb(var(--fg))] uppercase tracking-widest mb-6 italic flex items-center gap-2">
            <span className="w-2 h-2 bg-[rgb(var(--accent))] rounded-full animate-pulse" />
            The Criterion
          </h3>
          <p className="text-[rgb(var(--muted))] text-[13px] leading-relaxed font-medium">
            Rankings are curated based on <span className="text-[rgb(var(--fg))]">Directorial Vision</span>,{' '}
            <span className="text-[rgb(var(--fg))]">Visual Flow</span>, and{' '}
            <span className="text-[rgb(var(--fg))]">Atmospheric Innovation</span>.
            <br />
            <br />
            Difficulty level is irrelevant; cinematic impact is everything.
          </p>
        </div>

        <div className="bg-gradient-to-br from-[rgb(var(--accent-2)/0.12)] to-[rgb(var(--card)/0.45)] border border-[rgb(var(--accent-2)/0.22)] p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[rgb(var(--accent-2)/0.07)] blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-[rgb(var(--accent-2)/0.12)] transition-colors" />
          <h3 className="text-xs font-black text-[rgb(var(--fg))] uppercase tracking-widest mb-5 italic flex items-center gap-2">
            <span className="w-2 h-2 bg-[rgb(var(--accent-2))] rounded-full animate-pulse" />
            Playlists
          </h3>
          <p className="text-[rgb(var(--muted))] text-[13px] leading-relaxed font-medium">
            A few of the playlists used while building the list—mood boards for pacing, atmosphere, and “camera”
            rhythm.
          </p>

          <div className="mt-6 grid gap-4">
            {PLAYLISTS.map((p) => {
              const embed = getEmbed(p.url);
              return (
                <div
                  key={p.title}
                  className="rounded-[1.5rem] border border-[rgb(var(--border)/0.65)] bg-[rgb(var(--bg)/0.35)] overflow-hidden"
                >
                  <div className="px-5 py-4 flex items-center justify-between gap-4">
                    <p className="text-[11px] font-black uppercase tracking-[0.35em] text-[rgb(var(--muted))] truncate">
                      {p.title}
                    </p>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-black uppercase tracking-widest text-[rgb(var(--accent-2))] hover:underline"
                      >
                        Open
                      </a>
                    ) : null}
                  </div>

                  {embed ? (
                    <div className="aspect-video bg-[rgb(var(--card-2))]">
                      <iframe
                        title={p.title}
                        src={embed}
                        className="w-full h-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="px-5 pb-5">
                      <p className="text-[12px] text-[rgb(var(--muted-2))] leading-relaxed">
                        Add a YouTube playlist link for an embed here. If it’s not embeddable, this card will stay as a
                        simple link.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="flex-grow">
        <header className="mb-12">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter text-[rgb(var(--fg))]">The Rankings</h2>
          <div className="h-1.5 w-32 bg-[rgb(var(--accent))] rounded-full mt-4 shadow-[0_0_20px_rgb(var(--accent)/0.45)]" />
          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-[rgb(var(--muted))]">
            Showing {total === 0 ? 0 : start + 1}-{end} of {total} levels
          </p>
        </header>

        <div className="grid gap-8">
          {pageItems.map((level) => (
            <LevelCard key={level.id} level={level} onClick={() => onSelectLevel(level)} />
          ))}

          {filteredLevels.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-[rgb(var(--border)/0.8)] rounded-[2.5rem]">
              <p className="text-[rgb(var(--muted))] font-bold uppercase tracking-widest">No entries match your search</p>
            </div>
          )}
        </div>
      </div>

      <FloatingPagination
        totalItems={total}
        perPage={PER_PAGE}
        page={safePage}
        onPageChange={onPageChange}
      />
    </main>
  );
}
