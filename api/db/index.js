const { Pool } = require('pg')

const pool = new Pool({
  user: 'jackfintan',
  host: 'localhost',
  database: 'golf_dev',
  password: 'password',
  port: 5432,
})

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    debugger;
    return pool.query(text, params, (err, res) => {
        debugger;
        const duration = Date.now() - start
        // console.log('executed query', { text, duration, rows: res.rowCount })
        callback(err, res)
    })
  }
}
