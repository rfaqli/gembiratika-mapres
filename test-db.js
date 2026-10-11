const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_emt5naO1XjVz@ep-ancient-pond-aoa1721q-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require',
  ssl: { rejectUnauthorized: false }
});
pool.query('SELECT 1').then(res => { console.log('Success:', res.rows); pool.end(); }).catch(err => { console.error('Error:', err); pool.end(); });
