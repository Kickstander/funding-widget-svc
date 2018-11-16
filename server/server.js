const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('../db/connection.js');


const statsQuery = `USE funding_stats; SELECT pledged, goal, currency, backers, 
                    deadline, category, city, state, country FROM campaigns WHERE id = ?;`;

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

app.post('/:campaignId/stats', (req, res) => {
  const data = req.body;
  db.Campaign.addCampaign(data.id, data.pledged, data.goal,
    data.backers, data.media, data.category, data.city,
    data.state, data.currency, data.country, data.deadline);
  res.end();
});

// app.put('/api/:campaignId/stats', (req, res) => {
//   const id = req.params.campaignId;
//   db.updateCampaign(id, req.body, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.delete('/api/:campaignId/stats', (req, res) => {
//   const id = req.params.campaignId;
//   db.deleteCampaign(id, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// });


module.exports = app;
