const { pool } = require('../config/config');

async function queryDB(query) {
    try {
        return await pool.query(query)
    } catch (e) {
        throw e
    }
};

module.exports = { queryDB }