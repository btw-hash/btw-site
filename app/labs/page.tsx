import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { LabsContent } from '@/components/pages/LabsContent';

export const metadata: Metadata = {
  title: 'Labs — experiments & internal tools',
  description:
    'The tools BTW Studio uses internally, shown publicly. Not client work — the R&D that clients benefit from.',
};

export default function LabsPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 min-h-[80dvh]">
        <LabsContent />
      </main>
      <SiteFooter />
    </>
  );
}
