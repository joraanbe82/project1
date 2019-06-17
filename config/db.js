var mysql = require('mysql');
//create connection to database


const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'foo',
    password: 'bar',
    database: 'gym'
});

//connect to database
dbConn.connect(err => {
    if (err) throw err;
});

console.log('Connected to database');

//export db to have it available in every module
module.exports = dbConn;