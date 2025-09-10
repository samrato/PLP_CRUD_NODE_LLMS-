import pkg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Run migrations from init.sql
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initSql = fs.readFileSync(path.join(__dirname, "models", "init.sql")).toString();

pool.query(initSql)
  .then(() => console.log("Tables ensured"))
  .catch((err) => console.error(" Migration error:", err));

export default pool;
