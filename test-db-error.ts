import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import { sql } from 'drizzle-orm';
async function test() {
  try {
    const res = await db.execute(sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users'`);
    console.log("SCHEMA:", res.rows);
  } catch(e: any) {
    console.error("ERROR:", e.message);
  }
  process.exit(0);
}
test();
