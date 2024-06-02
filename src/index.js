/**
* DEVELOPER INFO.
    * Mohammad Abul Kashem
    * Email: kashemaust@gmail.com
    * Whatsapp: +8801787317444
    
* STEPS:  
    1. Install puppeteer and others if applicable
    2. Import puppeteer
    3. Launch a browser
    4. Create a new page
    5. Got to Google website
    6. Wait for search box to be loaded completely
    7. Type searchable text in search box
    8. Press enter
    9. Wait for results to be loaded completely
    10. Extract the inner text and href of every result from anchor(a) tag and its inner heading tag by selector
    11. Console log all the results.
    12. [optional] Save results in a text file
    13. Close the browser
 */

const puppeteer = require("puppeteer");
const fs = require("fs");

// Selectors
const searchBoxSelector = "textarea[name='q']";
const searchBtnSelector = "input[value='Google Search']";
const resultSelector = "#rso a";

// website and searchable text
const url = "https://google.com";
const searchText = "future of web automation";

async function run() {
  // Launching a browser
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 },
    userDataDir: "temporary",
  });

  // Creating page
  const page = await browser.newPage();

  // going to google web site
  await page.goto(url, { waitUntil: "networkidle2" });

  // Waiting for loading page completely
  await page.waitForSelector(searchBoxSelector);

  // Typing search text into search box
  await page.type(searchBoxSelector, searchText);

  // Pressing enter after inserting/typing search text
  await page.keyboard.press("Enter");

  // Waiting for loading the result page
  await page.waitForSelector(resultSelector);

  // Extract the inner text of the first result heading
  const results = await page.evaluate((selector) => {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements)
      .map((element) => ({
        title: element.querySelector("h3")
          ? element.querySelector("h3").innerText
          : null,
        url: element.href,
      }))
      .filter((result) => result.title && result.url);
  }, resultSelector);

  // Showing the result in console
  results.forEach((result) =>
    console.log(`Title: ${result.title}\nURL: ${result.url}\n`)
  );

  // [Optional] Saving the result to a out.txt file in root directory
  const resultsText = results
    .map((result) => `Title: ${result.title}\nURL: ${result.url}\n`)
    .join("\n");
  fs.writeFileSync("out.txt", resultsText, "utf8");

  // Closing the browser
  await browser.close();
}
run();
