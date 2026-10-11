const fs = require('fs');
let code = fs.readFileSync('src/serverApp.ts', 'utf8');
code = code.replace("app.get('/api/pingdb', async (req, res) => {", 
`app.get('/api/schema-details', async (req, res) => {
  try {
    const query = await db.execute(sql\`
      SELECT 
        a.attname as column_name,
        format_type(a.atttypid, a.atttypmod) as data_type,
        a.attnotnull as is_not_null,
        pg_get_expr(d.adbin, d.adrelid) as default_value
      FROM pg_attribute a
      LEFT JOIN pg_attrdef d ON a.attrelid = d.adrelid AND a.attnum = d.adnum
      WHERE a.attrelid = 'users'::regclass AND a.attnum > 0 AND NOT a.attisdropped;
    \`);
    res.json(query.rows);
  } catch(e: any) {
    res.json({ error: e.message });
  }
});
app.get('/api/pingdb', async (req, res) => {`);
fs.writeFileSync('src/serverApp.ts', code);
