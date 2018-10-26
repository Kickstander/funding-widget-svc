const mysql = require('mysql');
const fs = require('fs');
const faker = require('faker');
const db = require('./connection.js');
const moment = require('moment');

const queryString1 = 'CREATE DATABASE IF NOT EXISTS funding_stats;';
const queryString2 = 'USE funding_stats;';
const queryString3 = 'CREATE TABLE IF NOT EXISTS campaigns (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, pledged DECIMAL(11, 2), goal DECIMAL(11, 2), currency CHAR(3), backers INT, deadline VARCHAR(50), media VARCHAR(100), category VARCHAR(20), city VARCHAR(40), state CHAR(2), country VARCHAR(40));';
const queryString4 = 'TRUNCATE campaigns;';
const queryString5 = 'LOAD DATA INFILE \'/var/lib/mysql-files/seedData.txt\' INTO TABLE campaigns COLUMNS TERMINATED BY \'\,\' OPTIONALLY ENCLOSED BY \'"\' (pledged, goal, backers, media, category, city, state, currency, country, deadline);';

var fakeRows = '';
var currCodes = ['USD', 'GBP', 'CAD', 'AUD', 'NZD', 'EUR', 'DKK', 'NOK', 'SEK', 'CHF', 'HKD', 'SGD', 'MXN', 'JPY'];
var countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'New Zealand', 'Netherlands', 'Denmark', 'Ireland', 'Norway', 'Sweden', 'Germany', 'France', 'Spain', 'Italy', 'Austria', 'Belgium', 'Switzerland', 'Luxembourg', 'Hong Kong', 'Singapore', 'Mexico', 'Japan'];

const dateGen = () => {
  return moment(faker.date.future()).format('YYYY-MM-DD');
}

for (let i = 0; i < 100; i++) {
  fakeRows += faker.fake("{{commerce.price}},{{commerce.price}},{{random.number}},{{image.image}},{{commerce.product}},{{address.city}},{{address.stateAbbr}},");
  fakeRows += currCodes[Math.floor(Math.random() * currCodes.length)];
  fakeRows += ',';
  fakeRows += countries[Math.floor(Math.random() * countries.length)];
  fakeRows += ',';
  fakeRows += dateGen();
  fakeRows += '\n';
}

fs.writeFile('/var/lib/mysql-files/seedData.txt', fakeRows, (err) => {
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
  console.log(`Connection established`);
});

db.query(queryString1 + queryString2 + queryString3 + queryString4 + queryString5);

db.end();