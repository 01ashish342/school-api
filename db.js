const mysql= require('mysql2');

const db= mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {

    if(err){
        console.log("DB Connection Failed:", err);
    }
    else{
        console.log("DB Connected Successfully");

    }


});

module.exports=db;
