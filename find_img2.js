import https from 'https';
const q = encodeURIComponent('site:unsplash.com "wind turbine" "solar panel" sunrise');
https.get(`https://html.duckduckgo.com/html/?q=${q}`, {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let d = '';
  res.on('data', c => d+=c);
  res.on('end', () => {
    const matches = d.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g);
    console.log(matches ? Array.from(new Set(matches)).slice(0,10) : 'none');
    process.exit(0);
  });
});
