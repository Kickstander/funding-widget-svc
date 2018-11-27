class Models {
  static getCampaignById(db, id) {
    return db.query('SELECT * FROM campaigns WHERE id = $1 LIMIT 1;', [id])
      .then(result => result.rows[0])
      .catch((error) => {
        console.error(error);
      });
  }

  static getCampaignsByUser(db, user) {
    return db.query('SELECT * FROM campaigns WHERE user = $1;', [user])
      .then(result => result.rows)
      .catch((error) => {
        console.error(error);
      });
  }

  static addCampaign(db, data) {
    return db.query('INSERT INTO campaigns (campaign, author, user, country, pledgedAmount, goal, backers, endTime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);', Object.values(data))
      .then(() => ({
        success: true,
      }));
  }

  static pledgeCampaign(db, id, pledgeData) {
    return db.query('UPDATE campaigns SET pledgedAmount = pledgedAmount + $1, backers = backers + $2, WHERE id = $3;', [pledgeData.amount, pledgeData.newAmount, id])
      .catch((error) => {
        console.error(error);
      });
  }

  static updateCampaign(db, id, data) {
    return db.query('UPDATE campaigns SET campaign = $1, author = $2, user = $3, country = $4, pledgedAmount = $5, goal = $6, backers = $7, endTime = $8, WHERE id = $9;', [data.campaign, data.author, data.user, data.country, data.pledgedAmount, data.goal, data.backers, data.endTime, id])
      .catch((error) => {
        console.error(error);
      });
  }

  static deleteCampaign(db, id) {
    return db.query('DELETE FROM campaigns WHERE id = $1;', [id])
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = Models;
