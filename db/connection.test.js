const mysql = require('mysql');

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'FILL_ME_IN',
  password: 'FILL_ME_IN',
  multipleStatements: true,
});
