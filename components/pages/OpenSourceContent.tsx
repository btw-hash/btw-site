'use client';

import { useLocale } from '@/lib/i18n/context';
import { ProjectTile } from '@/components/tiles/ProjectTile';

export function OpenSourceContent() {
  const { t } = useLocale();

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-[900px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--color-fg-meta)]">
          {t.oss.eyebrow}
        </span>
        <h1 className="mt-4 font-[var(--font-display)] text-5xl md:text-7xl tracking-[-0.03em] leading-[1.05] pb-3">
          {t.oss.heading}
        </h1>
        <p className="mt-6 text-lg text-[color:var(--color-fg-muted)] max-w-[62ch] leading-[1.5]">
          {t.oss.intro}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px]">
        <ProjectTile
          title="vault-sync"
          tagline="Node CLI for one-way Obsidian vault → Notion sync. Frontmatter is the contract. Extracted from our internal publishing pipeline."
          href="https://github.com/btw-hash/vault-sync"
          year="2026"
          status="MIT"
          accent="#FFB86B"
          gradient="radial-gradient(ellipse at 40% 40%, rgba(255,184,107,0.38), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(184,166,255,0.18), transparent 60%)"
          stack={['Node.js 20', 'ESM', '@notionhq/client', 'gray-matter', 'commander']}
          metrics={[
            { value: 'MIT', label: 'License' },
            { value: '9', label: 'Passing tests' },
            { value: '7', label: 'Block types' },
            { value: 'v0.1.0', label: 'Current version' },
          ]}
        />

        <ProjectTile
          title="btw-agents-pack"
          tagline="37 Claude Code subagents + 17 skills in one repo. MIT. Copy-paste install. The same agents this studio runs in production."
          href="https://github.com/btw-hash/btw-agents-pack"
          year="2026"
          status="MIT"
          accent="#B8A6FF"
          gradient="radial-gradient(ellipse at 30% 30%, rgba(184,166,255,0.38), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(158,255,110,0.18), transparent 60%)"
          stack={['Markdown', 'SKILL.md convention', 'Frontmatter', 'MIT']}
          metrics={[
            { value: '37', label: 'Subagents' },
            { value: '17', label: 'Skills' },
            { value: 'MIT', label: 'License' },
            { value: 'v1.0', label: 'Current version' },
          ]}
        />
      </div>

      <div className="mt-20 max-w-[720px] border-t border-[color:var(--color-fg-dim)]/30 pt-8">
        <p className="text-sm text-[color:var(--color-fg-muted)] leading-[1.6]">{t.oss.footnote}</p>
      </div>
    </div>
  );
}
