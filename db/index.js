const { Client } = require('pg');

const client = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'kickstander',
  password: 'admin',
  port: 5432,
});

client.connect();

module.exports = client;
