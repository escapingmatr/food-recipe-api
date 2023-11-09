const pgp = require('pg-promise')();

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'recipedb',
  user: 'recipedb_admin',
  password: 'qwerasdf',
});

module.exports = db;
