'use client';

import Link from 'next/link';
import { essays } from '@/lib/writing';

export function WritingIndexContent() {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-[820px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-fg-meta)]">
          Writing · long-form posts
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] pb-3">
          Deep dives, written down.
        </h1>
        <p className="mt-6 text-lg text-[color:var(--color-fg-muted)] max-w-[62ch] leading-[1.5]">
          Technical posts on the harder parts of our work — the constraints that shaped a decision,
          the stack choices that paid off, the ones that did not. Published when we learn something
          worth writing up, not on a schedule.
        </p>
      </div>

      <ul className="mt-16 max-w-[900px] divide-y divide-[color:var(--color-fg-dim)]/30">
        {essays.map((e) => (
          <li key={e.slug}>
            <Link
              href={`/writing/${e.slug}`}
              className="group grid grid-cols-[auto_1fr] gap-6 py-8 items-baseline hover:pl-2 transition-all"
            >
              <span className="font-mono text-xs text-[color:var(--color-fg-meta)] whitespace-nowrap">
                {e.date}
              </span>
              <div>
                <h2
                  className="font-[var(--font-display)] text-2xl md:text-4xl tracking-[-0.02em] leading-[1.1] transition-colors"
                  style={{ color: 'var(--color-fg-primary)' }}
                >
                  {e.title}
                  <span
                    aria-hidden
                    className="inline-block ml-2 text-[color:var(--color-fg-muted)] transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </h2>
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)] leading-[1.5] max-w-[60ch]">
                  {e.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[color:var(--color-fg-meta)]">
                  <span style={{ color: e.accent }}>{e.topic}</span>
                  <span aria-hidden>·</span>
                  <span>{e.readingTime}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
