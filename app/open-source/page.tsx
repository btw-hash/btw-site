import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { OpenSourceContent } from '@/components/pages/OpenSourceContent';

export const metadata: Metadata = {
  title: 'Open source',
  description:
    'MIT-licensed tools extracted from BTW Studio infrastructure. Free to use, no strings.',
};

export default function OpenSourcePage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 min-h-[80dvh]">
        <OpenSourceContent />
      </main>
      <SiteFooter />
    </>
  );
}
