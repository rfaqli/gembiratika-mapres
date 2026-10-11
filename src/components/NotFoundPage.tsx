import React from 'react';
import { useAtom } from 'jotai';
import { currentPageAtom } from '../data';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export function NotFoundPage() {
  const [, setCurrentPage] = useAtom(currentPageAtom);

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-[#EFEAD8] border-2 border-[#D5C7AB] flex items-center justify-center mx-auto text-5xl shadow-sm animate-pulse">
        🧭
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-[#8B6F4E] uppercase tracking-wider block">Galat 404 • Peta Belum Terjelajahi</span>
        <h1 className="text-3xl font-black text-[#2C2416] font-serif">
          Jalur Ini Belum Ada di Peta
        </h1>
        <p className="text-xs text-[#6C5E4A] leading-relaxed">
          Tenang, kamu tidak tersesat jauh! Mari kembali ke perkemahan utama dan lanjutkan petualangan matematikamu.
        </p>
      </div>

      <div>
        <button
          onClick={() => setCurrentPage('beranda')}
          className="btn-wood px-6 py-3 rounded-xl font-bold text-xs inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda GEMBIRATIKA</span>
        </button>
      </div>
    </div>
  );
}
