import https from 'node:https';

const urls = [
  'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621641042784-ea17b8fbcdd2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596700030467-d86ba5256e69?w=600&h=400&fit=crop'
];

async function check() {
  for (const url of urls) {
    const p = new Promise(resolve => {
      https.get(url, res => {
        resolve(res.statusCode);
      }).on('error', () => resolve('error'));
    });
    console.log(url, await p);
  }
}
check();
