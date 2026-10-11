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
    // Skala 0 - 100
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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header Plaque */}
      <div className="parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#5D7A4A] text-white p-2 rounded-xl text-xl">📝</span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#2C2416] font-serif">
            Instrumen Evaluasi Ilmiah GEMBIRATIKA
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#6C5E4A] max-w-2xl leading-relaxed">
          Platform ini mengukur dampak nyata terhadap penurunan kecemasan matematika (AMAS), 
          peningkatan kemandirian belajar (SRL), serta pemahaman konsep akademik (Tryout TKA).
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-3 border-t border-[#E8DEC9] overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('amas')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'amas'
                ? 'bg-[#5D7A4A] text-white shadow-xs'
                : 'bg-[#FAF7F0] text-[#6C5E4A] hover:bg-[#F0EAE0]'
            }`}
          >
            1. Kuesioner AMAS (Kecemasan)
          </button>
          <button
            onClick={() => setActiveTab('srl')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'srl'
                ? 'bg-[#5D7A4A] text-white shadow-xs'
                : 'bg-[#FAF7F0] text-[#6C5E4A] hover:bg-[#F0EAE0]'
            }`}
          >
            2. Kuesioner SRL (Kemandirian Belajar)
          </button>
          <button
            onClick={() => setActiveTab('tka')}
            className={`px-4 py-2 rounded-xl transition ${
              activeTab === 'tka'
                ? 'bg-[#5D7A4A] text-white shadow-xs'
                : 'bg-[#FAF7F0] text-[#6C5E4A] hover:bg-[#F0EAE0]'
            }`}
          >
            3. Info Tryout TKA Matematika
          </button>
        </div>
      </div>

      {/* ---------------- TAB 1: KUESIONER AMAS ---------------- */}
      {activeTab === 'amas' && (
        <div className="parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#8B6F4E] uppercase tracking-wider block">
              Abbreviated Math Anxiety Scale (AMAS)
            </span>
            <h2 className="text-xl font-bold text-[#2C2416] font-serif">
              Pengukuran Tingkat Kecemasan Matematika (9 Item)
            </h2>
            <p className="text-xs text-[#6C5E4A]">
              Pilih nilai 1 (Sangat Tidak Setuju/Tenang) hingga 5 (Sangat Setuju/Tegang). 
              Rentang skor 9–45. <strong>Makin rendah skor, makin baik &amp; tenang!</strong>
            </p>
          </div>

          {amasSubmitted ? (
            <div className="bg-[#EBF3E6] p-6 rounded-2xl border-2 border-[#BCD0AD] text-center space-y-3">
              <span className="text-4xl block">🌱</span>
              <h3 className="text-xl font-bold text-[#2E4720]">Hasil Evaluasi AMAS Tersimpan!</h3>
              <div className="text-3xl font-black text-[#5D7A4A] font-serif">
                Skor Anda: {calculateAmasTotal()} / 45
              </div>
              <p className="text-xs text-[#4E6142] max-w-md mx-auto">
                {calculateAmasTotal() <= 20
                  ? 'Luar biasa! Skor Anda berada di bawah ambang kecemasan (≤ 20). Anda merasa rileks dan percaya diri dalam belajar matematika.'
                  : 'Skor Anda menunjukkan masih ada sedikit ketegangan. Siklus 9 Tahap GEMBIRATIKA siap mendampingi Anda belajar dengan nyaman tanpa tekanan.'}
              </p>
              <button
                onClick={() => setAmasSubmitted(false)}
                className="mt-2 text-xs font-bold text-[#5D7A4A] underline"
              >
                Isi Ulang Kuesioner
              </button>
            </div>
          ) : (
            <form onSubmit={handleAmasSubmit} className="space-y-6">
              <div className="space-y-4">
                {AMAS_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="bg-[#FAF7F0] p-4 rounded-xl border border-[#DCD0BA] space-y-3 text-xs">
                    <p className="font-semibold text-[#2C2416]">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      {[1, 2, 3, 4, 5].map(val => (
                        <label
                          key={val}
                          className={`p-2 rounded-lg border cursor-pointer font-bold transition flex flex-col items-center gap-1 ${
                            amasResponses[q.id] === val
                              ? 'bg-[#5D7A4A] text-white border-[#445E33]'
                              : 'bg-[#FFFDF9] border-[#D5C7AB] text-[#645643] hover:bg-[#F2ECE0]'
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
                          <span className="text-sm">{val}</span>
                          <span className="text-[9px] font-normal leading-tight hidden sm:inline">
                            {val === 1 && 'Sangat Tidak'}
                            {val === 2 && 'Tidak'}
                            {val === 3 && 'Ragu'}
                            {val === 4 && 'Setuju'}
                            {val === 5 && 'Sangat Setuju'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#7A6E5D]">
                  Total Skor Sementara: <strong>{calculateAmasTotal()} / 45</strong>
                </span>
                <button
                  type="submit"
                  className="btn-wood px-6 py-2.5 rounded-xl font-bold text-xs"
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
        <div className="parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#8B6F4E] uppercase tracking-wider block">
              Self-Regulated Learning (SRL - MSLQ Subscale)
            </span>
            <h2 className="text-xl font-bold text-[#2C2416] font-serif">
              Pengukuran Kemandirian Belajar Matematika (8 Item)
            </h2>
            <p className="text-xs text-[#6C5E4A]">
              Mengukur 4 dimensi penting: Perencanaan, Monitoring, Regulasi, dan Refleksi.
            </p>
          </div>

          {srlSubmitted ? (
            <div className="bg-[#EBF3E6] p-6 rounded-2xl border-2 border-[#BCD0AD] text-center space-y-3">
              <span className="text-4xl block">🪞</span>
              <h3 className="text-xl font-bold text-[#2E4720]">Hasil Evaluasi SRL Tersimpan!</h3>
              <div className="text-3xl font-black text-[#5D7A4A] font-serif">
                Skor Kemandirian: {calculateSrlTotal()}%
              </div>
              <p className="text-xs text-[#4E6142] max-w-md mx-auto">
                Indeks kemandirian belajar Anda sangat memuaskan! Anda memiliki kemampuan metakognisi yang kuat dalam memonitor pemahaman diri dan merefleksi proses belajar.
              </p>
              <button
                onClick={() => setSrlSubmitted(false)}
                className="mt-2 text-xs font-bold text-[#5D7A4A] underline"
              >
                Isi Ulang Kuesioner
              </button>
            </div>
          ) : (
            <form onSubmit={handleSrlSubmit} className="space-y-6">
              <div className="space-y-4">
                {SRL_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="bg-[#FAF7F0] p-4 rounded-xl border border-[#DCD0BA] space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#EFEAD8] text-[#8B6F4E] font-bold px-2 py-0.5 rounded text-[10px]">
                        Dimensi: {q.dimension}
                      </span>
                    </div>
                    <p className="font-semibold text-[#2C2416]">
                      {idx + 1}. {q.text}
                    </p>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      {[1, 2, 3, 4, 5].map(val => (
                        <label
                          key={val}
                          className={`p-2 rounded-lg border cursor-pointer font-bold transition flex flex-col items-center gap-1 ${
                            srlResponses[q.id] === val
                              ? 'bg-[#5D7A4A] text-white border-[#445E33]'
                              : 'bg-[#FFFDF9] border-[#D5C7AB] text-[#645643] hover:bg-[#F2ECE0]'
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
                          <span className="text-sm">{val}</span>
                          <span className="text-[9px] font-normal leading-tight hidden sm:inline">
                            {val === 1 && 'Tidak Pernah'}
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

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#7A6E5D]">
                  Indeks SRL: <strong>{calculateSrlTotal()}%</strong>
                </span>
                <button
                  type="submit"
                  className="btn-wood px-6 py-2.5 rounded-xl font-bold text-xs"
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
        <div className="parchment-card p-6 sm:p-8 rounded-2xl border-2 border-[#D8CBB2] space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#5D7A4A] uppercase tracking-wider block">
              Tes Kemampuan Akademik (TKA) SMP
            </span>
            <h2 className="text-xl font-bold text-[#2C2416] font-serif">
              Tryout Standar Kurikulum SMP Kelas VIII
            </h2>
            <p className="text-xs text-[#6C5E4A]">
              Pre-test dan Post-test paralel untuk mengukur peningkatan pemahaman konsep matematika esensial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-2">
              <span className="font-bold text-[#8B6F4E] block">1. Pre-Test TKA (Awal Program)</span>
              <p className="text-[#6C5E4A]">
                Dilakukan sebelum siswa memulai siklus petualangan. Bertujuan mendeteksi kelemahan konsep prasyarat awal.
              </p>
              <div className="text-[11px] font-bold text-[#2C2416]">
                Rerata Skor Siswa: <span className="text-[#B84734]">40.34</span> (Sesuai Rerata Nasional 2026)
              </div>
            </div>

            <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#D8CBB2] space-y-2">
              <span className="font-bold text-[#5D7A4A] block">2. Post-Test TKA (Akhir Program)</span>
              <p className="text-[#6C5E4A]">
                Tes paralel dengan tingkat kesulitan setara. Mengukur pemulihan konsep setelah melalui jalur remedial kontekstual.
              </p>
              <div className="text-[11px] font-bold text-[#2C2416]">
                Rerata Skor Evaluasi: <span className="text-[#5D7A4A]">68.70</span> (Kenaikan +70.3%)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
