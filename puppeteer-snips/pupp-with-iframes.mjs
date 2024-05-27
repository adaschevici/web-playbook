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
    await page.goto("http://localhost:8000/root.html", {
      waitUntil: "networkidle0",
    });
    // await page.goto("https://bot.sannysoft.com");
    // await sleep(50000);
    const internalIframe = await page.$("iframe");
    const frame = await internalIframe.contentFrame();
    const button = await frame.$("h1#cucamanga");
    console.log(button);
    console.log(await button.evaluate((node) => node.textContent));
    // await page.screenshot({
    //   path: "./screenshots/testresult.png",
    //   fullPage: true,
    // });
    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
  });
