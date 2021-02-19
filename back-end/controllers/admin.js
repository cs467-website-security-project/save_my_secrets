const express = require("express");
const router = express.Router();
const { queryDB } = require("../helpers/db-helpers");

router.get("/admin/get-users", async function (req, res, next) {
  try {
    const query = `SELECT username, date_added FROM Users`;
    const results = await queryDB(query);

    if (userArray.length <= 0) {
      return res.status(401).send("No users found");
    }
    return res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
