const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const express = require("express");

const app = express();

const url = "https://www.chefkoch.de/rezepte/529741149741836/Zucchini-Zitronen-Nudeln.html";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    $("h1").each(function () {
      const title = $(this).text();
      console.log(title);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
