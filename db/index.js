const mysql = require('mysql2/promise');
const config = require('./config');

exports.conn = async () => {
  return await mysql.createConnection(config);
}