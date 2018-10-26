const express = require('express');
const path = require('path');
const mysql = require('mysql');
const db = require('../db/connection.js');

const statsQuery = 'USE funding_stats; SELECT pledged, goal, currency, backers, deadline, category, city, state, country FROM campaigns WHERE id = ?;';
const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../funding-widget/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/campaigns/:campaignId/stats', (req, res) => { // handle requests for a given campaigns stats
  db.query(statsQuery, [parseInt(req.params.campaignId)], (error, results) => {
    res.status(200).send(results[1][0]);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});