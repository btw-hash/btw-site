#!/usr/bin/env node
// Captures Agent Dashboard live shots.
// Output: public/notes/agent-dashboard/*.png
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public/notes/agent-dashboard');
const URL = process.env.AD_URL ?? 'https://agent-dashboard-ancient-mountain-4835.fly.dev';

async function shoot(page, file, fullPage = false) {
  await page.screenshot({ path: resolve(OUT, file), fullPage });
  console.log(`  ✓ ${file}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  console.log(`→ ${URL}`);
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  // Let canvas/websocket initialize + sprite atlas load
  await page.waitForTimeout(6000);

  await shoot(page, 'office-wide.png');

  // Click an agent (center of canvas) to open sidebar
  const canvas = await page.$('canvas');
  if (canvas) {
    const box = await canvas.boundingBox();
    if (box) {
      await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.45);
      await page.waitForTimeout(800);
      await shoot(page, 'agent-detail.png');
      // close
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(300);
    }
  }

  // Open leaderboard
  await page.click('#btn-leaderboard').catch(() => {});
  await page.waitForTimeout(800);
  await shoot(page, 'leaderboard.png');
  await page.click('.lb-close').catch(() => {});
  await page.waitForTimeout(300);

  // Open settings
  await page.click('#btn-settings').catch(() => {});
  await page.waitForTimeout(800);
  await shoot(page, 'settings.png');
  await page.click('.settings-close').catch(() => {});
  await page.waitForTimeout(300);

  // Full page (covers HUD + ticker + canvas)
  await shoot(page, 'full.png', true);

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
