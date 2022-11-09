const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'meeting room reservation'
})

connection.connect()

module.exports = connection;