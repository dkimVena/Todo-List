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
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect(keys.mongooseURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const router = express.Router();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api', api);
// app.get('/api/todos', (req, res) => {
//     const todos = [
//         { id: 0, content: ' 리액트 소개1', checked: false, color: '#343a40'},
//         { id: 1, content: ' 리액트 소개2', checked: true, color: '#343a40' },
//         { id: 2, content: ' 리액트 소개3', checked: false, color: '#343a40' }
//     ];
//     res.set('Content-Type', 'application/json');
//     res.send(todos);
// });

// // Answer API requests.
// app.get('/api', function (req, res) {
//     res.set('Content-Type', 'application/json');
//     res.send('{"message":"Hello from the custom server!"}');
// });

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use(router);
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});