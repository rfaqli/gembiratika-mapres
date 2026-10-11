import fs from 'fs';

// Read data.ts
let dataFile = fs.readFileSync('src/data.ts', 'utf8');
const startIdx = dataFile.indexOf('export const newsData = [');
const endIdx = dataFile.indexOf('];\n\nexport const jobsData');

const currentNewsStr = dataFile.substring(startIdx + 24, endIdx + 1);

// Parse the current news
// Using eval since it's just JS objects
let news;
try {
  news = eval(currentNewsStr);
} catch(e) {
  console.error("Parse error:", e);
  process.exit(1);
}

// Remove the two old viral items if they are at the top and replaced
const toRemoveLinks = [
  "https://www.esdm.go.id/id/media-center/arsip-berita/presiden-ri-resmikan-plts-terapung-terbesar-di-asia-tenggara",
  "https://www.idx.co.id/id/berita/siaran-pers/2016"
];

// Add the 3 new top items
const newItems = [
  {
    title: "Energi Hijau Jadi Fokus Pertemuan Presiden Prabowo dengan Jusuf Kalla",
    date: "22 Juni 2026",
    excerpt: "Berita ini menyoroti pertemuan tingkat tinggi yang membahas fokus strategi pemerintah pada transisi energi hijau di tingkat nasional.",
    content: "Berita ini menyoroti pertemuan tingkat tinggi yang membahas fokus strategi pemerintah pada transisi energi hijau di tingkat nasional. Selengkapnya di Sekretariat Kabinet Republik Indonesia.",
    views: 84520,
    shares: 15300,
    source: "Sekretariat Kabinet",
    img: "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&q=80",
    link: "https://setkab.go.id/energi-hijau-jadi-fokus-pertemuan-presiden-prabowo-dengan-jusuf-kalla/"
  },
  {
    title: "Kemnaker Perkuat Pembekalan Mahasiswa Hadapi Green Jobs dan Dunia Kerja Digital",
    date: "21 Juni 2026",
    excerpt: "Langkah konkret Polteknaker dalam menyiapkan generasi muda untuk transisi ke pekerjaan hijau dan ekonomi berkelanjutan.",
    content: "Berita ini membahas langkah konkret pemerintah melalui Politeknik Ketenagakerjaan (Polteknaker) dalam menyiapkan generasi muda untuk menghadapi transisi ke pekerjaan hijau dan peluang karier baru di ekonomi berkelanjutan. Selengkapnya di Kemnaker.",
    views: 65100,
    shares: 12200,
    source: "Kemnaker",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    link: "https://kemnaker.go.id/news/detail/kemnaker-perkuat-pembekalan-mahasiswa-hadapi-green-jobs-dan-dunia-kerja-digital"
  },
  {
    title: "Menteri LH Tantang Gen Z Pimpin Transformasi Ekonomi Hijau Lewat 'Green Jobs'",
    date: "20 Juni 2026",
    excerpt: "Menteri Lingkungan Hidup mendorong generasi muda mempersiapkan diri menyambut jutaan green jobs.",
    content: "Membahas besarnya peluang ekonomi hijau di masa depan di mana Menteri Lingkungan Hidup mendorong generasi muda untuk mempersiapkan diri menyambut jutaan lapangan pekerjaan baru berlabel green jobs. Selengkapnya di Kementerian LHK.",
    views: 73200,
    shares: 9800,
    source: "KemenLH",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    link: "https://kemenlh.go.id/news/detail/menteri-lh-tantang-gen-z-pimpin-transformasi-ekonomi-hijau-lewat-green-jobs"
  }
];

// Keep other items, filter out exactly matching replacements if needed. We'll just separate old vs recent.
let remainingNews = news.filter(n => !toRemoveLinks.includes(n.link));
// Put the old ones back in, but at the end. (We can just grab them and push them)
let oldOnes = news.filter(n => toRemoveLinks.includes(n.link));

// Now sort all remainingNews by date. 
// Just rough parsing: if includes "2026" it's newer than "2023".
let sortedRemaining = remainingNews.sort((a,b) => {
   let ay = a.date.includes('2026') ? 2026 : (a.date.match(/\d{4}/) ? parseInt(a.date.match(/\d{4}/)[0]) : 0);
   let by = b.date.includes('2026') ? 2026 : (b.date.match(/\d{4}/) ? parseInt(b.date.match(/\d{4}/)[0]) : 0);
   return by - ay;
});

// Final list
let finalNews = [...newItems, ...sortedRemaining, ...oldOnes];

// Generate JSON
const newDataFile = dataFile.substring(0, startIdx) + 
      'export const newsData = ' + JSON.stringify(finalNews, null, 2) + 
      '\n' + dataFile.substring(endIdx);
      
fs.writeFileSync('src/data.ts', newDataFile);
console.log("Successfully updated newsData");
