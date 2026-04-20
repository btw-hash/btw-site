export type Essay = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: string;
  topic: string;
  accent: string;
};

export const essays: Essay[] = [
  {
    slug: 'agent-dashboard-60fps-on-fly',
    title: 'Shipping 20 live agent cards at 60fps on a 512MB VM',
    subtitle:
      'How we built Agent Dashboard: Canvas 2D over React, raw ws over Socket.io, and why we migrated off Railway mid-flight.',
    date: '2026-04-20',
    readingTime: '12 min',
    topic: 'Engineering',
    accent: '#9EFF6E',
  },
];

export function getEssay(slug: string) {
  return essays.find((e) => e.slug === slug);
}
