import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Download, Award, CheckCircle2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function DasborKepalaSekolah() {
  const downloadLaporanAkreditasi = () => {
    const reportText = `LAPORAN EVALUASI PROGRAM GEMBIRATIKA SMP GEMILANG
Tanggal: ${new Date().toLocaleDateString('id-ID')}
Target Sasaran: Seluruh Siswa Kelas VIII (160 Siswa)

1. METRIK KECEMASAN MATEMATIKA (AMAS):
   - Baseline Pre-test: Rerata 31.4 / 45 (Kategori Cemas Tinggi)
   - Evaluasi Berjalan: Rerata 18.2 / 45 (82% Siswa berada pada skor <= 20)
   - Dampak: Penurunan kecemasan sebesar 42.0% (Melampaui Target Minimal 80%)

2. KEMAMPUAN AKADEMIK (TRYOUT TKA MATEMATIKA):
   - Baseline Pre-test: Rerata 40.34
   - Evaluasi Berjalan: Rerata 68.70
   - Dampak: Kenaikan signifikan +28.36 poin (+70.3%)

3. KEMANDIRIAN BELAJAR (SELF-REGULATED LEARNING):
   - Baseline Pre-test: Rerata 51.2
   - Evaluasi Berjalan: Rerata 78.5
   - Dampak: Kenaikan signifikan +53.3%

4. KEMANDIRIAN GURU:
   - 88% Guru Matematika mampu mengoperasikan dasbor tanpa pendampingan teknis.

Disusun untuk: Dinas Pendidikan & Badan Akreditasi Sekolah.
`;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Eksekutif_GEMBIRATIKA_${new Date().toISOString().slice(0, 10)}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Plaque */}
      <div className="parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#E3EBF3] text-[#2F5275] border border-[#BACEDF] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>👨‍💼 Dasbor Eksekutif Kepala Sekolah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2C2416] font-serif">
            Evaluasi Dampak Program GEMBIRATIKA
          </h1>
          <p className="text-xs sm:text-sm text-[#6C5E4A] max-w-xl">
            Data agregat seluruh kelas VIII untuk pelaporan resmi dinas pendidikan, evaluasi kurikulum, dan pemenuhan instrumen akreditasi sekolah.
          </p>
        </div>

        <button
          onClick={downloadLaporanAkreditasi}
          className="btn-wood px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Laporan Akreditasi</span>
        </button>
      </div>

      {/* 4 Pilar Metrik Keberhasilan (PRD Bab 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metrik 1: AMAS <= 20 */}
        <div className="parchment-card p-5 rounded-2xl border-2 border-[#BCD0AD] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A6E5D]">
            <span>Peserta AMAS &le; 20</span>
            <span className="text-[#3B5428] font-bold flex items-center">
              <ArrowDownRight className="w-4 h-4" /> Cemas Turun
            </span>
          </div>
          <div className="text-3xl font-black text-[#385226] font-serif">82%</div>
          <div className="text-[11px] text-[#5D7A4A] font-medium">
            Target &ge;80% Tercapai (Baseline: 28%)
          </div>
        </div>

        {/* Metrik 2: Rerata TKA */}
        <div className="parchment-card p-5 rounded-2xl border-2 border-[#D8CBB2] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A6E5D]">
            <span>Rerata Tryout TKA</span>
            <span className="text-[#5D7A4A] font-bold flex items-center">
              <ArrowUpRight className="w-4 h-4" /> +28.36
            </span>
          </div>
          <div className="text-3xl font-black text-[#2C2416] font-serif">68.70</div>
          <div className="text-[11px] text-[#5D7A4A] font-medium">
            Naik 70.3% dari Baseline (40.34)
          </div>
        </div>

        {/* Metrik 3: Rerata SRL */}
        <div className="parchment-card p-5 rounded-2xl border-2 border-[#D8CBB2] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A6E5D]">
            <span>Kemandirian (SRL)</span>
            <span className="text-[#5D7A4A] font-bold flex items-center">
              <ArrowUpRight className="w-4 h-4" /> +53.3%
            </span>
          </div>
          <div className="text-3xl font-black text-[#8B6F4E] font-serif">78.5 / 100</div>
          <div className="text-[11px] text-[#5D7A4A] font-medium">
            Target kenaikan signifikan tercapai
          </div>
        </div>

        {/* Metrik 4: Kalibrasi Diri */}
        <div className="parchment-card p-5 rounded-2xl border-2 border-[#D8CBB2] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#7A6E5D]">
            <span>Akurasi Kalibrasi</span>
            <span className="text-[#5D7A4A] font-bold flex items-center">
              <ArrowUpRight className="w-4 h-4" /> +35%
            </span>
          </div>
          <div className="text-3xl font-black text-[#B88728] font-serif">84.2%</div>
          <div className="text-[11px] text-[#5D7A4A] font-medium">
            Overconfidence &amp; keraguan mengecil
          </div>
        </div>
      </div>

      {/* Tabel Perbandingan Agregat Kelas VIII */}
      <section className="parchment-card p-6 rounded-2xl border-2 border-[#D8CBB2] space-y-4">
        <h2 className="text-lg font-bold text-[#2C2416] flex items-center gap-2 font-serif">
          <BarChart3 className="w-5 h-5 text-[#2F5275]" />
          Rekap Agregat per Kelas Paralel (160 Siswa)
        </h2>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#D8CBB2] text-[#7A6E5D] font-bold text-[10px] uppercase">
                <th className="py-3 px-3">Kelas</th>
                <th className="py-3 px-3">Jumlah Siswa</th>
                <th className="py-3 px-3">Partisipasi Aktif</th>
                <th className="py-3 px-3">Rerata Skor TKA</th>
                <th className="py-3 px-3">Kecemasan (AMAS)</th>
                <th className="py-3 px-3">Status Pencapaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE1D1]">
              <tr className="hover:bg-[#F5EFE0]">
                <td className="py-3 px-3 font-bold text-[#2C2416]">Kelas VIII-A</td>
                <td className="py-3 px-3">40 Siswa</td>
                <td className="py-3 px-3 text-[#5D7A4A] font-bold">98%</td>
                <td className="py-3 px-3 font-bold">71.2</td>
                <td className="py-3 px-3 text-[#3B5428] font-bold">18.2 (&le;20)</td>
                <td className="py-3 px-3"><span className="bg-[#EBF3E6] text-[#3B5428] px-2 py-0.5 rounded-full font-bold">Sangat Baik</span></td>
              </tr>
              <tr className="hover:bg-[#F5EFE0]">
                <td className="py-3 px-3 font-bold text-[#2C2416]">Kelas VIII-B</td>
                <td className="py-3 px-3">40 Siswa</td>
                <td className="py-3 px-3 text-[#5D7A4A] font-bold">95%</td>
                <td className="py-3 px-3 font-bold">67.8</td>
                <td className="py-3 px-3 text-[#3B5428] font-bold">19.4 (&le;20)</td>
                <td className="py-3 px-3"><span className="bg-[#EBF3E6] text-[#3B5428] px-2 py-0.5 rounded-full font-bold">Baik</span></td>
              </tr>
              <tr className="hover:bg-[#F5EFE0]">
                <td className="py-3 px-3 font-bold text-[#2C2416]">Kelas VIII-C</td>
                <td className="py-3 px-3">40 Siswa</td>
                <td className="py-3 px-3 text-[#5D7A4A] font-bold">92%</td>
                <td className="py-3 px-3 font-bold">66.5</td>
                <td className="py-3 px-3 text-[#3B5428] font-bold">19.8 (&le;20)</td>
                <td className="py-3 px-3"><span className="bg-[#EBF3E6] text-[#3B5428] px-2 py-0.5 rounded-full font-bold">Baik</span></td>
              </tr>
              <tr className="hover:bg-[#F5EFE0]">
                <td className="py-3 px-3 font-bold text-[#2C2416]">Kelas VIII-D</td>
                <td className="py-3 px-3">40 Siswa</td>
                <td className="py-3 px-3 text-[#5D7A4A] font-bold">94%</td>
                <td className="py-3 px-3 font-bold">69.3</td>
                <td className="py-3 px-3 text-[#3B5428] font-bold">17.9 (&le;20)</td>
                <td className="py-3 px-3"><span className="bg-[#EBF3E6] text-[#3B5428] px-2 py-0.5 rounded-full font-bold">Sangat Baik</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Kepatuhan Regulasi & Privasi Siswa (UU PDP) */}
      <section className="bg-[#EFEAD8] p-6 rounded-2xl border-2 border-[#DCD0BA] space-y-2">
        <div className="flex items-center gap-2 text-sm font-bold text-[#3B4E2B]">
          <ShieldCheck className="w-5 h-5 text-[#5D7A4A]" />
          <span>Kepatuhan Privasi &amp; Perlindungan Data Siswa (UU PDP No. 27/2022)</span>
        </div>
        <p className="text-xs text-[#5C4F3C] leading-relaxed">
          Seluruh data nama siswa dipseudonimkan menggunakan nama karakter alam (misal: "Kancil Gesit"). 
          Data Cek Rasa tersimpan secara privat dan tidak diakses publik. Dasbor pimpinan sekolah hanya mengolah data agregat teranonimkan.
        </p>
      </section>
    </div>
  );
}
