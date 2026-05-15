#!/usr/bin/env node
/**
 * Captures diverse screenshots of the live CourseAI for /notes/courseai gallery.
 *
 * Usage:
 *   node scripts/capture-courseai-screenshots.mjs
 *
 * Routes captured (all public, no auth):
 *   1. /           — landing hero (desktop)
 *   2. /leaderboard — public top courses
 *   3. /share/<token> — first public course page (discovered from leaderboard)
 *   4. /share/<token>/lesson/<lessonId> — public lesson with inline check
 *   5. /signin     — sign-in split layout
 *   6. /           — landing (mobile 390×844)
 *
 * Outputs to: public/notes/courseai/{landing,leaderboard,share-course,share-lesson,signin,landing-mobile}.png
 */

import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'public/notes/courseai');
const BASE = process.env.COURSEAI_URL ?? 'https://courseai-jade.vercel.app';

async function shot(page, url, out, opts = {}) {
  console.log(`→ ${url}  →  ${out}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
    await page.waitForTimeout(opts.settle ?? 2000);
    await page.screenshot({ path: out, fullPage: opts.fullPage ?? false });
    console.log(`  ✓`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${err.message}`);
    return false;
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  // Desktop context
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await desktop.newPage();

  await shot(page, `${BASE}/`, resolve(OUT_DIR, 'landing.png'));
  await shot(page, `${BASE}/leaderboard`, resolve(OUT_DIR, 'leaderboard.png'), {
    fullPage: false,
    settle: 2500,
  });

  // Discover share tokens from sitemap (more reliable than leaderboard which is auth-gated)
  let shareTokens = [];
  try {
    const sitemapRes = await page.goto(`${BASE}/sitemap.xml`, { waitUntil: 'load', timeout: 20_000 });
    const xml = await sitemapRes.text();
    shareTokens = Array.from(xml.matchAll(/\/share\/([a-f0-9]{32})/gi)).map((m) => m[1]);
    shareTokens = [...new Set(shareTokens)];
    console.log(`  found ${shareTokens.length} public share tokens in sitemap`);
  } catch (err) {
    console.error(`  ! sitemap fetch failed: ${err.message}`);
  }
  const shareCourseUrl = shareTokens[0] ? `${BASE}/share/${shareTokens[0]}` : null;
  let shareLessonUrl = null;

  if (shareCourseUrl) {
    await shot(page, shareCourseUrl, resolve(OUT_DIR, 'share-course.png'), {
      fullPage: false,
      settle: 2500,
    });

    // Try to discover a lesson link inside the share course page
    try {
      shareLessonUrl = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/lesson/"]'));
        const href = links.find((a) => /\/share\/[^/]+\/lesson\/[a-z0-9-]+/i.test(a.getAttribute('href') || ''))
          ?.getAttribute('href');
        return href ? `${location.origin}${href}` : null;
      });
    } catch {}

    if (shareLessonUrl) {
      await shot(page, shareLessonUrl, resolve(OUT_DIR, 'share-lesson.png'), {
        fullPage: false,
        settle: 3000,
      });
    } else {
      console.log('  ! no lesson link found on share course page — skipping lesson shot');
    }
  } else {
    console.log('  ! no public-share link on leaderboard — skipping share screens');
  }

  await shot(page, `${BASE}/signin`, resolve(OUT_DIR, 'signin.png'), { settle: 2500 });

  await desktop.close();

  // Mobile context — landing only
  const mobile = await browser.newContext({
    ...devices['iPhone 14 Pro'],
    deviceScaleFactor: 3,
  });
  const mpage = await mobile.newPage();
  await shot(mpage, `${BASE}/`, resolve(OUT_DIR, 'landing-mobile.png'), { settle: 2500 });

  await mobile.close();
  await browser.close();

  console.log('\nDone. Update lib/notes.ts media[] for /notes/courseai to wire new shots.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
