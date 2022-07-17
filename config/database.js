const { Pool } = require('pg');
const URI = process.env.POSTGRES_KEY;

const pool = new Pool({
    host: URI,
    user: 'postgres',
    password: '12345678',
    database: 'postgres',
    port: '5432',
    dialect: 'postgres'
});

module.exports = pool;
