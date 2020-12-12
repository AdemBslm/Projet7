const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('./connection');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

db.connect((err) => {
    if(err){
        console.log("Mysql Connection failed...")
        throw err;
    }
    console.log("Mysql Connected...");
})

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);

//db end
 
module.exports = app;