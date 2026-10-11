import React, { useState } from 'react';
import { BookOpen, Download, ChevronRight, FileText, ShieldCheck } from 'lucide-react';

export function BukuPedomanSection() {
  const [selectedBab, setSelectedBab] = useState<number>(1);

  const downloadPedoman = () => {
    const content = `BUKU PEDOMAN GURU DIGITAL - GEMBIRATIKA v1.0
Panduan Pengajaran Matematika SMP Kelas VIII Berbasis Gamifikasi Adaptif, Pembelajaran Kontekstual, dan Refleksi Regulasi Diri.

BAB 1: FILOSOFI PENGURANGAN MATH ANXIETY
- Prinsip dasar: Kesalahan adalah batu loncatan berharga, bukan kegagalan.
- Hindari mempermalukan siswa di depan kelas atau kompetisi papan peringkat liar.
- Bangun rekor pribadi, bukan perbandingan antar kawan.

BAB 2: IMPLEMENTASI ALUR 9 TAHAP
1. Cek Rasa: Beri waktu 1 menit di awal kelas agar siswa mengekspresikan kesiapan emosinya.
2. Rencana Misi: Biarkan siswa memilih misi petualangan sesuai rasa hatinya.
3. Petualangan Adaptif: Dorong siswa menggunakan petunjuk bertahap (Hint 1, 2, 3) tanpa takut poin berkurang.
4. Tebak Yakin: Latih siswa memprediksi keyakinan sebelum melihat kunci jawaban.
5. Umpan Balik: Berikan apresiasi afirmatif.
6. Cek Kalibrasi: Ajarkan siswa mengenali overconfidence maupun keraguan berlebih.
7. Bedah Salah: Bantu siswa mengkategorikan apakah salah hitung, lupa konsep, salah baca, atau belum paham.
8. Jurnal Refleksi: Satu kalimat jujur di akhir sesi sangat berharga bagi metakognisi.
9. Rapor Belajarku: Apresiasi perkembangan mandiri secara berkala.

BAB 3: PENGEMBANGAN PAKET KONTEKS DAERAH
- Hubungkan soal dengan kehidupan nyata di lingkungan sekolah (pertanian, pasar tradisional, transportasi bahari, tabungan celengan).

Diterbitkan oleh Tim Pengembang GEMBIRATIKA.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Buku_Pedoman_Guru_GEMBIRATIKA_v1.0.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Plaque */}
      <div className="neu-raised p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 neu-inset-sm px-3 py-1 text-xs font-black text-[#8C6D42] uppercase tracking-wider mb-2">
            <span>📖 Dokumen Resmi Kemendikbudristek Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2A3647] font-serif">
            Buku Pedoman Guru Digital
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl">
            Panduan praktis bagi guru matematika SMP dalam menerapkan pembelajaran minim kecemasan (math anxiety) dan menumbuhkan metakognisi regulasi diri.
          </p>
        </div>

        <button
          onClick={downloadPedoman}
          className="neu-btn-primary px-5 py-3 rounded-2xl font-black text-xs flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Pedoman Digital (PDF)</span>
        </button>
      </div>

      {/* Main Reader View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daftar Bab Sidebar */}
        <div className="neu-raised p-5 rounded-3xl space-y-3 h-fit">
          <span className="text-[11px] font-black text-[#8494A8] uppercase tracking-wider block px-2 pb-1">
            Daftar Bab Pedoman
          </span>

          {[
            { id: 1, title: 'Bab 1: Memutus Lingkaran Math Anxiety' },
            { id: 2, title: 'Bab 2: Manajemen Jam Belajar 9 Tahap' },
            { id: 3, title: 'Bab 3: 4 Paket Konteks Kehidupan Nyata' },
            { id: 4, title: 'Bab 4: Membaca Meter Kalibrasi & Bedah Salah' },
            { id: 5, title: 'Bab 5: Diferensiasi & Remedial Prasyarat' }
          ].map(bab => (
            <button
              key={bab.id}
              onClick={() => setSelectedBab(bab.id)}
              className={`w-full text-left p-3.5 rounded-2xl text-xs font-black transition flex items-center justify-between cursor-pointer ${
                selectedBab === bab.id
                  ? 'neu-inset text-[#3F8F54]'
                  : 'neu-btn text-[#4C5B70] hover:text-[#2A3647]'
              }`}
            >
              <span>{bab.title}</span>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          ))}
        </div>

        {/* Isi Bab Content */}
        <div className="md:col-span-2 neu-raised p-6 sm:p-8 rounded-3xl space-y-5">
          {selectedBab === 1 && (
            <div className="space-y-4 text-xs text-[#475569] leading-relaxed">
              <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3F8F54] uppercase tracking-wider inline-block">
                Bab 1
              </span>
              <h2 className="text-xl font-black text-[#2A3647] font-serif">
                Memutus Lingkaran Setan Math Anxiety
              </h2>
              <p>
                Riset PISA 2022 menunjukkan skor matematika siswa Indonesia berada pada angka 366, dengan rerata TKA SMP di angka 40,34. 
                Faktor terbesar yang menghalangi siswa bukanlah kecerdasan intelektual, melainkan <strong>kecemasan emosional (math anxiety)</strong>.
              </p>
              <div className="neu-inset p-5 rounded-2xl space-y-2">
                <strong className="text-[#3F8F54] block">Prinsip Ruang Kelas Aman:</strong>
                <ul className="list-disc pl-4 space-y-1.5 text-[#2A3647]">
                  <li>Tidak ada hukuman atau sindiran ketika siswa salah menjawab.</li>
                  <li>Hilangkan papan peringkat (leaderboard) yang membandingkan antar murid secara terbuka.</li>
                  <li>Ganti dengan perayaan <em>Rekor Pribadi</em> dan ketekunan mencoba petunjuk bertahap.</li>
                </ul>
              </div>
            </div>
          )}

          {selectedBab === 2 && (
            <div className="space-y-4 text-xs text-[#475569] leading-relaxed">
              <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3F8F54] uppercase tracking-wider inline-block">
                Bab 2
              </span>
              <h2 className="text-xl font-black text-[#2A3647] font-serif">
                Manajemen Jam Pelajaran dengan Alur 9 Tahap
              </h2>
              <p>
                Satu sesi belajar di GEMBIRATIKA dirancang berlangsung selama 25 hingga 35 menit. Guru dapat membaginya menjadi:
              </p>
              <div className="space-y-3">
                <div className="neu-btn p-4 rounded-2xl">
                  <strong className="text-[#3F8F54] block mb-1">5 Menit Pertama:</strong> 
                  Cek Rasa &amp; Rencana Misi (Tahap 1 &amp; 2). Guru memantau siswa yang memilih opsi "Cemas".
                </div>
                <div className="neu-btn p-4 rounded-2xl">
                  <strong className="text-[#FFA726] block mb-1">15–20 Menit Tengah:</strong> 
                  Petualangan Adaptif, Tebak Yakin, dan Bedah Salah (Tahap 3–7). Siswa berinteraksi mandiri dengan petunjuk bertahap.
                </div>
                <div className="neu-btn p-4 rounded-2xl">
                  <strong className="text-[#3E78B2] block mb-1">5 Menit Akhir:</strong> 
                  Cek Meter Kalibrasi &amp; Penulisan Jurnal Refleksi (Tahap 8 &amp; 9).
                </div>
              </div>
            </div>
          )}

          {selectedBab === 3 && (
            <div className="space-y-4 text-xs text-[#475569] leading-relaxed">
              <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3F8F54] uppercase tracking-wider inline-block">
                Bab 3
              </span>
              <h2 className="text-xl font-black text-[#2A3647] font-serif">
                Penerapan 4 Paket Konteks Kehidupan Nyata
              </h2>
              <p>
                Matematika abstrak sering membuat siswa bertanya: <em>"Buat apa belajar ini?"</em>. 
                Gunakan 4 Paket Konteks untuk menjawab langsung:
              </p>
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl neu-btn">
                  <strong className="block text-[#3F8F54] mb-1">1. Pertanian</strong>
                  Pola deret bibit cabai, petak sawah terasering lereng bukit.
                </div>
                <div className="p-4 rounded-2xl neu-btn">
                  <strong className="block text-[#FFA726] mb-1">2. Pasar Rakyat</strong>
                  Aljabar persamaan harga ikat sayur dan untung rugi pedagang.
                </div>
                <div className="p-4 rounded-2xl neu-btn">
                  <strong className="block text-[#3E78B2] mb-1">3. Transportasi Laut</strong>
                  Teorema Pythagoras rute haluan kapal perahu nelayan.
                </div>
                <div className="p-4 rounded-2xl neu-btn">
                  <strong className="block text-[#8C6D42] mb-1">4. Keuangan</strong>
                  Statistika rata-rata tabungan celengan bambu keluarga.
                </div>
              </div>
            </div>
          )}

          {selectedBab === 4 && (
            <div className="space-y-4 text-xs text-[#475569] leading-relaxed">
              <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3F8F54] uppercase tracking-wider inline-block">
                Bab 4
              </span>
              <h2 className="text-xl font-black text-[#2A3647] font-serif">
                Membaca Meter Kalibrasi &amp; Diagnosa Bedah Salah
              </h2>
              <p>
                Di dasbor guru, Anda dapat melihat indeks kalibrasi setiap anak:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-[#2A3647]">
                <li>
                  <strong>Tinggi (&gt;80%):</strong> Siswa memiliki akurasi metakognisi matang. Mereka tahu persis apa yang mereka kuasai dan apa yang belum.
                </li>
                <li>
                  <strong>Overconfident (Yakin tapi sering salah):</strong> Siswa perlu dilatih menandai kata kunci soal cerita dan mengecek kembali satuan (Bedah Salah 3).
                </li>
                <li>
                  <strong>Underconfident (Ragu padahal selalu benar):</strong> Siswa memiliki trauma atau ketakutan salah. Berikan afirmasi empati bahwa intuisi mereka sudah benar.
                </li>
              </ul>
            </div>
          )}

          {selectedBab === 5 && (
            <div className="space-y-4 text-xs text-[#475569] leading-relaxed">
              <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3F8F54] uppercase tracking-wider inline-block">
                Bab 5
              </span>
              <h2 className="text-xl font-black text-[#2A3647] font-serif">
                Pembelajaran Berdiferensiasi &amp; Jalur Pemulihan
              </h2>
              <p>
                Ketika sistem mendeteksi seorang anak memilih kategori <em>"Belum Paham Dasarnya"</em> pada Bedah Salah, 
                sistem secara otomatis menurunkan tingkat kesulitan ke konsep prasyarat (*remedial prerequisite*).
              </p>
              <p>
                Guru dapat menugaskan misi spesifik ke kelompok siswa tertentu melalui fitur <em>Tugaskan Misi Baru</em> pada Dasbor Guru tanpa membuat siswa merasa dihakimi.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
