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
  db.get("select * from users where email= ?", req.body.email, userHandler);

  function userHandler(err, row) {
    if(!row) {
      db.run(
        'insert into users (name, email, password, total) values (?, ?, ?, ?)',
        [req.body.name, req.body.email, req.body.password, 100],
        () => {}
      );
      res.status(200);
    } else {
      res.status(400).send('User already exists, please login.');
    }
  }
})

app.post('/login', function loginHandler(req, res){
  db.get("select * from users where email= ?", req.body.email, userHandler)

  function userHandler(err, row) {
    if(err) throw err;

    if(row) {
      if(row.password === req.body.password) {
        const response = {
          name: row.name,
          email: row.email,
          bambeuros: row.total
        }
        res.send(JSON.stringify(response));
      } else {
        res.status(401).send('Incorrect password!');
      }
    } else {
      res.status(401).send('Incorrect email!');
    }
  }
})

app.post('/transfer', function tranferHandler(req, res){
  db.get("select * from users where email= ?", req.body.toEmail, transferUserHandler)

  function transferUserHandler(err, row) {
    if(err) throw err;

    if(row){
      db.run(
        'insert into transactions (fromEmail, toEmail, amount) values (?, ?, ?)',
        [req.body.fromEmail, req.body.toEmail, req.body.amount],
        transactionHandler
      );

      const total = row.total + req.body.amount;
      function transactionHandler(err, row){
        if(err) throw err;

        db.run(
          'update users set total= ? where email= ?',
          [total, req.body.toEmail],
          totalHandler
        );

        function totalHandler(err, row) {
          if(err) throw err;

          res.send(200);
        }
      }
    } else {
      res.status(400).send('No such email!');
    }
  }
})

// start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000 or http://127.0.0.1:4000');
});
