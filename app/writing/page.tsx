import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { WritingIndexContent } from '@/components/pages/WritingIndexContent';

export const metadata: Metadata = {
  title: 'Writing — long-form posts',
  description:
    'Technical deep-dives from BTW Studio. Infrastructure, agents, the things we had to figure out.',
};

export default function WritingPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 min-h-[80dvh]">
        <WritingIndexContent />
      </main>
      <SiteFooter />
    </>
  );
}
