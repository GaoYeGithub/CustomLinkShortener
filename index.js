const express = require('express');
const database = require('@replit/database');
const path = require('path');

const db = new database();
const app = express();

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('server started on port 3000');
});

app.post('/link', (req, res) => {
  let key = '' + req.body.key;
  let value = '' + req.body.value;

  db.set(key, value).then(() => {
    db.get(key).then(link => {
      res.send(path.join(__dirname + '/' + key));
    });
  });
});

app.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname + '/new.html'));
});

app.get('/*', (req, res) => {
  let key = '' + req.originalUrl.substring(1);

  db.get(key).then(link => {
    if (link != null) {
      res.redirect(link);
    } else {
      res.sendStatus(404);
    }
  });
});
