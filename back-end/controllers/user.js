const express = require("express");
const router = express.Router();
const { queryDB } = require("../helpers/db-helpers");

router.get("/user/:userId", async function (req, res, next) {
  // will return {'username': 'sample', 'secret': 'sample} for given userid
  try {
    const userId = req.params["userId"];

    const query = 
      `SELECT username, secret 
      FROM Users u INNER JOIN Secrets s 
      ON u.user_id = s.user 
      WHERE u.user_id = ${userId}`;

    const results = await queryDB(query);

    if (results.length <= 0) {
      return res.status(401).send("Not found.");
    } else {
      return res.status(200).send(results);
    }
  } catch (err) {
    console.log('user.js API ERROR:', err);
    res.status(500).send(err);
  }
});

module.exports = router;
