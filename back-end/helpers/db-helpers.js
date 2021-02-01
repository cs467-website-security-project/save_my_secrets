const mysql = require("mariadb");
// Note that configuration is dependent on user's mysql/db setup
let pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  database: "sms",
  user: "root",
  password: "root",
  port: "3306",
});

const test = pool.query("select * from users");
console.log(test);

async function queryDB(query) {
  try {
    const result = pool.query(query);
    return result;
  } catch (e) {
    throw e;
  }
}

module.exports = { queryDB };
