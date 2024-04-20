import OpenAI from "openai";
import dotenv from "dotenv";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import crypto from 'crypto';
import { JSDOM } from 'jsdom';
import ora from 'ora';
import fs from 'fs';
import util from 'util';
import fullPageScreenshot from 'puppeteer-full-page-screenshot';

dotenv.config();
const openai = new OpenAI();
const readFile = util.promisify(fs.readFile);


const urls = [
  "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"
]

puppeteer.use(StealthPlugin())

async function run(propertyInfoImage, imageType) {

  // spinner.text = 'Sending HTML to OpenAI';
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Can you extract the property prices out of this
            image and send me the results? Can you send me the output as JSON?`
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/${imageType};base64,${propertyInfoImage}`,
            }
          },
        ],
      },
    ],
  });
  // spinner.succeed('Received response from OpenAI');
  // console.log(response.choices[0]);
  console.log(response.usage);
}

async function grabSelectorScreenshot() {
  // usual browser startup:
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 10000, deviceScaleFactor: 0 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    for (const url of urls) {
      const hashed = crypto.createHash('sha256').update(url).digest('hex');
      await page.goto(url, {waitUntil: 'networkidle0'});
      // the following code will scroll to the bottom of the page
      // await page.evaluate(async () => {
      //   await new Promise((resolve, reject) => {
      //     var totalHeight = 0;
      //     var distance = 300; // should be less than or equal to window.innerHeight
      //     var timer = setInterval(() => {
      //       var scrollHeight = document.body.scrollHeight;
      //       window.scrollBy(0, distance);
      //       totalHeight += distance;

      //       if(totalHeight >= scrollHeight){
      //         clearInterval(timer);
      //         resolve();
      //       }
      //     }, 500);
      //   });
      // });
      // spinner.text = 'Getting element from page';
      const element = await page.$("div#document1 div.eli-container");
      const designatedPathPng = `./screenshots/${hashed}-list-ss.png`;
      await element.screenshot({"path": designatedPathPng, "type": "png"});
      browser.close();
      const dataPng = await readFile(designatedPathPng);
      const b64imgPng = Buffer.from(dataPng).toString('base64');
      return b64imgPng;

    }

}

async function main() {
  const propertyInfoImage = await grabSelectorScreenshot();
  console.log(propertyInfoImage.length);
  // run(propertyInfoImages.b64imgPng, 'png');
  // run(propertyInfoImages.b64imgJpg, 'jpeg');
}

main();

