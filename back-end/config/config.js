const { Pool } = require('mysql');

var databaseOptions = {
    host     : 'localhost',
    database : 'test',
    user     : 'root',
    password : 'root',
    port     : '8889'
};

const pool = new Pool({
    // what do we put here? do we have a db url?
})
module.exports = { databaseOptions, pool };