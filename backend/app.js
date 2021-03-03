const express = require('express');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('./connection');
const path = require('path');
const auth = require("./middleware/auth")

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
 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next(); 
});

app.use(bodyParser.json());
app.use(fileUpload());

app.post('/upload',auth, (req, res) => {
    const MIME_TYPES = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif'
    ];
    const file = req.files.file;
    const fileName = Date.now() + file.name;

    if(req.files === null) {
        return res.json('')
    }
    const type = MIME_TYPES.find(type => type === file.type)
    if(type === undefined){
        return res.status(401).send('fichier non accepté.');
    }


    file.mv(`${__dirname}/images/${fileName}`,err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `images/${fileName}`})
    });
}) 

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes);

//db end
 
module.exports = app;