import https from 'https';

const query = encodeURIComponent('solar panel wind turbine sunrise site:unsplash.com');
https.get(`https://html.duckduckgo.com/html/?q=${query}`, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const urls = Array.from(new Set(data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+/g) || []));
    console.log("Images:");
    console.log(urls.slice(0, 5));
  });
}).on('error', () => {});
