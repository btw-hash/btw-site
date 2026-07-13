'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ease } from '@/lib/motion/tokens';
import { useLocale } from '@/lib/i18n/context';

export function ContactCTA() {
  const { t } = useLocale();

  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden px-6 md:px-12 lg:px-20 py-32 md:py-44"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(158,255,110,0.06) 0%, transparent 55%), radial-gradient(ellipse at 20% 100%, rgba(184,166,255,0.05) 0%, transparent 50%), var(--color-bg-base)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <OrbitingDots radius={180} speed={40} count={6} opacity={0.4} />
        <OrbitingDots radius={280} speed={-60} count={4} opacity={0.25} />
        <OrbitingDots radius={380} speed={80} count={3} opacity={0.15} />
      </div>

      <div className="relative z-10 text-center max-w-[900px] mx-auto">
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: ease.expoOut }}
          className="font-[var(--font-display)] text-[3rem] md:text-[5.5rem] lg:text-[7rem] tracking-[-0.035em] leading-[0.97]"
        >
          {t.contactCTA.heading[0]} <br />
          {t.contactCTA.heading[1]}
        </motion.h2>

        <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-3">
          <a
            href="mailto:hello@btw.studio"
            className="inline-flex items-center justify-center px-8 py-3.5 font-[var(--font-sans-alt)] text-[13px] font-semibold tracking-[0.05em] uppercase bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 active:brightness-95 transition-all duration-200"
          >
            hello@btw.studio
          </a>
          <a
            href="https://t.me/btw_aitech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3.5 font-[var(--font-sans-alt)] text-[13px] tracking-[0.05em] uppercase border border-[color:var(--color-fg-dim)] text-[color:var(--color-fg-muted)] hover:border-[color:var(--color-fg-primary)]/50 hover:text-[color:var(--color-fg-primary)] transition-all duration-200"
          >
            @btw_aitech →
          </a>
        </div>

        <p className="mt-8 text-sm text-[color:var(--color-fg-muted)]">
          {t.contactCTA.formLink}{' '}
          <Link
            href="/contact"
            className="underline underline-offset-4 hover:text-[color:var(--color-accent)] transition-colors"
          >
            {t.contactCTA.formLinkText}
          </Link>
        </p>
      </div>
    </section>
  );
}

function OrbitingDots({
  radius,
  speed,
  count,
  opacity,
}: {
  radius: number;
  speed: number;
  count: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
      animate={{ rotate: speed > 0 ? 360 : -360 }}
      transition={{
        duration: Math.abs(speed),
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius + radius;
        const y = Math.sin(angle) * radius + radius;
        return (
          <span
            key={i}
            className="absolute block rounded-full"
            style={{
              width: '6px',
              height: '6px',
              left: `${x - 3}px`,
              top: `${y - 3}px`,
              background: 'var(--color-accent)',
              opacity,
              boxShadow: '0 0 12px rgba(158,255,110,0.6)',
            }}
          />
        );
      })}
    </motion.div>
  );
}
