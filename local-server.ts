import express from 'express';
import path from 'path';
import app, { initSuperAdmin } from './src/serverApp';
import { createServer as createViteServer } from 'vite';

async function startLocalServer() {
  await initSuperAdmin();
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0' as any, () => {
    console.log(`Local Server running on http://localhost:${PORT}`);
  });
}

startLocalServer();
