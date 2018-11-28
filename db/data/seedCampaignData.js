const fs = require('fs.promises');
const path = require('path');
const faker = require('faker');
const db = require('../db_postgres/index.js');
const dataLimit = 10 * 100000;
const campaigns = 100;
const startTime = 1543622400; //DEC 1, 2018 AT 00:00:00
let currentTime = new Date().getTime();


const seedCampaignData = function seedCampaignData() {
  const data = ['campaign,description,author,user,country,pledged,goal,backers,endDate,_type'];
  for (let i = 0; i < dataLimit / campaigns; i += 1) {
    const author = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const user = `${faker.name.firstName()} ${Math.floor(Math.random() * 1000)}`;
    const country = Math.floor(Math.random() * 22);
    const desc = "Campaign description";

    for (let j = 0; j < campaigns; j += 1) {
      const name = faker.commerce.productName();
      const goal = Math.floor(Math.random() * 100000) + 50000;
      const pledge = Math.floor(Math.random() * 100) > 50 ? 
        Math.floor(Math.random() * goal) + 100000 : Math.floor(Math.random() * goal);
      const backers = Math.floor(Math.random() * 500);
      const endDate = startTime + Math.floor(Math.random() * 90 + 15) * 86400;
      const type = Math.floor(Math.random() * TYPES);

      data.push(`${name},${desc},${author},${user},${country},${pledge},${goal},${backers},${endDate},${type}`);
    }
  }
  data.push('');
  console.log(`${dataLimit} in ${new Date().getTime() - currentTime} milliseconds`);

  currentTime = new Date().getTime();
  return fs.writeFile('./seedCampaignData.csv', data.join('\n')) 
    .then((result) => {
      console.log(`CAMPAIGN DATA: ${LIMIT} entries in ${new Date().getTime() - start} ms`);
    })
    .catch((error) => { 
      console.log(error) 
    });
};

function writeAndSeed() {
  for (let i = 0; i < 10; i++) {
    seedCampaignData(i);
  }
};

writeAndSeed();
