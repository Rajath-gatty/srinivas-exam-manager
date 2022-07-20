const mysql = require('mysql2');
const connection = mysql.createPool({
    host: process.env.HOST,
    database:process.env.DATABASENAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit:20,
})

module.exports = connection.promise();