import OpenAI from "openai";
import dotenv from "dotenv";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import crypto from 'crypto';
import { JSDOM } from 'jsdom';
import ora from 'ora';

dotenv.config();
const openai = new OpenAI();

const urls = [
  "https://www.immobiliare.it/vendita-case/verona/?criterio=rilevanza&prezzoMassimo=120000"
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
            html and send me the results? The text is in italian so
            you should translate that. Can you send me the output as JSON?`
          },
          {
            type: "text",
            text: propertyInfoHtml,
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
      await page.goto(url);
      spinner.text = 'Getting element from page';
      const element = await page.$(".in-listAndMapContent__list");
      const designatedPath = `./screenshots/${hashed}-list-ss.png`;
      await element.screenshot({"path": designatedPath, "type": "png"});
      return designatedPath;

    }

}

const spinner = ora('Accessing Web Page').start();
async function main() {
  const propertyInfoHtml = await extractHtml(spinner);
  run(propertyInfoHtml, spinner);
}


