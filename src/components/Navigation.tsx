import React from 'react';
import { useAtom } from 'jotai';
import { currentUserAtom, currentPageAtom, UserRole } from '../data';
import { Compass, BookOpen, Award, BarChart3, Users, CheckCircle2, Phone, Home, Bell } from 'lucide-react';

export function Navigation() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const handleRoleChange = (newRole: UserRole) => {
    if (newRole === 'siswa') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'siswa',
        name: 'Kancil Gesit (Dika)',
        avatar: '🦊',
        className: 'Kelas VIII-A SMP Gemilang'
      }));
      setCurrentPage('beranda');
    } else if (newRole === 'guru') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'guru',
        name: 'Bu Rina, S.Pd.',
        avatar: '👩‍🏫',
        className: 'Guru Matematika Kelas VIII'
      }));
      setCurrentPage('guru');
    } else if (newRole === 'kepala_sekolah') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'kepala_sekolah',
        name: 'Pak Drs. Ardhi, M.Pd.',
        avatar: '👨‍💼',
        className: 'Kepala Sekolah SMP Gemilang'
      }));
      setCurrentPage('kepsek');
    }
  };

  const trackWhatsApp = () => {
    console.log('[Analytics] Klik Bantuan WA Konselor');
    window.open('https://wa.me/6281234567890?text=Halo%20Admin%20GEMBIRATIKA%20saya%20butuh%20panduan', '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#E9EEF5]/95 backdrop-blur-md border-b border-white/60 shadow-xs">
      {/* Top Bar: Soft Segmented Persona Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="neu-btn px-2.5 py-1 text-[10px] font-black tracking-wider uppercase text-[#3F8F54] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#3F8F54] animate-pulse"></span>
            SMP KELAS VIII
          </span>
          <span className="text-xs text-[#6B7C93] font-medium hidden sm:inline">
            Belajar Matematika Nyaman, Hangat &amp; Berkedalaman
          </span>
        </div>

        {/* Segmented Persona Switcher with Inset Frame and Raised Active Pill */}
        <div className="neu-inset-sm p-1 flex items-center gap-1 text-[11px]">
          <span className="text-[#8494A8] px-2 font-medium hidden md:inline">Peran:</span>
          <button
            onClick={() => handleRoleChange('siswa')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              currentUser.role === 'siswa'
                ? 'neu-btn text-[#2A3647] font-black'
                : 'text-[#6B7C93] hover:text-[#2A3647]'
            }`}
          >
            🦊 Siswa (Dika)
          </button>
          <button
            onClick={() => handleRoleChange('guru')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              currentUser.role === 'guru'
                ? 'neu-btn text-[#2A3647] font-black'
                : 'text-[#6B7C93] hover:text-[#2A3647]'
            }`}
          >
            👩‍🏫 Guru (Bu Rina)
          </button>
          <button
            onClick={() => handleRoleChange('kepala_sekolah')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${
              currentUser.role === 'kepala_sekolah'
                ? 'neu-btn text-[#2A3647] font-black'
                : 'text-[#6B7C93] hover:text-[#2A3647]'
            }`}
          >
            👨‍💼 Kepala Sekolah
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand with 3D Extruded Icon */}
        <div 
          onClick={() => setCurrentPage('beranda')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="neu-circle-btn w-12 h-12 text-2xl group-hover:scale-105 transition-transform">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-[#2A3647] font-serif">GEMBIRATIKA</span>
              <span className="text-[10px] neu-inset-sm px-2 py-0.5 font-bold text-[#3F8F54]">v1.0</span>
            </div>
            <p className="text-[11px] text-[#6B7C93] font-medium leading-none">Gamifikasi Adaptif &amp; Refleksi Mandiri</p>
          </div>
        </div>

        {/* Navigation Tabs with Soft Depth */}
        <nav className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setCurrentPage('beranda')}
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 'beranda'
                ? 'neu-inset text-[#3F8F54] font-black'
                : 'neu-btn text-[#4C5B70] hover:text-[#2A3647]'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Beranda
          </button>

          <button
            onClick={() => setCurrentPage('sesi')}
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 'sesi'
                ? 'neu-btn-primary shadow-lg'
                : 'neu-btn text-[#3F8F54] hover:text-[#2E7541]'
            }`}
          >
            Sesi Belajar (9 Tahap)
          </button>

          <button
            onClick={() => setCurrentPage('peta')}
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 'peta'
                ? 'neu-inset text-[#3E78B2] font-black'
                : 'neu-btn text-[#4C5B70] hover:text-[#2A3647]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Peta Dunia
          </button>

          <button
            onClick={() => setCurrentPage('rapor')}
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 'rapor'
                ? 'neu-inset text-[#E5A93C] font-black'
                : 'neu-btn text-[#4C5B70] hover:text-[#2A3647]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Rapor Belajarku
          </button>

          {currentUser.role === 'guru' && (
            <button
              onClick={() => setCurrentPage('guru')}
              className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentPage === 'guru'
                  ? 'neu-inset text-[#8C6D42] font-black'
                  : 'neu-btn text-[#8C6D42]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Dasbor Guru
            </button>
          )}

          {currentUser.role === 'kepala_sekolah' && (
            <button
              onClick={() => setCurrentPage('kepsek')}
              className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentPage === 'kepsek'
                  ? 'neu-inset text-[#3E78B2] font-black'
                  : 'neu-btn text-[#3E78B2]'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Dasbor Kepsek
            </button>
          )}

          <button
            onClick={() => setCurrentPage('evaluasi')}
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 'evaluasi'
                ? 'neu-inset text-[#3F8F54] font-black'
                : 'neu-btn text-[#4C5B70]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Evaluasi AMAS
          </button>

          <button
            onClick={() => setCurrentPage('pedoman')}
            className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentPage === 'pedoman'
                ? 'neu-inset text-[#4C5B70] font-black'
                : 'neu-btn text-[#4C5B70]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Pedoman
          </button>
        </nav>

        {/* Right Info: Extruded Student Badge & WA */}
        <div className="flex items-center gap-3">
          {currentUser.role === 'siswa' && (
            <div className="neu-btn px-3.5 py-1.5 flex items-center gap-2.5">
              <span className="text-xl">{currentUser.avatar}</span>
              <div>
                <span className="text-xs font-extrabold text-[#2A3647] block leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-[#FFA000] font-bold block leading-tight">🪙 {currentUser.points} Poin • Lv.{currentUser.level}</span>
              </div>
            </div>
          )}

          <button
            onClick={trackWhatsApp}
            className="neu-circle-btn text-[#3F8F54] hover:text-[#2A6E3B]"
            title="Bantuan WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Submenu with Soft Raised Buttons */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2.5 gap-2 text-xs">
        <button
          onClick={() => setCurrentPage('beranda')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
            currentPage === 'beranda' ? 'neu-inset text-[#3F8F54]' : 'neu-btn text-[#4C5B70]'
          }`}
        >
          Beranda
        </button>
        <button
          onClick={() => setCurrentPage('sesi')}
          className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap ${
            currentPage === 'sesi' ? 'neu-btn-primary' : 'neu-btn text-[#3F8F54]'
          }`}
        >
          Sesi (9 Tahap)
        </button>
        <button
          onClick={() => setCurrentPage('peta')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
            currentPage === 'peta' ? 'neu-inset text-[#3E78B2]' : 'neu-btn text-[#4C5B70]'
          }`}
        >
          🗺️ Peta
        </button>
        <button
          onClick={() => setCurrentPage('rapor')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
            currentPage === 'rapor' ? 'neu-inset text-[#E5A93C]' : 'neu-btn text-[#4C5B70]'
          }`}
        >
          📜 Rapor
        </button>
        {currentUser.role === 'guru' && (
          <button
            onClick={() => setCurrentPage('guru')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
              currentPage === 'guru' ? 'neu-inset text-[#8C6D42]' : 'neu-btn text-[#8C6D42]'
            }`}
          >
            👩‍🏫 Dasbor Guru
          </button>
        )}
        {currentUser.role === 'kepala_sekolah' && (
          <button
            onClick={() => setCurrentPage('kepsek')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
              currentPage === 'kepsek' ? 'neu-inset text-[#3E78B2]' : 'neu-btn text-[#3E78B2]'
            }`}
          >
            👨‍💼 Dasbor Kepsek
          </button>
        )}
        <button
          onClick={() => setCurrentPage('evaluasi')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
            currentPage === 'evaluasi' ? 'neu-inset text-[#3F8F54]' : 'neu-btn text-[#4C5B70]'
          }`}
        >
          📝 AMAS
        </button>
        <button
          onClick={() => setCurrentPage('pedoman')}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap ${
            currentPage === 'pedoman' ? 'neu-inset text-[#4C5B70]' : 'neu-btn text-[#4C5B70]'
          }`}
        >
          📖 Pedoman
        </button>
      </div>
    </header>
  );
}
