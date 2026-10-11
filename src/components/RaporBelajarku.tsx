import React from 'react';
import { useAtom } from 'jotai';
import { currentUserAtom, sessionHistoryAtom, currentPageAtom } from '../data';
import { Award, Heart, Gauge, BookOpen, Printer, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function RaporBelajarku() {
  const [currentUser] = useAtom(currentUserAtom);
  const [sessionHistory] = useAtom(sessionHistoryAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);

  const printReport = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Action Header Card */}
      <div className="neu-raised p-6 sm:p-8 rounded-3xl flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2A3647] font-serif">
            Rapor Belajarku (Refleksi Mandiri)
          </h1>
          <p className="text-xs text-[#64748B]">
            Laporan kemajuan berkala untuk merayakan perkembangan diri tanpa perbandingan ranking
          </p>
        </div>

        <button
          onClick={printReport}
          className="neu-btn px-4 py-2.5 text-xs font-black text-[#2A3647] flex items-center gap-2 cursor-pointer shadow-sm hover:translate-y-[-1px] transition-transform"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak PDF</span>
        </button>
      </div>

      {/* Main Extruded Report Surface with Soft Depth */}
      <div className="neu-raised p-6 sm:p-10 rounded-3xl relative space-y-8">
        {/* Soft Beveled Badge */}
        <div className="absolute top-6 right-6 neu-btn px-3 py-1.5 text-[10px] font-black text-[#3F8F54] uppercase tracking-wider select-none">
          ★ TERVERIFIKASI SRL ★
        </div>

        {/* Student Profile Identity Header */}
        <div className="border-b border-[#DCE4ED] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="neu-circle-btn w-16 h-16 text-3xl shrink-0">
              {currentUser.avatar}
            </div>
            <div>
              <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#8C6D42] uppercase tracking-wider inline-block mb-1">
                Identitas Siswa (Pseudonim)
              </span>
              <h2 className="text-2xl font-black text-[#2A3647] font-serif">{currentUser.name}</h2>
              <span className="text-xs text-[#64748B]">{currentUser.className} • SMP Kelas VIII</span>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-[#64748B] space-y-1">
            <div>Periode: <strong>Semester Berjalan</strong></div>
            <div>Status: <span className="neu-inset-sm px-2 py-0.5 text-[#3F8F54] font-black">Aktif Berkembang</span></div>
          </div>
        </div>

        {/* 3 Metric Pills with Inset Depth & Gauge Ring */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="neu-btn p-5 rounded-2xl space-y-1 text-center">
            <span className="text-xs font-bold text-[#8494A8] block">Rekor Misi Mandiri</span>
            <span className="text-2xl font-black text-[#3F8F54] font-serif">{currentUser.completedMissions} Selesai</span>
            <span className="text-[10px] text-[#8494A8] block">Bukan Peringkat</span>
          </div>

          <div className="neu-btn p-5 rounded-2xl space-y-1 text-center">
            <span className="text-xs font-bold text-[#8494A8] block">Akurasi Kalibrasi Diri</span>
            <span className="text-2xl font-black text-[#FFA726] font-serif">86% Akurat</span>
            <span className="text-[10px] text-[#3F8F54] block font-bold">Metakognisi Matang</span>
          </div>

          <div className="neu-btn p-5 rounded-2xl space-y-1 text-center">
            <span className="text-xs font-bold text-[#8494A8] block">Kecemasan (AMAS)</span>
            <span className="text-2xl font-black text-[#3F8F54] font-serif">17 / 45</span>
            <span className="text-[10px] text-[#3F8F54] block font-bold">Terkendali (Skor Rendah)</span>
          </div>
        </div>

        {/* Tren Emosi Belajar (Cek Rasa) */}
        <div className="neu-inset p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#2A3647] flex items-center gap-2 font-serif">
              <Heart className="w-4 h-4 text-[#FF7043]" />
              Tren Emosi Awal Belajar (Cek Rasa Mingguan)
            </h3>
            <span className="text-xs text-[#64748B]">Privat &amp; Terbimbing</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div className="neu-btn p-4 rounded-2xl space-y-1">
              <span className="text-2xl block">😊</span>
              <span className="font-black text-[#3F8F54] block">70% Tenang</span>
              <span className="text-[10px] text-[#64748B]">Percaya diri menghadapi soal</span>
            </div>
            <div className="neu-btn p-4 rounded-2xl space-y-1">
              <span className="text-2xl block">😐</span>
              <span className="font-black text-[#FFA726] block">20% Ragu</span>
              <span className="text-[10px] text-[#64748B]">Meminta petunjuk bertahap</span>
            </div>
            <div className="neu-btn p-4 rounded-2xl space-y-1">
              <span className="text-2xl block">😰</span>
              <span className="font-black text-[#FF7043] block">10% Cemas</span>
              <span className="text-[10px] text-[#64748B]">Diberi materi pemulihan</span>
            </div>
          </div>
        </div>

        {/* Koleksi Lencana Keberanian */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-[#2A3647] flex items-center gap-2 font-serif">
            <Award className="w-4 h-4 text-[#FFA726]" />
            Koleksi Lencana Keberanian Belajar
          </h3>
          <div className="flex flex-wrap gap-4">
            {currentUser.badges.map((badge, idx) => (
              <div 
                key={idx}
                className="neu-btn px-4 py-3 rounded-2xl flex items-center gap-3"
              >
                <div className="neu-circle-btn w-10 h-10 text-xl shrink-0">🏅</div>
                <div>
                  <span className="text-xs font-black text-[#2A3647] block">{badge}</span>
                  <span className="text-[10px] text-[#64748B] block">Teruji dalam Misi Kontekstual</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat Jurnal Refleksi Mandiri */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-[#2A3647] flex items-center gap-2 font-serif">
            <BookOpen className="w-4 h-4 text-[#8C6D42]" />
            Catatan Jurnal Refleksi Terpilih
          </h3>
          <div className="space-y-3">
            <div className="neu-inset p-4 rounded-2xl text-xs text-[#475569] italic">
              "Hari ini aku belajar bahwa Teorema Pythagoras itu seperti rute layar perahu nelayan mencari jarak terdekat di laut."
              <span className="text-[10px] text-[#8C6D42] block mt-1 not-italic font-black">— Catatan Sesi Misi 2</span>
            </div>
            <div className="neu-inset p-4 rounded-2xl text-xs text-[#475569] italic">
              "Tadi sempat salah hitung di pola barisan cabai, tapi setelah bedah salah, aku tahu kesalahanku hanya kurang teliti menjumlah."
              <span className="text-[10px] text-[#8C6D42] block mt-1 not-italic font-black">— Catatan Sesi Misi 1</span>
            </div>
          </div>
        </div>

        {/* Catatan Apresiasi Guru */}
        <div className="neu-btn p-5 rounded-2xl text-xs space-y-1.5 border-l-4 border-l-[#3F8F54]">
          <span className="font-black text-[#3F8F54] block">Pesan Bu Rina (Guru Matematika):</span>
          <p className="text-[#475569] leading-relaxed">
            "Dika menunjukkan peningkatan yang sangat membanggakan dalam merefleksikan kesalahannya secara mandiri. Tetap pertahankan rasa ingin tahu dan jangan pernah takut salah!"
          </p>
        </div>
      </div>
    </div>
  );
}
