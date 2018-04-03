const express = require('express');
const bodyParser = require('body-parser');
const sql = require('sqlite3').verbose();
const path = require('path');

const dbpath = path.resolve('./', 'bamboo.db');
const db = new sql.Database(dbpath);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/register', function registerHandler(req, res){
  db.run(
    'insert into users (name, email, password, total) values (?, ?, ?, ?)',
    [req.body.name, req.body.email, req.body.password, 100],
    () => {}
  )
})

app.post('/login', function loginHandler(req, res){
  db.get("select * from users where email= ?", req.body.email, userHandler)

  function userHandler(err, row) {
    const response = {};

    if(err) throw err;

    if(row) {
      if(row.password === req.body.password) {
        res.status = 200;
        response.message = 'Successfully logged in!'
      } else {
        res.status(401);
      }
    } else {
      res.status(401);
    }

    res.send(JSON.stringify(response));
  }
})

// start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000 or http://127.0.0.1:4000');
});
