const mysql = require('mysql2');
const config = require('./config');
const connection = mysql.createConnection(config);
connection.on('connection', (stream) => {
    console.log('mysql connected!');
})

connection.query(
    'SELECT * FROM `tb_user` WHERE `username` = "bobocode"',
    function(err, results, fields) {
      console.log(results);
    }
  );