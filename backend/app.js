const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postsRoutes = require('./routes/posts');
const app = express();

mongoose.connect('mongodb+srv://Brandon:123@cluster0-wdjil.mongodb.net/node-angular?retryWrites=true',
  { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch((err) => {
    console.log('Connection to Database failed!', err);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/posts', postsRoutes);

module.exports = app;
