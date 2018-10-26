const mysql = require('mysql');
const fs = require('fs');
const faker = require('faker');
const db = require('./connection.js');
const moment = require('moment');
// a series of query strings to send the database
const createDatabase = 'CREATE DATABASE IF NOT EXISTS funding_stats;';
const useDatabase = 'USE funding_stats;';
const createTable = `CREATE TABLE IF NOT EXISTS campaigns (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                     pledged DECIMAL(11, 2),
                     goal DECIMAL(11, 2),
                     currency CHAR(3),
                     backers INT,
                     deadline VARCHAR(50),
                     media VARCHAR(100),
                     category VARCHAR(20),
                     city VARCHAR(40),
                     state CHAR(2),
                     country VARCHAR(40));`;

const clearTable = 'TRUNCATE campaigns;';
const writeData = `LOAD DATA INFILE \'/var/lib/mysql-files/seedData.txt\' INTO TABLE campaigns
                   COLUMNS TERMINATED BY \'\,\' OPTIONALLY ENCLOSED BY \'"\'
                   (pledged, goal, backers, media, category, city, state, currency, country, deadline);`;

let fakeRows = ''; // a variable to contain my comma-separated data
const currCodes = ['USD', 'GBP', 'CAD', 'AUD', 'NZD', 'EUR', 'DKK',
                   'NOK', 'SEK', 'CHF', 'HKD', 'SGD', 'MXN', 'JPY']; // the currency codes accepted by Kickstand

const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'New Zealand',
                   'Netherlands', 'Denmark', 'Ireland', 'Norway', 'Sweden', 'Germany',
                   'France', 'Spain', 'Italy', 'Austria', 'Belgium', 'Switzerland', 'Luxembourg',
                   'Hong Kong', 'Singapore', 'Mexico', 'Japan']; // the accepted countries of origin for campaigns

const dateGen = () => { // helper function to generate a random date on the appropriate format
  return moment(faker.date.future()).format('YYYY-MM-DD');
}

for (let i = 0; i < 100; i++) {
  // assemble random comma-separated data strings
  fakeRows += faker.fake(`{{commerce.price}},{{commerce.price}},{{random.number}},{{image.image}},
                          {{commerce.product}},{{address.city}},{{address.stateAbbr}},`);
  // append data not handled by faker directly
  fakeRows += currCodes[Math.floor(Math.random() * currCodes.length)];
  fakeRows += ',';
  fakeRows += countries[Math.floor(Math.random() * countries.length)];
  fakeRows += ',';
  fakeRows += dateGen();
  fakeRows += '\n'; // terminate each line with a newline
}

fs.writeFile('/var/lib/mysql-files/seedData.csv', fakeRows, (err) => { // write CSV
  if (err) {
    console.log(err);
    return;
  }
});

db.connect((error) => {
  if (error) {
    console.log(error);
    return;
  }
});

db.query(createDatabase + useDatabase + createTable + clearTable + writeData); // write mock data .csv into db

db.end();