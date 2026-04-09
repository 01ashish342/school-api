const mysql = require('mysql2');
const url = require('url');

const dbUrl = new url.URL(process.env.MYSQL_URL);

const db = mysql.createConnection({
  host: dbUrl.hostname,
  port: dbUrl.port,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1)
});

db.connect((err) => {
  if(err){
    console.log("DB Connection Failed:", err);
  }
  else{
    console.log("DB Connected Successfully");
  }
});

module.exports = db;