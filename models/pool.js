const { Pool } = require('pg');
const string = process.env.CONNECTION_STRING;

exports.pool = new Pool({ string });
