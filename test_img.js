import https from 'https';
const q = encodeURIComponent('site:unsplash.com "wind turbines" "solar panels"');
https.get(`https://html.duckduckgo.com/html/?q=${q}`, {headers: {'User-Agent': 'Mozilla/5.0'}}, res => {
  let d = ''; res.on('data', c => d+=c);
  res.on('end', () => console.log(d.match(/https:\/\/images\.unsplash\.com\/photo-[a-z0-9\-]+/gi)?.slice(0, 5)));
});
