import { db } from './db/index.js';
import { sql } from 'drizzle-orm';
export async function pingDb() {
  try {
    await db.execute(sql`SELECT 1`);
    return { status: "DB OK v2" };
  } catch (e: any) {
    return { status: "DB ERROR v2", error: e.message };
  }
}
