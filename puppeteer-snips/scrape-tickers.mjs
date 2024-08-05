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
    await page.goto("https://dexscreener.com/watchlist/PlgGLEr2XTA0E9P9IvAe", {
      waitUntil: "networkidle0",
    });
    // const checkboxbutton = await page.$("input[name='cf-turnstile-response']");
    // await checkboxbutton.click();
    // await page.goto("https://bot.sannysoft.com");
    // await sleep(50000);
    await page.waitForSelector("div.spacer div div");
    const internalIframe = await page.$("div.spacer div div");
    const { root } = await page._client().send("DOM.describeNode", {
      objectId: internalIframe._remoteObject.objectId,
    });
    const { nodeId } = root.shadowRoots[0];
    console.log(internalIframe.outerHTML);
    // const htmlContent = await page.$$eval(
    //   'pierce/input[type="checkbox"]',
    //   (elements) => elements.map((element) => element.outerHTML),
    // );
    // console.log(htmlContent);
    // // await sleep(1000);
    // const shadowRoot = internalIframe.shadowRoot;
    // await shadowRoot.querySelector("input[type='checkbox']").click();
    // const frame = await internalIframe.contentFrame();
    // console.log(frame);
    // await frame.waitForSelector(
    //   "div#challenge-stage label.cb-lb input[type='checkbox']",
    // );
    // const button = await frame.$(
    //   "div#challenge-stage label.cb-lb input[type='checkbox']",
    // );
    // // console.log(button);
    // await button.click();
    await sleep(200000);
    // await sleep(45000);
    // // await button.click();
    // // console.log(await button.evaluate((node) => node.textContent));
    // await page.screenshot({
    //   path: "./screenshots/testresult.png",
    //   fullPage: true,
    // });
    await browser.close();
    console.log(`All done, check the screenshot. ✨`);
  });
