import React from 'react';
import { useAtom } from 'jotai';
import { currentUserAtom, currentPageAtom, currentSesiStageAtom, activeMissionAtom, MISSIONS } from '../data';
import { Compass, ArrowRight, Trees, Anchor, Mountain } from 'lucide-react';

export function PetaPetualangan() {
  const [currentUser] = useAtom(currentUserAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [, setCurrentSesiStage] = useAtom(currentSesiStageAtom);
  const [, setActiveMission] = useAtom(activeMissionAtom);

  const startMission = (missionId: string) => {
    const m = MISSIONS.find(item => item.id === missionId) || MISSIONS[0];
    setActiveMission(m);
    setCurrentSesiStage(3);
    setCurrentPage('sesi');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Peta Header Card */}
      <div className="neu-raised p-6 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="neu-circle-btn w-14 h-14 text-2xl text-[#3F8F54]">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#2A3647] font-serif">
                Peta Petualangan Nusantara
              </h1>
              <p className="text-xs text-[#64748B]">
                Jelajahi setiap wilayah konsep esensial SMP Kelas VIII tanpa persaingan peringkat
              </p>
            </div>
          </div>
        </div>

        {/* User Badges Quick View */}
        <div className="neu-btn px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">🦊</span>
          <div>
            <span className="text-xs font-black text-[#2A3647] block">{currentUser.name}</span>
            <span className="text-[10px] text-[#FFA726] font-bold block">🪙 {currentUser.points} Poin Terkumpul</span>
          </div>
        </div>
      </div>

      {/* 3D Soft Extruded Road Canvas */}
      <div className="neu-raised p-8 sm:p-12 rounded-3xl space-y-10">
        {/* Pos 1: Hutan Angka */}
        <div className="neu-btn p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="neu-circle-btn w-16 h-16 text-3xl text-[#3F8F54] shrink-0">
              <Trees className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3F8F54] uppercase">
                  Wilayah 1 • Terbuka
                </span>
                <span className="text-xs text-[#64748B]">Paket Konteks: Pertanian &amp; Pasar</span>
              </div>
              <h3 className="text-xl font-black text-[#2A3647] font-serif">Hutan Angka: Pola Terasering</h3>
              <p className="text-xs text-[#64748B] max-w-lg leading-relaxed">
                Mempelajari barisan aritmetika penataan bibit padi dan aljabar belanja sayuran pasar tradisional.
              </p>
            </div>
          </div>

          <button
            onClick={() => startMission('misi-1')}
            className="neu-btn-primary px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <span>Jalankan Misi 1</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pos 2: Lautan Geometri */}
        <div className="neu-btn p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="neu-circle-btn w-16 h-16 text-3xl text-[#3E78B2] shrink-0">
              <Anchor className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3E78B2] uppercase">
                  Wilayah 2 • Terbuka
                </span>
                <span className="text-xs text-[#64748B]">Paket Konteks: Transportasi Laut</span>
              </div>
              <h3 className="text-xl font-black text-[#2A3647] font-serif">Lautan Geometri: Rute Haluan</h3>
              <p className="text-xs text-[#64748B] max-w-lg leading-relaxed">
                Navigasi perahu nelayan mencari jarak terdekat di samudra dengan Teorema Pythagoras dan volume penampungan air balok.
              </p>
            </div>
          </div>

          <button
            onClick={() => startMission('misi-2')}
            className="neu-btn-primary px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <span>Jalankan Misi 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pos 3: Gunung Logika */}
        <div className="neu-btn p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="neu-circle-btn w-16 h-16 text-3xl text-[#8C6D42] shrink-0">
              <Mountain className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#8C6D42] uppercase">
                  Wilayah 3 • Terbuka
                </span>
                <span className="text-xs text-[#64748B]">Paket Konteks: Keuangan &amp; Tabungan</span>
              </div>
              <h3 className="text-xl font-black text-[#2A3647] font-serif">Gunung Logika: Puncak Rata-Rata</h3>
              <p className="text-xs text-[#64748B] max-w-lg leading-relaxed">
                Mengolah data tabel celengan bambu keluarga dan memproyeksikan tabungan untuk koperasi desa mandiri.
              </p>
            </div>
          </div>

          <button
            onClick={() => startMission('misi-3')}
            className="neu-btn-primary px-6 py-3 rounded-2xl font-black text-xs flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <span>Jalankan Misi 3</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
