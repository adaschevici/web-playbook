import { chromium } from 'playwright-extra';

import StealthPlugin from 'puppeteer-extra-plugin-stealth'
chromium.use(StealthPlugin());


async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://bot.sannysoft.com');
  await page.screenshot({ path: './screenshots/pw-testresult.png', fullPage: true });
  await browser.close();
  console.log(`All done, check the screenshot. ✨`);
}

run();
