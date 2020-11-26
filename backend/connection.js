const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'adem',
    password : 'adem13200',
    database : 'groupomania'
});

module.exports = db;