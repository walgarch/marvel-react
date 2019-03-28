const fs = require("fs");
const api = require("marvel-api");
const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 20, checkperiod: 24 });

const marvelKeys = JSON.parse(fs.readFileSync("keys/keys.json")).keys;

var marvel = api.createClient({
  publicKey: marvelKeys.public,
  privateKey: marvelKeys.private
});

const app = express();
app.use(bodyParser.json());
app.use(pino);

app.get("/api/series/title", (req, res) => {
  const name = req.query.name || "spider-man";
  marvel.series
    .findByTitle(name)
    .then(response => {
      if (cache.get(name)) {
        return Promise.resolve(response); // retrieve cached response
      } else {
        cache.set(name, response); // save reponse to cache and return response
        return response;
      }
    })
    .then(results => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(results));
    })
    .done();
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
