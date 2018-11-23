const { Pool } = require('pg');

const Pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

Pool.connect();

module.exports = Pool;