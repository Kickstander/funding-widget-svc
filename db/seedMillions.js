const fs = require('fs.promises');
const path = require('path');
const faker = require('faker');
const db = require('./connection.js');
const dataLimit = 10 * 100000;
const campaigns = 100;
const startTime = 1543622400; //DEC 1, 2018 AT 00:00:00
let currentTime = new Date().getTime();


const seedPrimaryData = function seedPrimaryData() {
  const data = ['campaign,author,user,country,pledgedAmount,goal,backers,endTime'];
  for (let i = 0; i < dataLimit / campaigns; i += 1) {
    const author = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const user = `${faker.name.firstName()} ${Math.floor(Math.random() * 1000)}`;
    const country = Math.floor(Math.random() * 22);

    for (let j = 0; j < campaigns; j += 1) {
      const name = faker.commerce.productName();
      const goal = Math.floor(Math.random() * 100000) + 50000;
      const pledgedAmount = Math.floor(Math.random() * goal) + 100000;
      const backers = Math.floor(Math.random() * 500);
      const endTime = startTime + Math.floor(Math.random() * 90 + 15) * 86400;

      data.push(`${name},${author},${user},${country},${pledgedAmount},${goal},${backers},${endTime}`);
    }
  }
  data.push('');
  console.log(`${dataLimit} in ${new Date().getTime() - currentTime} milliseconds`);

  currentTime = new Date().getTime();
  return fs.writeFile('./seedLargeData.csv', data.join('\n'), { flag: 'a' }) 
    .then((result) => {
      console.log('seed primary data successful');
    })
    .catch((error) => { 
      console.log(error) 
    });
};

const seedPledgeData = function seedPledgeData(i) {
  const data = ['name,pledgedAmount,pledgeTime,campaignID'];
  const campaignLimit = dataLimit / 100;
  const first = campaignLimit * i;
  const last = campaignLimit * (i + 1);

  for (let k = first; k < last; k += 1) {
    for (let j = 0; j < 50; j += 1) {
      const pledgedAmount = Math.floor(Math.random() * 100) + 1;
      const pledgeTime = startTime + Math.floor(Math.random() * 90) * 86400;

      data.push(`${faker.name.findName()},${pledgedAmount},${pledgeTime}`);
    }
  }
  data.push('');
  console.log(`PLEDGED DATA SEEDING: ${campaignLimit * 50} in ${new Date().getTime() - currentTime} milliseconds`);

  currentTime = new Date().getTime();
  return fs.writeFile(`db/pledgeData_${i}.csv`, data.join('\n'))
    .then((result) => {
      console.log('seed pledge data successful');
    })
    .catch((error) => { 
      console.log(error) 
    });
};

async function seedPGData() {
  let csvFile = path.resolve(__dirname, './seedLargeData.csv');
  currentTime = new Date().getTime();

  await db.query(`CREATE TABLE IF NOT EXISTS campaigns (id SERIAL PRIMARY KEY, campaign TEXT, author TEXT, _user TEXT, country INT, pledgedAmount INT,
    goal INT, backers INT, endTime INT);`)
    .catch((err) => { 
      console.log(err);
    });
    
  await db.query(`COPY campaigns(campaign, author, _user, country, pledgedAmount, goal, backers, endTime) FROM '${csvFile}' CSV HEADER;`)
    .catch((error) => { 
      console.log(error);
    });

  console.log(`SEEDED PG CAMPAIGNS: ${new Date().getTime() - currentTime} milliseconds`);

  currentTime = new Date().getTime();

  await db.query(`CREATE TABLE IF NOT EXISTS pledges (id SERIAL PRIMARY KEY, name TEXT, pledgedAmount INT, pledgeTime INT, campaignID INT);`)
    .catch((err) => { console.log(err) });

  for (let i = 0; i < 100; i++) {
    let csvFile = path.resolve(__dirname, `./pledgeData_${i}.csv`);
    await db.query(`COPY pledges(name, pledgedAmount, pledgeTime, campaignID) FROM '${csvFile}' CSV HEADER;`)
      .catch((error) => { 
        console.log(error) 
      });
  }

  console.log(`SEEDED PG PLEDGES: ${new Date().getTime() - currentTime} milliseconds`);
  db.end();
}

async function writeAndSeed() {
  for (let i = 0; i < 10; i++) {
    await seedPrimaryData(i);
  }
  for (let i = 0; i < 100; i++) {
    await seedPledgeData(i);
  }

  await seedPGData();
};

writeAndSeed();