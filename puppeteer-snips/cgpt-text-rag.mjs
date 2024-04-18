import OpenAI from "openai";
import dotenv from "dotenv";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import crypto from 'crypto';

dotenv.config();
const openai = new OpenAI();

const urls = [
  "https://www.immobiliare.it/vendita-case/verona/?criterio=rilevanza&prezzoMassimo=120000"
]

puppeteer.use(StealthPlugin())

async function run(propertyInfoHtml) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Can you extract the property prices out of this html and send me the results?" },
          {
            type: "text",
            text: propertyInfoHtml,
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}

async function extractHtml() {
  // usual browser startup:
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
    for (const url of urls) {
      const hashed = crypto.createHash('sha256').update(url).digest('hex');
      await page.goto(url);
      const element = await page.$(".in-listAndMapContent__list");
      const innerHtml = await page.evaluate(element => element.innerHTML, element);
      console.log(innerHtml.length);

    }

    browser.close();
}

extractHtml();

