import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

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

export default function GeometricBackdrop({ opacity = 0.14 }) {
  const scrollY = useScrollY();
  const ySlow = useTransform(scrollY, (v) => v * -0.05);
  const yMid = useTransform(scrollY, (v) => v * -0.09);
  const yFast = useTransform(scrollY, (v) => v * -0.13);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle grid */}
      <motion.div style={{ y: ySlow, opacity: opacity * 0.85 }} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(var(--fg)/0.085) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--fg)/0.085) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, black 65%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, black 65%, transparent 92%)',
          }}
        />
      </motion.div>

      {/* Diagonal “shards” layer */}
      <motion.div style={{ y: yMid, opacity }} className="absolute -inset-[20%]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgb(var(--accent)/0.22) 0px, rgb(var(--accent)/0.22) 2px, transparent 2px, transparent 34px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, rgb(var(--accent-2)/0.18) 0px, rgb(var(--accent-2)/0.18) 1px, transparent 1px, transparent 46px)',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>

      {/* Soft geometric shapes for depth */}
      <motion.div style={{ y: yFast, opacity: opacity * 0.95 }} className="absolute inset-0">
        <div className="absolute left-[-10%] top-[5%] w-[520px] h-[520px] rounded-[4rem] rotate-12 bg-[rgb(var(--accent)/0.12)]" />
        <div className="absolute right-[-12%] top-[18%] w-[660px] h-[460px] rounded-[5rem] -rotate-6 bg-[rgb(var(--accent-2)/0.12)]" />
        <div className="absolute left-[12%] bottom-[-16%] w-[780px] h-[540px] rounded-[6rem] rotate-[18deg] bg-[rgb(var(--accent)/0.09)]" />
      </motion.div>

      {/* Vignette keeps content readable but doesn't hide the pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--bg)/0.02),rgb(var(--bg)/0.55))]" />
    </div>
  );
}

