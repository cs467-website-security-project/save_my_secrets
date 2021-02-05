const express = require("express");
const router = express.Router();
const { queryDB } = require("../helpers/db-helpers");

router.get("/user/:userId", async function (req, res, next) {
  // return array of all secrets for userid
  try {
    const userId = req.params["userId"];

    const query = `SELECT secret FROM secrets WHERE user = ${userId}`;
    const results = await queryDB(query);

    if (results.length <= 0) {
      return res.status(401).send("Not found.");
    } else {
      return res.status(200).send(results);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
