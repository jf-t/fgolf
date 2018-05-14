const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'jackfintan',
  host: 'localhost',
  database: 'golf_dev',
  password: null,
  port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
});

const client = new Client({
  user: 'jackfintan',
  host: 'localhost',
  database: 'golf_dev',
  password: null,
  port: 5432,
});
client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
});
