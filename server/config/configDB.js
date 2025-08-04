// config/db.js
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.db_password,
  database: process.env.db_database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
