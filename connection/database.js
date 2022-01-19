const { Pool } = require('pg');
const pool = new Pool({
    database: 'personal_web',
    port: 5432,
    user: 'postgres',
    password: 'ffff'
});


module.exports = pool;
