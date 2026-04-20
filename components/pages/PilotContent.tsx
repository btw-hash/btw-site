'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/context';

export function PilotContent() {
  const { t } = useLocale();
  const p = t.pilot;

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-[820px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-accent)]">
          {p.eyebrow}
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] pb-3">
          {p.heading}
        </h1>
        <p className="mt-6 text-xl text-[color:var(--color-fg-primary)]/85 max-w-[60ch] leading-[1.45]">
          {p.intro}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1100px]">
        <div className="rounded-sm border border-[color:var(--color-accent)]/60 bg-[color:var(--color-bg-elev-1)] p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-accent)] mb-4">
            {p.weGive.heading}
          </div>
          <ul className="space-y-3 text-[color:var(--color-fg-primary)]">
            {p.weGive.items.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center rounded-full text-[10px]"
                  style={{
                    background: 'var(--color-accent)',
                    color: 'var(--color-bg-base)',
                  }}
                >
                  ✓
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-sm border border-[color:var(--color-fg-dim)]/40 bg-[color:var(--color-bg-elev-1)] p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-4">
            {p.youGive.heading}
          </div>
          <ul className="space-y-3 text-[color:var(--color-fg-primary)]">
            {p.youGive.items.map((it, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden
                  className="shrink-0 w-5 h-5 mt-0.5 flex items-center justify-center rounded-full text-[10px] border border-[color:var(--color-fg-dim)] text-[color:var(--color-fg-muted)]"
                >
                  {i + 1}
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 max-w-[820px]">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-6">
          {p.featuresHeading}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-[color:var(--color-fg-muted)]">
          {p.features.map((f, i) => (
            <li key={i} className="flex gap-3 leading-[1.55]">
              <span className="font-mono text-[color:var(--color-accent)] shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 max-w-[820px]">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-6">
          {p.timelineHeading}
        </h2>
        <ol className="relative border-l border-[color:var(--color-fg-dim)]/40 pl-6 space-y-6">
          {p.timeline.map((it, i) => (
            <li key={i}>
              <span
                className="absolute -left-1.5 w-3 h-3 rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-accent)]">
                {it.when}
              </div>
              <div className="mt-1 text-[color:var(--color-fg-primary)]">{it.what}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20 pt-12 border-t border-[color:var(--color-fg-dim)]/30 max-w-[820px]">
        <h2 className="font-[var(--font-display)] text-3xl md:text-4xl tracking-[-0.02em] pb-2">
          {p.ctaHeading}
        </h2>
        <p className="mt-3 text-[color:var(--color-fg-muted)] max-w-[55ch]">{p.ctaBody}</p>
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] font-semibold bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 transition-all"
          >
            {p.ctaPrimary}
          </Link>
          <a
            href="https://t.me/btw_aitech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 font-[var(--font-sans-alt)] border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10 transition-colors"
          >
            {p.ctaSecondary}
          </a>
        </div>
        <p className="mt-6 font-mono text-[11px] text-[color:var(--color-fg-meta)]">{p.ctaFine}</p>
      </div>
    </div>
  );
}
