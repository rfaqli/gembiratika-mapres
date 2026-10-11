import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().default('User'), 
  email: text('email').unique().notNull(),
  password: text('password'),
  password_hash: text('password_hash'),
  role: text('role').default('user').notNull(),
  is_admin: boolean('is_admin').default(false).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  created_at: timestamp('created_at').defaultNow(),
});
