const puppeteer = require('puppeteer-extra')
const sleep = ms => new Promise(res => setTimeout(res, ms));

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async browser => {
  console.log('Running tests..')
  const page = await browser.newPage()
  await page.goto('https://bot.sannysoft.com')
  // (async () => {
  //   console.log(new Date().getSeconds());
  //   await sleep(3000);
  //   console.log(new Date().getSeconds());
  // })()
  await page.screenshot({ path: 'testresult.png', fullPage: true })
  await browser.close()
  console.log(`All done, check the screenshot. ✨`)
})
