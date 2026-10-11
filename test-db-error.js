const { Pool } = require('pg');
require('dotenv').config();

async function test() {
  const pool = new Pool({ connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL });
  try {
    const res = await pool.query('SELECT * FROM users LIMIT 1');
    console.log("SELECT OK:", res.rows);
  } catch (e) {
    console.error("SELECT ERROR:", e.message);
  }
}
test();
