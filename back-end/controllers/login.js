const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { queryDB } = require('../helpers/db-helpers');

// Existing user
router.post('/login', [
    check('username').exists(),
    check('password').exists()
], async function (req, res, next){
    try {
        const { username, password } = req.body;

        const query = `SELECT password, id FROM Users WHERE username = ${username}`;
        const results = await queryDB(query);
    
        if(!dbResults) {
            return res.status(401).send('Not found.');
        }
    
        if(results.password === password) {
            return res.status(200).send(results.id);
        } else {
            return res.status(403).send('Bad password');
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// Register new user
router.post('/', [
    check('username').exists(),
    check('password').exists()
], async function(req, res, next) {
    try {
        const { username } = req.body;

        // check db
        const queryForExisting = `SELECT id FROM Users WHERE username = ${username}`;
        const existingUser = await queryDB(queryForExisting);

        if(existingUser) {
            return res.status(400).send('This username is already registered.')
        }

        const { password } = req.body;
        const queryToRegister = `INSERT INTO Users (${username}, ${password})`;
        const resultsOfRegister = await queryDB(queryToRegister);
        // will be undef. if there's an error
        if(!resultsOfRegister) {
            return res.status(500).send('Error registering.');
        }

        return res.status(200).send('Registered');

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
