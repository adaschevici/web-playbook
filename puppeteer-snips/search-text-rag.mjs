import OpenAI from "openai";
import dotenv from "dotenv";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import crypto from "crypto";
import { JSDOM } from "jsdom";
import ora from "ora";

dotenv.config();
const openai = new OpenAI();

const urls = ["https://eur-lex.europa.eu/eli/reg/2022/2554/oj"];

puppeteer.use(StealthPlugin());

async function run(propertyInfoHtml) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Can you extract the articles from this
            html and send me the results? I also want a title for each article. Can you send me the output as JSON?`,
          },
          {
            type: "text",
            text: propertyInfoHtml,
          },
        ],
      },
    ],
  });
  // console.log(response.choices[0]);
  console.log(response.usage);
}

async function extractHtml() {
  // usual browser startup:
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  );
  for (const url of urls) {
    const hashed = crypto.createHash("sha256").update(url).digest("hex");
    await page.goto(url);
    const element = await page.$("div#document1 div.eli-container");
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
  run(propertyInfoHtml);
}
