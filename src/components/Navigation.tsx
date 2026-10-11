import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { currentUserAtom, currentPageAtom, UserRole } from '../data';
import { Compass, BookOpen, Award, BarChart3, Users, CheckCircle2, Phone, Home, Layers, Sparkles } from 'lucide-react';

export function Navigation() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [showRoleDrawer, setShowRoleDrawer] = useState(false);

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
    setShowRoleDrawer(false);
  };

  const trackWhatsApp = () => {
    console.log('[Analytics] Klik Bantuan WA Konselor');
    window.open('https://wa.me/6281234567890?text=Halo%20Admin%20GEMBIRATIKA%20saya%20butuh%20panduan', '_blank');
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#E9EEF5]/95 backdrop-blur-md border-b border-white/60 shadow-xs">
        {/* Desktop Top Bar: Role Switcher */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-6 py-2 justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="neu-btn px-2.5 py-1 text-[10px] font-black tracking-wider uppercase text-[#3F8F54] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3F8F54] animate-pulse"></span>
              SMP KELAS VIII
            </span>
            <span className="text-xs text-[#6B7C93] font-medium">
              Belajar Matematika Nyaman, Hangat &amp; Berkedalaman
            </span>
          </div>

          <div className="neu-inset-sm p-1 flex items-center gap-1 text-[11px]">
            <span className="text-[#8494A8] px-2 font-medium">Peran:</span>
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

        {/* Main Bar (Optimized for Mobile & Desktop) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => setCurrentPage('beranda')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="neu-circle-btn w-9 h-9 sm:w-11 sm:h-11 text-lg sm:text-2xl group-hover:scale-105 transition-transform shrink-0">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-base sm:text-xl font-black tracking-tight text-[#2A3647] font-serif">GEMBIRATIKA</span>
                <span className="text-[9px] neu-inset-sm px-1 sm:px-1.5 py-0.5 font-bold text-[#3F8F54]">v1.0</span>
              </div>
              <p className="text-[9px] sm:text-[11px] text-[#6B7C93] font-medium leading-none hidden xs:block">
                Gamifikasi &amp; Refleksi Mandiri
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
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

          {/* Right Action: Mobile Role Button & User Info */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Role Switcher Pill Trigger */}
            <button
              onClick={() => setShowRoleDrawer(!showRoleDrawer)}
              className="lg:hidden neu-btn px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center gap-1 text-[11px] font-black text-[#2A3647] active:scale-95 transition-transform"
              title="Ganti Peran Pengguna"
            >
              <span className="text-sm">{currentUser.avatar}</span>
              <span className="text-[10px] font-black hidden xs:inline">
                {currentUser.role === 'siswa' ? 'Siswa' : currentUser.role === 'guru' ? 'Guru' : 'Kepsek'}
              </span>
              <Layers className="w-3 h-3 text-[#3F8F54]" />
            </button>

            {/* User Point Badge */}
            {currentUser.role === 'siswa' && (
              <div className="neu-btn px-2 sm:px-2.5 py-1 flex items-center gap-1">
                <span className="text-[11px] sm:text-xs font-black text-[#FFA000]">🪙 {currentUser.points}</span>
              </div>
            )}

            {/* WA Help Button */}
            <button
              onClick={trackWhatsApp}
              className="neu-circle-btn w-8 h-8 sm:w-10 sm:h-10 text-[#3F8F54] hover:text-[#2A6E3B] active:scale-95 transition-transform shrink-0"
              title="Bantuan WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown for Role Switching & Additional Quick Menus */}
        {showRoleDrawer && (
          <div className="lg:hidden border-t border-white/60 bg-[#E9EEF5]/98 backdrop-blur-md px-4 py-3 space-y-3 shadow-inner animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-[#8494A8] uppercase tracking-wider block">Ganti Peran Pengguna:</span>
              <button 
                onClick={() => setShowRoleDrawer(false)}
                className="text-[11px] font-bold text-[#8494A8] hover:text-[#2A3647]"
              >
                ✕ Tutup
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => handleRoleChange('siswa')}
                className={`p-2.5 rounded-2xl font-bold flex flex-col items-center gap-1 transition-all active:scale-95 ${
                  currentUser.role === 'siswa' ? 'neu-inset text-[#3F8F54]' : 'neu-btn text-[#2A3647]'
                }`}
              >
                <span className="text-xl">🦊</span>
                <span className="text-[11px] font-black">Siswa</span>
                <span className="text-[9px] text-[#8494A8]">Dika</span>
              </button>
              <button
                onClick={() => handleRoleChange('guru')}
                className={`p-2.5 rounded-2xl font-bold flex flex-col items-center gap-1 transition-all active:scale-95 ${
                  currentUser.role === 'guru' ? 'neu-inset text-[#8C6D42]' : 'neu-btn text-[#2A3647]'
                }`}
              >
                <span className="text-xl">👩‍🏫</span>
                <span className="text-[11px] font-black">Guru</span>
                <span className="text-[9px] text-[#8494A8]">Bu Rina</span>
              </button>
              <button
                onClick={() => handleRoleChange('kepala_sekolah')}
                className={`p-2.5 rounded-2xl font-bold flex flex-col items-center gap-1 transition-all active:scale-95 ${
                  currentUser.role === 'kepala_sekolah' ? 'neu-inset text-[#3E78B2]' : 'neu-btn text-[#2A3647]'
                }`}
              >
                <span className="text-xl">👨‍💼</span>
                <span className="text-[11px] font-black">Kepsek</span>
                <span className="text-[9px] text-[#8494A8]">Pak Ardhi</span>
              </button>
            </div>

            {/* Mobile Extra Menu Buttons (Evaluasi & Pedoman) */}
            <div className="pt-2 border-t border-white/40 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setCurrentPage('evaluasi');
                  setShowRoleDrawer(false);
                }}
                className={`p-2 rounded-xl text-center font-bold flex items-center justify-center gap-1.5 ${
                  currentPage === 'evaluasi' ? 'neu-inset text-[#3F8F54]' : 'neu-btn text-[#4C5B70]'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Instrumen AMAS</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('pedoman');
                  setShowRoleDrawer(false);
                }}
                className={`p-2 rounded-xl text-center font-bold flex items-center justify-center gap-1.5 ${
                  currentPage === 'pedoman' ? 'neu-inset text-[#4C5B70]' : 'neu-btn text-[#4C5B70]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pedoman Guru</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          MOBILE FLOATING NEUMORPHIC BOTTOM NAVIGATION BAR
          (Centered max-width, Tactile 3D Depth, Thumb-friendly Layout)
         ========================================================================= */}
      <nav className="lg:hidden fixed bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-4 max-w-lg mx-auto z-50 neu-raised p-1.5 rounded-2xl flex items-center justify-between backdrop-blur-xl bg-[#E9EEF5]/96 border border-white/70 shadow-2xl">
        {/* Tab 1: Beranda */}
        <button
          onClick={() => setCurrentPage('beranda')}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all active:scale-95 ${
            currentPage === 'beranda'
              ? 'neu-inset text-[#3F8F54] font-black'
              : 'text-[#64748B] hover:text-[#2A3647]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] sm:text-[10px] mt-0.5 font-bold">Beranda</span>
        </button>

        {/* Tab 2: Peta Dunia */}
        <button
          onClick={() => setCurrentPage('peta')}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all active:scale-95 ${
            currentPage === 'peta'
              ? 'neu-inset text-[#3E78B2] font-black'
              : 'text-[#64748B] hover:text-[#2A3647]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[9px] sm:text-[10px] mt-0.5 font-bold">Peta</span>
        </button>

        {/* Tab 3: Sesi 9 Tahap (Highlight Button with 3D Depth) */}
        <button
          onClick={() => setCurrentPage('sesi')}
          className={`mx-1 py-2 px-3 sm:px-4 rounded-xl transition-all active:scale-95 flex flex-col items-center justify-center shrink-0 ${
            currentPage === 'sesi'
              ? 'neu-btn-primary shadow-lg scale-105'
              : 'neu-btn text-[#3F8F54]'
          }`}
        >
          <span className="text-[11px] sm:text-xs font-black leading-tight flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFE082]" />
            <span>9 Tahap</span>
          </span>
          <span className="text-[8px] sm:text-[9px] font-bold opacity-90 leading-none mt-0.5">Mulai Sesi</span>
        </button>

        {/* Tab 4: Rapor Belajarku */}
        <button
          onClick={() => setCurrentPage('rapor')}
          className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all active:scale-95 ${
            currentPage === 'rapor'
              ? 'neu-inset text-[#FFA726] font-black'
              : 'text-[#64748B] hover:text-[#2A3647]'
          }`}
        >
          <Award className="w-4 h-4" />
          <span className="text-[9px] sm:text-[10px] mt-0.5 font-bold">Rapor</span>
        </button>

        {/* Tab 5: Dasbor Role-specific (Guru / Kepsek / Evaluasi) */}
        {currentUser.role === 'guru' ? (
          <button
            onClick={() => setCurrentPage('guru')}
            className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all active:scale-95 ${
              currentPage === 'guru'
                ? 'neu-inset text-[#8C6D42] font-black'
                : 'text-[#64748B] hover:text-[#2A3647]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[9px] sm:text-[10px] mt-0.5 font-bold">Guru</span>
          </button>
        ) : currentUser.role === 'kepala_sekolah' ? (
          <button
            onClick={() => setCurrentPage('kepsek')}
            className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all active:scale-95 ${
              currentPage === 'kepsek'
                ? 'neu-inset text-[#3E78B2] font-black'
                : 'text-[#64748B] hover:text-[#2A3647]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-[9px] sm:text-[10px] mt-0.5 font-bold">Kepsek</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentPage('evaluasi')}
            className={`flex-1 py-1.5 px-1 flex flex-col items-center justify-center rounded-xl transition-all active:scale-95 ${
              currentPage === 'evaluasi'
                ? 'neu-inset text-[#3F8F54] font-black'
                : 'text-[#64748B] hover:text-[#2A3647]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-[9px] sm:text-[10px] mt-0.5 font-bold">Evaluasi</span>
          </button>
        )}
      </nav>
    </>
  );
}
