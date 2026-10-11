import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';
async function test() {
  try {
    const res = await db.execute(sql`SELECT * FROM users LIMIT 1`);
    console.log("SELECT SUCCESS:", res.rows[0]);
  } catch(e: any) {
    console.error("SELECT ERROR:", e.message);
  }
  process.exit(0);
}
test();
