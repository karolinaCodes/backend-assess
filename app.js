const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Middleware //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Separated Routes for each Resource //
const pingRouter = require('./routes/ping');
const postsRouter = require('./routes/posts');

// Mount all resource routes
app.use('/api/ping', pingRouter);
app.use('/api/posts', postsRouter);

module.exports = app;

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
