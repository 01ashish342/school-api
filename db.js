const mysql= require('mysql2');

const db= mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "ashish12345",
    database: "school_db",

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
