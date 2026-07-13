'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { HeroTitle } from '@/components/hero/HeroTitle';
import { HeroFallback } from '@/components/hero/HeroFallback';
import { ease, dur } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

const HeroScene = dynamic(() => import('@/components/hero/HeroScene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

export function Hero() {
  const { t } = useLocale();
  const isMobile = useIsMobile();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative grid min-h-[100dvh] grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-0 px-6 md:px-12 lg:px-20 pt-28 md:pt-0 overflow-hidden"
    >
      {/* Full-bleed background scene — never clipped by grid columns */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {isMobile ? (
          <HeroFallback />
        ) : (
          <Suspense fallback={<HeroFallback />}>
            <HeroScene />
          </Suspense>
        )}
        {/* Legibility veil under text column on desktop — two-layer: hard bg fade + soft midtone */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, var(--color-bg-base) 0%, var(--color-bg-base) 16%, rgba(7,7,10,0.82) 34%, rgba(7,7,10,0.3) 52%, transparent 68%)',
          }}
        />
        {/* Bottom fade — blends hero into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 hidden md:block"
          style={{
            background: 'linear-gradient(to top, var(--color-bg-base) 0%, transparent 100%)',
          }}
        />
        {/* Mobile veil */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(7,7,10,0.15) 0%, rgba(7,7,10,0.6) 55%, var(--color-bg-base) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[640px] order-2 md:order-1">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.reveal, ease: ease.expoOut, delay: 0.1 }}
          className="section-label mb-7 md:mb-10"
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)] shrink-0"
            style={{ boxShadow: '0 0 10px rgba(158,255,110,0.7), 0 0 4px rgba(158,255,110,1)' }}
            aria-hidden
          />
          <span>{t.hero.eyebrow}</span>
        </motion.div>

        <HeroTitle />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.slow, ease: ease.expoOut, delay: 0.9 }}
          className="mt-6 md:mt-8 text-base md:text-[1.125rem] text-[color:var(--color-fg-muted)] max-w-[38ch] leading-[1.65] tracking-[-0.005em]"
        >
          {t.hero.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: dur.slow, ease: ease.expoOut, delay: 1.1 }}
          className="mt-9 md:mt-11 flex flex-wrap items-center gap-3 md:gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 md:px-7 py-3 font-[var(--font-sans-alt)] text-[13px] font-semibold tracking-[0.03em] uppercase bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 active:brightness-95 transition-all duration-200"
            style={{ letterSpacing: '0.04em' }}
          >
            {t.hero.ctaPrimary}
          </Link>
          <a
            href="#work"
            className="inline-flex items-center justify-center px-6 md:px-7 py-3 font-[var(--font-sans-alt)] text-[13px] tracking-[0.04em] uppercase border border-[color:var(--color-fg-dim)] text-[color:var(--color-fg-muted)] hover:border-[color:var(--color-fg-primary)]/60 hover:text-[color:var(--color-fg-primary)] transition-all duration-200"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 md:mt-20 flex items-center gap-3 font-mono text-[10px] tracking-[0.14em] uppercase text-[color:var(--color-fg-dim)]"
        >
          <span aria-hidden className="inline-block w-5 h-[1px] bg-[color:var(--color-fg-dim)]" />
          <span>{t.hero.scroll}</span>
        </motion.div>
      </div>

      {/* Reserve right column space on desktop so text stays in left half */}
      <div
        className="hidden md:block h-[85vh] w-full order-1 md:order-2 pointer-events-none"
        aria-hidden
      />
    </section>
  );
}
