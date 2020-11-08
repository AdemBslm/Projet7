const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'adem',
    password : 'adem13200',
    database : 'groupomania'
});

db.connect((err) => {
    if(err){
        console.log("Mysql Connection failed...")
        throw err;
    }
    console.log("Mysql Connected...");
})

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);


module.exports = app;