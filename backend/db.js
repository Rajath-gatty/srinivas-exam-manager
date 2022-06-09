const mysql = require('mysql2');
const connection = mysql.createPool({
    host: '162.241.30.80',
    database: 'sspbyjmy_sem',
    user: 'sspbyjmy_sem',
    password: 'Maccak.qkV!-',
    connectionLimit: 10
})

module.exports = connection.promise();