import puppeteer from "puppeteer-extra";

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import path from "path";

// get the absolute extension path
const pathToExtension = path.join(process.cwd(), "fixtures", "AdBlockReal");

(async () => {
  // launch a browser instance
  const browser = await puppeteer.launch({
    // launch the browser in the headful mode
    headless: false,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    // add the extension to the browser
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });
  // open a new browser tab
  let page = await browser.newPage();
  // go the Chrome extensions page
  await page.goto("chrome://extensions/");
  // take a screenshot
  await page.screenshot({
    path: `./screenshots/puppeteer-chrome-extensions.png`,
  });
  // close the tab and browser
  await page.close();
  await browser.close();
})();
