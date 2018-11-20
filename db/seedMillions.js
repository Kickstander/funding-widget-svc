const fs = require('fs');
const path = require('path');
const faker = require('faker');
const db = require('./connection.js');

let startDate = new Date().getTime();
const dataLimit = 1000000;
const campaigns = 100;
const countries = 22; 
const categories = 15;
const startingDate = 1542240000; 
const totalDays = 90;

const writeData = function writeData(idx) {
  const data = idx === 0 ? ['campaign,description,author,user,country,pledged,goal,backers,endDate,_type'] : [];
  for (let i = 0; i < dataLimit / campaigns; i += 1) {
    const first = faker.name.firstName(), last = faker.name.lastName();

    const author = `${first} ${last}`;
    const user = `${first}${Math.floor(Math.random() * 1000)}`;
    const country = Math.floor(Math.random() * countries);
    const desc = "Campaign description";

    for (let j = 0; j < campaigns; j += 1) {
      const name = faker.commerce.productName();
      const goal = Math.floor(Math.random() * 100000) + 50000;
      const pledge = Math.floor(Math.random() * 100) > 50 ? 
        Math.floor(Math.random() * goal) + 100000 : Math.floor(Math.random() * goal);
      const backers = Math.floor(Math.random() * 500);
      const endDate = startingDate + Math.floor(Math.random() * totalDays + 15) * 86400;
      const type = Math.floor(Math.random() * categories);

      data.push(`${name},${desc},${author},${user},${country},${pledge},${goal},${backers},${endDate},${type}`);
    }
  }

  data.push('');

  startDate = new Date().getTime();

  return fs.createWriteStream('db/largeData.csv', data.join('\n'), { flag: 'a' })
    .then((result) => {
      console.log(`Wrote ${dataLimit} entries in ${new Date().getTime() - startDate} ms`);
    })
    .catch((err) => { console.error(err) });
};

const writePledgeData = function writePledgeData(i) {
  const data = ['name,pledge,pledgeTime,campaignIdx'];
  const CAMPAIGN_dataLimit = dataLimit / 100;
  const startDateIdx = CAMPAIGN_dataLimit * i, endIdx = CAMPAIGN_dataLimit * (i + 1);

  for (let k = startDateIdx; k < endIdx; k += 1) {
    for (let j = 0; j < 50; j += 1) {
      const name = faker.name.findName();
      const pledge = Math.floor(Math.random() * 100) + 1;
      const pledgeTime = startingDate + Math.floor(Math.random() * totalDays) * 86400;

      data.push(`${name},${pledge},${pledgeTime},${k}`);
    }
  }

  data.push('');

  startDate = new Date().getTime();

  return fs.createWriteStream(`db/pledgeData_${i}.csv`, data.join('\n'), { flag: 'w' })
    .then((result) => {
      console.log(`Wrote ${CAMPAIGN_dataLimit * 50} entries in ${new Date().getTime() - startDate} ms`);
    })
    .catch((err) => { console.error(err) });
};

async function seedPostgresData() {
  let csvFile = path.resolve(__dirname, './largeData.csv');

  startDate = new Date().getTime();

  await db.query(`CREATE TABLE IF NOT EXISTS campaigns (id SERIAL PRIMARY KEY, campaign TEXT, description TEXT, author TEXT, _user TEXT, country INT, pledged INT,
    goal INT, backers INT, endDate INT, _type INT);`)
    .catch((err) => { console.error(err); });
  await db.query(`COPY campaigns(campaign, description, author, _user, country, pledged, goal, backers, endDate, _type) FROM '${csvFile}' CSV HEADER;`)
    .catch((err) => { console.error(err); });

  console.log(`Seeded campaigns in ${new Date().getTime() - startDate} ms`);

  startDate = new Date().getTime();

  await db.query(`CREATE TABLE IF NOT EXISTS pledges (id SERIAL PRIMARY KEY, name TEXT, pledge INT, pledgeTime INT, campaignIdx INT);`)
    .catch((err) => { console.error(err) });

  for (let i = 0; i < 100; i++) {
    let csvFile = path.resolve(__dirname, `./pledgeData_${i}.csv`);
    if (process.platform === 'win32') {
      csvFile = csvFile.replace(/\\/g, '/');
    }
    await db.query(`COPY pledges(name, pledge, pledgeTime, campaignIdx) FROM '${csvFile}' CSV HEADER;`)
      .catch((err) => { console.error(err) });
  }

  console.log(`Seeded pledges in ${new Date().getTime() - startDate} ms`);
  db.end();
}


async function writeAndSeed() {
  for (let i = 0; i < 10; i++) {
    await writeData(i);
  }
  for (let i = 0; i < 100; i++) {
    await writePledgeData(i);
  }

  await seedPostgresData();
};

writeAndSeed();