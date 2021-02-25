const express = require("express");
const router = express.Router();
const { queryDB } = require("../helpers/db-helpers");

router.get("/user/:userId", async function (req, res, next) {
  try {
    const userId = req.params["userId"];

    const query = `SELECT secret_id, secret
      FROM Users u INNER JOIN Secrets s
      ON u.user_id = s.user
      WHERE u.user_id = ${userId}`;

    const results = await queryDB(query);
    res.status(200).send(results);
  } catch (err) {
    console.log("user.js API ERROR:", err);
    res.status(500).send(err);
  }
});

router.delete("/user/:userId", async function (req, res, next) {
  try {
    const { userId } = req.params;

    const query = `DELETE FROM Users WHERE Users.user_id = ${userId}`;

    const results = await queryDB(query);

    if (results.affectedRows === 1) {
      return res.status(200).send("SUCCESS");
    }
  } catch (err) {
    console.log("user.js API ERROR:", err);
    res.status(500).send(err);
  }
});

router.post("/user/secret", async function (req, res) {
  try {
    const { secret, userId } = req.body;

    const query = `INSERT INTO Secrets (secret, user)
      VALUES ('${secret}', ${userId})`;

    const results = await queryDB(query);

    if (results.affectedRows === 1) {
      return res.status(200).send("SUCCESS");
    } else {
      return res.status(401).send("401");
    }
  } catch (err) {
    console.log("user.js API ERROR:", err);
    res.status(500).send(err);
  }
});

router.delete("/delete-secret/:secretId", async function (req, res) {
  try {
    const secretId = req.params["secretId"];

    const query = `DELETE from Secrets WHERE secret_id = ${secretId}`;

    const results = await queryDB(query);

    if (results.affectedRows != 1) {
      return res.status(400).send("Something wrong");
    } else {
      return res.status(200).send("deleted");
    }
  } catch (err) {
    console.log("user.js API ERROR:", err);
    res.status(500).send(err);
  }
});

module.exports = router;
