const fs = require('fs');
let code = fs.readFileSync('src/serverApp.ts', 'utf8');
code = code.replace("app.get('/api/pingdb', async (req, res) => {", 
`app.get('/api/schema-info', async (req, res) => {
  try {
    const query = await db.execute(sql\`SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'users'\`);
    res.json(query.rows);
  } catch(e) {
    res.json({ error: e.message });
  }
});
app.get('/api/pingdb', async (req, res) => {`);
fs.writeFileSync('src/serverApp.ts', code);
