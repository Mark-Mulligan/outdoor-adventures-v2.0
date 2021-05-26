require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('.'));

// Define middleware here
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

app.get('/api/parks', (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  const page = parseInt(req.query.page, 10);

  const offset = (page - 1) * limit;
  const endIndex = page * limit;

  console.log(typeof limit, page, offset);

  const queryString = `SELECT *, count(*) OVER() AS results from parks LIMIT ${limit} OFFSET ${offset};`;
  connection.query(queryString, (error, result) => {
    if (error) throw error;

    const data = {};

    if (endIndex < result[0].results) {
      data.next = {
        page: page + 1,
        limit,
      };
    }

    if (page - 1 > 0) {
      data.previous = {
        page: page - 1,
        limit,
      };
    }

    data.results = result;

    console.log(result);
    res.json(data);
  });
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Start the API server now
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
