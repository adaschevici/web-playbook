import dotenv from "dotenv";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import crypto from 'crypto';
import fs from 'fs';
import util from 'util';
import mergeImg from 'merge-img';

dotenv.config();
const readFile = util.promisify(fs.readFile);


const urls = [
  "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"
]

puppeteer.use(StealthPlugin())


async function grabSelectorScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    for (const url of urls) {
      const hashed = crypto.createHash('sha256').update(url).digest('hex');
      await page.goto(url, {waitUntil: 'networkidle0'});
      const element = await page.$("div#document1 div.eli-container");
      const {width, height} = await element.boundingBox();
      console.log(width, height);
      const designatedPathPng = `./screenshots/${hashed}-merged-ss.png`;
      // await element.screenshot({"path": designatedPathPng, "type": "png"});
      // await Promise.all([
      //   element.screenshot({
      //     clip: {
      //       x: 0,
      //       y: 0,
      //       height: Math.floor(height / 75),
      //       width,
      //     },
      //   }),
      //   element.screenshot({
      //     clip: {
      //       x: Math.floor(height / 75) * 1,
      //       y: 0,
      //       height: Math.floor(height / 75),
      //       width,
      //     },
      //   })
      // ])
      const chunks = Array.from({length: 35}, (_, i) => {
        return element.screenshot({
          clip: {
            x: 0,
            y: i * Math.floor(height / 35),
            height: Math.floor(height / 35),
            width,
          },
          path: `./screenshots/${hashed}-${i}-ss.png`
        })
      });
      await Promise.all(chunks)
       .then((chunks) => mergeImg(chunks))
       .then((final) => final.write(designatedPathPng, () => browser.close()));
      const dataPng = await readFile(designatedPathPng);
      const b64imgPng = Buffer.from(dataPng).toString('base64');
      return b64imgPng;
    }
}

async function main() {
  await grabSelectorScreenshot();
  // const propertyInfoImage = await grabSelectorScreenshot();
  // console.log(propertyInfoImage.length);
}

main();

