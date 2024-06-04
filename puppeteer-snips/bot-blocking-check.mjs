import puppeteer from "puppeteer-extra";

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// puppeteer usage as normal
puppeteer
  .launch({ headless: false, defaultViewport: null })
  .then(async (browser) => {
    console.log("Running tests..");
    const page = await browser.newPage();
    await page.goto("https://www.g2.com/products/jira/reviews/", {
      waitUntil: "networkidle0",
    });
    // await page.goto("https://bot.sannysoft.com");
    // await sleep(50000);
    const internalIframe = await page.$("div#turnstile-wrapper iframe");
    console.log(internalIframe);
    const frame = await internalIframe.contentFrame();
    console.log(frame);
    await frame.waitForSelector(
      "div#challenge-stage label.cb-lb input[type='checkbox']",
    );
    const button = await frame.$(
      "div#challenge-stage label.cb-lb input[type='checkbox']",
    );
    await sleep(1000);
    console.log(button);
    await button.click();
    await sleep(45000);
    // await button.click();
    // console.log(await button.evaluate((node) => node.textContent));
    await page.screenshot({
      path: "./screenshots/testresult.png",
      fullPage: true,
    });
    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
  });
