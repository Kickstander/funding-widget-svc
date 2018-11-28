const db = require('../db_postgres/index.js');

function seedPostgresData() {
  let csvFile = path.resolve(__dirname, './seedCampaignData.csv');

  startTime = new Date().getTime();

  db.query(`CREATE TABLE IF NOT EXISTS campaigns (id SERIAL PRIMARY KEY, campaign TEXT, description TEXT, author TEXT, _user TEXT, country INT, pledged INT,
    goal INT, backers INT, endDate INT, _type INT);`)
    .catch((err) => {
      console.error(err);
    });
    
    db.query(`COPY campaigns(campaign, description, author, _user, country, pledged, goal, backers, endDate, _type) FROM '${csvFile}' CSV HEADER;`)
    .catch((err) => { 
      console.error(err);
    });

  console.log(`SEEDED CAMPAIGNS: ${new Date().getTime() - startTime} ms`);

  startTime = new Date().getTime();

  db.query(`CREATE TABLE IF NOT EXISTS pledges (id SERIAL PRIMARY KEY, name TEXT, pledge INT, pledgeTime INT, campaignId INT);`)
    .catch((err) => { 
      console.error(err)
    });

  for (let i = 0; i < 100; i++) {
    let csvFile = path.resolve(__dirname, `./seedPledgeData_${i}.csv`);

    db.query(`COPY pledges(name, pledge, pledgeTime, campaignId) FROM '${csvFile}' CSV HEADER;`)
      .catch((err) => { 
        console.error(err)
      });
  }
  console.log(`SEEDED PLEDGES: ${new Date().getTime() - startTime} ms`);
  db.end();
}

function writeAndSeed() {
  for (let i = 0; i < 10; i++) {
    seedPostgresData(i);
  }
};

writeAndSeed();
