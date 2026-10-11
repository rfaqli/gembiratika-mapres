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

      {/* Soft Neumorphic Footer */}
      <footer className="border-t border-white/60 py-8 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="neu-circle-btn w-10 h-10 text-xl">🌿</div>
              <div>
                <span className="font-black text-sm text-[#2A3647] font-serif block">GEMBIRATIKA</span>
                <span className="text-[11px] text-[#8494A8]">
                  Platform Belajar Matematika SMP Kelas VIII • Gamifikasi Adaptif &amp; Refleksi Regulasi Diri
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#475569]">
              <span className="neu-btn px-3 py-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3F8F54]" />
                Privasi Terlindungi (UU PDP No. 27/2022)
              </span>
              <span className="neu-btn px-3 py-1.5 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#FF7043]" />
                Ruang Belajar Ramah Anak
              </span>
            </div>
          </div>

          <div className="border-t border-[#DCE4ED] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8494A8]">
            <p>© 2026 GEMBIRATIKA Indonesia. Dikembangkan untuk kemajuan literasi numerasi anak bangsa.</p>
            <p>Dioptimalkan untuk browser ponsel &amp; koneksi jaringan sekolah.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
