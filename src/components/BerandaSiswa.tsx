import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { currentUserAtom, currentPageAtom, selectedCekRasaAtom, currentSesiStageAtom, MISSIONS, CekRasaType } from '../data';
import { Compass, ShieldCheck, Heart, Award, ArrowRight, BookOpen, Trees, Anchor, Mountain, Sliders, Check } from 'lucide-react';

export function BerandaSiswa() {
  const [currentUser] = useAtom(currentUserAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [selectedCekRasa, setSelectedCekRasa] = useAtom(selectedCekRasaAtom);
  const [, setCurrentSesiStage] = useAtom(currentSesiStageAtom);

  // Skeuomorphic Interactive Toggles (like the reference image)
  const [gentleMode, setGentleMode] = useState<boolean>(true);
  const [audioHint, setAudioHint] = useState<boolean>(false);
  const [sessionTargetMinutes, setSessionTargetMinutes] = useState<number>(30);

  const startSessionWithRasa = (rasa: CekRasaType) => {
    setSelectedCekRasa(rasa);
    setCurrentSesiStage(2);
    setCurrentPage('sesi');
  };

  const handleStartFullSession = () => {
    setCurrentSesiStage(1);
    setCurrentPage('sesi');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Hero Card: Deep Soft Extrusion (Skeuomorphic Surface) */}
      <section className="neu-raised p-6 sm:p-10 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 neu-inset-sm px-3.5 py-1 text-xs font-bold text-[#3F8F54]">
              <span className="w-2 h-2 rounded-full bg-[#3F8F54] animate-pulse"></span>
              <span>Ruang Belajar Aman • Bebas Math Anxiety</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-[#2A3647] tracking-tight font-serif leading-tight">
              Selamat Datang di <span className="text-[#3F8F54]">GEMBIRATIKA</span>, {currentUser.name}!
            </h1>
            
            <p className="text-[#64748B] text-sm sm:text-base leading-relaxed">
              Di sini kamu tidak perlu takut salah. Rasakan sensasi belajar dengan tombol taktil, 
              petunjuk bertahap tanpa pengurangan poin, dan siklus refleksi mandiri yang menenangkan.
            </p>

            {/* Quick Metrics with Extruded Pillow Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="neu-btn px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <span className="text-xl">🌟</span>
                <div>
                  <span className="text-[10px] text-[#8494A8] font-bold block uppercase">Rekor Pribadi</span>
                  <span className="text-sm font-black text-[#3F8F54]">{currentUser.completedMissions} Misi Selesai</span>
                </div>
              </div>

              <div className="neu-btn px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <span className="text-xl">🎯</span>
                <div>
                  <span className="text-[10px] text-[#8494A8] font-bold block uppercase">Kalibrasi Diri</span>
                  <span className="text-sm font-black text-[#FFA726]">86% Akurat</span>
                </div>
              </div>

              <div className="neu-btn px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <span className="text-xl">🏅</span>
                <div>
                  <span className="text-[10px] text-[#8494A8] font-bold block uppercase">Lencana</span>
                  <span className="text-sm font-black text-[#8C6D42]">{currentUser.badges.length} Terkumpul</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Box: Prominent 3D Extruded Button & Interactive Donut Chart */}
          <div className="flex flex-col items-center gap-5 min-w-[280px]">
            {/* Skeuomorphic Donut Gauge (Directly Inspired by User's History Ring Reference!) */}
            <div className="w-36 h-36 neu-gauge-ring p-3">
              <div className="w-full h-full neu-gauge-inner">
                <div className="w-20 h-20 neu-gauge-center-knob">
                  <span className="text-xs text-[#8494A8] font-bold">AKURASI</span>
                  <span className="text-lg font-black text-[#2A3647]">86%</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleStartFullSession}
              className="neu-btn-primary w-full py-4 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 group shadow-xl"
            >
              <span>Mulai Sesi (9 Tahap)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[11px] text-[#8494A8] italic">~25-35 menit sesi hangat per hari</span>
          </div>
        </div>
      </section>

      {/* 2. Tahap 1: Cek Rasa (Soft 3D Pill Cards with Inset State on Selection) */}
      <section className="neu-raised p-6 sm:p-8 rounded-3xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-black text-[#2A3647] flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FF7043]" />
              Tahap 1: Cek Rasa Hatimu Sebelum Belajar
            </h2>
            <p className="text-xs text-[#6B7C93]">
              Sentuh kartu yang paling mewakili perasaanmu. Sistem adaptif akan menyesuaikan suasana belajar secara instan.
            </p>
          </div>

          {selectedCekRasa && (
            <span className="neu-inset-sm px-3 py-1 text-xs text-[#3F8F54] font-black uppercase">
              Terpilih: {selectedCekRasa}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
          {/* Card Tenang */}
          <button
            onClick={() => startSessionWithRasa('tenang')}
            className={`p-5 rounded-2xl text-left transition-all flex items-center gap-4 group cursor-pointer ${
              selectedCekRasa === 'tenang'
                ? 'neu-inset ring-2 ring-[#3F8F54]'
                : 'neu-btn hover:translate-y-[-2px]'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl neu-inset flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
              😊
            </div>
            <div>
              <span className="font-black text-[#3F8F54] text-base block">Tenang &amp; Siap</span>
              <span className="text-xs text-[#64748B] block mt-0.5">Pikiran santai, siap tantangan konsep baru.</span>
            </div>
          </button>

          {/* Card Ragu */}
          <button
            onClick={() => startSessionWithRasa('ragu')}
            className={`p-5 rounded-2xl text-left transition-all flex items-center gap-4 group cursor-pointer ${
              selectedCekRasa === 'ragu'
                ? 'neu-inset ring-2 ring-[#FFA726]'
                : 'neu-btn hover:translate-y-[-2px]'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl neu-inset flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
              😐
            </div>
            <div>
              <span className="font-black text-[#E68A00] text-base block">Agak Ragu</span>
              <span className="text-xs text-[#64748B] block mt-0.5">Ingin pemanasan ringan dan petunjuk lebih awal.</span>
            </div>
          </button>

          {/* Card Cemas */}
          <button
            onClick={() => startSessionWithRasa('cemas')}
            className={`p-5 rounded-2xl text-left transition-all flex items-center gap-4 group cursor-pointer ${
              selectedCekRasa === 'cemas'
                ? 'neu-inset ring-2 ring-[#FF7043]'
                : 'neu-btn hover:translate-y-[-2px]'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl neu-inset flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
              😰
            </div>
            <div>
              <span className="font-black text-[#E65100] text-base block">Cemas / Takut</span>
              <span className="text-xs text-[#64748B] block mt-0.5">Misi super ringan, banyak afirmasi &amp; tanpa vonis.</span>
            </div>
          </button>
        </div>
      </section>

      {/* 3. Toggles & Sliders Bar */}
      <section className="neu-raised p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#2A3647] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#3F8F54]" />
              Pengaturan Pendampingan Belajar
            </h2>
            <p className="text-xs text-[#6B7C93]">
              Kustomisasi kenyamanan belajar dengan tombol toggle taktil dan slider halus
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Toggle 1: Mode Afirmasi Ramah */}
          <div className="neu-btn p-4 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-[#2A3647] block">Afirmasi Minim Cemas</span>
              <span className="text-[11px] text-[#64748B]">Dorongan positif tiap soal</span>
            </div>

            {/* Tactile Toggle Switch (Orange Fill + 3D Extruded Knob) */}
            <div 
              onClick={() => setGentleMode(!gentleMode)}
              className={`neu-toggle-track ${gentleMode ? 'active' : 'inactive'}`}
            >
              <div className="neu-toggle-knob" />
            </div>
          </div>

          {/* Toggle 2: Petunjuk Bertahap Cepat */}
          <div className="neu-btn p-4 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black text-[#2A3647] block">Petunjuk Progresif Cepat</span>
              <span className="text-[11px] text-[#64748B]">Buka hint tanpa jeda</span>
            </div>

            <div 
              onClick={() => setAudioHint(!audioHint)}
              className={`neu-toggle-track ${audioHint ? 'active' : 'inactive'}`}
            >
              <div className="neu-toggle-knob" />
            </div>
          </div>

          {/* Slider: Target Durasi Sesi Belajar (Smooth Continuous Drag) */}
          <div className="neu-btn p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-[#2A3647]">Target Sesi Harian:</span>
              <span className="neu-inset-sm px-2.5 py-0.5 font-black text-[#FF7043]">{sessionTargetMinutes} Menit</span>
            </div>
            
            <div className="relative py-2 flex items-center select-none group">
              {/* Sunken Neumorphic Track */}
              <div className="neu-slider-track w-full overflow-hidden pointer-events-none">
                <div 
                  className="neu-slider-fill transition-all duration-75 ease-out" 
                  style={{ width: `${((sessionTargetMinutes - 15) / (60 - 15)) * 100}%` }}
                />
              </div>

              {/* 3D Extruded Neumorphic Thumb */}
              <div 
                className="neu-slider-thumb pointer-events-none transition-all duration-75 ease-out group-active:scale-105"
                style={{ 
                  left: `calc(${((sessionTargetMinutes - 15) / (60 - 15)) * 100}% - 14px)` 
                }}
              />

              {/* Smooth HTML5 Range Input Overlay */}
              <input
                type="range"
                min={15}
                max={60}
                step={1}
                value={sessionTargetMinutes}
                onChange={(e) => setSessionTargetMinutes(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Tiga Wilayah Petualangan (Extruded Theme Cards) */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#2A3647] flex items-center gap-2 font-serif">
              <Compass className="w-5 h-5 text-[#3F8F54]" />
              Tiga Wilayah Petualangan Adaptif
            </h2>
            <p className="text-xs text-[#6B7C93]">
              Sentuh salah satu wilayah untuk langsung menjalankan misi kontekstual
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('peta')}
            className="neu-btn px-4 py-2 text-xs font-black text-[#3F8F54] hover:text-[#2E7541] flex items-center gap-1"
          >
            Buka Peta Lengkap →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Region 1: Hutan Angka */}
          <div className="neu-raised p-6 rounded-3xl space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="neu-circle-btn w-14 h-14 text-2xl text-[#3F8F54]">
                <Trees className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-[#3F8F54] uppercase tracking-wider block">Wilayah 1</span>
              <h3 className="text-lg font-black text-[#2A3647] font-serif">Hutan Angka: Pola Terasering</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Menemukan keteraturan pola bilangan penataan bibit dan aljabar belanja sayuran pasar tradisional.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentSesiStage(2);
                setCurrentPage('sesi');
              }}
              className="neu-btn w-full py-2.5 font-black text-xs text-[#3F8F54] flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform"
            >
              <span>Jelajahi Misi 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Region 2: Lautan Geometri */}
          <div className="neu-raised p-6 rounded-3xl space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="neu-circle-btn w-14 h-14 text-2xl text-[#3E78B2]">
                <Anchor className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-[#3E78B2] uppercase tracking-wider block">Wilayah 2</span>
              <h3 className="text-lg font-black text-[#2A3647] font-serif">Lautan Geometri: Rute Haluan</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Menghitung jarak terdekat haluan kapal perahu nelayan dengan Teorema Pythagoras dan volume penampungan air.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentSesiStage(2);
                setCurrentPage('sesi');
              }}
              className="neu-btn w-full py-2.5 font-black text-xs text-[#3E78B2] flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform"
            >
              <span>Jelajahi Misi 2</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Region 3: Gunung Logika */}
          <div className="neu-raised p-6 rounded-3xl space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="neu-circle-btn w-14 h-14 text-2xl text-[#8C6D42]">
                <Mountain className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-black text-[#8C6D42] uppercase tracking-wider block">Wilayah 3</span>
              <h3 className="text-lg font-black text-[#2A3647] font-serif">Gunung Logika: Puncak Rata-rata</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Mengolah data tabel catatan celengan bambu keluarga dan memproyeksikan tabungan untuk masa depan.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentSesiStage(2);
                setCurrentPage('sesi');
              }}
              className="neu-btn w-full py-2.5 font-black text-xs text-[#8C6D42] flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform"
            >
              <span>Jelajahi Misi 3</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Empat Paket Konteks Kehidupan Nyata */}
      <section className="neu-raised p-6 sm:p-8 rounded-3xl space-y-4">
        <div>
          <h2 className="text-lg font-black text-[#2A3647] flex items-center gap-2 font-serif">
            <BookOpen className="w-5 h-5 text-[#3F8F54]" />
            4 Paket Konteks Kehidupan Nyata
          </h2>
          <p className="text-xs text-[#6B7C93]">
            Matematika bermakna: selalu terhubung dengan situasi akrab di sekitarmu
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="neu-btn p-4 rounded-2xl text-center space-y-1">
            <span className="text-3xl block">🌾</span>
            <span className="font-black text-xs text-[#2A3647] block">Pertanian</span>
            <span className="text-[10px] text-[#64748B] block">Terasering &amp; debit irigasi</span>
          </div>

          <div className="neu-btn p-4 rounded-2xl text-center space-y-1">
            <span className="text-3xl block">🏪</span>
            <span className="font-black text-xs text-[#2A3647] block">Pasar Rakyat</span>
            <span className="text-[10px] text-[#64748B] block">Timbangan &amp; harga grosir</span>
          </div>

          <div className="neu-btn p-4 rounded-2xl text-center space-y-1">
            <span className="text-3xl block">⛵</span>
            <span className="font-black text-xs text-[#2A3647] block">Transportasi</span>
            <span className="text-[10px] text-[#64748B] block">Rute perahu &amp; jarak aman</span>
          </div>

          <div className="neu-btn p-4 rounded-2xl text-center space-y-1">
            <span className="text-3xl block">🪙</span>
            <span className="font-black text-xs text-[#2A3647] block">Keuangan Rumah</span>
            <span className="text-[10px] text-[#64748B] block">Celengan bambu &amp; belanja</span>
          </div>
        </div>
      </section>
    </div>
  );
}
