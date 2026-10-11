import Parser from 'rss-parser';
import fs from 'fs';

async function generateData() {
  const parser = new Parser({ timeout: 5000 });
  const feeds = [
    'https://www.antaranews.com/rss/nasional.xml',
    'https://www.antaranews.com/rss/ekonomi.xml',
    'https://www.antaranews.com/rss/otomotif.xml',
    'https://www.voaindonesia.com/api/zihqjem_yv'
  ];
  
  let allItems = [];
  
  for (const url of feeds) {
    console.log("Fetching", url);
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
      console.log("Success", url, feed.items.length);
    } catch (e) {
      console.log(`Failed to parse ${url}: ${e.message}`);
    }
  }
  
  const unique = [];
  const seen = new Set();
  for (const item of allItems) {
    if (!seen.has(item.link)) {
      unique.push(item);
      seen.add(item.link);
    }
  }

  // We need 19.
  let finalItems = unique.slice(0, 19);
  
  console.log("Final items count: ", finalItems.length);

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
      let dt = 'Berita Terbaru';
      try {
        const d = new Date(n.date);
        dt = d.toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric' });
      } catch(e){}

      return {
        title: n.title,
        date: dt !== 'Invalid Date' ? dt : 'Berita Terbaru',
        excerpt: n.content.substring(0, 100) + '...',
        content: n.content + ' Selengkapnya dapat dibaca pada tautan sumber berita asli.',
        views: Math.floor(Math.random() * 50000) + 10000,
        shares: Math.floor(Math.random() * 5000) + 1000,
        source: new URL(n.link).hostname.replace('www.', ''),
        img: images[i % images.length],
        link: n.link
      };
  });
  
  const firstItem = { 
    title: "Presiden Jokowi Resmikan PLTS Terapung Cirata 192 MWp", 
    date: "9 November 2023", 
    excerpt: "PLTS Terapung terbesar di Asia Tenggara dan ketiga di dunia resmi beroperasi di Waduk Cirata, Jawa Barat.", 
    content: "Presiden RI Joko Widodo meresmikan Pembangkit Listrik Tenaga Surya (PLTS) Terapung Cirata berkapasitas 192 Megawatt peak (MWp). Proyek raksasa kerja sama PLN dan Masdar (UEA) ini menjadi PLTS terapung terbesar di Asia Tenggara. Keberadaannya akan menambah kapasitas energi terbarukan Indonesia, mengurangi emisi karbon, dan menjadi percontohan energi hijau di masa depan.", 
    views: 45200, shares: 12000, source: "Kementerian ESDM", 
    img: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=600&h=400&fit=crop", 
    link: "https://www.esdm.go.id/id/media-center/arsip-berita/presiden-ri-resmikan-plts-terapung-terbesar-di-asia-tenggara"
  };
  
  const secondItem = { 
    title: "Bursa Karbon Indonesia (IDXCarbon) Resmi Diluncurkan", 
    date: "26 September 2023", 
    excerpt: "Langkah konkret Indonesia mengatasi perubahan iklim melalui perdagangan kredit karbon nasional.", 
    content: "Otoritas Jasa Keuangan (OJK) bersama Bursa Efek Indonesia (BEI) meresmikan Bursa Karbon Indonesia atau IDXCarbon. Peluncuran ini merupakan tonggak sejarah penting (milestone) bagi komitmen Indonesia menuju Net Zero Emission 2060. Melalui bursa ini, perusahaan yang berhasil menekan emisi dapat menjual kredit karbonnya, mendorong ekosistem industri ramah lingkungan.", 
    views: 38500, shares: 8900, source: "Bursa Efek Indonesia", 
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop", 
    link: "https://www.idx.co.id/id/berita/siaran-pers/2016"
  };
  
  let finalArr = [firstItem, secondItem, ...formattedData];
  
  let dataFile = fs.readFileSync('src/data.ts', 'utf8');
  const startIdx = dataFile.indexOf('export const newsData = [');
  const endIdx = dataFile.indexOf('];\n\nexport const jobsData');
  
  if (startIdx > -1 && endIdx > -1) {
    const newDataFile = dataFile.substring(0, startIdx) + 
      'export const newsData = ' + JSON.stringify(finalArr, null, 2) + 
      '\n' + dataFile.substring(endIdx);
    fs.writeFileSync('src/data.ts', newDataFile);
    console.log("Successfully wrote " + finalArr.length + " items.");
  } else {
    console.log("Could not find insertion points");
  }
}

generateData();
