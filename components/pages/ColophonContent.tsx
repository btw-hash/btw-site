'use client';

import { useLocale } from '@/lib/i18n/context';

export function ColophonContent() {
  const { t } = useLocale();

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-[720px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-fg-meta)]">
          {t.colophon.eyebrow}
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] pb-3">
          {t.colophon.heading}
        </h1>
        <p className="mt-6 text-lg text-[color:var(--color-fg-muted)] leading-[1.5]">
          {t.colophon.intro}
        </p>
      </div>

      <div className="mt-14 max-w-[720px] space-y-12">
        <section>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-4">
            {t.colophon.stackHeading}
          </h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {t.colophon.stackRows.map((row) => (
              <div
                key={row.label}
                className="flex justify-between gap-4 border-b border-[color:var(--color-fg-dim)]/20 pb-2"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-[color:var(--color-fg-meta)]">
                  {row.label}
                </dt>
                <dd className="text-[color:var(--color-fg-primary)] text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-4">
            {t.colophon.processHeading}
          </h2>
          <ol className="space-y-3 text-[color:var(--color-fg-muted)] leading-[1.6]">
            {t.colophon.processSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-xs text-[color:var(--color-accent)] shrink-0 mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-4">
            {t.colophon.receiptsHeading}
          </h2>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <dd className="font-[var(--font-display)] text-4xl tracking-[-0.02em] text-[color:var(--color-accent)] pb-1">
                2 days
              </dd>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                Spec → production
              </dt>
            </div>
            <div>
              <dd className="font-[var(--font-display)] text-4xl tracking-[-0.02em] text-[color:var(--color-accent)] pb-1">
                8
              </dd>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                Agents in pipeline
              </dt>
            </div>
            <div>
              <dd className="font-[var(--font-display)] text-4xl tracking-[-0.02em] text-[color:var(--color-accent)] pb-1">
                66 MB
              </dd>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                Docker image
              </dt>
            </div>
            <div>
              <dd className="font-[var(--font-display)] text-4xl tracking-[-0.02em] text-[color:var(--color-accent)] pb-1">
                93/96
              </dd>
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-fg-meta)]">
                Lighthouse perf/a11y
              </dt>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-4">
            {t.colophon.creditsHeading}
          </h2>
          <p className="text-[color:var(--color-fg-muted)] leading-[1.6]">{t.colophon.credits}</p>
        </section>
      </div>
    </div>
  );
}
