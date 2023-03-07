const mysql = require('mysql2');
const config = require('./config');
const connection = mysql.createConnection(config);

connection.on('connection', (stream) => {
  console.log('mysql connected!');
})

module.exports = {
  conn: connection
}