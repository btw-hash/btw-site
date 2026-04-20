import type { Metadata } from 'next';
import { SnakeMenu } from '@/components/layout/SnakeMenu';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PilotContent } from '@/components/pages/PilotContent';

export const metadata: Metadata = {
  title: 'Pilot offer — free AI booking bot in 14 days',
  description:
    'We build a Telegram booking bot for your salon, clinic or service business at zero cost. You give a testimonial and 30 days of metrics.',
};

export default function PilotPage() {
  return (
    <>
      <SnakeMenu />
      <main id="main" className="pt-32 min-h-[80dvh]">
        <PilotContent />
      </main>
      <SiteFooter />
    </>
  );
}
