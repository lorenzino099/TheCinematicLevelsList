import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function getPageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items = [];
  const push = (v) => items.push(v);

  push(1);

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) push('…');
  for (let p = left; p <= right; p += 1) push(p);
  if (right < total - 1) push('…');

  push(total);
  return items;
}

export default function FloatingPagination({
  totalItems,
  perPage = 100,
  page,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const [hasScrolledDown, setHasScrolledDown] = React.useState(false);

  React.useEffect(() => {
    if (safePage !== page) onPageChange(safePage);
  }, [safePage, page, onPageChange]);

  if (totalPages <= 1) return null;

  React.useEffect(() => {
    const threshold = 260;
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || 0;
        setHasScrolledDown(y >= threshold);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const items = getPageItems(safePage, totalPages);
  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;
  const visible = safePage !== 1 || hasScrolledDown;

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          key="pagination"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 26 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-1.5 rounded-full border border-[rgb(var(--border)/0.7)] bg-[rgb(var(--bg)/0.72)] backdrop-blur-md shadow-[0_16px_40px_-24px_rgb(0_0_0/0.55)] px-2 py-2">
            <button
              type="button"
              onClick={() => canPrev && onPageChange(safePage - 1)}
              disabled={!canPrev}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--card)/0.55)] disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1 px-0.5">
              {items.map((it, idx) =>
                it === '…' ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-[rgb(var(--muted))] text-xs font-black"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={it}
                    type="button"
                    onClick={() => onPageChange(it)}
                    className={[
                      'min-w-9 h-9 px-3 inline-flex items-center justify-center rounded-full text-[11px] font-black tracking-widest transition-all',
                      it === safePage
                        ? 'bg-[rgb(var(--accent))] text-white shadow-[0_0_22px_rgb(var(--accent)/0.35)]'
                        : 'bg-transparent text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--card)/0.55)]',
                    ].join(' ')}
                    aria-current={it === safePage ? 'page' : undefined}
                  >
                    {it}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => canNext && onPageChange(safePage + 1)}
              disabled={!canNext}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--card)/0.55)] disabled:opacity-40 disabled:hover:bg-transparent transition-all"
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

