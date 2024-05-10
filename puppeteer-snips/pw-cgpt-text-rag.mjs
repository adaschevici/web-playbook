import OpenAI from "openai";
import dotenv from "dotenv";
import { chromium } from "playwright-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import crypto from "crypto";
import { JSDOM } from "jsdom";
import ora from "ora";

dotenv.config();
const openai = new OpenAI();

const urls = [
  "https://www.immobiliare.it/vendita-case/verona/?criterio=rilevanza&prezzoMassimo=120000",
];

chromium.use(StealthPlugin());

async function run(propertyInfoHtml) {
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
            you should translate that. Can you send me the output as JSON?`,
          },
          {
            type: "text",
            text: propertyInfoHtml,
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
  console.log(response.usage);
}

async function extractHtml() {
  // usual browser startup:
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  });
  const page = await context.newPage();
  for (const url of urls) {
    const hashed = crypto.createHash("sha256").update(url).digest("hex");
    await page.goto(url);
    const element = await page.$(".in-listAndMapContent__list");
    const innerHtml = await page.evaluate(
      (element) => element.innerHTML,
      element,
    );
    console.log(innerHtml.length);
    browser.close();
    const dom = new JSDOM(innerHtml);
    const document = dom.window.document;
    const elements = document.querySelectorAll("*");
    elements.forEach((element) => {
      Array.from(element.attributes).forEach((attribute) => {
        element.removeAttribute(attribute.name);
      });
    });
    const cleanedHtml = dom.serialize();
    console.log(cleanedHtml.length);
    return cleanedHtml;
  }
}

async function main() {
  const propertyInfoHtml = await extractHtml();
  console.log(propertyInfoHtml);
  run(propertyInfoHtml);
}

main();
