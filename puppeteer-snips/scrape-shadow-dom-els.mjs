import puppeteer from "puppeteer";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto("http://localhost:3000");

  const shadowHostSelector = "#first-label";
  const targetWithinShadowDOM = "#my-cool-text";
  try {
    const labelTextsFromShadowDOM = await fetchTextFromShadowDOM(
      page,
      shadowHostSelector,
      targetWithinShadowDOM,
    );
    console.log(labelTextsFromShadowDOM);
    // -> This is some text inside the shadow DOM
  } catch (error) {
    console.error("Error fetching text from shadow DOM:", error);
  }

  await browser.close();
})();

// The function just need the selector for the web-component
// and the selector for the element you are looking for within
// the shadow-DOM
async function fetchTextFromShadowDOM(
  page,
  shadowHostSelector,
  targetSelector,
) {
  try {
    return await page.evaluate(
      (shadowHostSelector, targetSelector) => {
        // look for the element in the normal DOM
        const shadowHost = document.querySelector(shadowHostSelector);
        if (!shadowHost) throw new Error("Shadow host not found");
        // once we have the element in the normal DOM, we look for the
        // element we want within the shadow-DOM of that element.
        const targetElement =
          shadowHost.shadowRoot.querySelector(targetSelector);
        if (!targetElement) throw new Error("Target element not found");
        return targetElement.textContent;
      },
      shadowHostSelector,
      targetSelector,
    );
  } catch (error) {
    throw new Error(`Failed to fetch text from shadow DOM: ${error.message}`);
  }
}
