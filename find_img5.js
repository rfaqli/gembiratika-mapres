import https from 'https';

const query = encodeURIComponent('site:pexels.com/photo "solar panel" OR "wind turbine" sunrise');
https.get(`https://html.duckduckgo.com/html/?q=${query}`, {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const urls = Array.from(new Set(data.match(/https:\/\/images\.pexels\.com\/photos\/[0-9]+\/pexels-photo-[0-9]+\.jpeg/g) || []));
    console.log(urls.slice(0, 5));
  });
}).on('error', () => {});
