const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'your_database_name',
  user: 'your_database_user',
  password: 'your_password',
});

module.exports = db;
