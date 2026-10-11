import React, { useState } from 'react';
import { MOCK_KELAS_VIII_A, BANK_SOAL, MISSIONS, SiswaKelas } from '../data';
import { 
  Users, 
  BarChart3, 
  Download, 
  Send, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Heart, 
  Gauge, 
  BookOpen, 
  Plus, 
  Eye, 
  FileSpreadsheet,
  HelpCircle
} from 'lucide-react';

export function DasborGuru() {
  const [selectedSiswa, setSelectedSiswa] = useState<SiswaKelas | null>(null);
  const [filterRasa, setFilterRasa] = useState<string>('all');
  const [showAssignModal, setShowAssignModal] = useState<boolean>(false);
  const [assignedTopic, setAssignedTopic] = useState<string>('Pola Bilangan Aritmetika');
  const [assignSuccessMessage, setAssignSuccessMessage] = useState<string>('');

  const filteredStudents = MOCK_KELAS_VIII_A.filter(s => {
    if (filterRasa === 'all') return true;
    return s.statusCekRasa === filterRasa;
  });

  const exportCSV = () => {
    // Generate CSV data for Launching & Teacher requirement
    const headers = ['ID,Pseudonim,Nama Asli,Cek Rasa,Misi Selesai,Indeks Kalibrasi (%),Skor AMAS,Skor TKA,Pola Salah Utama\n'];
    const rows = MOCK_KELAS_VIII_A.map(s => 
      `${s.id},"${s.pseudonim}","${s.namaLengkap}",${s.statusCekRasa},${s.misiSelesai},${s.indeksKalibrasi},${s.skorAmas},${s.skorTka},"${s.polaSalahUtama}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Kelas_VIII_A_GEMBIRATIKA_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAssignMission = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignSuccessMessage(`Misi "${assignedTopic}" berhasil ditugaskan ke seluruh siswa Kelas VIII-A!`);
    setTimeout(() => {
      setAssignSuccessMessage('');
      setShowAssignModal(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Plaque */}
      <div className="parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#EFEAD8] text-[#8B6F4E] border border-[#D5C7AB] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <span>👩‍🏫 Dasbor Pendidik Matematika</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2C2416] font-serif">
            Pemantauan Kelas VIII-A SMP Gemilang
          </h1>
          <p className="text-xs sm:text-sm text-[#6C5E4A] max-w-xl">
            Pantau kemajuan individu secara aman (pseudonim terlindungi), deteksi siswa yang mengalami kecemasan tinggi, dan kirimkan misi remedial terarah.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAssignModal(true)}
            className="btn-wood px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Tugaskan Misi Baru</span>
          </button>

          <button
            onClick={exportCSV}
            className="bg-[#FAF7F0] hover:bg-[#EFE8D6] text-[#5D4E3A] border-2 border-[#D8CBB2] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Kelas Sekilas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="parchment-card p-5 rounded-2xl border border-[#D8CBB2] space-y-1">
          <span className="text-xs font-bold text-[#7A6E5D] block">Total Siswa Aktif</span>
          <span className="text-2xl font-black text-[#2C2416] font-serif">40 Siswa</span>
          <span className="text-[11px] text-[#5D7A4A] block">100% Mengikuti Siklus SRL</span>
        </div>

        <div className="parchment-card p-5 rounded-2xl border border-[#D8CBB2] space-y-1">
          <span className="text-xs font-bold text-[#7A6E5D] block">Rerata AMAS (Kecemasan)</span>
          <span className="text-2xl font-black text-[#5D7A4A] font-serif">19.2 / 45</span>
          <span className="text-[11px] text-[#3D5C2C] block">Target tercapai (&lt;20)</span>
        </div>

        <div className="parchment-card p-5 rounded-2xl border border-[#D8CBB2] space-y-1">
          <span className="text-xs font-bold text-[#7A6E5D] block">Rerata Kalibrasi Diri</span>
          <span className="text-2xl font-black text-[#C9A84C] font-serif">81.4%</span>
          <span className="text-[11px] text-[#7A6E5D] block">Metakognisi berkembang</span>
        </div>

        <div className="parchment-card p-5 rounded-2xl border border-[#D8CBB2] space-y-1">
          <span className="text-xs font-bold text-[#7A6E5D] block">Miskonsepsi Utama</span>
          <span className="text-base font-black text-[#8B6F4E] block">Konversi Satuan m³</span>
          <span className="text-[11px] text-[#C26757] block">Perlu pendampingan kontekstual</span>
        </div>
      </div>

      {/* Heatmap Pola Kesalahan / Miskonsepsi per Konsep (PRD Bab 8.3) */}
      <section className="parchment-card p-6 rounded-2xl border-2 border-[#D8CBB2] space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#2C2416] flex items-center gap-2 font-serif">
            <BarChart3 className="w-5 h-5 text-[#8B6F4E]" />
            Heatmap Pola Kesalahan & Miskonsepsi Konsep
          </h2>
          <p className="text-xs text-[#6C5E4A]">
            Analisis kategori kesalahan di tahap Bedah Salah untuk merancang strategi pengajaran yang tepat sasaran.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span>Pola Bilangan</span>
              <span className="text-[#5D7A4A]">8% Keliru</span>
            </div>
            <div className="w-full bg-[#E8DEC9] h-2 rounded-full overflow-hidden">
              <div className="bg-[#5D7A4A] h-full w-[8%]" />
            </div>
            <span className="text-[10px] text-[#7A6E5D] block">Akar: Salah hitung cepat</span>
          </div>

          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span>Aljabar & Persamaan</span>
              <span className="text-[#D4944A]">24% Keliru</span>
            </div>
            <div className="w-full bg-[#E8DEC9] h-2 rounded-full overflow-hidden">
              <div className="bg-[#D4944A] h-full w-[24%]" />
            </div>
            <span className="text-[10px] text-[#7A6E5D] block">Akar: Belum paham variabel</span>
          </div>

          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span>Teorema Pythagoras</span>
              <span className="text-[#5D7A4A]">12% Keliru</span>
            </div>
            <div className="w-full bg-[#E8DEC9] h-2 rounded-full overflow-hidden">
              <div className="bg-[#5D7A4A] h-full w-[12%]" />
            </div>
            <span className="text-[10px] text-[#7A6E5D] block">Akar: Lupa akar kuadrat</span>
          </div>

          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span>Bangun Ruang (Balok)</span>
              <span className="text-[#C26757]">38% Keliru</span>
            </div>
            <div className="w-full bg-[#E8DEC9] h-2 rounded-full overflow-hidden">
              <div className="bg-[#C26757] h-full w-[38%]" />
            </div>
            <span className="text-[10px] text-[#7A6E5D] block">Akar: Konversi m³ ke liter</span>
          </div>
        </div>
      </section>

      {/* Tabel Kemajuan Siswa */}
      <section className="parchment-card p-6 rounded-2xl border-2 border-[#D8CBB2] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[#2C2416] flex items-center gap-2 font-serif">
              <Users className="w-5 h-5 text-[#5D7A4A]" />
              Daftar Kemajuan Siswa (Kelas VIII-A)
            </h2>
            <p className="text-xs text-[#6C5E4A]">
              Klik pada baris siswa untuk melihat jurnal refleksi dan rincian evaluasi.
            </p>
          </div>

          {/* Filter Rasa */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-4 h-4 text-[#7A6E5D]" />
            <span className="text-[#7A6E5D] font-medium">Filter Rasa:</span>
            <select
              value={filterRasa}
              onChange={e => setFilterRasa(e.target.value)}
              className="bg-[#FAF7F0] border border-[#D5C7AB] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#2D241E] focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="tenang">😊 Tenang</option>
              <option value="ragu">😐 Ragu</option>
              <option value="cemas">😰 Cemas</option>
            </select>
          </div>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#D8CBB2] text-[#7A6E5D] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Pseudonim Siswa</th>
                <th className="py-3 px-3">Cek Rasa</th>
                <th className="py-3 px-3">Misi Selesai</th>
                <th className="py-3 px-3">Kalibrasi Diri</th>
                <th className="py-3 px-3">AMAS (Cemas)</th>
                <th className="py-3 px-3">Skor TKA</th>
                <th className="py-3 px-3">Fokus Bedah Salah</th>
                <th className="py-3 px-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE1D1]">
              {filteredStudents.map(siswa => (
                <tr 
                  key={siswa.id}
                  className="hover:bg-[#F5EFE0] transition cursor-pointer"
                  onClick={() => setSelectedSiswa(siswa)}
                >
                  <td className="py-3 px-3 font-bold text-[#2C2416] flex items-center gap-2">
                    <span>{siswa.pseudonim}</span>
                    <span className="text-[10px] text-[#7A6E5D] font-normal">({siswa.namaLengkap})</span>
                  </td>
                  <td className="py-3 px-3">
                    {siswa.statusCekRasa === 'tenang' && (
                      <span className="bg-[#EBF3E6] text-[#3B5428] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        😊 Tenang
                      </span>
                    )}
                    {siswa.statusCekRasa === 'ragu' && (
                      <span className="bg-[#FEF7EC] text-[#82531E] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        😐 Ragu
                      </span>
                    )}
                    {siswa.statusCekRasa === 'cemas' && (
                      <span className="bg-[#FDF0EE] text-[#782E22] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        😰 Cemas
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#5D7A4A]">
                    {siswa.misiSelesai} Misi
                  </td>
                  <td className="py-3 px-3 font-bold text-[#B88728]">
                    {siswa.indeksKalibrasi}%
                  </td>
                  <td className="py-3 px-3 font-bold">
                    <span className={siswa.skorAmas <= 20 ? 'text-[#5D7A4A]' : 'text-[#C26757]'}>
                      {siswa.skorAmas} / 45
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-[#2D241E]">
                    {siswa.skorTka}
                  </td>
                  <td className="py-3 px-3 text-[#7A6E5D]">
                    {siswa.polaSalahUtama}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSiswa(siswa);
                      }}
                      className="text-[#5D7A4A] hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Rincian</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Detail Drill-down Siswa */}
      {selectedSiswa && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="parchment-card max-w-lg w-full p-6 rounded-2xl border-2 border-[#D8CBB2] shadow-2xl space-y-4 relative">
            <button
              onClick={() => setSelectedSiswa(null)}
              className="absolute top-4 right-4 text-[#7A6E5D] hover:text-[#2D241E] font-bold text-lg"
            >
              ✕
            </button>

            <div className="border-b border-[#E8DFC9] pb-3">
              <span className="text-[10px] font-bold text-[#8B6F4E] uppercase tracking-wider block">Profil Pembelajar Mandiri</span>
              <h3 className="text-xl font-black text-[#2C2416] font-serif">{selectedSiswa.pseudonim}</h3>
              <span className="text-xs text-[#7A6E5D]">{selectedSiswa.namaLengkap} • Aktif: {selectedSiswa.terakhirAktif}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#D8CBB2]">
                <span className="text-[#7A6E5D] block">Tingkat Kecemasan (AMAS):</span>
                <span className="text-base font-bold text-[#2C2416]">{selectedSiswa.skorAmas} / 45</span>
                <span className="text-[10px] text-[#5D7A4A] block mt-0.5">
                  {selectedSiswa.skorAmas <= 20 ? 'Terkendali rendah' : 'Perlu pendekatan empati'}
                </span>
              </div>

              <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#D8CBB2]">
                <span className="text-[#7A6E5D] block">Akurasi Kalibrasi Diri:</span>
                <span className="text-base font-bold text-[#B88728]">{selectedSiswa.indeksKalibrasi}%</span>
                <span className="text-[10px] text-[#7A6E5D] block mt-0.5">Metakognisi stabil</span>
              </div>
            </div>

            {/* Jurnal Refleksi Siswa */}
            <div className="bg-[#FAF7EC] p-4 rounded-xl border border-[#DFD3BE] text-xs space-y-1.5">
              <span className="font-bold text-[#8B6F4E] block">Kutipan Jurnal Terakhir:</span>
              <p className="text-[#3F3425] italic">"{selectedSiswa.jurnalTerakhir}"</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSiswa(null)}
                className="bg-[#FAF7F0] text-[#5D4E3A] border border-[#D8CBB2] px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#EFE8D6]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tugaskan Misi Baru */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="parchment-card max-w-lg w-full p-6 rounded-2xl border-2 border-[#D8CBB2] shadow-2xl space-y-4">
            <div className="border-b border-[#E8DFC9] pb-3">
              <h3 className="text-xl font-black text-[#2C2416] font-serif">Tugaskan Misi Diferensiasi</h3>
              <p className="text-xs text-[#6C5E4A]">
                Pilih konsep matematika esensial dan target penerima penugasan.
              </p>
            </div>

            {assignSuccessMessage && (
              <div className="bg-[#EBF3E6] border border-[#BCD0AD] text-[#3B5428] p-3 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{assignSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleAssignMission} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2C2416] mb-1">Pilih Topik Misi Kontekstual:</label>
                <select
                  value={assignedTopic}
                  onChange={e => setAssignedTopic(e.target.value)}
                  className="w-full bg-[#FAF7F0] border border-[#D5C7AB] rounded-xl p-2.5 font-medium text-[#2D241E] focus:outline-none"
                >
                  <option value="Pola Bilangan Aritmetika (Terasering)">Pola Bilangan Aritmetika (Paket Pertanian)</option>
                  <option value="Aljabar & Persamaan Linear (Pasar)">Aljabar & Persamaan Linear (Paket Pasar)</option>
                  <option value="Teorema Pythagoras (Pelayaran Nelayan)">Teorema Pythagoras (Paket Transportasi)</option>
                  <option value="Statistika Rata-Rata Tabungan">Statistika Rata-Rata (Paket Keuangan)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2C2416] mb-1">Target Penerima:</label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-[#4A3C2B]">
                    <input type="radio" name="target" defaultChecked />
                    <span>Seluruh Siswa Kelas VIII-A (40 siswa)</span>
                  </label>
                  <label className="flex items-center gap-2 text-[#4A3C2B]">
                    <input type="radio" name="target" />
                    <span>Kelompok Khusus (Siswa dengan skor cemas &gt; 25)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#D8CBB2] text-[#5D4E3A] font-bold hover:bg-[#EFE8D6]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-wood px-5 py-2 rounded-xl font-bold text-white shadow-xs"
                >
                  Kirimkan Misi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
