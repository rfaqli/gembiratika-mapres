import Parser from 'rss-parser';
import fs from 'fs';

async function generateData() {
  const parser = new Parser();
  const feeds = [
    'https://www.antaranews.com/rss/ekonomi.xml',
    'https://www.antaranews.com/rss/otomotif.xml',
    'https://www.vice.com/id/rss',
    'https://www.voaindonesia.com/api/zihqjem_yv', 
  ];
  
  let allItems = [];
  
  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      feed.items.forEach(item => {
        allItems.push({
          title: item.title,
          link: item.link,
          content: item.contentSnippet || item.title,
          date: item.pubDate,
        });
      });
    } catch (e) {
      console.log(`Failed to parse ${url}: ${e.message}`);
    }
  }
  
  // Filter for environment / energy related terms
  const keywords = ['energi', 'listrik', 'hijau', 'emisi', 'iklim', 'karbon', 'lingkungan', 'sampah', 'baterai', 'ev', 'plts', 'pltu', 'kendaraan', 'motor', 'nuklir', 'bumn', 'investasi', 'ekonomi'];
  
  let filtered = allItems.filter(item => {
    const text = (item.title + ' ' + item.content).toLowerCase();
    return keywords.some(kw => text.includes(kw));
  });
  
  console.log("Filtered items: " + filtered.length);
  
  // Dedup
  const unique = [];
  const seen = new Set();
  for (const item of filtered) {
    if (!seen.has(item.link)) {
      unique.push(item);
      seen.add(item.link);
    }
  }

  // We need 21. If we don't have enough, pull in from the rest of allItems
  let finalItems = unique;
  if (finalItems.length < 21) {
    for (const item of allItems) {
      if (!seen.has(item.link)) {
        finalItems.push(item);
        seen.add(item.link);
        if (finalItems.length >= 21) break;
      }
    }
  }

  // Slice to 21 exactly
  finalItems = finalItems.slice(0, 21);
  
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
    
  const formattedData = finalItems.map((n, i) => {
      const d = new Date(n.date);
      const dateFormat = d.toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric' });
      return {
        title: n.title,
        date: dateFormat !== 'Invalid Date' ? dateFormat : 'Berita Terbaru',
        excerpt: n.content.substring(0, 100) + '...',
        content: n.content + ' Selengkapnya dapat dibaca pada tautan sumber berita asli.',
        views: Math.floor(Math.random() * 50000) + 10000,
        shares: Math.floor(Math.random() * 5000) + 1000,
        source: new URL(n.link).hostname.replace('www.', ''),
        img: images[i % images.length],
        link: n.link
      };
  });
  
  // Now modify data.ts directly to insert this list!
  let dataFile = fs.readFileSync('src/data.ts', 'utf8');
  const startIdx = dataFile.indexOf('export const newsData = [');
  const endIdx = dataFile.indexOf('];\n\nexport const jobsData');
  
  if (startIdx > -1 && endIdx > -1) {
    const newDataFile = dataFile.substring(0, startIdx) + 
      'export const newsData = ' + JSON.stringify(formattedData, null, 2) + 
      dataFile.substring(endIdx);
    fs.writeFileSync('src/data.ts', newDataFile);
    console.log("Written items: " + formattedData.length);
  } else {
    console.log("Could not find insertion points");
  }
}

generateData();
