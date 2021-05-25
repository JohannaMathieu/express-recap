const connection = require('./db-config');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get("/users/:name", (request, response) => {
    response.send(`Welcome ${request.params.name}`);
  });

connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
    } else {
      console.log('connected to database with threadId :  ' + connection.threadId);
    }
});

app.get('/api/movies', (req, res) => {
    connection.query('SELECT * FROM movies', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving data from database');
      } else {
        res.status(200).json(result);
      }
    });
});

app.get('/api/movies/:id', (req, res) => {
    connection.query(`SELECT * FROM movies WHERE id=${req.params.id}`, (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving data from database');
      } else {
        res.status(200).json(result);
      }
    });
});