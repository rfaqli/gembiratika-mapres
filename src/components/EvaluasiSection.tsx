import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { currentUserAtom, AMAS_QUESTIONS, SRL_QUESTIONS } from '../data';
import { CheckCircle2, Award, Heart, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

export function EvaluasiSection() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [activeTab, setActiveTab] = useState<'amas' | 'srl' | 'tka'>('amas');

  // AMAS State (9 Items)
  const [amasResponses, setAmasResponses] = useState<{ [key: string]: number }>({
    'amas-1': 2,
    'amas-2': 3,
    'amas-3': 2,
    'amas-4': 2,
    'amas-5': 1,
    'amas-6': 2,
    'amas-7': 2,
    'amas-8': 2,
    'amas-9': 1
  });
  const [amasSubmitted, setAmasSubmitted] = useState<boolean>(false);

  // SRL State (8 Items)
  const [srlResponses, setSrlResponses] = useState<{ [key: string]: number }>({
    'srl-1': 4,
    'srl-2': 4,
    'srl-3': 5,
    'srl-4': 4,
    'srl-5': 5,
    'srl-6': 4,
    'srl-7': 4,
    'srl-8': 5
  });
  const [srlSubmitted, setSrlSubmitted] = useState<boolean>(false);

  const calculateAmasTotal = (): number => {
    return (Object.values(amasResponses) as number[]).reduce((sum: number, val: number) => sum + val, 0);
  };

  const calculateSrlTotal = (): number => {
    const raw = (Object.values(srlResponses) as number[]).reduce((sum: number, val: number) => sum + val, 0);
    return Math.round((raw / (8 * 5)) * 100);
  };

  const handleAmasSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateAmasTotal();
    setAmasSubmitted(true);
    setCurrentUser(prev => ({
      ...prev,
      amasScorePost: score
    }));
  };

  const handleSrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateSrlTotal();
    setSrlSubmitted(true);
    setCurrentUser(prev => ({
      ...prev,
      srlScorePost: score
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header Plaque */}
      <div className="neu-raised p-5 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="neu-circle-btn w-12 h-12 text-2xl text-[#3F8F54] shrink-0">📝</div>
          <div>
            <h1 className="text-xl sm:text-3xl font-black text-[#2A3647] font-serif">
              Instrumen Evaluasi Ilmiah GEMBIRATIKA
            </h1>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Pengukuran dampak terstandarisasi untuk penurunan kecemasan (AMAS) dan kemandirian belajar (SRL).
            </p>
          </div>
        </div>

        {/* Tab Switcher with Extruded / Inset Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#DCE4ED] overflow-x-auto flex-nowrap py-1 text-xs font-black">
          <button
            onClick={() => setActiveTab('amas')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition cursor-pointer shrink-0 active:scale-95 ${
              activeTab === 'amas'
                ? 'neu-inset text-[#3F8F54]'
                : 'neu-btn text-[#64748B] hover:text-[#2A3647]'
            }`}
          >
            1. Kuesioner AMAS
          </button>
          <button
            onClick={() => setActiveTab('srl')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition cursor-pointer shrink-0 active:scale-95 ${
              activeTab === 'srl'
                ? 'neu-inset text-[#3F8F54]'
                : 'neu-btn text-[#64748B] hover:text-[#2A3647]'
            }`}
          >
            2. Kuesioner SRL
          </button>
          <button
            onClick={() => setActiveTab('tka')}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl transition cursor-pointer shrink-0 active:scale-95 ${
              activeTab === 'tka'
                ? 'neu-inset text-[#3F8F54]'
                : 'neu-btn text-[#64748B] hover:text-[#2A3647]'
            }`}
          >
            3. Info Tryout TKA
          </button>
        </div>
      </div>

      {/* ---------------- TAB 1: KUESIONER AMAS ---------------- */}
      {activeTab === 'amas' && (
        <div className="neu-raised p-5 sm:p-8 rounded-3xl space-y-5 sm:space-y-6">
          <div className="space-y-1">
            <span className="neu-inset-sm px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black text-[#8C6D42] uppercase tracking-wider inline-block">
              Abbreviated Math Anxiety Scale (AMAS)
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#2A3647] font-serif">
              Pengukuran Tingkat Kecemasan Matematika (9 Item)
            </h2>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Pilih nilai 1 (Sangat Tenang) hingga 5 (Sangat Tegang). 
              Rentang skor 9–45. <strong>Makin rendah skor, makin tenang!</strong>
            </p>
          </div>

          {amasSubmitted ? (
            <div className="neu-inset p-6 sm:p-8 rounded-3xl text-center space-y-3">
              <span className="text-4xl block">🌱</span>
              <h3 className="text-xl font-black text-[#3F8F54]">Hasil Evaluasi AMAS Tersimpan!</h3>
              <div className="text-2xl sm:text-3xl font-black text-[#2A3647] font-serif">
                Skor Anda: {calculateAmasTotal()} / 45
              </div>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                {calculateAmasTotal() <= 20
                  ? 'Luar biasa! Skor Anda berada di bawah ambang kecemasan (≤ 20). Anda merasa rileks dan percaya diri dalam belajar matematika.'
                  : 'Skor Anda menunjukkan masih ada sedikit ketegangan. Siklus 9 Tahap GEMBIRATIKA siap mendampingi Anda belajar dengan nyaman tanpa tekanan.'}
              </p>
              <button
                onClick={() => setAmasSubmitted(false)}
                className="mt-2 text-xs font-black text-[#3F8F54] underline cursor-pointer"
              >
                Isi Ulang Kuesioner
              </button>
            </div>
          ) : (
            <form onSubmit={handleAmasSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-3.5 sm:space-y-4">
                {AMAS_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="neu-btn p-3.5 sm:p-5 rounded-2xl space-y-2.5 sm:space-y-3 text-xs">
                    <p className="font-bold text-[#2A3647] text-xs sm:text-sm">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center">
                      {[1, 2, 3, 4, 5].map(val => (
                        <label
                          key={val}
                          className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl cursor-pointer font-black transition flex flex-col items-center gap-1 active:scale-95 ${
                            amasResponses[q.id] === val
                              ? 'neu-inset text-[#3F8F54]'
                              : 'neu-btn text-[#64748B] hover:text-[#2A3647]'
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={val}
                            checked={amasResponses[q.id] === val}
                            onChange={() => setAmasResponses(prev => ({ ...prev, [q.id]: val }))}
                            className="hidden"
                          />
                          <span className="text-xs sm:text-sm">{val}</span>
                          <span className="text-[8px] sm:text-[9px] font-medium leading-tight hidden xs:inline">
                            {val === 1 && 'Tenang'}
                            {val === 2 && 'Santai'}
                            {val === 3 && 'Ragu'}
                            {val === 4 && 'Cemas'}
                            {val === 5 && 'Tegang'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-[#64748B]">
                  Total Skor Sementara: <strong className="text-[#2A3647]">{calculateAmasTotal()} / 45</strong>
                </span>
                <button
                  type="submit"
                  className="neu-btn-primary w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs active:scale-95 transition-transform"
                >
                  Simpan Evaluasi AMAS
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ---------------- TAB 2: KUESIONER SRL ---------------- */}
      {activeTab === 'srl' && (
        <div className="neu-raised p-5 sm:p-8 rounded-3xl space-y-5 sm:space-y-6">
          <div className="space-y-1">
            <span className="neu-inset-sm px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black text-[#8C6D42] uppercase tracking-wider inline-block">
              Self-Regulated Learning (SRL - MSLQ Subscale)
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#2A3647] font-serif">
              Pengukuran Kemandirian Belajar Matematika (8 Item)
            </h2>
            <p className="text-[11px] sm:text-xs text-[#64748B]">
              Mengukur 4 dimensi: Perencanaan, Monitoring, Regulasi, dan Refleksi.
            </p>
          </div>

          {srlSubmitted ? (
            <div className="neu-inset p-6 sm:p-8 rounded-3xl text-center space-y-3">
              <span className="text-4xl block">🪞</span>
              <h3 className="text-xl font-black text-[#3F8F54]">Hasil Evaluasi SRL Tersimpan!</h3>
              <div className="text-2xl sm:text-3xl font-black text-[#2A3647] font-serif">
                Skor Kemandirian: {calculateSrlTotal()}%
              </div>
              <p className="text-xs text-[#64748B] max-w-md mx-auto leading-relaxed">
                Indeks kemandirian belajar Anda sangat memuaskan! Anda memiliki kemampuan metakognisi yang kuat dalam memonitor pemahaman diri dan merefleksi proses belajar.
              </p>
              <button
                onClick={() => setSrlSubmitted(false)}
                className="mt-2 text-xs font-black text-[#3F8F54] underline cursor-pointer"
              >
                Isi Ulang Kuesioner
              </button>
            </div>
          ) : (
            <form onSubmit={handleSrlSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-3.5 sm:space-y-4">
                {SRL_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="neu-btn p-3.5 sm:p-5 rounded-2xl space-y-2.5 sm:space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="neu-inset-sm px-2.5 py-0.5 text-[#8C6D42] font-black text-[9px] sm:text-[10px]">
                        Dimensi: {q.dimension}
                      </span>
                    </div>
                    <p className="font-bold text-[#2A3647] text-xs sm:text-sm">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center">
                      {[1, 2, 3, 4, 5].map(val => (
                        <label
                          key={val}
                          className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl cursor-pointer font-black transition flex flex-col items-center gap-1 active:scale-95 ${
                            srlResponses[q.id] === val
                              ? 'neu-inset text-[#3F8F54]'
                              : 'neu-btn text-[#64748B] hover:text-[#2A3647]'
                          }`}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={val}
                            checked={srlResponses[q.id] === val}
                            onChange={() => setSrlResponses(prev => ({ ...prev, [q.id]: val }))}
                            className="hidden"
                          />
                          <span className="text-xs sm:text-sm">{val}</span>
                          <span className="text-[8px] sm:text-[9px] font-medium leading-tight hidden xs:inline">
                            {val === 1 && 'Tak Pernah'}
                            {val === 2 && 'Jarang'}
                            {val === 3 && 'Kadang'}
                            {val === 4 && 'Sering'}
                            {val === 5 && 'Selalu'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-[#64748B]">
                  Indeks SRL: <strong className="text-[#2A3647]">{calculateSrlTotal()}%</strong>
                </span>
                <button
                  type="submit"
                  className="neu-btn-primary w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs active:scale-95 transition-transform"
                >
                  Simpan Evaluasi SRL
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ---------------- TAB 3: INFO TRYOUT TKA ---------------- */}
      {activeTab === 'tka' && (
        <div className="neu-raised p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="space-y-1">
            <span className="neu-inset-sm px-2.5 py-0.5 text-[10px] font-black text-[#3F8F54] uppercase tracking-wider inline-block">
              Tes Kemampuan Akademik (TKA) SMP
            </span>
            <h2 className="text-xl font-black text-[#2A3647] font-serif">
              Tryout Standar Kurikulum SMP Kelas VIII
            </h2>
            <p className="text-xs text-[#64748B]">
              Pre-test dan Post-test paralel untuk mengukur peningkatan pemahaman konsep matematika esensial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="neu-btn p-5 rounded-2xl space-y-2">
              <span className="font-black text-[#8C6D42] block text-sm">1. Pre-Test TKA (Awal Program)</span>
              <p className="text-[#64748B] leading-relaxed">
                Dilakukan sebelum siswa memulai siklus petualangan. Bertujuan mendeteksi kelemahan konsep prasyarat awal.
              </p>
              <div className="text-[11px] font-bold text-[#2A3647] pt-1">
                Rerata Skor Siswa: <span className="text-[#FF7043] font-black">40.34</span> (Baseline Nasional)
              </div>
            </div>

            <div className="neu-btn p-5 rounded-2xl space-y-2">
              <span className="font-black text-[#3F8F54] block text-sm">2. Post-Test TKA (Akhir Program)</span>
              <p className="text-[#64748B] leading-relaxed">
                Tes paralel dengan tingkat kesulitan setara. Mengukur pemulihan konsep setelah melalui jalur remedial kontekstual.
              </p>
              <div className="text-[11px] font-bold text-[#2A3647] pt-1">
                Rerata Skor Evaluasi: <span className="text-[#3F8F54] font-black">68.70</span> (Kenaikan +70.3%)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
