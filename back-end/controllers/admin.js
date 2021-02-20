const express = require("express");
const router = express.Router();
const { queryDB } = require("../helpers/db-helpers");

router.get("/admin/get-users", async function (req, res, next) {
  try {
    const query = `SELECT username, date_added, user_id FROM Users WHERE user_id != 1`;
    const results = await queryDB(query);

    if (results.length === 0) {
      return res.status(204).send("No users found");
    } else if (results.length >= 0) {
      return res.status(200).send(results);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
