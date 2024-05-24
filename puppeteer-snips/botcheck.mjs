import puppeteer from "puppeteer-extra";

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async (browser) => {
  console.log("Running tests..");
  const page = await browser.newPage();
  await page.goto("https://nowsecure.nl", {
    waitUntil: "networkidle2",
  });
  // await page.goto("https://bot.sannysoft.com");
  // await sleep(50000);
  await page.screenshot({
    path: "./screenshots/testresult.png",
    fullPage: true,
  });
  await browser.close();
  console.log(`All done, check the screenshot. ✨`);
});
