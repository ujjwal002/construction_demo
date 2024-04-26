const express = require("express");
const path = require("path");
const axios = require("axios");
const puppeteer = require("puppeteer");
const { promisify } = require("util");
const { execFile } = require("child_process");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/search", (req, res, next) => {
  var searchQuery = req.query.search;
  console.log("searching for: " + searchQuery);
  console.log(searchQuery);

  const googleCustomSearchUrl = `https://customsearch.googleapis.com/customsearch/v1?cx=578607853b885431e&key=AIzaSyDkcwTxdcezaN1nWd2AD3BnXvhv5dwDtYc&q=' ${searchQuery}`;

  axios
    .get(googleCustomSearchUrl)
    .then((response) => {
      console.log("here is the response", response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error retrieving search results:", error);
      res.status(500).send("Error retrieving search results");
    });
});

async function scrapePage() {
  // Specify the path to Chromium executable
  const chromiumPath =
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: chromiumPath,
  });

  const page = await browser.newPage();

  // go to github front page
  await page.goto(
    "https://www.homedepot.com/p/2-in-x-4-in-x-8-ft-Prime-Stud-058449/312528776"
  );

  // wait for page to render
  await new Promise((res) => setTimeout(res, 1000));

  // get the price element text
  const priceAndInventory = await page.evaluate(() => {
    const priceElement = document.querySelector(".price");
    const inventoryElement = document.querySelector(".sui-ml-1");
    const aisleElement = document.querySelector(".aisle");
    const priceData = priceElement ? priceElement.textContent : null;
    const inventoryData = inventoryElement
      ? inventoryElement.textContent
      : null;
    return { price: priceData, inventory: inventoryData };
  });

  console.log(priceAndInventory); // log the price

  // take a screenshot

  await browser.close();
}

scrapePage();

// async function searchConstructionCompanies(location) {
//   try {
//     const apiKey = "AIzaSyDkcwTxdcezaN1nWd2AD3BnXvhv5dwDtYc&q"; // Replace with your Google Custom Search API key
//     const searchEngineId = "578607853b885431e"; // Replace with your Google Custom Search Engine ID
//     const query = `construction companies ${location}`;

//     const response = await axios.get(
//       `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`
//     );

//     const results = response.data.items;

//     console.log("here is the resut", results);

//     // Extract relevant information from search results
//     const companyData = results.map((result) => ({
//       title: result.title,
//       link: result.link,
//       snippet: result.snippet,
//     }));

//     // console.log("here it is", companyData);

//     return companyData;
//   } catch (error) {
//     console.error("Error:", error);
//     return [];
//   }
// }

// Example usage: Searching for construction companies in a specific location
// const location = "India";
// searchConstructionCompanies(location)
//   .then((data) => {
//     console.log(`Construction companies in ${location}:`, data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
