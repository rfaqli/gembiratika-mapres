import googleIt from 'google-it';
import fs from 'fs';
import * as cheerio from 'cheerio';

async function fetchNews() {
  const queries = [
    "energi terbarukan site:kompas.com",
    "Pembangkit Listrik Tenaga Surya site:cnbcindonesia.com",
    "bursa karbon site:cnnindonesia.com",
    "transisi energi site:antaranews.com",
    "kendaraan listrik site:bisnis.com"
  ];
  
  let results = [];
  try {
    for (const q of queries) {
      if (results.length >= 21) break;
      const res = await googleIt({ query: q, limit: 10 });
      results = results.concat(res);
    }
    
    // De-duplicate by link
    const unique = [];
    const seen = new Set();
    for (const r of results) {
      if (!seen.has(r.link) && r.link.startsWith('http') && !r.link.includes('tag/') && !r.link.includes('topic/')) {
        unique.push(r);
        seen.add(r.link);
      }
    }
    
    // Truncate to 21
    const finalNews = unique.slice(0, 21);
    
    const formattedData = finalNews.map((n, i) => {
      // Pick a random image url to ensure it's not broken
      const images = [
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
        "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&q=80",
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?w=800&q=80",
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
        "https://images.unsplash.com/photo-1555627236-47eacdc6f0aa?w=800&q=80",
        "https://images.unsplash.com/photo-1497435334941-8c899ce98daf?w=800&q=80"
      ];
      
      return {
        title: n.title.replace(/ - .*/, ''),
        date: "Berita Terbaru",
        excerpt: n.snippet,
        content: n.snippet + '... Selengkapnya baca di sumber aslinya.',
        views: Math.floor(Math.random() * 50000) + 10000,
        shares: Math.floor(Math.random() * 5000) + 1000,
        source: new URL(n.link).hostname.replace('www.', ''),
        img: images[i % images.length],
        link: n.link
      };
    });
    
    fs.writeFileSync('scraped_news.json', JSON.stringify(formattedData, null, 2));
    console.log("Written scraped_news.json with " + finalNews.length + " items");
  } catch (e) {
    console.log("Error:", e);
  }
}
fetchNews();
