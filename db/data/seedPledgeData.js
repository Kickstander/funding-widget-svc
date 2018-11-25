const fs = require('fs.promises');
const faker = require('faker');
const db = require('../index.js');
const dataLimit = 10 * 100000;
const startTime = 1543622400; //DEC 1, 2018 AT 00:00:00
let currentTime = new Date().getTime();

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
  return fs.writeFile(`./pledgeData.csv`, data.join('\n'))
    .then((result) => {
      console.log('seed pledge data successful');
    })
    .catch((error) => { 
      console.log(error) 
    });
};

async function writeAndSeed() {
  for (let i = 0; i < 100; i++) {
    await seedPledgeData(i);
  }
};

writeAndSeed();