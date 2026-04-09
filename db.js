const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
});

db.connect((err) => {

    if(err){
        console.log("DB Connection Failed:", err);
    }
    else{
        console.log("DB Connected Successfully");

    }


});

module.exports=db;
