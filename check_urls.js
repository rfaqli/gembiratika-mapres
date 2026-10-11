import { newsData } from './src/data.ts';

async function check() {
  for (let i = 0; i < newsData.length; i++) {
    const item = newsData[i];
    if (item.link) {
      try {
        const res = await fetch(item.link, { method: 'HEAD' });
        console.log(`[${res.status}] ${i} - ${item.link}`);
      } catch (e) {
        console.log(`[ERROR] ${i} - ${item.link}: ${e.message}`);
      }
    }
  }
}
check();
