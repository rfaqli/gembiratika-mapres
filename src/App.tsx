import React from 'react';
import { useAtom } from 'jotai';
import { currentPageAtom, currentUserAtom } from './data';
import { Navigation } from './components/Navigation';
import { BerandaSiswa } from './components/BerandaSiswa';
import { SesiBelajar9Tahap } from './components/SesiBelajar9Tahap';
import { PetaPetualangan } from './components/PetaPetualangan';
import { RaporBelajarku } from './components/RaporBelajarku';
import { DasborGuru } from './components/DasborGuru';
import { DasborKepalaSekolah } from './components/DasborKepalaSekolah';
import { EvaluasiSection } from './components/EvaluasiSection';
import { BukuPedomanSection } from './components/BukuPedomanSection';
import { NotFoundPage } from './components/NotFoundPage';
import { ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [currentPage] = useAtom(currentPageAtom);
  const [currentUser] = useAtom(currentUserAtom);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header & Role Navigation */}
      <div>
        <Navigation />

        {/* Main Content Router */}
        <main className="flex-1 pb-16">
          {currentPage === 'beranda' && <BerandaSiswa />}
          {currentPage === 'sesi' && <SesiBelajar9Tahap />}
          {currentPage === 'peta' && <PetaPetualangan />}
          {currentPage === 'rapor' && <RaporBelajarku />}
          {currentPage === 'guru' && <DasborGuru />}
          {currentPage === 'kepsek' && <DasborKepalaSekolah />}
          {currentPage === 'evaluasi' && <EvaluasiSection />}
          {currentPage === 'pedoman' && <BukuPedomanSection />}
          {![
            'beranda',
            'sesi',
            'peta',
            'rapor',
            'guru',
            'kepsek',
            'evaluasi',
            'pedoman'
          ].includes(currentPage) && <NotFoundPage />}
        </main>
      </div>

      {/* Warm Skeuomorphic Footer */}
      <footer className="bg-[#EFE7D8] border-t-2 border-[#DCD0BA] py-8 text-xs text-[#6C5E4A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌿</span>
              <div>
                <span className="font-extrabold text-sm text-[#2C2416] font-serif block">GEMBIRATIKA</span>
                <span className="text-[11px] text-[#7A6E5D]">
                  Platform Belajar Matematika SMP Kelas VIII • Gamifikasi Adaptif &amp; Refleksi Regulasi Diri
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5D4E3A]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#5D7A4A]" />
                Privasi Terlindungi (UU PDP No. 27/2022)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-[#C26757]" />
                Ruang Belajar Ramah Anak
              </span>
            </div>
          </div>

          <div className="border-t border-[#DFD3BE] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8A7C6B]">
            <p>© 2026 GEMBIRATIKA Indonesia. Dikembangkan untuk kemajuan literasi numerasi anak bangsa.</p>
            <p>Dioptimalkan untuk browser ponsel &amp; koneksi jaringan sekolah.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
