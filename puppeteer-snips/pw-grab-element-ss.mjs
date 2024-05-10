import { chromium } from "playwright-extra";
import crypto from "crypto";

import StealthPlugin from "puppeteer-extra-plugin-stealth";

chromium.use(StealthPlugin());

const urls = [
  "https://httpbin.dev/html",
  "https://www.amazon.de/-/en/Connect-Multiparameters-Ketone-Strips-Bluetooth/dp/B08YQXMT9G/",
];

async function run() {
  // usual browser startup:
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  });
  const page = await context.newPage();
  // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
  for (const url of urls) {
    const hashed = crypto.createHash("sha256").update(url).digest("hex");
    await page.goto(url);
    await page.screenshot({
      type: "png", // can also be "jpeg" or "webp" (recommended)
      path: `./screenshots/pw-${hashed}-screenshot.png`, // where to save it
      fullPage: true, // will scroll down to capture everything if true
    });
    try {
      const element = await page.$("p");
      await element.screenshot({
        path: `./screenshots/pw-${hashed}-just-the-paragraph.png`,
        type: "png",
      });
    } catch (e) {
      console.error(`Error while trying to grab the element: ${e}`);
      const element = await page.$("span#productTitle");
      await element.screenshot({
        path: `./screenshots/pw-${hashed}-just-the-paragraph.png`,
        type: "png",
      });
    }
  }

  browser.close();
}

run();
