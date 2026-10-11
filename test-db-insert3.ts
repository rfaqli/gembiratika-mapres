import { db } from './src/db/index.js';
import { sql } from 'drizzle-orm';
async function test() {
  try {
    const res = await db.execute(sql`SELECT nextval('users_id_seq')`);
    console.log("SEQ SUCCESS:", res.rows[0]);
  } catch(e: any) {
    console.error("SEQ ERROR:", e.message);
  }
  process.exit(0);
}
test();
