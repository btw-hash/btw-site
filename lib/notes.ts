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
    slug: 'courseai',
    title: 'CourseAI',
    tagline:
      'AI-generated structured courses from YouTube, PDF or raw text — shipped to paying subscribers in 4 weeks.',
    year: '2026',
    status: 'Live',
    role: 'Full-cycle SaaS · spec to paid subscribers',
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
      { value: '4 weeks', label: 'Spec to paid subscribers' },
      { value: 'Stripe', label: 'Subscription billing live' },
      { value: '3', label: 'Input formats (YT / PDF / text)' },
      { value: 'ADR-0001', label: 'Auth pivot documented' },
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
        body: 'Creators had raw knowledge in YouTube transcripts, PDFs or long-form docs but no scaffolding for learners. We built a platform that ingests any of those inputs and emits a structured course: modules, lessons, quizzes, reading-time estimates. Shipped to paying subscribers in one month.',
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
        body: 'Live at the link above. Four weeks from empty repo to first paying subscriber. Stripe subscription billing, email-only auth, course generation from any of three input formats. What we ship for clients with similar SaaS briefs.',
      },
    ],
  },
  {
    slug: 'content-channel',
    title: 'Content Channel',
    tagline:
      'Automated content pipeline — one Obsidian note goes live across Telegram, LinkedIn and Instagram on schedule. Zero copy-paste.',
    year: '2025',
    status: 'Live',
    role: 'Content ops automation · we eat our own dogfood',
    timeline: '2 weeks · Nov 2025',
    href: 'https://t.me/btw_aitech',
    accent: '#FFB86B',
    gradient:
      'radial-gradient(ellipse at 30% 60%, rgba(255,184,107,0.35), transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(158,255,110,0.2), transparent 60%)',
    stack: ['Node.js', 'Grammy (Telegram)', 'Claude', 'n8n', 'Cron', 'Express', 'Obsidian sync'],
    metrics: [
      { value: '3', label: 'Platforms auto-published' },
      { value: 'daily', label: 'Publishing cadence held' },
      { value: '2 weeks', label: 'Idea → live pipeline' },
      { value: 'live', label: 'Running in production since Nov 2025' },
    ],
    tags: ['automation', 'content', 'service'],
    receipts: {
      agents: ['architect', 'telegram-bot-expert', 'prompt-engineer', 'developer'],
      commits: 80,
      deploys: 4,
      shippedIn: '2 weeks',
    },
    sections: [
      {
        heading: 'Context',
        body: 'Cross-platform content duplication is the #1 reason content pipelines die. We needed one writing surface (Obsidian) and automated downstream publishing to Telegram, LinkedIn and Instagram. We built it for ourselves first — now we ship the same pipeline to studios, solo creators and small teams who want content ops without the copy-paste tax.',
      },
      {
        heading: 'Approach',
        body: 'Obsidian stays the authoring layer — that is where work actually happens. A Node service watches the vault, extracts publish-ready markdown, uses Claude to adapt tone per platform (short Telegram post, structured LinkedIn with hook, Instagram caption with hashtags), and schedules delivery through Grammy + platform APIs. n8n orchestrates retries and batches.',
      },
      {
        heading: 'Outcome',
        body: 'Our public channel @btw_aitech runs on this pipeline daily since November 2025. Two weeks from idea to live, held daily cadence since. The service offering: same setup adapted to your vault and your platforms in two weeks. You write once, we handle the rest.',
      },
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}
