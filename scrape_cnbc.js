import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchFromCnbc() {
  const queries = [
    'energi terbarukan', 'PLTS', 'kendaraan listrik', 'transisi energi', 'bursa karbon'
  ];
  
  let allNews = [];
  
  for (const q of queries) {
    if (allNews.length >= 21) break;
    const url = `https://www.cnbcindonesia.com/search?query=${encodeURIComponent(q)}`;
    try {
      const res = await fetch(url);
      const html = await res.text();
      const $ = cheerio.load(html);
      
      $('.list li').each((i, el) => {
        const title = $(el).find('h2').text().trim();
        const link = $(el).find('a').attr('href');
        const img = $(el).find('img').attr('src');
        const date = $(el).find('.date').text().trim();
        const excerpt = title;
        
        if (title && link) {
          allNews.push({ title, link, img, date, excerpt });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
  
  const unique = [];
  const seen = new Set();
  for (const r of allNews) {
    if (!seen.has(r.link) && r.link.startsWith('http')) {
      unique.push(r);
      seen.add(r.link);
    }
  }
  
  const finalNews = unique.slice(0, 21);
  const formattedData = finalNews.map((n, i) => {
      return {
        title: n.title,
        date: n.date,
        excerpt: n.excerpt,
        content: n.title + '. ' + 'Selengkapnya dapat dibaca pada tautan sumber berita asli.',
        views: Math.floor(Math.random() * 50000) + 10000,
        shares: Math.floor(Math.random() * 5000) + 1000,
        source: 'CNBC Indonesia',
        img: n.img && n.img.startsWith('http') ? n.img : 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
        link: n.link
      };
  });
  
  fs.writeFileSync('cnbc_news.json', JSON.stringify(formattedData, null, 2));
  console.log("Written items: " + formattedData.length);
}
fetchFromCnbc();
