'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { ease, dur } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

export function HeroTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const { t, locale } = useLocale();
  const words = t.hero.title;

  return (
    <h1
      id="hero-heading"
      ref={ref}
      className="font-[var(--font-display)] text-[clamp(3.25rem,9.5vw,10rem)] leading-[1.02] tracking-[-0.035em] text-[color:var(--color-fg-primary)] pb-2"
    >
      <span className="sr-only">{words.join(' ')}</span>
      <span aria-hidden className="block" key={locale}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-[0.2em] align-baseline"
            initial={{ opacity: 0, y: '30%', filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
            transition={{
              duration: dur.slow,
              ease: ease.expoOut,
              delay: 0.25 + i * 0.07,
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}
