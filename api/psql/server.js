const { Client } = require('pg')

const client = new Client({
  user: 'jackfintan',
  host: 'localhost.com',
  database: 'golf_dev',
  password: 'password',
  port: 5432,
});
client.connect();

client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
});

module.exports = client;
