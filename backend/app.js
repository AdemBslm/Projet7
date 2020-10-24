const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/post');

const app = express();

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;