const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

(async () => {
  try {
    const initSql = fs.readFileSync(path.join(__dirname, "../models/init.sql")).toString();
    await pool.query(initSql);
    console.log("Tables ensured");
    console.log("Database is connected well")
  } catch (err) {
    console.error("Migration error:", err.message);
  }
})();

module.exports = pool;
