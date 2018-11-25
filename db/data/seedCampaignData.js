const fs = require('fs.promises');
const path = require('path');
const faker = require('faker');
const db = require('../db_postgres/index.js');
const dataLimit = 10 * 100000;
const campaigns = 100;
const startTime = 1543622400; //DEC 1, 2018 AT 00:00:00
let currentTime = new Date().getTime();


const seedCampaignData = function seedCampaignData() {
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
  return fs.writeFile('./seedLargeData.csv', data.join('\n')) 
    .then((result) => {
      console.log('seed Campaign data successful');
    })
    .catch((error) => { 
      console.log(error) 
    });
};

async function writeAndSeed() {
  for (let i = 0; i < 10; i++) {
    await seedCampaignData(i);
  }
};

writeAndSeed();

