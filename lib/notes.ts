export type Metric = { value: string; label: string };

export type ProcessReceipts = {
  agents: string[];
  commits?: number;
  deploys?: number;
  shippedIn?: string;
  specRef?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: 'Live' | 'NDA' | 'Archived' | 'Maintenance';
  role: string;
  timeline: string;
  href?: string;
  nda?: boolean;
  accent: string;
  gradient: string;
  stack: string[];
  metrics: Metric[];
  sections: { heading: string; body: string }[];
  tags: string[];
  receipts?: ProcessReceipts;
};

export const notes: CaseStudy[] = [
  {
    slug: 'agent-dashboard',
    title: 'Agent Dashboard',
    tagline: 'Real-time pixel-art observatory for Claude Code agents.',
    year: '2026',
    status: 'Live',
    role: 'Full-cycle product: research → design → build → deploy',
    timeline: '3 weeks · Feb–Mar 2026',
    href: 'https://agent-dashboard-ancient-mountain-4835.fly.dev',
    accent: '#9EFF6E',
    gradient:
      'radial-gradient(ellipse at 20% 30%, rgba(158,255,110,0.35), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(184,166,255,0.2), transparent 60%)',
    stack: [
      'Node.js',
      'WebSocket (ws)',
      'Vite 5',
      'Canvas 2D',
      'Chokidar',
      'Playwright',
      'Vitest',
      'Docker',
      'Fly.io',
    ],
    metrics: [
      { value: '20+', label: 'Agents visualized live' },
      { value: '60fps', label: 'Canvas 2D render loop' },
      { value: '60 MB', label: 'Docker image on Fly.io' },
      { value: '3 wk', label: 'Spec to production' },
    ],
    tags: ['product', 'realtime', 'devtools'],
    receipts: {
      agents: [
        'architect',
        'developer',
        'test-engineer',
        'performance-engineer',
        'devops-automator',
      ],
      commits: 340,
      deploys: 3,
      shippedIn: '3 weeks',
    },
    sections: [
      {
        heading: 'Context',
        body: 'We needed a single pane of glass for twenty-plus Claude Code agents running across local and remote environments. Off-the-shelf observability tools treated each agent as a log stream; we wanted a game-like spatial view that matched how we actually think about multi-agent systems.',
      },
      {
        heading: 'Approach',
        body: 'Canvas 2D renderer in vanilla JS — no React inside the paint loop, too much overhead at 60fps. Twenty-three JS modules, each under 200 LOC. WebSocket layer on raw ws for minimal latency. Chokidar watchers on agent directories emit events; each file change broadcasts a diff over the socket; canvas redraws only the affected agent tile.',
      },
      {
        heading: 'Constraints',
        body: 'Target hardware: Fly.io shared-cpu-1x with 512 MB memory. No WebGL, no external canvas library. Docker image ≤ 100 MB. Cold start ≤ 1 s. These constraints drove most of the design decisions.',
      },
      {
        heading: 'Outcome',
        body: 'Shipped in three weeks including migration from Railway to Fly.io after trial expiry. Running in production at the link above, observing 20+ agents with zero-downtime deploys via GitHub Actions. Playwright e2e covers the critical user flows, Vitest + husky pre-commit keeps the main branch green.',
      },
    ],
  },
  {
    slug: 'courseai',
    title: 'CourseAI',
    tagline: 'AI-generated structured courses from YouTube, PDF or raw text.',
    year: '2026',
    status: 'Maintenance',
    role: 'Full-cycle product: MVP → paid subscribers',
    timeline: '4 weeks · Mar–Apr 2026',
    href: 'https://courseai-jade.vercel.app',
    accent: '#B8A6FF',
    gradient:
      'radial-gradient(ellipse at 60% 30%, rgba(184,166,255,0.4), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(255,184,107,0.2), transparent 60%)',
    stack: [
      'Next.js 15',
      'React 18',
      'TypeScript',
      'Prisma',
      'Neon Postgres',
      'NextAuth',
      'Stripe',
      'Google Gemini',
      'Tailwind',
      'Vercel',
    ],
    metrics: [
      { value: '4 wk', label: 'MVP to paid subscribers' },
      { value: '3', label: 'Input formats supported' },
      { value: '100%', label: 'Static generation coverage' },
      { value: '1 ADR', label: 'Auth provider pivot' },
    ],
    tags: ['ai', 'saas', 'subscription'],
    receipts: {
      agents: [
        'product-manager',
        'business-analyst',
        'architect',
        'prisma-expert',
        'developer',
        'reviewer',
        'test-engineer',
      ],
      commits: 180,
      deploys: 12,
      shippedIn: '4 weeks',
    },
    sections: [
      {
        heading: 'Context',
        body: 'Creators had raw knowledge in YouTube transcripts, PDFs or long-form docs but no scaffolding for learners. We built a platform that ingests any of those inputs and emits a structured course: modules, lessons, quizzes, reading-time estimates.',
      },
      {
        heading: 'Approach',
        body: 'Next.js 15 App Router with server actions for ingestion, Gemini for generation, Neon for state. NextAuth for email-only auth after we hit a dead end with Google OAuth (documented as ADR-0001). Stripe for subscription billing. Tailwind for UI.',
      },
      {
        heading: 'Stack decisions',
        body: 'Gemini over OpenAI for cost at the target quality bar — course generation is a long-context task where Gemini Pro wins on price-per-token. Neon over Supabase for pure Postgres + branching on PRs. Vercel for deploy to pair with Next 15 edge features.',
      },
      {
        heading: 'Outcome',
        body: 'Live at the link above. Active development paused, maintenance mode — delivered to users and handed off to a lightweight support cadence.',
      },
    ],
  },
  {
    slug: 'content-channel',
    title: 'Content Channel',
    tagline:
      'One source of truth — Obsidian — publishes to Telegram, LinkedIn, Instagram on schedule.',
    year: '2025',
    status: 'Live',
    role: 'Internal tool · automation',
    timeline: '2 weeks · Nov 2025',
    accent: '#FFB86B',
    gradient:
      'radial-gradient(ellipse at 30% 60%, rgba(255,184,107,0.35), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(158,255,110,0.2), transparent 60%)',
    stack: ['Node.js', 'Grammy (Telegram)', 'Claude', 'n8n', 'Cron', 'Express', 'Obsidian sync'],
    metrics: [
      { value: '3', label: 'Platforms cross-posted' },
      { value: 'daily', label: 'Publishing cadence' },
      { value: '2 wk', label: 'Idea to running' },
      { value: '0', label: 'Manual copy-paste' },
    ],
    tags: ['automation', 'content', 'internal'],
    receipts: {
      agents: ['architect', 'telegram-bot-expert', 'prompt-engineer', 'developer'],
      commits: 80,
      deploys: 4,
      shippedIn: '2 weeks',
    },
    sections: [
      {
        heading: 'Context',
        body: 'Building in public works only with discipline. Duplicating the same thought across Telegram, LinkedIn and X is the fastest way to abandon the habit. We needed one writing surface and automated downstream publishing.',
      },
      {
        heading: 'Approach',
        body: 'Obsidian stays the authoring layer — that is where work actually happens. A Node service watches the vault, extracts publish-ready markdown, uses Claude to adapt tone per platform (short Telegram post, structured LinkedIn with hook, Instagram caption with hashtags), and schedules delivery through Grammy + platform APIs. n8n orchestrates retries and batches.',
      },
      {
        heading: 'Outcome',
        body: 'Daily publishing at @btw_aitech without the tax of cross-platform copy-paste. The discipline stuck because the friction vanished. Content now doubles as public documentation of the studio.',
      },
    ],
  },
  {
    slug: 'claude-agents-marketplace',
    title: 'Claude Agents Marketplace',
    tagline: 'Public catalog of 37 Claude Code subagents + 17 skills with one-click install.',
    year: '2026',
    status: 'Live',
    role: 'Product · AI ecosystem',
    timeline: '1 day · Apr 2026',
    href: 'https://agents-btw-studio.fly.dev',
    accent: '#B8A6FF',
    gradient:
      'radial-gradient(ellipse at 30% 30%, rgba(184,166,255,0.38), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(158,255,110,0.18), transparent 60%)',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind',
      'gray-matter',
      'Fuse.js',
      'react-markdown',
      'shiki',
      'Fly.io',
      'GitHub Actions',
    ],
    metrics: [
      { value: '37', label: 'Agents seeded' },
      { value: '17', label: 'Skills seeded' },
      { value: '62', label: 'Static pages' },
      { value: '1 day', label: 'Spec to live' },
    ],
    tags: ['product', 'ai', 'ecosystem', 'catalog'],
    receipts: {
      agents: ['product-manager', 'architect', 'developer', 'reviewer'],
      commits: 1,
      deploys: 1,
      shippedIn: '1 day',
    },
    sections: [
      {
        heading: 'Context',
        body: 'Claude Code subagents and skills are powerful but discoverability is broken — most people find them through Reddit threads, gists and DMs. We had 37 production-tested agents and 17 skills sitting in our own workspace and no curated way to share them. A public catalog fixes both problems.',
      },
      {
        heading: 'Approach',
        body: 'Static-first: markdown files in seed/ are parsed at build time by scripts/build-data.ts (gray-matter + personal-data sanitize + tag inference) into data/*.json. Next.js 15 App Router SSG generates 62 static pages. Fuse.js fuzzy search and tag filters are fully client-side. No database, no auth, no runtime dependencies.',
      },
      {
        heading: 'Stack decisions',
        body: 'Reused the btw-site Tailwind tokens, Dockerfile and Fly.io deploy pattern — dark-luxe stays consistent across the studio. Skipped Supabase intentionally for MVP: catalog data is static markdown, perfect for SSG. Shiki code highlighting runs in server components only, zero client bundle cost.',
      },
      {
        heading: 'Outcome',
        body: 'Live at the link above. Companion open-source seed repo at github.com/workmailan8n-hash/btw-agents-pack (MIT). Routes: /agents, /skills, per-slug detail pages with install snippets (clipboard API + textarea fallback), sitemap, robots. Built with the same agent pipeline (product-manager → architect → developer → reviewer) that the catalog itself publishes.',
      },
    ],
  },
  {
    slug: 'btw-studio-site',
    title: 'BTW Studio · this site',
    tagline: 'Editorial dark-luxe brand site with r3f hero, Next.js 15, deployed on Fly.io.',
    year: '2026',
    status: 'Live',
    role: 'Self-referential case study',
    timeline: '2 days · Apr 2026',
    href: '/',
    accent: '#9EFF6E',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(158,255,110,0.35), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(184,166,255,0.22), transparent 60%)',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind v3',
      'Framer Motion',
      'three.js',
      '@react-three/fiber',
      '@react-three/drei',
      'Resend',
      'Fly.io',
    ],
    metrics: [
      { value: '7', label: 'Sections on homepage' },
      { value: '108', label: 'Tools in Toolbox' },
      { value: '3', label: 'New agents authored' },
      { value: '2 d', label: 'Spec to live' },
    ],
    tags: ['brand', '3d', 'editorial'],
    receipts: {
      agents: [
        'product-manager',
        'business-analyst',
        'brand-identity-designer',
        'motion-designer',
        '3d-scene-designer',
        'ux-designer',
        'developer',
        'reviewer',
      ],
      commits: 52,
      deploys: 4,
      shippedIn: '2 days',
    },
    sections: [
      {
        heading: 'Context',
        body: 'The studio ships products but had no canonical URL. @btw_aitech carries the daily narrative; this site carries the proposition. Editorial brutalist-luxury was the brief: look expensive without relying on stock imagery or agency filler.',
      },
      {
        heading: 'Approach',
        body: 'Waterfall-style pipeline: PRD, brand kit, UX wireframes, motion spec, 3D scene spec — each produced by a dedicated agent, each gated on approval. Implementation batched into sections: hero with iridescent r3f blob, services with pointer-reactive tilt, work as editorial table with floating preview, bento Toolbox listing 108 tools.',
      },
      {
        heading: 'Stack decisions',
        body: 'Next.js 15 + React 19 for the latest App Router + r3f 9 compat matrix. Instrument Serif as a free Migra replacement for display headlines. Framer Motion for UI reveals and hover interactions, plain r3f for the 3D scene — no Spline, to avoid vendor lock-in and keep a.glb-free pipeline.',
      },
      {
        heading: 'Outcome',
        body: 'Live site with functional contact form (Resend + Telegram notification to @news_seller_bot), a /notes index listing project case studies (you are reading one), and a serious-looking Toolbox + Stats block that converts trust at the top of the funnel.',
      },
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
