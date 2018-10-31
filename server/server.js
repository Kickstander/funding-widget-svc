import express from 'express';
import path from 'path';
import db from '../db/connection';

const statsQuery = `USE funding_stats; SELECT pledged, goal, currency, backers, 
                    deadline, category, city, state, country FROM campaigns WHERE id = ?;`;
const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../funding-widget/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/campaigns/:campaignId/stats', (req, res) => { // handle requests for a given campaign's stats
  const campaign = parseInt(req.params.campaignId, 10); // parse out the campaign's unique id

  db.query(statsQuery, [campaign], (error, results) => { // retrieve stats from the database
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return;
    }
    res.status(200).send(results[1][0]);
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${port}`);
});
