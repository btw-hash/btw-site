#!/usr/bin/env node
// Captures Keyst demo shots for /notes/keyst MediaGallery.
// Output: public/notes/keyst/*.png
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '..', 'public/notes/keyst');
const BASE = process.env.KEYST_DEMO_URL ?? 'https://keyst-demo.fly.dev';
const ADMIN_EMAIL = 'demo-admin@codes-shop.dev';
const ADMIN_PASS = 'CodesShop2026Demo!';

const DESKTOP = { width: 1440, height: 900 };
const PHONE = { width: 390, height: 844 };

async function shoot(page, path, file, { fullPage = false, wait = 2000 } = {}) {
  const url = BASE + path;
  console.log(`→ ${url} → ${file}`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  } catch (e) {
    console.error(`  goto warn: ${e.message}`);
  }
  await page.waitForTimeout(wait);
  await page.screenshot({ path: resolve(OUT, file), fullPage });
  console.log(`  ✓ ${file}`);
}

async function login(page) {
  await page.goto(BASE + '/login', { waitUntil: 'networkidle' });
  await page.fill('input[name="email"]', ADMIN_EMAIL);
  await page.fill('input[name="password"]', ADMIN_PASS);
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.click('button[type="submit"]'),
  ]);
  await page.waitForTimeout(1500);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  // Desktop public
  const ctxD = await browser.newContext({ viewport: DESKTOP, deviceScaleFactor: 2 });
  const pD = await ctxD.newPage();
  await shoot(pD, '/', 'storefront.png');
  await shoot(pD, '/catalog?category=steam', 'catalog.png');
  await shoot(pD, '/products/cyberpunk-2077-ultimate', 'product.png');
  await shoot(pD, '/setup/branding', 'setup-wizard.png');

  // Admin (logged in)
  try {
    await login(pD);
    await shoot(pD, '/admin', 'admin-dashboard.png');
    await shoot(pD, '/admin/orders', 'admin-orders.png');
    await shoot(pD, '/admin/products', 'admin-products.png');
  } catch (e) {
    console.error('admin shots failed:', e.message);
  }
  await ctxD.close();

  // Mobile
  const ctxM = await browser.newContext({ viewport: PHONE, deviceScaleFactor: 2, isMobile: true });
  const pM = await ctxM.newPage();
  await shoot(pM, '/', 'storefront-mobile.png');
  await ctxM.close();

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
