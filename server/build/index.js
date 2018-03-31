const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

const keys = require('./config/keys.js');
const api = require('./src/routes');

const app = express();

// db connection
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongodb server');
});
mongoose.connect(keys.mongooseURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.use('/api', api);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

app.use(router);
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});