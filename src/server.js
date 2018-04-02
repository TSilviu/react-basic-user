const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/register', function registerHandler(req, res){})

app.post('/login', function loginHandler(req, res){})

// start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000 or http://127.0.0.1:4000');
});
