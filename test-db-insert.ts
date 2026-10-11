import { db } from './src/db/index.js';
import { users } from './src/db/schema.js';
import { sql } from 'drizzle-orm';
async function test() {
  try {
    const res = await db.insert(users).values({
        email: `test_${Date.now()}@gmail.com`,
        password: 'password123',
        password_hash: 'password123'
    }).returning();
    console.log("INSERT SUCCESS:", res[0]);
  } catch(e: any) {
    console.error("INSERT ERROR:", e.message);
  }
  process.exit(0);
}
test();
