require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Models = require('../db/models/models.js');
const db = require('../db/db_postgres');

const app = express();
const port = 3002;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowCORS = function (res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
};

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/new/stats', (req, res) => {
  allowCORS(res);
  Models.addCampaign(db, req.body)
    .then((result) => {
      res.status(201).type('application/json');
      res.send(JSON.stringify(result));
    }).catch((error) => {
      res.send(500);
    });
});

app.get('/:campaign/stats', (req, res) => {
  allowCORS(res);
  const campaign = Number.parseInt(req.params.campaign, 10);
  if (Number.isNaN(campaign)) {
    res.status(400).type('application/json');
    res.send(JSON.stringify({ success: false, error: 'Campaign is not a number' }));
  } else {
    Models.getCampaignById(db, campaign)
      .then((result) => {
        res.status(200).type('application/json');
        res.send(JSON.stringify(result));
      }).catch((error) => {
        res.send(500);
      });
  }
});

app.get('/:user/campaigns', (req, res) => {
  allowCORS(res);
  Models.getCampaignsByUser(db, req.params.user)
    .then((result) => {
      res.status(200).type('application/json');
      res.send(JSON.stringify(result));
    }).catch((error) => {
      res.send(500);
    });
});

app.patch('/:campaign/stats', (req, res) => {
  allowCORS(res);
  const campaign = Number.parseInt(req.params.campaign, 10);
  if (Number.isNaN(campaign)) {
    res.status(400).type('application/json');
    res.send(JSON.stringify({ success: false, error: 'Campaign is not a number' }));
  } else {
    Models.pledgeCampaign(db, campaign, req.body)
      .then((result) => {
        res.status(200).type('application/json');
        res.send(JSON.stringify(result));
      }).catch((error) => {
        res.send(500);
      });
  }
});

app.put('/:campaign/stats', (req, res) => {
  allowCORS(res);
  const campaign = Number.parseInt(req.params.campaign, 10);
  if (Number.isNaN(campaign)) {
    res.status(400).type('application/json');
    res.send(JSON.stringify({ success: false, error: 'Campaign is not a number' }));
  } else {
    Models.updateCampaign(db, campaign, req.body)
      .then((result) => {
        res.status(200).type('application/json');
        res.send(JSON.stringify(result));
      }).catch((error) => {
        res.send(500);
      });
  }
});

app.delete('/:campaign/stats', (req, res) => {
  allowCORS(res);
  const campaign = Number.parseInt(req.params.campaign, 10);

  if (Number.isNaN(campaign)) {
    res.status(400).type('application/json');
    res.send(JSON.stringify({ success: false, error: 'Campaign is not a number' }));
  } else {
    Models.deleteCampaign(db, campaign)
      .then((result) => {
        res.status(200).type('application/json');
        res.send(JSON.stringify(result));
      })
      .catch((error) => {
        res.send(500);
      });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
