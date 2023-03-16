const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config();

// Connect to database
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 5,
});

module.exports = pool;