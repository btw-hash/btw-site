import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { essays, getEssay } from '@/lib/writing';
import { AgentDashboardEssay } from '@/components/essays/AgentDashboardEssay';

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return { title: 'Not found' };
  return { title: essay.title, description: essay.subtitle };
}

const ESSAYS: Record<string, React.ComponentType> = {
  'agent-dashboard-60fps-on-fly': AgentDashboardEssay,
};

export default async function EssayPage({ params }: Params) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();
  const Body = ESSAYS[essay.slug];
  if (!Body) notFound();

  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 min-h-[80dvh]">
        <Body />
      </main>
      <SiteFooter />
    </>
  );
}
