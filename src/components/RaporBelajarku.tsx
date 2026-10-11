import React from 'react';
import { useAtom } from 'jotai';
import { currentUserAtom, sessionHistoryAtom, currentPageAtom } from '../data';
import { Award, Heart, Gauge, BookOpen, Printer, ArrowRight, ShieldCheck } from 'lucide-react';

export function RaporBelajarku() {
  const [currentUser] = useAtom(currentUserAtom);
  const [sessionHistory] = useAtom(sessionHistoryAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);

  const printReport = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Action Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2C2416] font-serif">
            Rapor Belajarku (Refleksi Mandiri)
          </h1>
          <p className="text-xs text-[#6C5E4A]">
            Laporan kemajuan berkala untuk merayakan perkembangan diri tanpa perbandingan ranking.
          </p>
        </div>

        <button
          onClick={printReport}
          className="bg-[#FAF7F0] hover:bg-[#EFE8D6] text-[#5D4E3A] border-2 border-[#D8CBB2] px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan PDF</span>
        </button>
      </div>

      {/* Skeuomorphic Official Report Card with Stamp */}
      <div className="parchment-card p-6 sm:p-10 rounded-3xl border-4 border-[#C9A84C]/50 shadow-2xl relative space-y-8 bg-[#FCFAF5]">
        {/* Wax Stamp Seal */}
        <div className="absolute top-6 right-6 wax-stamp px-3 py-1.5 text-xs font-black rotate-[-6deg] opacity-85 select-none pointer-events-none">
          ★ TERVERIFIKASI SRL ★
        </div>

        {/* Student Profile Identity Header */}
        <div className="border-b-2 border-[#E5DAC6] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EFEAD8] border-2 border-[#D5C7AB] flex items-center justify-center text-4xl shadow-sm">
              {currentUser.avatar}
            </div>
            <div>
              <span className="text-xs font-bold text-[#8B6F4E] uppercase tracking-wider block">Identitas Siswa (Pseudonim)</span>
              <h2 className="text-2xl font-black text-[#2C2416] font-serif">{currentUser.name}</h2>
              <span className="text-xs text-[#6C5E4A]">{currentUser.className} • SMP Kelas VIII</span>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-[#7A6E5D] space-y-1">
            <div>Periode Belajar: <strong>Semester Berjalan</strong></div>
            <div>Status: <span className="text-[#5D7A4A] font-bold">Aktif Berkembang</span></div>
          </div>
        </div>

        {/* 3 Indikator Utama Pilar GEMBIRATIKA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-1 text-center">
            <span className="text-xs font-bold text-[#7A6E5D] block">Rekor Misi Mandiri</span>
            <span className="text-2xl font-black text-[#5D7A4A] font-serif">{currentUser.completedMissions} Selesai</span>
            <span className="text-[10px] text-[#8B6F4E] block">Bukan Papan Peringkat</span>
          </div>

          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-1 text-center">
            <span className="text-xs font-bold text-[#7A6E5D] block">Akurasi Kalibrasi Diri</span>
            <span className="text-2xl font-black text-[#C9A84C] font-serif">86% Akurat</span>
            <span className="text-[10px] text-[#5D7A4A] block">Mengenali Pemahaman Sendiri</span>
          </div>

          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-1 text-center">
            <span className="text-xs font-bold text-[#7A6E5D] block">Kecemasan (AMAS)</span>
            <span className="text-2xl font-black text-[#385226] font-serif">17 / 45</span>
            <span className="text-[10px] text-[#385226] block">Terkendali (Skor Rendah)</span>
          </div>
        </div>

        {/* Tren Emosi Belajar (Cek Rasa) */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#2C2416] flex items-center gap-2 font-serif">
            <Heart className="w-4 h-4 text-[#C26757]" />
            Tren Emosi Awal Belajar (Cek Rasa Mingguan)
          </h3>
          <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-[#EBF3E6] border border-[#BCD0AD]">
              <span className="text-xl block mb-0.5">😊</span>
              <span className="font-bold text-[#3B5428] block">70% Tenang</span>
              <span className="text-[10px] text-[#645643]">Percaya diri menghadapi soal</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FEF7EC] border border-[#E8D4B4]">
              <span className="text-xl block mb-0.5">😐</span>
              <span className="font-bold text-[#82531E] block">20% Ragu</span>
              <span className="text-[10px] text-[#645643]">Meminta hint bertahap</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FDF0EE] border border-[#E9C3BC]">
              <span className="text-xl block mb-0.5">😰</span>
              <span className="font-bold text-[#782E22] block">10% Cemas</span>
              <span className="text-[10px] text-[#645643]">Diberikan materi pemulihan</span>
            </div>
          </div>
        </div>

        {/* Koleksi Lencana Keberanian */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#2C2416] flex items-center gap-2 font-serif">
            <Award className="w-4 h-4 text-[#C9A84C]" />
            Koleksi Lencana Keberanian Belajar
          </h3>
          <div className="flex flex-wrap gap-3">
            {currentUser.badges.map((badge, idx) => (
              <div 
                key={idx}
                className="bg-[#FAF7F0] border-2 border-[#D5C7AB] px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-xs"
              >
                <span className="text-xl">🏅</span>
                <div>
                  <span className="text-xs font-bold text-[#2C2416] block">{badge}</span>
                  <span className="text-[10px] text-[#7A6E5D] block">Teruji dalam Misi Kontekstual</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat Jurnal Refleksi Mandiri */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#2C2416] flex items-center gap-2 font-serif">
            <BookOpen className="w-4 h-4 text-[#8B6F4E]" />
            Catatan Jurnal Refleksi Terpilih
          </h3>
          <div className="space-y-2">
            <div className="bg-[#FAF7EC] p-3.5 rounded-xl border border-[#DFD3BE] text-xs text-[#5C4F3C] italic">
              "Hari ini aku belajar bahwa Teorema Pythagoras itu seperti rute layar perahu nelayan mencari jarak terdekat di laut."
              <span className="text-[10px] text-[#8B6F4E] block mt-1 not-italic font-bold">— Catatan Sesi Misi 2</span>
            </div>
            <div className="bg-[#FAF7EC] p-3.5 rounded-xl border border-[#DFD3BE] text-xs text-[#5C4F3C] italic">
              "Tadi sempat salah hitung di pola barisan cabai, tapi setelah bedah salah, aku tahu kesalahanku hanya kurang teliti menjumlah."
              <span className="text-[10px] text-[#8B6F4E] block mt-1 not-italic font-bold">— Catatan Sesi Misi 1</span>
            </div>
          </div>
        </div>

        {/* Catatan Apresiasi Guru */}
        <div className="bg-[#EFEAD8] p-4 rounded-xl border border-[#D5C7AB] text-xs space-y-1">
          <span className="font-bold text-[#3B4E2B] block">Pesan Bu Rina (Guru Matematika):</span>
          <p className="text-[#594B37] leading-relaxed">
            "Dika menunjukkan peningkatan yang sangat membanggakan dalam merefleksikan kesalahannya secara mandiri. Tetap pertahankan rasa ingin tahu dan jangan pernah takut salah!"
          </p>
        </div>
      </div>
    </div>
  );
}
