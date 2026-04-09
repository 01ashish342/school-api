const mysql= require('mysql2');

const db= mysql.createConnection({
    host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT

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
