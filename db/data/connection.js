const mysql = require('mysql');
const promise = require('bluebird');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  multipleStatements: true,
  database: 'funding_stats',
});
promise.promisifyAll(connection);

class Campaign {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'funding_stats',
    });
  }

  addCampaign(campId, campPledged, campGoal, 
    campBackers, campMedia, campCategory, campCity, 
    campState, campCurrency, campCountry, campDeadline) {
    this.connection.query(
      'INSERT INTO campaigns (id, pledged, goal, backers, media, category, city, state, currency, country, deadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [campId, campPledged, campGoal, 
        campBackers, campMedia, campCategory, campCity, 
        campState, campCurrency, campCountry, campDeadline],
    );
  }

  updateCampaign(campId, campPledged, campGoal, callback) {
    this.connection.query('UPDATE campaigns SET ? = ? WHERE id = ?', [campId, campPledged, campGoal], callback);
  };

  deleteCampaign(id, callback) {
    const query = `DELETE FROM campaigns WHERE id = ${id}`;
    connection.query(query, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  };
}

module.exports = connection;
module.exports.Campaign = new Campaign();


