var mysql = require("mysql");

const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "McAndrew90)",
    database: "burgers_db"
});

connection.connect(function(err){
    if (err) {
        console.error("Error" + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;