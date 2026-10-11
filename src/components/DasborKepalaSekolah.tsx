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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Plaque */}
      <div className="neu-raised p-5 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 neu-inset-sm px-3 py-1 text-[10px] sm:text-xs font-black text-[#3E78B2] uppercase tracking-wider mb-2">
            <span>👨‍💼 Dasbor Eksekutif Kepala Sekolah</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-[#2A3647] font-serif">
            Evaluasi Dampak Program GEMBIRATIKA
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl">
            Data agregat seluruh kelas VIII untuk pelaporan dinas pendidikan, evaluasi kurikulum, dan pemenuhan instrumen akreditasi sekolah.
          </p>
        </div>

        <button
          onClick={downloadLaporanAkreditasi}
          className="neu-btn-primary px-5 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg w-full md:w-auto active:scale-95 transition-transform"
        >
          <Download className="w-4 h-4" />
          <span>Unduh Laporan Akreditasi</span>
        </button>
      </div>

      {/* 4 Pilar Metrik Keberhasilan (PRD Bab 4) with Neumorphic Volume */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {/* Metrik 1: AMAS <= 20 */}
        <div className="neu-raised p-4 sm:p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8494A8]">
            <span className="font-bold text-[11px] sm:text-xs">AMAS &le; 20</span>
            <span className="text-[#3F8F54] font-black flex items-center text-[10px] sm:text-[11px]">
              <ArrowDownRight className="w-3.5 h-3.5" /> -42%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#3F8F54] font-serif">82%</div>
          <div className="text-[10px] sm:text-[11px] text-[#64748B] font-bold">
            Target &ge;80% Tercapai (Baseline: 28%)
          </div>
        </div>

        {/* Metrik 2: Rerata TKA */}
        <div className="neu-raised p-4 sm:p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8494A8]">
            <span className="font-bold text-[11px] sm:text-xs">Rerata TKA</span>
            <span className="text-[#3F8F54] font-black flex items-center text-[10px] sm:text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" /> +28.36
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2A3647] font-serif">68.70</div>
          <div className="text-[10px] sm:text-[11px] text-[#64748B] font-bold">
            Naik 70.3% dari Baseline (40.34)
          </div>
        </div>

        {/* Metrik 3: Rerata SRL */}
        <div className="neu-raised p-4 sm:p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8494A8]">
            <span className="font-bold text-[11px] sm:text-xs">Kemandirian</span>
            <span className="text-[#3F8F54] font-black flex items-center text-[10px] sm:text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" /> +53.3%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#8C6D42] font-serif">78.5 / 100</div>
          <div className="text-[10px] sm:text-[11px] text-[#64748B] font-bold">
            Kenaikan metakognisi mandiri
          </div>
        </div>

        {/* Metrik 4: Kalibrasi Diri */}
        <div className="neu-raised p-4 sm:p-6 rounded-3xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8494A8]">
            <span className="font-bold text-[11px] sm:text-xs">Akurasi Diri</span>
            <span className="text-[#3F8F54] font-black flex items-center text-[10px] sm:text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" /> +35%
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#FFA726] font-serif">84.2%</div>
          <div className="text-[10px] sm:text-[11px] text-[#64748B] font-bold">
            Overconfidence mengecil
          </div>
        </div>
      </div>

      {/* Tabel Perbandingan Agregat Kelas VIII */}
      <section className="neu-raised p-5 sm:p-8 rounded-3xl space-y-4">
        <h2 className="text-base sm:text-lg font-black text-[#2A3647] flex items-center gap-2 font-serif">
          <BarChart3 className="w-5 h-5 text-[#3E78B2]" />
          Rekap Agregat per Kelas Paralel (160 Siswa)
        </h2>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DCE4ED] text-[#8494A8] font-bold text-[10px] uppercase">
                <th className="py-3 px-3">Kelas</th>
                <th className="py-3 px-3">Jumlah Siswa</th>
                <th className="py-3 px-3">Partisipasi Aktif</th>
                <th className="py-3 px-3">Rerata Skor TKA</th>
                <th className="py-3 px-3">Kecemasan (AMAS)</th>
                <th className="py-3 px-3">Status Pencapaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              <tr className="hover:bg-white/50 transition">
                <td className="py-3.5 px-3 font-black text-[#2A3647]">Kelas VIII-A</td>
                <td className="py-3.5 px-3">40 Siswa</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-bold">98%</td>
                <td className="py-3.5 px-3 font-black">71.2</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-black">18.2 (&le;20)</td>
                <td className="py-3.5 px-3">
                  <span className="neu-inset-sm px-2.5 py-0.5 text-[#3F8F54] font-black">Sangat Baik</span>
                </td>
              </tr>
              <tr className="hover:bg-white/50 transition">
                <td className="py-3.5 px-3 font-black text-[#2A3647]">Kelas VIII-B</td>
                <td className="py-3.5 px-3">40 Siswa</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-bold">95%</td>
                <td className="py-3.5 px-3 font-black">67.8</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-black">19.4 (&le;20)</td>
                <td className="py-3.5 px-3">
                  <span className="neu-inset-sm px-2.5 py-0.5 text-[#3F8F54] font-black">Baik</span>
                </td>
              </tr>
              <tr className="hover:bg-white/50 transition">
                <td className="py-3.5 px-3 font-black text-[#2A3647]">Kelas VIII-C</td>
                <td className="py-3.5 px-3">40 Siswa</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-bold">92%</td>
                <td className="py-3.5 px-3 font-black">66.5</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-black">19.8 (&le;20)</td>
                <td className="py-3.5 px-3">
                  <span className="neu-inset-sm px-2.5 py-0.5 text-[#3F8F54] font-black">Baik</span>
                </td>
              </tr>
              <tr className="hover:bg-white/50 transition">
                <td className="py-3.5 px-3 font-black text-[#2A3647]">Kelas VIII-D</td>
                <td className="py-3.5 px-3">40 Siswa</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-bold">94%</td>
                <td className="py-3.5 px-3 font-black">69.3</td>
                <td className="py-3.5 px-3 text-[#3F8F54] font-black">17.9 (&le;20)</td>
                <td className="py-3.5 px-3">
                  <span className="neu-inset-sm px-2.5 py-0.5 text-[#3F8F54] font-black">Sangat Baik</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Kepatuhan Regulasi & Privasi Siswa (UU PDP) */}
      <section className="neu-inset p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="flex items-center gap-2 text-sm font-black text-[#2A3647]">
          <ShieldCheck className="w-5 h-5 text-[#3F8F54]" />
          <span>Kepatuhan Privasi &amp; Perlindungan Data Siswa (UU PDP No. 27/2022)</span>
        </div>
        <p className="text-xs text-[#64748B] leading-relaxed">
          Seluruh data nama siswa dipseudonimkan menggunakan nama karakter alam (misal: "Kancil Gesit"). 
          Data Cek Rasa tersimpan secara privat dan tidak diakses publik. Dasbor pimpinan sekolah hanya mengolah data agregat teranonimkan.
        </p>
      </section>
    </div>
  );
}
