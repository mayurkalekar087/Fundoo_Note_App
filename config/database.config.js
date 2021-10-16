const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fundoonotesapp',
  password: 'Mayur@0025',
  port: 5000,
});
module.exports=pool;