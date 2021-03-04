const express = require("express");
const CryptoJS = require("crypto-js");
const router = express.Router();
const { queryDB } = require("../helpers/db-helpers");
const ExpressBrute = require("express-brute");

// Since this is simple site we will use the local memory store
// But for further development a robust memory store is required
// https://github.com/AdamPflug/express-brute
const store = new ExpressBrute.MemoryStore();

const failCallback = (req, res) => {
  res
    .status(403)
    .send(
      "Error, You've made too many failed attempts in a short period of time, please try again."
    );
  res.redirect("/");
};

const handleStoreError = (error) => {
  log.error(error);
  throw {
    message: error.message,
    parent: error.parent,
  };
};

const bruteforce = new ExpressBrute(store, {
  freeRetries: 10,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});

// Existing user
router.post("/login", bruteforce.prevent, async function (req, res, next) {
  try {
    const { username, password } = req.body;

    const query = `SELECT password, salt, user_id FROM Users WHERE username = '${username}'`;
    const results = await queryDB(query);

    if (results.length <= 0) {
      return res.status(401).send("Not found.");
    }

    const saltedPwd = `${password}${results[0].salt}`;
    const hashedPwd = CryptoJS.SHA512(saltedPwd).toString(CryptoJS.enc.Hex);

    if (results[0].password === hashedPwd) {
      return res.status(200).send(results[0].user_id.toString());
    } else {
      return res.status(401).send("Bad password");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register new user
router.post("/register", bruteforce.prevent, async function (req, res, next) {
  try {
    const { username, password, salt } = req.body;

    // check db
    const queryForExisting = `SELECT user_id FROM Users WHERE username = '${username}'`;
    const existingUser = await queryDB(queryForExisting);

    if (existingUser.length > 0) {
      return res.status(400).send("This username is already registered.");
    }

    const saltedPwd = `${password}${salt}`;
    const hashedPwd = CryptoJS.SHA512(saltedPwd).toString(CryptoJS.enc.Hex);

    const queryToRegister = `INSERT INTO Users (username, password, salt) VALUES ('${username}', '${hashedPwd}', '${salt}')`;
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
