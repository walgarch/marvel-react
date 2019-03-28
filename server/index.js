const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const NodeCache = require("node-cache");
const request = require("request");
const rp = require("request-promise");
const md5 = require("md5");

const cache = new NodeCache({ stdTTL: 500, checkperiod: 600 });

const marvelKeys = JSON.parse(fs.readFileSync("keys/keys.json")).keys;

const app = express();
app.use(bodyParser.json());
app.use(pino);

app.get("/api/character", (req, res) => {
  const name = req.query.name || "spider man";
  rp.get(
    `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${name}&orderBy=onsaleDate&limit=10&apikey=${
      marvelKeys.public
    }&hash=${md5(
      new Date() + marvelKeys.private + marvelKeys.public
    )}&ts=${new Date()}`
  )
    .then(response => {
      if (cache.get(name)) {
        return Promise.resolve(response); // retrieve cached response
      } else {
        cache.set(name, response); // save reponse to cache and return response
        return response;
      }
    })
    .then(results => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json");
      res.send(results);
    })
    .done();
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
