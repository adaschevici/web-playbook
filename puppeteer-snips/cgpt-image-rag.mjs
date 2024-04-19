import OpenAI from "openai";
import dotenv from "dotenv";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import crypto from 'crypto';
import { JSDOM } from 'jsdom';
import ora from 'ora';
import fs from 'fs';
import util from 'util';

dotenv.config();
const openai = new OpenAI();
const readFile = util.promisify(fs.readFile);

const urls = [
  "https://www.homegate.ch/rent/real-estate/zip-8005/matching-list?ac=2.5"
]

puppeteer.use(StealthPlugin())

async function run(propertyInfoImage, spinner) {

  spinner.text = 'Sending HTML to OpenAI';
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
              url: `data:image/png;base64,${propertyInfoImage}`,
            }
          },
        ],
      },
    ],
  });
  spinner.succeed('Received response from OpenAI');
  console.log(response.choices[0]);
  console.log(response.usage);
}

async function grabSelectorScreenshot(spinner) {
  // usual browser startup:
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    for (const url of urls) {
      const hashed = crypto.createHash('sha256').update(url).digest('hex');
      await page.goto(url, {waitUntil: 'networkidle0'});
      // the following code will scroll to the bottom of the page
      await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 300; // should be less than or equal to window.innerHeight
          var timer = setInterval(() => {
            var scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if(totalHeight >= scrollHeight){
              clearInterval(timer);
              resolve();
            }
          }, 500);
        });
      });
      spinner.text = 'Getting element from page';
      const element = await page.$(".ResultListPage_resultListPage_iq_V2");
      const designatedPath = `./screenshots/${hashed}-list-ss.png`;
      await element.screenshot({"path": designatedPath, "type": "png"});
      browser.close();
      const data = await readFile(designatedPath);
      const b64img = Buffer.from(data).toString('base64');
      return b64img;

    }

}

async function main() {
  const spinner = ora('Accessing Web Page').start();
  const propertyInfoHtml = await grabSelectorScreenshot(spinner);
  run(propertyInfoHtml, spinner);
}

main();
