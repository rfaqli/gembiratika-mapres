import type { VercelRequest, VercelResponse } from '@vercel/node';

let appHandler: ((req: any, res: any) => void) | null = null;

async function getApp() {
  if (!appHandler) {
    // Arahkan ke file Express App utama
    const { default: app } = await import('../src/serverApp.js');
    appHandler = app;
  }
  return appHandler;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const app = await getApp();
    return app(req, res); // Mengeksekusi Express app
  } catch (error: any) {
    console.error('[Vercel Handler] Fatal error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}
