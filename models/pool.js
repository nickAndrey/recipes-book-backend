const { Pool } = require('pg');

exports.pool = new Pool({
  host: 'localhost',
  user: 'andrezej',
  database: 'testdb',
  port: 5432,
});
