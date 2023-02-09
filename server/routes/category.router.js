const express = require("express");
const pool = require("../modules/pool");
require("dotenv").config();
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
  // return all categories
  const queryText = `SELECT * FROM category ORDER BY name ASC`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.get("/test", (req, res) => {
  let { qParam } = req.body;
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?q=${qParam}&api_key=${process.env.API_KEY}`
    )
    .then((response) => res.send(response.data))
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});

module.exports = router;
