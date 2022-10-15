const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Qkidssrin9',
  database: 'meetingroom-reservation'
})

connection.connect()

module.exports = connection;