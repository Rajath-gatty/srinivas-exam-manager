const mysql = require('mysql2');
const connection = mysql.createPool({
    host: 'sql6.freesqldatabase.com',
    database: 'sql6496386',
    user: 'sql6496386',
    password: 'ChIr2ZFvgC',
    connectionLimit: 10
})

module.exports = connection.promise();