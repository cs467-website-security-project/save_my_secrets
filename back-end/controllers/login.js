const express = require("express");
const router = express.Router();
const { queryDB } = require("../helpers/db-helpers");

// Existing user
router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;

    const query = `SELECT password, user_id FROM Users WHERE username = '${username}'`;
    const results = await queryDB(query);

    if (!results) {
      return res.status(401).send("Not found.");
    }

    if (results[0].password === password) {
      return res.status(200).send(results[0].user_id.toString());
    } else {
      return res.status(403).send("Bad password");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register new user
router.post("/register", async function (req, res, next) {
  try {
    const { username, password } = req.body;

    // check db
    const queryForExisting = `SELECT id FROM Users WHERE username = ${username}`;
    const existingUser = await queryDB(queryForExisting);

    if (existingUser) {
      return res.status(400).send("This username is already registered.");
    }

    const queryToRegister = `INSERT INTO Users (${username}, ${password})`;
    const resultsOfRegister = await queryDB(queryToRegister);
    // will be undef. if there's an error
    if (!resultsOfRegister) {
      return res.status(500).send("Error registering.");
    }

    return res.status(200).send("Registered");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
