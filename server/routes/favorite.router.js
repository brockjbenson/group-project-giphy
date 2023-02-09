const express = require("express");
const pool = require("../modules/pool");
const axios = require("axios");
const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM favorites;`;
  pool
    .query(queryText)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
});

// add a new favorite
router.post("/", (req, res) => {
  const url = req.body.url;
  console.log("in the router, this is the url", url);
  const queryText = `INSERT INTO favorites("url")
  VALUES($1);`;
  pool
    .query(queryText, [url])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("ERROR ON LINE 19", error);
    });
});

// update given favorite with a category id
router.put("/:favId", (req, res) => {
  let catagory = req.body;
  queryText = `UPDATE "favorites" SET "category_id"=$1 WHERE id=$2`;
  pool
    .query(queryText, [catagory.category_id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error on line 31", error);
    });
  // req.body should contain a category_id to add to this favorite image
});

// delete a favorite
router.delete("/", (req, res) => {
  // const queryText= `DELETE FROM "favorite" WHERE "id"= $1`
  res.sendStatus(200);
});

router.post("/test", (req, res) => {
  let qparam = req.body.searchWord;
  // req.query.searchWord;
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?q=${qparam}&api_key=${process.env.API_KEY}`
    )
    .then((response) => res.send(response.data))
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});

module.exports = router;
