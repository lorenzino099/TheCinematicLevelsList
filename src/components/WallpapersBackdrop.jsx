import React from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';

function useScrollY() {
  const y = useMotionValue(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        y.set(window.scrollY || 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [y]);
  return y;
}

const WALLPAPERS = Object.values(
  import.meta.glob('../Wallpapers/*.{jpg,jpeg,png,webp}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
);

export default function WallpapersBackdrop({
  opacity = 0.075,
  secondsPerWallpaper = 10,
}) {
  const hasAny = WALLPAPERS.length > 0;
  const [idx, setIdx] = React.useState(0);
  const scrollY = useScrollY();

  const ySlow = useTransform(scrollY, (v) => v * -0.06);
  const yFast = useTransform(scrollY, (v) => v * -0.12);

  React.useEffect(() => {
    if (!hasAny) return;
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % WALLPAPERS.length);
    }, Math.max(3, secondsPerWallpaper) * 1000);
    return () => window.clearInterval(t);
  }, [hasAny, secondsPerWallpaper]);

  if (!hasAny) return null;

  const current = WALLPAPERS[idx];
  const next = WALLPAPERS[(idx + 1) % WALLPAPERS.length];

  const baseStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity,
    filter: 'saturate(0.9) contrast(1.05)',
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Layer A: slow parallax */}
      <motion.div
        style={{
          y: ySlow,
          ...baseStyle,
          backgroundImage: `url(${current})`,
        }}
        className="absolute inset-0 scale-[1.08]"
      />

      {/* Layer B: slightly faster for depth */}
      <motion.div
        style={{
          y: yFast,
          ...baseStyle,
          backgroundImage: `url(${next})`,
          opacity: opacity * 0.55,
          mixBlendMode: 'multiply',
        }}
        className="absolute inset-0 scale-[1.12]"
      />

      {/* Crossfade on wallpaper change */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            ...baseStyle,
            backgroundImage: `url(${current})`,
            opacity: opacity * 0.9,
          }}
          className="absolute inset-0 scale-[1.04]"
        />
      </AnimatePresence>

      {/* Gentle vignette so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--bg)/0.05),rgb(var(--bg)/0.78))]" />
    </div>
  );
}

