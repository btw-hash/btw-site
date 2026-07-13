'use client';

import { motion } from 'motion/react';
import { useLocale } from '@/lib/i18n/context';
import { ToolboxCategoryIcon } from '@/components/graphics/ToolboxCategoryIcon';

type Tile = {
  group: string;
  items: string[];
  accent: string;
};

const tiles: Tile[] = [
  {
    group: 'Frontend',
    accent: '#9EFF6E',
    items: [
      'React 19',
      'Next.js 15',
      'TypeScript',
      'Tailwind v3',
      'shadcn/ui',
      'Radix',
      'Framer Motion',
      'GSAP',
      'Lenis',
      'three.js',
      '@react-three/fiber',
      '@react-three/drei',
      'Vite',
      'Canvas 2D',
      'MDX',
      'Shiki',
      'Lucide',
      'React Hook Form',
    ],
  },
  {
    group: 'AI & LLMs',
    accent: '#B8A6FF',
    items: [
      'Claude',
      'Claude Code',
      'Anthropic SDK',
      'OpenAI',
      'Gemini',
      'Ollama',
      'Gemma',
      'Llama',
      'LangChain',
      'Vercel AI SDK',
      'MCP',
      'RAG',
      'Embeddings',
      'Streaming',
      'Tool use',
      'Function calling',
      'Prompt caching',
      'pgvector',
    ],
  },
  {
    group: 'Backend & Data',
    accent: '#FFB86B',
    items: [
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'Neon',
      'Supabase',
      'Drizzle',
      'NextAuth',
      'Stripe',
      'Resend',
      'Zod',
      'REST',
      'WebSocket',
      'Server-Sent Events',
      'Redis',
      'Upstash',
      'Grammy (TG)',
      'Edge Functions',
      'Cron',
    ],
  },
  {
    group: 'Infra & Deploy',
    accent: '#9EFF6E',
    items: [
      'Fly.io',
      'Vercel',
      'Docker',
      'Dockerfile',
      'GitHub Actions',
      'Cloudflare',
      'Linux',
      'Nginx',
      'CI/CD',
      'Plausible',
      'Sentry',
      'Lighthouse CI',
      'Semantic Release',
      'pnpm',
      'npm',
      'Renovate',
      'Changesets',
      'Turbo',
    ],
  },
  {
    group: 'Quality',
    accent: '#B8A6FF',
    items: [
      'Vitest',
      'Playwright',
      'axe-core',
      'ESLint',
      'Prettier',
      'husky',
      'lint-staged',
      'TypeScript strict',
      'Zod runtime',
      'Conventional Commits',
      'tsc --noEmit',
      'React Testing Library',
      'MSW',
      'happy-dom',
      'Storybook',
      'Chromatic',
      'Web Vitals',
      'Accessibility audit',
    ],
  },
  {
    group: 'Workflow',
    accent: '#FFB86B',
    items: [
      'Claude Code',
      'Cursor',
      'VS Code',
      'Antigravity',
      'Codex CLI',
      'Figma',
      'Notion',
      'Obsidian',
      'Linear',
      'Warp',
      'iTerm',
      'git + gh CLI',
      'n8n',
      'ADR',
      'Markdown specs',
      'Waterfall skills',
      'MCP servers',
      'Raycast',
    ],
  },
];

const marqueeItems = tiles.flatMap((t) => t.items);
const totalCount = marqueeItems.length;

export function Toolbox() {
  const { t } = useLocale();

  return (
    <section
      id="toolbox"
      aria-labelledby="toolbox-heading"
      className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 overflow-hidden border-y border-[color:var(--color-fg-dim)]/30"
    >
      <div className="flex items-center justify-between mb-14">
        <h2 id="toolbox-heading" className="section-label">
          {t.toolbox.heading}
        </h2>
        <span className="font-mono text-[10px] tracking-[0.1em] text-[color:var(--color-fg-dim)] hidden md:block">
          {totalCount} {t.toolbox.counter}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 3) * 0.08,
            }}
            className="group relative rounded-[2px] p-6 md:p-7 min-h-[260px] border border-[color:var(--color-fg-dim)]/25 hover:border-[color:var(--color-fg-dim)]/55 transition-all duration-300 overflow-hidden"
            style={{
              background: `linear-gradient(145deg, ${tile.accent}0d 0%, transparent 50%), var(--color-bg-elev-1)`,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
              style={{
                background: `radial-gradient(400px circle at 50% -20%, ${tile.accent}18, transparent 65%)`,
              }}
            />

            <div className="relative flex items-center gap-2 mb-5">
              <ToolboxCategoryIcon group={tile.group} color={tile.accent} />
              <span
                className="inline-block w-1 h-1 rounded-full ml-1"
                style={{ background: tile.accent }}
                aria-hidden
              />
              <h3
                className="font-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: tile.accent }}
              >
                {tile.group}
              </h3>
              <span className="ml-auto font-mono text-[10px] text-[color:var(--color-fg-dim)]">
                {tile.items.length}
              </span>
            </div>

            <ul className="relative flex flex-wrap gap-x-3 gap-y-1.5">
              {tile.items.map((tx, idx) => (
                <motion.li
                  key={tx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + idx * 0.01, duration: 0.35 }}
                  className="font-[var(--font-sans)] text-[13px] md:text-sm tracking-[-0.005em] text-[color:var(--color-fg-muted)] group-hover:text-[color:var(--color-fg-primary)] transition-colors duration-200"
                >
                  {tx}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div
        className="relative overflow-hidden mt-16 py-5 border-t border-[color:var(--color-fg-dim)]/15"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 160,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 font-[var(--font-display)] text-2xl md:text-[2.5rem] tracking-[-0.025em] text-[color:var(--color-fg-dim)]/60 hover:text-[color:var(--color-fg-primary)] transition-colors duration-300"
            >
              {item}
              <span aria-hidden className="text-[color:var(--color-accent)]/40 text-[8px]">
                ◆
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
