const mysql = require('mysql');
// Note that configuration is dependent on user's mysql/db setup
let pool = mysql.createPool({ connectionLimit : 10, host : 'localhost', database : 'test', user : 'root', password : 'root', port : '8889' });

async function queryDB(query) {
    try {
        return await pool.query(query)
    } catch (e) {
        throw e
    }
};

module.exports = { queryDB }
