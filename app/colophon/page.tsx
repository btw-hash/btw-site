import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { ColophonContent } from '@/components/pages/ColophonContent';

export const metadata: Metadata = {
  title: 'Colophon — about this site',
  description:
    'How this site was built. Stack, process, credits, and the waterfall pipeline that ships it.',
};

export default function ColophonPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 min-h-[80dvh]">
        <ColophonContent />
      </main>
      <SiteFooter />
    </>
  );
}
