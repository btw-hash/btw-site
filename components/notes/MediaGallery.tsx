'use client';

import { motion } from 'motion/react';
import { ease, stagger } from '@/lib/motion/tokens';
import type { MediaItem } from '@/lib/notes';

interface Props {
  items: MediaItem[];
  accent: string;
  heading: string;
}

/**
 * Case-study media — auto-detects layout:
 *   - first item with aspect='phone' → mobile device frame
 *   - first item with aspect='wide'  → 16:9 fluid panel
 *   - tail of N items → 2-3 col responsive grid
 */
export function MediaGallery({ items, accent, heading }: Props) {
  if (!items.length) return null;
  const [hero, ...rest] = items;

  return (
    <section className="px-6 md:px-12 lg:px-20 py-12 border-b border-[color:var(--color-fg-dim)]/30">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--color-fg-muted)] mb-6">
          {heading}
        </h2>

        <Hero item={hero} accent={accent} />

        {rest.length > 0 && (
          <ul
            className={`mt-6 grid gap-4 ${
              rest.every((r) => r.aspect !== 'wide')
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {rest.map((item, i) => (
              <motion.li
                key={item.src + i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: ease.expoOut,
                  delay: 0.15 + i * stagger.card,
                }}
                className="group"
              >
                <Tile item={item} accent={accent} />
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Hero({ item, accent }: { item: MediaItem; accent: string }) {
  if (item.aspect === 'phone') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: ease.expoOut }}
        className="flex justify-center"
      >
        <PhoneFrame item={item} accent={accent} />
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: ease.expoOut }}
      className="relative aspect-[16/10] rounded-md overflow-hidden border border-[color:var(--color-fg-dim)]/40 bg-[color:var(--color-bg-elev-1)]"
      style={{ boxShadow: `0 30px 60px -30px ${accent}33` }}
    >
      <Media item={item} className="w-full h-full object-cover" />
    </motion.div>
  );
}

function Tile({ item, accent }: { item: MediaItem; accent: string }) {
  const aspect = item.aspect === 'wide' ? 'aspect-[16/10]' : 'aspect-[9/19.5]';
  return (
    <div
      className={`relative ${aspect} rounded-sm overflow-hidden border border-[color:var(--color-fg-dim)]/40 bg-[color:var(--color-bg-elev-1)] transition-all duration-300 group-hover:border-[color:var(--color-fg-dim)]`}
      style={{ boxShadow: `0 12px 30px -20px ${accent}33` }}
    >
      <Media item={item} className="w-full h-full object-cover" />
      {item.caption && (
        <span className="absolute bottom-2 left-2 right-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--color-fg-meta)] opacity-0 group-hover:opacity-100 transition-opacity">
          {item.caption}
        </span>
      )}
    </div>
  );
}

function PhoneFrame({ item, accent }: { item: MediaItem; accent: string }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute -inset-8 rounded-[2.5rem] blur-3xl opacity-20"
        style={{ background: accent }}
      />
      <div
        className="relative rounded-[2.2rem] overflow-hidden border border-[color:var(--color-fg-dim)]/60 bg-black"
        style={{
          width: 320,
          height: 'auto',
          aspectRatio: '9 / 19.5',
          padding: 8,
          boxShadow: `0 40px 80px -30px ${accent}55, 0 0 0 1px rgba(255,255,255,0.05) inset`,
        }}
      >
        <div className="relative h-full w-full rounded-[1.6rem] overflow-hidden bg-[color:var(--color-bg-base)]">
          <Media item={item} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function Media({ item, className }: { item: MediaItem; className?: string }) {
  if (item.kind === 'video') {
    return (
      <video
        src={item.src}
        poster={item.poster}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={className}
      />
    );
  }
  return <img src={item.src} alt={item.caption ?? ''} loading="lazy" className={className} />;
}
