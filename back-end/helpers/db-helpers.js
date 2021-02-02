const mysql = require("mariadb");
const config = require("config");

// Note that configuration is dependent on user's mysql/db setup
let pool = mysql.createPool({
  connectionLimit: config.get("db.connectionLimit"),
  host: config.get("db.host"),
  database: config.get("db.databaseName"),
  user: config.get("db.username"),
  password: config.get("db.password"),
  port: config.get("db.port"),
});

async function queryDB(query) {
  try {
    const result = pool.query(query);
    return result;
  } catch (e) {
    throw e;
  }
}

module.exports = { queryDB };
