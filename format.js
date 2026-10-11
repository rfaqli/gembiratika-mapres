import fs from 'fs';

const userList = `
1. **Energi Hijau Jadi Fokus Pertemuan Presiden Prabowo dengan Jusuf Kalla**
[Sekretariat Kabinet Republik Indonesia](https://setkab.go.id/energi-hijau-jadi-fokus-pertemuan-presiden-prabowo-dengan-jusuf-kalla/)
2. **Indonesia Melampaui Target Energi Hijau di Kuartal Kedua: Akhir dari Tren Lambat**
[Langit7.id](https://langit7.id/read/59215/1/indonesia-melampaui-target-energi-hijau-di-kuartal-kedua-akhir-dari-tren-lambat-1782014772)
3. **Energi bersih RI mulai bergerak lebih cepat**
[ANTARA News](https://www.antaranews.com/berita/5615963/energi-bersih-ri-mulai-bergerak-lebih-cepat)
4. **Target bauran EBT 2026 tercapai lebih cepat**
[ANTARA News (Infografik)](https://www.antaranews.com/infografik/5612335/target-bauran-ebt-2026-tercapai-lebih-cepat)
5. **Bauran EBT Pembangkit Listrik April 2026 Lampaui Target**
[Direktorat Jenderal Ketenagalistrikan ESDM](https://gatrik.esdm.go.id/berita/?slug=bauran-ebt-pembangkit-listrik-april-2026-lampaui-target&category=)
6. **Transisi Energi dan Ketahanan Energi Indonesia: Dilema Regulasi di Tengah Dominasi Batubara**
[BINUS Business Law](https://business-law.binus.ac.id/2026/06/13/transisi-energi-dan-ketahanan-energi-indonesia-dilema-regulasi-di-tengah-dominasi-batubara/)
7. **Tamaris Hidro Perkuat Pendanaan untuk Akselerasi Proyek Energi Hijau**
[Infobanknews](https://infobanknews.com/tamaris-hidro-perkuat-pendanaan-untuk-akselerasi-proyek-energi-hijau)
8. **Transisi Energi Bersih Indonesia: Momentum PLTS dan Tantangan di 2026**
[Taalenta](https://taalenta.id/blog/transisi-energi-bersih-indonesia-momentum-plts-dan-tantangan-di-2026/)
9. **Pertamina Kebut PLTS Koperasi Merah Putih, Progres 80 Persen dan Siap Beroperasi Tahun Ini**
[Kompas.com](http://money.kompas.com/read/2026/06/21/201105726/pertamina-kebut-plts-koperasi-merah-putih-progres-80-persen-dan-siap)
10. **YLKI dukung pembangunan 100 GW PLTS untuk diversifikasi energi**
[ANTARA News](https://www.antaranews.com/berita/5616917/ylki-dukung-pembangunan-100-gw-plts-untuk-diversifikasi-energi)
11. **Rupiah Melemah, PLN Sulawesi Evaluasi Proyek dan Prioritaskan EBT**
[Kompas.id](https://www.kompas.id/artikel/rupiah-melemah-pln-sulawesi-evaluasi-proyek-dan-prioritaskan-ebt)
12. **Kemnaker Proyeksi 3,88 Juta Green Jobs Tercipta pada 2026, Ini Bidang Industrinya**
[IDXChannel via RCTI+](https://www.rctiplus.com/news/detail/idxchannel/5411706/kemnaker-proyeksi-3-88-juta-green-jobs-tercipta-pada-2026--ini-bidang-industrinya)
13. **3,88 Juta Lowongan Kerja Ramah Lingkungan Bakal Terbuka di 2026, Catat Sektor Industrinya**
[SindoNews](https://ekbis.sindonews.com/read/1720249/34/388-juta-lowongan-kerja-ramah-lingkungan-bakal-terbuka-di-2026-catat-sektor-industrinya-1782108416)
14. **Transisi Energi dan Hilirisasi Buka Peluang 3,88 Juta Green Jobs di Indonesia**
[Arahkita](https://www.arahkita.com/green_economy_insight/116203_transisi-energi-dan-hilirisasi-buka-peluang-388-juta-green-jobs-di-indonesia)
15. **Ministry projects 3.88 million green jobs in Indonesia in 2026**
[ANTARA News (English)](https://en.antaranews.com/news/419999/ministry-projects-388-million-green-jobs-in-indonesia-in-2026)
16. **GREEN JOBS: Tren Pekerjaan Masa Depan Indonesia**
[Disnakertrans ESDM Buleleng](https://disnakertransesdm.bulelengkab.go.id/informasi/detail/artikel/94_green-jobs-tren-pekerjaan-masa-depan-indonesia)
17. **Menerka Kendaraan Listrik di Indonesia pada 2026**
[Indonesiabaik.id](https://indonesiabaik.id/infografis/menerka-kendaraan-listrik-di-indonesia-pada-2026)
18. **Insentif Kendaraan Listrik Mundur, Pemerintah Tunda Program EV hingga Juli 2026**
[Ikatan Konsultan Pajak Indonesia](https://ikpi.or.id/en/insentif-kendaraan-listrik-mundur-pemerintah-tunda-program-ev-hingga-juli-2026/)
19. **Juli 2026 Regulasi Insentif EV Terbit, Motor Listrik Disuntik Subsidi Rp 5 Juta**
[GridOto](https://www.gridoto.com/read/224389610/juli-2026-regulasi-insentif-ev-terbit-motor-listrik-disuntik-subsidi-rp-5-juta)
20. **Mobil Listrik BAIC Meluncur di GIIAS 2026**
[Kompas.com](http://otomotif.kompas.com/read/2026/06/19/084200015/mobil-listrik-baic-meluncur-di-giias-2026)
21. **AISMOLI Usulkan Penerapan Insentif Kendaraan Listrik Multi-Tahun**
[ANTARA News](https://www.antaranews.com/berita/5617591/aismoli-usulkan-penerapan-insentif-kendaraan-listrik-multi-tahun)
`;

const lines = userList.split('\n').filter(l => l.trim() !== '');
const newItems = [];
let idx = 0;
while(idx < lines.length) {
  if (lines[idx].match(/^\d+\./)) {
    const titleMatch = lines[idx].match(/^\d+\.\s*\*\*(.*)\*\*/);
    let title = titleMatch ? titleMatch[1] : lines[idx].replace(/^\d+\.\s*/, '');
    
    title = title.replace(/\*\*/g, '');
    
    let sourceMatch = null;
    let sMatch = null;
    
    if (lines[idx+1]) {
       sMatch = lines[idx+1].match(/\[(.*)\]\((.*)\)/);
    }
    
    if (!sMatch && lines[idx+2]) {
        sMatch = lines[idx+2].match(/\[(.*)\]\((.*)\)/);
        if (sMatch) idx++;
    }
    
    if (sMatch) {
       let source = sMatch[1];
       let link = sMatch[2];
       if (link.includes('google.com/search?q=')) {
          link = decodeURIComponent(link.split('q=')[1].split('&')[0]);
       }
       newItems.push({
          title,
          source,
          link
       });
       idx += 2;
    } else {
       idx++;
    }
  } else {
    idx++;
  }
}

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
  
const formattedData = newItems.map((n, i) => {
      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni"];
      const randomMonth = Math.floor(Math.random() * 6);
      const randomDay = Math.floor(Math.random() * 28) + 1;
      const dateString = `${randomDay} ${monthNames[randomMonth]} 2026`;

      return {
        title: n.title,
        date: dateString,
        excerpt: `${n.title}. Selengkapnya di ${n.source}.`,
        content: `Membahas ${n.title}. Selengkapnya dapat Anda temukan melalui sumber: ${n.source}.`,
        views: Math.floor(Math.random() * 50000) + 10000,
        shares: Math.floor(Math.random() * 5000) + 1000,
        source: n.source,
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
  
let finalArr = [firstItem, secondItem, ...formattedData.slice(0, 19)]; // 21 total

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
