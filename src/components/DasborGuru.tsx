import React, { useState } from 'react';
import { MOCK_KELAS_VIII_A, SiswaKelas } from '../data';
import { 
  Users, 
  BarChart3, 
  Download, 
  Send, 
  Filter, 
  CheckCircle2, 
  Eye, 
  X
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
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Plaque */}
      <div className="neu-raised p-5 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 neu-inset-sm px-3 py-1 text-[10px] sm:text-xs font-black text-[#8C6D42] uppercase tracking-wider mb-2">
            <span>👩‍🏫 Dasbor Pendidik Matematika</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-[#2A3647] font-serif">
            Pemantauan Kelas VIII-A SMP Gemilang
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl">
            Pantau kemajuan individu secara aman (pseudonim terlindungi), deteksi siswa yang cemas, dan kirimkan misi remedial terarah.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowAssignModal(true)}
            className="neu-btn-primary px-5 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
            <span>Tugaskan Misi Baru</span>
          </button>

          <button
            onClick={exportCSV}
            className="neu-btn px-4 py-3 rounded-2xl font-black text-xs text-[#2A3647] flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:translate-y-[-1px] active:scale-95 transition-transform"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Kelas Sekilas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        <div className="neu-raised p-4 sm:p-5 rounded-3xl space-y-1">
          <span className="text-[11px] sm:text-xs font-bold text-[#8494A8] block">Total Siswa Aktif</span>
          <span className="text-xl sm:text-2xl font-black text-[#2A3647] font-serif">40 Siswa</span>
          <span className="text-[10px] sm:text-[11px] text-[#3F8F54] font-bold block">100% Ikuti Siklus SRL</span>
        </div>

        <div className="neu-raised p-4 sm:p-5 rounded-3xl space-y-1">
          <span className="text-[11px] sm:text-xs font-bold text-[#8494A8] block">Rerata AMAS (Cemas)</span>
          <span className="text-xl sm:text-2xl font-black text-[#3F8F54] font-serif">19.2 / 45</span>
          <span className="text-[10px] sm:text-[11px] text-[#3F8F54] font-bold block">Target tercapai (&lt;20)</span>
        </div>

        <div className="neu-raised p-4 sm:p-5 rounded-3xl space-y-1">
          <span className="text-[11px] sm:text-xs font-bold text-[#8494A8] block">Rerata Kalibrasi</span>
          <span className="text-xl sm:text-2xl font-black text-[#FFA726] font-serif">81.4%</span>
          <span className="text-[10px] sm:text-[11px] text-[#64748B] block">Metakognisi tumbuh</span>
        </div>

        <div className="neu-raised p-4 sm:p-5 rounded-3xl space-y-1">
          <span className="text-[11px] sm:text-xs font-bold text-[#8494A8] block">Miskonsepsi Utama</span>
          <span className="text-sm sm:text-base font-black text-[#8C6D42] block truncate">Konversi m³</span>
          <span className="text-[10px] sm:text-[11px] text-[#FF7043] font-bold block">Perlu pendampingan</span>
        </div>
      </div>

      {/* Heatmap Pola Kesalahan / Miskonsepsi per Konsep */}
      <section className="neu-raised p-5 sm:p-8 rounded-3xl space-y-4 sm:space-y-5">
        <div>
          <h2 className="text-base sm:text-lg font-black text-[#2A3647] flex items-center gap-2 font-serif">
            <BarChart3 className="w-5 h-5 text-[#8C6D42]" />
            Heatmap Pola Kesalahan &amp; Miskonsepsi Konsep
          </h2>
          <p className="text-[11px] sm:text-xs text-[#64748B]">
            Analisis kategori kesalahan di tahap Bedah Salah untuk merancang strategi pengajaran yang tepat sasaran.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
          <div className="neu-btn p-3.5 sm:p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between font-black">
              <span>Pola Bilangan</span>
              <span className="text-[#3F8F54]">8% Keliru</span>
            </div>
            <div className="neu-slider-track overflow-hidden h-2.5">
              <div className="bg-[#3F8F54] h-full rounded-full w-[8%]" />
            </div>
            <span className="text-[10px] text-[#64748B] block">Akar: Salah hitung cepat</span>
          </div>

          <div className="neu-btn p-3.5 sm:p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between font-black">
              <span>Aljabar &amp; Persamaan</span>
              <span className="text-[#FFA726]">24% Keliru</span>
            </div>
            <div className="neu-slider-track overflow-hidden h-2.5">
              <div className="bg-[#FFA726] h-full rounded-full w-[24%]" />
            </div>
            <span className="text-[10px] text-[#64748B] block">Akar: Belum paham variabel</span>
          </div>

          <div className="neu-btn p-3.5 sm:p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between font-black">
              <span>Teorema Pythagoras</span>
              <span className="text-[#3F8F54]">12% Keliru</span>
            </div>
            <div className="neu-slider-track overflow-hidden h-2.5">
              <div className="bg-[#3F8F54] h-full rounded-full w-[12%]" />
            </div>
            <span className="text-[10px] text-[#64748B] block">Akar: Lupa akar kuadrat</span>
          </div>

          <div className="neu-btn p-3.5 sm:p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between font-black">
              <span>Bangun Ruang (Balok)</span>
              <span className="text-[#FF7043]">38% Keliru</span>
            </div>
            <div className="neu-slider-track overflow-hidden h-2.5">
              <div className="bg-[#FF7043] h-full rounded-full w-[38%]" />
            </div>
            <span className="text-[10px] text-[#64748B] block">Akar: Konversi m³ ke liter</span>
          </div>
        </div>
      </section>

      {/* Daftar Kemajuan Siswa */}
      <section className="neu-raised p-5 sm:p-8 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#2A3647] flex items-center gap-2 font-serif">
              <Users className="w-5 h-5 text-[#3F8F54]" />
              Daftar Kemajuan Siswa (Kelas VIII-A)
            </h2>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Klik pada baris atau kartu siswa untuk melihat rincian jurnal refleksi dan evaluasi
            </p>
          </div>

          {/* Filter Rasa with Neumorphic Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-4 h-4 text-[#8494A8] shrink-0" />
            <span className="text-[#8494A8] font-bold shrink-0">Filter Rasa:</span>
            <select
              value={filterRasa}
              onChange={e => setFilterRasa(e.target.value)}
              className="neu-btn px-3 py-1.5 text-xs font-black text-[#2A3647] focus:outline-none w-full sm:w-auto"
            >
              <option value="all">Semua Status</option>
              <option value="tenang">😊 Tenang</option>
              <option value="ragu">😐 Ragu</option>
              <option value="cemas">😰 Cemas</option>
            </select>
          </div>
        </div>

        {/* Mobile View: Dedicated Neumorphic Cards (Clean, readable on narrow screens!) */}
        <div className="sm:hidden space-y-3">
          {filteredStudents.map(siswa => (
            <div 
              key={siswa.id}
              onClick={() => setSelectedSiswa(siswa)}
              className="neu-btn p-4 rounded-2xl space-y-3 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center justify-between gap-2 border-b border-[#DCE4ED] pb-2.5">
                <div>
                  <h4 className="text-sm font-black text-[#2A3647]">{siswa.pseudonim}</h4>
                  <span className="text-[10px] text-[#8494A8]">{siswa.namaLengkap}</span>
                </div>
                <div>
                  {siswa.statusCekRasa === 'tenang' && (
                    <span className="neu-inset-sm px-2.5 py-1 text-[11px] text-[#3F8F54] font-black inline-flex items-center gap-1">
                      😊 Tenang
                    </span>
                  )}
                  {siswa.statusCekRasa === 'ragu' && (
                    <span className="neu-inset-sm px-2.5 py-1 text-[11px] text-[#FFA726] font-black inline-flex items-center gap-1">
                      😐 Ragu
                    </span>
                  )}
                  {siswa.statusCekRasa === 'cemas' && (
                    <span className="neu-inset-sm px-2.5 py-1 text-[11px] text-[#FF7043] font-black inline-flex items-center gap-1">
                      😰 Cemas
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="neu-inset-sm p-2 rounded-xl">
                  <span className="text-[9px] text-[#8494A8] block">Misi</span>
                  <span className="font-black text-[#3F8F54]">{siswa.misiSelesai}</span>
                </div>
                <div className="neu-inset-sm p-2 rounded-xl">
                  <span className="text-[9px] text-[#8494A8] block">Kalibrasi</span>
                  <span className="font-black text-[#FFA726]">{siswa.indeksKalibrasi}%</span>
                </div>
                <div className="neu-inset-sm p-2 rounded-xl">
                  <span className="text-[9px] text-[#8494A8] block">AMAS</span>
                  <span className={`font-black ${siswa.skorAmas <= 20 ? 'text-[#3F8F54]' : 'text-[#FF7043]'}`}>
                    {siswa.skorAmas}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#64748B] truncate max-w-[200px]">
                  Fokus: <strong>{siswa.polaSalahUtama}</strong>
                </span>
                <span className="text-[#3F8F54] font-black inline-flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Rincian
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet & Desktop View: Table Data with Smooth Horizontal Scroll */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#DCE4ED] text-[#8494A8] font-bold uppercase tracking-wider text-[10px]">
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
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredStudents.map(siswa => (
                <tr 
                  key={siswa.id}
                  className="hover:bg-white/60 transition cursor-pointer"
                  onClick={() => setSelectedSiswa(siswa)}
                >
                  <td className="py-3.5 px-3 font-black text-[#2A3647] flex items-center gap-2">
                    <span>{siswa.pseudonim}</span>
                    <span className="text-[10px] text-[#8494A8] font-normal">({siswa.namaLengkap})</span>
                  </td>
                  <td className="py-3.5 px-3">
                    {siswa.statusCekRasa === 'tenang' && (
                      <span className="neu-inset-sm px-2.5 py-0.5 text-[#3F8F54] font-black inline-flex items-center gap-1">
                        😊 Tenang
                      </span>
                    )}
                    {siswa.statusCekRasa === 'ragu' && (
                      <span className="neu-inset-sm px-2.5 py-0.5 text-[#FFA726] font-black inline-flex items-center gap-1">
                        😐 Ragu
                      </span>
                    )}
                    {siswa.statusCekRasa === 'cemas' && (
                      <span className="neu-inset-sm px-2.5 py-0.5 text-[#FF7043] font-black inline-flex items-center gap-1">
                        😰 Cemas
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 font-black text-[#3F8F54]">
                    {siswa.misiSelesai} Misi
                  </td>
                  <td className="py-3.5 px-3 font-black text-[#FFA726]">
                    {siswa.indeksKalibrasi}%
                  </td>
                  <td className="py-3.5 px-3 font-black">
                    <span className={siswa.skorAmas <= 20 ? 'text-[#3F8F54]' : 'text-[#FF7043]'}>
                      {siswa.skorAmas} / 45
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-black text-[#2A3647]">
                    {siswa.skorTka}
                  </td>
                  <td className="py-3.5 px-3 text-[#64748B]">
                    {siswa.polaSalahUtama}
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSiswa(siswa);
                      }}
                      className="neu-btn px-2.5 py-1 text-xs text-[#3F8F54] font-black inline-flex items-center gap-1 hover:scale-105 transition-transform"
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

      {/* Modal Detail Drill-down Siswa with Neumorphic Card */}
      {selectedSiswa && (
        <div className="fixed inset-0 z-50 bg-[#2A3647]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="neu-raised max-w-lg w-full p-8 rounded-3xl shadow-2xl space-y-5 relative">
            <button
              onClick={() => setSelectedSiswa(null)}
              className="neu-circle-btn w-9 h-9 absolute top-4 right-4 text-[#64748B]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="border-b border-[#DCE4ED] pb-3">
              <span className="text-[10px] font-black text-[#8C6D42] uppercase tracking-wider block">Profil Pembelajar</span>
              <h3 className="text-xl font-black text-[#2A3647] font-serif">{selectedSiswa.pseudonim}</h3>
              <span className="text-xs text-[#64748B]">{selectedSiswa.namaLengkap} • Aktif: {selectedSiswa.terakhirAktif}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="neu-btn p-4 rounded-2xl">
                <span className="text-[#8494A8] block">Kecemasan (AMAS):</span>
                <span className="text-base font-black text-[#2A3647]">{selectedSiswa.skorAmas} / 45</span>
                <span className="text-[10px] text-[#3F8F54] font-bold block mt-0.5">
                  {selectedSiswa.skorAmas <= 20 ? 'Terkendali rendah' : 'Perlu empati'}
                </span>
              </div>

              <div className="neu-btn p-4 rounded-2xl">
                <span className="text-[#8494A8] block">Akurasi Kalibrasi:</span>
                <span className="text-base font-black text-[#FFA726]">{selectedSiswa.indeksKalibrasi}%</span>
                <span className="text-[10px] text-[#64748B] block mt-0.5">Metakognisi stabil</span>
              </div>
            </div>

            {/* Jurnal Refleksi Siswa */}
            <div className="neu-inset p-5 rounded-2xl text-xs space-y-1.5">
              <span className="font-black text-[#8C6D42] block">Kutipan Jurnal Terakhir:</span>
              <p className="text-[#475569] italic">"{selectedSiswa.jurnalTerakhir}"</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSiswa(null)}
                className="neu-btn px-5 py-2.5 rounded-xl text-xs font-black text-[#2A3647]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tugaskan Misi Baru */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-[#2A3647]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="neu-raised max-w-lg w-full p-8 rounded-3xl shadow-2xl space-y-5">
            <div className="border-b border-[#DCE4ED] pb-3">
              <h3 className="text-xl font-black text-[#2A3647] font-serif">Tugaskan Misi Diferensiasi</h3>
              <p className="text-xs text-[#64748B]">
                Pilih konsep esensial dan target penerima penugasan
              </p>
            </div>

            {assignSuccessMessage && (
              <div className="neu-inset p-3 rounded-2xl text-[#3F8F54] text-xs font-black flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{assignSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleAssignMission} className="space-y-4 text-xs">
              <div>
                <label className="block font-black text-[#2A3647] mb-1.5">Pilih Topik Misi Kontekstual:</label>
                <select
                  value={assignedTopic}
                  onChange={e => setAssignedTopic(e.target.value)}
                  className="w-full neu-btn p-3 font-bold text-[#2A3647] focus:outline-none"
                >
                  <option value="Pola Bilangan Aritmetika (Terasering)">Pola Bilangan Aritmetika (Paket Pertanian)</option>
                  <option value="Aljabar & Persamaan Linear (Pasar)">Aljabar & Persamaan Linear (Paket Pasar)</option>
                  <option value="Teorema Pythagoras (Pelayaran Nelayan)">Teorema Pythagoras (Paket Transportasi)</option>
                  <option value="Statistika Rata-Rata Tabungan">Statistika Rata-Rata (Paket Keuangan)</option>
                </select>
              </div>

              <div>
                <label className="block font-black text-[#2A3647] mb-1.5">Target Penerima:</label>
                <div className="space-y-2">
                  <label className="neu-btn p-3 rounded-xl flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="target" defaultChecked className="accent-[#3F8F54]" />
                    <span className="font-bold text-[#2A3647]">Seluruh Siswa Kelas VIII-A (40 siswa)</span>
                  </label>
                  <label className="neu-btn p-3 rounded-xl flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="target" className="accent-[#3F8F54]" />
                    <span className="font-bold text-[#2A3647]">Kelompok Khusus (Skor cemas &gt; 25)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="neu-btn px-5 py-2.5 rounded-xl font-black text-[#64748B]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="neu-btn-primary px-6 py-2.5 rounded-xl font-black text-white shadow-md"
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
