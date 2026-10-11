import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

export const createPool = () => {
  const config: any = {
    connectionTimeoutMillis: 15000,
  };

  if (process.env.POSTGRES_URL) {
    config.connectionString = process.env.POSTGRES_URL;
    config.ssl = { rejectUnauthorized: false };
  } else if (process.env.DATABASE_URL) {
    config.connectionString = process.env.DATABASE_URL;
    config.ssl = { rejectUnauthorized: false };
  } else {
    // Add dummy config to prevent crash during build time if env is missing
    config.host = process.env.SQL_HOST || 'dummy';
    config.user = process.env.SQL_USER || 'dummy';
    config.password = process.env.SQL_PASSWORD || 'dummy';
    config.database = process.env.SQL_DB_NAME || 'dummy';
    config.ssl = false;
  }

  return new Pool(config);
};

const pool = createPool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle SQL pool client:', err);
});

export const db = drizzle(pool, { schema });
