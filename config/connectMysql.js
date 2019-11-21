const mysql = require('mysql');
const connection = mysql.createPool({
    connectionLimit : 10,
    host     : process.env.MYSQL_HOSTNAME,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
  });

module.exports = connection;
