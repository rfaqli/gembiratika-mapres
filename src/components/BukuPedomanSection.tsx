import React, { useState } from 'react';
import { BookOpen, Download, CheckCircle2, ChevronRight, FileText, ShieldCheck } from 'lucide-react';

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
      {/* Header */}
      <div className="parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#EFEAD8] text-[#8B6F4E] border border-[#D5C7AB] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>📖 Dokumen Resmi Kemendikbudristek Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2C2416] font-serif">
            Buku Pedoman Guru Digital
          </h1>
          <p className="text-xs sm:text-sm text-[#6C5E4A] max-w-xl">
            Panduan praktis bagi guru matematika SMP dalam menerapkan pembelajaran minim kecemasan (math anxiety) dan menumbuhkan metakognisi regulasi diri.
          </p>
        </div>

        <button
          onClick={downloadPedoman}
          className="btn-wood px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Pedoman Digital (PDF/TXT)</span>
        </button>
      </div>

      {/* Main Reader View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daftar Bab Sidebar */}
        <div className="parchment-card p-4 rounded-2xl border-2 border-[#D8CBB2] space-y-2 h-fit">
          <span className="text-[11px] font-bold text-[#7A6E5D] uppercase tracking-wider block px-2 pb-1">
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
              className={`w-full text-left p-3 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                selectedBab === bab.id
                  ? 'bg-[#5D7A4A] text-white shadow-xs'
                  : 'bg-[#FAF7F0] text-[#4A3E2D] hover:bg-[#F2ECE0]'
              }`}
            >
              <span>{bab.title}</span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          ))}
        </div>

        {/* Isi Bab Content */}
        <div className="md:col-span-2 parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] space-y-5 bg-[#FCFAF5]">
          {selectedBab === 1 && (
            <div className="space-y-4 text-xs text-[#4A3C2B] leading-relaxed">
              <span className="text-xs font-bold text-[#5D7A4A] uppercase tracking-wider block">Bab 1</span>
              <h2 className="text-xl font-black text-[#2C2416] font-serif">
                Memutus Lingkaran Setan Math Anxiety
              </h2>
              <p>
                Riset PISA 2022 menunjukkan skor matematika siswa Indonesia berada pada angka 366, dengan rerata TKA SMP di angka 40,34. 
                Faktor terbesar yang menghalangi siswa bukanlah kecerdasan intelektual, melainkan <strong>kecemasan emosional (math anxiety)</strong>.
              </p>
              <div className="bg-[#FAF7EC] p-4 rounded-xl border border-[#DFD3BE] space-y-2">
                <strong className="text-[#8B6F4E] block">Prinsip Ruang Kelas Aman:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Tidak ada hukuman atau sindiran ketika siswa salah menjawab.</li>
                  <li>Hilangkan papan peringkat (leaderboard) yang membandingkan antar murid secara terbuka.</li>
                  <li>Ganti dengan perayaan <em>Rekor Pribadi</em> dan ketekunan mencoba hint bertahap.</li>
                </ul>
              </div>
            </div>
          )}

          {selectedBab === 2 && (
            <div className="space-y-4 text-xs text-[#4A3C2B] leading-relaxed">
              <span className="text-xs font-bold text-[#5D7A4A] uppercase tracking-wider block">Bab 2</span>
              <h2 className="text-xl font-black text-[#2C2416] font-serif">
                Manajemen Jam Pelajaran dengan Alur 9 Tahap
              </h2>
              <p>
                Satu sesi belajar di GEMBIRATIKA dirancang berlangsung selama 25 hingga 35 menit. Guru dapat membaginya menjadi:
              </p>
              <div className="space-y-2">
                <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#D5C7AB]">
                  <strong className="text-[#5D7A4A]">5 Menit Pertama:</strong> Cek Rasa & Rencana Misi (Tahap 1 & 2). Guru memantau siswa yang memilih opsi "Cemas".
                </div>
                <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#D5C7AB]">
                  <strong className="text-[#5D7A4A]">15–20 Menit Tengah:</strong> Petualangan Adaptif, Tebak Yakin, dan Bedah Salah (Tahap 3–7). Siswa berinteraksi mandiri dengan petunjuk bertahap.
                </div>
                <div className="bg-[#FAF7F0] p-3 rounded-lg border border-[#D5C7AB]">
                  <strong className="text-[#5D7A4A]">5 Menit Akhir:</strong> Cek Meter Kalibrasi & Penulisan Jurnal Refleksi (Tahap 8 & 9).
                </div>
              </div>
            </div>
          )}

          {selectedBab === 3 && (
            <div className="space-y-4 text-xs text-[#4A3C2B] leading-relaxed">
              <span className="text-xs font-bold text-[#5D7A4A] uppercase tracking-wider block">Bab 3</span>
              <h2 className="text-xl font-black text-[#2C2416] font-serif">
                Penerapan 4 Paket Konteks Kehidupan Nyata
              </h2>
              <p>
                Matematika abstrak sering membuat siswa bertanya: <em>"Buat apa belajar ini?"</em>. 
                Gunakan 4 Paket Konteks untuk menjawab langsung:
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#D5C7AB]">
                  <strong className="block text-[#5D7A4A]">1. Pertanian</strong>
                  Pola deret bibit cabai, petak sawah terasering lereng bukit.
                </div>
                <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#D5C7AB]">
                  <strong className="block text-[#8B6F4E]">2. Pasar Rakyat</strong>
                  Aljabar persamaan harga ikat sayur dan untung rugi pedagang.
                </div>
                <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#D5C7AB]">
                  <strong className="block text-[#3B658A]">3. Transportasi Laut</strong>
                  Teorema Pythagoras rute haluan kapal perahu nelayan.
                </div>
                <div className="p-3 rounded-lg bg-[#FAF7F0] border border-[#D5C7AB]">
                  <strong className="block text-[#B88728]">4. Keuangan</strong>
                  Statistika rata-rata tabungan celengan bambu keluarga.
                </div>
              </div>
            </div>
          )}

          {selectedBab === 4 && (
            <div className="space-y-4 text-xs text-[#4A3C2B] leading-relaxed">
              <span className="text-xs font-bold text-[#5D7A4A] uppercase tracking-wider block">Bab 4</span>
              <h2 className="text-xl font-black text-[#2C2416] font-serif">
                Membaca Meter Kalibrasi &amp; Diagnosa Bedah Salah
              </h2>
              <p>
                Di dasbor guru, Anda dapat melihat indeks kalibrasi setiap anak.
              </p>
              <ul className="list-disc pl-4 space-y-1.5">
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
            <div className="space-y-4 text-xs text-[#4A3C2B] leading-relaxed">
              <span className="text-xs font-bold text-[#5D7A4A] uppercase tracking-wider block">Bab 5</span>
              <h2 className="text-xl font-black text-[#2C2416] font-serif">
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
