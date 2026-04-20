const mysql = require('mysql2/promise');

const pool = mysql.createPool(process.env.MYSQL_URL);

pool.getConnection()
  .then((conn) => {
    console.log("DB Connected Successfully");
    conn.release();
  })
  .catch((err) => {
    console.error("DB Connection Failed:", err);
  });

module.exports = pool;