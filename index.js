const PORT = process.env.PORT || 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
var rezept = {};

app.get("/chefkoch/:recipieURL", (req, res) => {
  const recipieURL = req.params.recipieURL.split("_");
  const url = "https://www.chefkoch.de/rezepte/" + recipieURL[0] + "/" + recipieURL[1] + ".html";
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const zutaten = [];
      var title = "";
      var portions = "5";
      var schritte = "";

      $(".ds-input", html).each(function () {
        portions = $(this).attr("value");
        console.log(portions);
      });

      $("article", html).each(function () {
        schritte = $(this).find("div", 0).text();
        console.log(schritte);
      });

      $("h1", html).each(function () {
        title = $(this).text();
      });

      $("tr", html).each(function () {
        var menge = $(this).find(".td-left").text();
        menge = menge.replace(/\s/g, "");

        var zutat = $(this).find(".td-right").text();
        zutat = zutat.trim();
        zutaten.push({ menge, zutat });
      });

      rezept["titel"] = title;
      rezept["portion"] = portions;
      rezept["zutaten"] = zutaten;
      rezept["schritte"] = schritte;
      console.log(rezept);
    })
    .catch((error) => {
      console.log(error);
    });

  res.json(rezept);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
