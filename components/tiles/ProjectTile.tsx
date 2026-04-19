'use client';

import { motion } from 'motion/react';

export type TileProps = {
  title: string;
  tagline: string;
  href: string;
  external?: boolean;
  year: string;
  status: string;
  stack: string[];
  accent: string;
  gradient: string;
  metrics?: { value: string; label: string }[];
};

export function ProjectTile({
  title,
  tagline,
  href,
  external = true,
  year,
  status,
  stack,
  accent,
  gradient,
  metrics,
}: TileProps) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group block rounded-sm border border-[color:var(--color-fg-dim)]/40 hover:border-[color:var(--color-accent)]/60 overflow-hidden transition-colors"
      style={{ background: gradient }}
    >
      <div className="relative p-6 md:p-8 min-h-[280px] flex flex-col">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div className="relative flex-1">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
            <span>{year}</span>
            <span style={{ color: accent }}>{status}</span>
          </div>

          <h3
            className="mt-4 font-[var(--font-display)] text-3xl md:text-4xl tracking-[-0.02em] leading-[1.05]"
            style={{ color: accent }}
          >
            {title}
            <span
              aria-hidden
              className="inline-block ml-2 text-[color:var(--color-fg-muted)] transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </h3>

          <p className="mt-3 text-sm text-[color:var(--color-fg-primary)]/80 leading-[1.5]">
            {tagline}
          </p>

          {metrics && metrics.length > 0 && (
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dd
                    className="font-[var(--font-display)] text-xl tracking-[-0.02em]"
                    style={{ color: accent }}
                  >
                    {m.value}
                  </dd>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.1em] text-[color:var(--color-fg-meta)]">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        <ul className="relative mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] text-[color:var(--color-fg-muted)]">
          {stack.map((s) => (
            <li key={s} className="px-2 py-0.5 rounded bg-[color:var(--color-bg-elev-2)]/40">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}
