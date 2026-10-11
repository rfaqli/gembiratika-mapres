import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import { sql } from 'drizzle-orm';
async function test() {
  try {
    const res = await db.execute(sql`INSERT INTO users (email, password, password_hash) VALUES (${'test2_' + Date.now() + '@gmail.com'}, 'pass', 'pass') RETURNING id`);
    console.log("INSERT RAW SUCCESS:", res.rows[0]);
  } catch(e: any) {
    console.error("INSERT RAW ERROR:", e.message);
  }
  process.exit(0);
}
test();
