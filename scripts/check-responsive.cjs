// Requires Playwright with Chromium. Tests only a local static export.
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.RESPONSIVE_BASE_URL || 'http://127.0.0.1:3189';
if (!['localhost', '127.0.0.1', '[::1]'].includes(new URL(base).hostname)) throw new Error('Use a local preview');
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.RESPONSIVE_CHROMIUM_PATH || undefined });
  const results = [];
  try {
    for (const route of ['/', '/ads.html']) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
        // Do not create ad impressions or call account services.
        await page.route('**/*', request => new URL(request.request().url()).origin === new URL(base).origin ? request.continue() : request.abort());
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200, route);
        await page.evaluate(() => document.fonts.ready);
        const dimensions = await page.evaluate(() => ({
          document: document.documentElement.scrollWidth, body: document.body.scrollWidth,
          accountLinks: [...document.querySelectorAll('a')].filter(a => ['Start free', 'Sign in'].includes(a.textContent.trim())).map(a => a.href),
        }));
        assert(dimensions.document <= width + 1, `${route} at ${width}: document ${dimensions.document}`);
        assert(dimensions.body <= width + 1, `${route} at ${width}: body ${dimensions.body}`);
        assert(dimensions.accountLinks.length > 0, 'Account links missing');
        assert(dimensions.accountLinks.every(href => href === 'https://app.magas7.com/login'), 'Account destination changed');
        const menu = page.getByRole('button', { name: 'Toggle menu' });
        if (await menu.isVisible()) {
          await menu.click();
          assert.equal(await menu.getAttribute('aria-expanded'), 'true');
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Open menu overflows');
          await menu.click();
          assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        }
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'Scrolled page overflows');
        results.push({ route, width, scrollWidth: dimensions.document, accountLinks: dimensions.accountLinks.length, passed: true });
        await page.close();
      }
    }
  } finally { await browser.close(); }
  console.log(JSON.stringify(results, null, 2));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
