const puppeteer = require('puppeteer-extra');
const crypto = require('crypto');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const urls = [
    "https://httpbin.dev/html",
    "https://www.amazon.de/-/en/Connect-Multiparameters-Ketone-Strips-Bluetooth/dp/B08YQXMT9G/",
]

async function run() {
  // usual browser startup:
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (const url of urls) {
      const hashed = crypto.createHash('sha256').update(url).digest('hex');
      await page.goto(url);
      await page.screenshot({
        "type": "png", // can also be "jpeg" or "webp" (recommended)
        "path": `./screenshots/${hashed}-screenshot.png`,  // where to save it
        "fullPage": true,  // will scroll down to capture everything if true
      });
      try {
          const element = await page.$("p");
          await element.screenshot({"path": `./screenshots/${hashed}-just-the-paragraph.png`, "type": "png"});
      } catch (e) {
          console.error(`Error while trying to grab the element: ${e}`);
          const element = await page.$("span#productTitle");
          await element.screenshot({"path": `./screenshots/${hashed}-just-the-paragraph.png`, "type": "png"});
      }
    }

    browser.close();
}

run();

