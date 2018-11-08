const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('../db/connection');

const statsQuery = `USE funding_stats; SELECT pledged, goal, currency, backers, 
                    deadline, category, city, state, country FROM campaigns WHERE id = ?;`;
const port = 3002;
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:campaignId/stats', cors(), (req, res) => { // handle requests for a given campaign's stats
  const campaign = parseInt(req.params.campaignId, 10); // parse out the campaign's unique id
  db.query(statsQuery, [campaign], (error, results) => { // retrieve stats from the database
    if (error) {
      res.status(404).send(error);
      return;
    }
    res.status(200).send(results[1][0]);
  });
});

app.get('/:campaignId', (req, res) => { // handle requests for a given campaign's stats
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${port}`);
});
