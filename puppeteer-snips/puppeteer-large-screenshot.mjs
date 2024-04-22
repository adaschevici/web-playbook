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

const chunkBy = (n) => number => {
  let chunks = new Array(Math.floor(number / n)).fill(n);
  chunks = chunks.map((c, i) => {return {height: c, start: i * c}});

  const remainder = number - chunks[chunks.length - 1].start - chunks[chunks.length - 1].height;
  if (remainder > 0) {
    chunks.push({height: remainder, start: chunks[chunks.length - 1].start + chunks[chunks.length - 1].height});
  }

  console.log('CHUNKS = ', chunks);
  return chunks;
};

const chunkBy4k = chunkBy(4000);

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
async function grabSelectorScreenshot() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    for (const url of urls) {
      const hashed = crypto.createHash('sha256').update(url).digest('hex');
      await page.goto(url, {waitUntil: 'networkidle0'});
      const element = await page.$("div#document1 div.eli-container");
      const {width, height} = await element.boundingBox();
      const designatedPathPng = `./screenshots/${hashed}-merged-ss.png`;
      const heights = chunkBy4k(height);
      const chunks = heights.map((h, i) => {
        return element.screenshot({
          clip: {
            x: 0,
            y: h.start,
            height: h.height,
            width,
          },
          path: `./screenshots/${hashed}-${i}-ss.png`
        })
      });
      const filesResolved = await Promise.all(chunks)
      const mergedImage = await mergeImg(filesResolved, {direction: true});
      mergedImage.write(designatedPathPng, async () => {
        browser.close();
        const dataPng = await readFile(designatedPathPng);
        const b64imgPng = Buffer.from(dataPng).toString('base64');
        return b64imgPng;
      });
      //  .then((chunks) => mergeImg(chunks, {direction: true}))
      //  .then((final) => final.write(designatedPathPng, () => browser.close()))
      //  .catch((error) => {
      //    console.error(error);
      //    browser.close();
      //  });
       
    }
}

async function main() {
  await grabSelectorScreenshot();
  // const propertyInfoImage = await grabSelectorScreenshot();
  // console.log(propertyInfoImage.length);
}

main();

