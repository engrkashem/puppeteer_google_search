const puppeteer = require("puppeteer");

async function run() {
  // initiate the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://www.google.com");

  // Set view port size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(
    'textarea[name="q"]',
    "why puppeteer is not installing by npm in linux mint"
  );

  /** need further code to write */

  console.log("The first search result heading:", firstResultHeading);

  await browser.close();

  //   //   // Locate the full title with a unique string
  //   const textSelector = await page.waitForSelector(
  //     "text/Customize and automate"
  //   );
  //   const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  //   //   // Print the full title
  //   console.log('The title of this blog post is "%s".', fullTitle);

  //   await browser.close();
}
run();

// (async () => {
//   // Launch the browser and open a new blank page
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate the page to a URL
//   await page.goto("https://www.google.com");

//   // Set screen size
//   await page.setViewport({ width: 1080, height: 1024 });

//   // Typing and submitting the form
//   await page.type('textarea[name="q"]', "cat");

//   // evalue input[type=submit] before click
//   const submitBtn = await page.$("input[type=submit]");
//   await submitBtn.evaluate((btn) => btn.click());

//   // console log the next page results
//   await page.waitForNavigation();
//   console.log("New page URL:", page.url());

//   await browser.close();
// })();
