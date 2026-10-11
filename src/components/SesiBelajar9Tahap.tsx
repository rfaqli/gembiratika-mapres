import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { 
  currentUserAtom, 
  currentPageAtom, 
  currentSesiStageAtom, 
  selectedCekRasaAtom, 
  activeMissionAtom, 
  currentQuestionIndexAtom,
  userAnswersLogAtom,
  currentJournalAtom,
  sessionHistoryAtom,
  BANK_SOAL,
  MISSIONS,
  CekRasaType,
  KeyakinanType,
  KategoriSalahType,
  JawabanSesi,
  SesiBelajar
} from '../data';
import { 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  Heart, 
  Award, 
  BookOpen, 
  Gauge,
  Check,
  X
} from 'lucide-react';

export function SesiBelajar9Tahap() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [, setCurrentPage] = useAtom(currentPageAtom);
  const [stage, setStage] = useAtom(currentSesiStageAtom);
  const [cekRasa, setCekRasa] = useAtom(selectedCekRasaAtom);
  const [activeMission, setActiveMission] = useAtom(activeMissionAtom);
  const [qIndex, setQIndex] = useAtom(currentQuestionIndexAtom);
  const [answersLog, setAnswersLog] = useAtom(userAnswersLogAtom);
  const [journal, setJournal] = useAtom(currentJournalAtom);
  const [, setSessionHistory] = useAtom(sessionHistoryAtom);

  // Local state
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentConfidence, setCurrentConfidence] = useState<KeyakinanType | null>(null);
  const [hintsUnlocked, setHintsUnlocked] = useState<number>(0);
  const [selectedErrorCategory, setSelectedErrorCategory] = useState<KategoriSalahType | null>(null);

  const missionQuestions = activeMission 
    ? BANK_SOAL.filter(s => activeMission.soalIds.includes(s.id))
    : [BANK_SOAL[0]];

  const currentSoal = missionQuestions[qIndex] || missionQuestions[0];

  const handleSelectRasa = (rasa: CekRasaType) => {
    setCekRasa(rasa);
    if (rasa === 'cemas') {
      setActiveMission(MISSIONS[0]);
    }
    setStage(2);
  };

  const handleSelectMission = (missionId: string) => {
    const m = MISSIONS.find(item => item.id === missionId) || MISSIONS[0];
    setActiveMission(m);
    setQIndex(0);
    setAnswersLog([]);
    setSelectedAnswer('');
    setCurrentConfidence(null);
    setHintsUnlocked(0);
    setSelectedErrorCategory(null);
    setStage(3);
  };

  const handleChooseOption = (label: string) => {
    setSelectedAnswer(label);
    setStage(4);
  };

  const handleConfirmConfidence = (conf: KeyakinanType) => {
    setCurrentConfidence(conf);
    const isCorrect = selectedAnswer === currentSoal.correctAnswer;
    
    const newLog: JawabanSesi = {
      soalId: currentSoal.id,
      userAnswer: selectedAnswer,
      isCorrect,
      confidence: conf,
      hintsUsed: hintsUnlocked
    };

    setAnswersLog(prev => [...prev.filter(l => l.soalId !== currentSoal.id), newLog]);
    setStage(5);
  };

  const handleProceedAfterFeedback = () => {
    const isCorrect = selectedAnswer === currentSoal.correctAnswer;
    if (!isCorrect) {
      setStage(7); // Masuk ke Bedah Salah
    } else {
      if (qIndex < missionQuestions.length - 1) {
        setQIndex(prev => prev + 1);
        setSelectedAnswer('');
        setCurrentConfidence(null);
        setHintsUnlocked(0);
        setSelectedErrorCategory(null);
        setStage(3);
      } else {
        setStage(6); // Selesai soal, masuk ke Kalibrasi
      }
    }
  };

  const handleConfirmBedahSalah = (kategori: KategoriSalahType) => {
    setSelectedErrorCategory(kategori);
    setAnswersLog(prev => prev.map(item => {
      if (item.soalId === currentSoal.id) {
        return { ...item, kategoriSalah: kategori };
      }
      return item;
    }));

    if (qIndex < missionQuestions.length - 1) {
      setQIndex(prev => prev + 1);
      setSelectedAnswer('');
      setCurrentConfidence(null);
      setHintsUnlocked(0);
      setSelectedErrorCategory(null);
      setStage(3);
    } else {
      setStage(6);
    }
  };

  const calculateCalibration = () => {
    if (answersLog.length === 0) return 85;
    let wellCalibrated = 0;
    answersLog.forEach(ans => {
      if ((ans.confidence === 'yakin' && ans.isCorrect) || (ans.confidence !== 'yakin' && !ans.isCorrect)) {
        wellCalibrated++;
      }
    });
    return Math.round((wellCalibrated / answersLog.length) * 100);
  };

  const handleFinishJournal = () => {
    const finalCalibration = calculateCalibration();
    const pointsGained = (activeMission?.rewardPoints || 100) + (answersLog.filter(a => a.isCorrect).length * 20);

    const newSession: SesiBelajar = {
      id: `sesi-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      cekRasa: cekRasa || 'tenang',
      selectedMissionId: activeMission?.id || 'misi-1',
      answers: answersLog,
      calibrationScore: finalCalibration,
      journalEntry: journal || 'Hari ini aku belajar dengan gigih dan merefleksikan proses berpikirku.',
      pointsEarned: pointsGained
    };

    setSessionHistory(prev => [newSession, ...prev]);

    setCurrentUser(prev => ({
      ...prev,
      points: prev.points + pointsGained,
      completedMissions: prev.completedMissions + 1,
      badges: prev.badges.includes(activeMission?.rewardBadge || '') 
        ? prev.badges 
        : [...prev.badges, activeMission?.rewardBadge || 'Penjelajah Tangguh']
    }));

    setStage(9);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* 9-Stage Sunken Step Indicator */}
      <div className="neu-raised p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="neu-btn px-3 py-1 font-black text-[#3F8F54] text-[11px] uppercase tracking-wider">
              Tahap {stage} / 9
            </span>
            <span className="font-extrabold text-[#2A3647]">
              {stage === 1 && 'Cek Rasa Emosi Awal'}
              {stage === 2 && 'Rencana Misi Petualangan'}
              {stage === 3 && 'Petualangan Adaptif (Soal Kontekstual)'}
              {stage === 4 && 'Tebak Yakin (Metakognisi Diri)'}
              {stage === 5 && 'Umpan Balik Hangat & Solusi'}
              {stage === 6 && 'Meter Kalibrasi Diri'}
              {stage === 7 && 'Bedah Salah & Diagnosa'}
              {stage === 8 && 'Jurnal Refleksi Mandiri'}
              {stage === 9 && 'Rapor Belajarku (Pencapaian)'}
            </span>
          </div>

          <span className="text-[11px] text-[#8494A8] font-bold hidden sm:inline">
            Siklus Belajar Mandiri
          </span>
        </div>

        {/* Sunken Channel Progress with Pill Indicators */}
        <div className="neu-inset-sm p-1.5 flex gap-1.5 rounded-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <div
              key={num}
              className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                num <= stage 
                  ? 'bg-gradient-to-r from-[#43A047] to-[#388E3C] shadow-xs' 
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ---------------- TAHAP 1: CEK RASA ---------------- */}
      {stage === 1 && (
        <div className="neu-raised p-8 rounded-3xl space-y-8 text-center">
          <div className="space-y-2 max-w-lg mx-auto">
            <div className="neu-circle-btn w-16 h-16 text-3xl mx-auto mb-2">🎭</div>
            <h2 className="text-2xl font-black text-[#2A3647] font-serif">
              Tahap 1: Cek Rasa Sebelum Belajar
            </h2>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Sentuh satu dari tiga tombol berkedalaman di bawah ini. Jawabanmu bersifat privat. 
              Sistem akan secara adaptif menyesuaikan kehangatan pendampingan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <button
              onClick={() => handleSelectRasa('tenang')}
              className="neu-btn p-6 rounded-3xl flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className="neu-circle-btn w-20 h-20 text-4xl group-hover:scale-105 transition-transform">
                😊
              </div>
              <span className="text-base font-black text-[#3F8F54]">Tenang</span>
              <span className="text-xs text-[#64748B]">Pikiranku rileks, siap bereksplorasi tantangan baru.</span>
            </button>

            <button
              onClick={() => handleSelectRasa('ragu')}
              className="neu-btn p-6 rounded-3xl flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className="neu-circle-btn w-20 h-20 text-4xl group-hover:scale-105 transition-transform">
                😐
              </div>
              <span className="text-base font-black text-[#FFA726]">Ragu</span>
              <span className="text-xs text-[#64748B]">Agak lupa rumus, ingin panduan dan petunjuk bertahap.</span>
            </button>

            <button
              onClick={() => handleSelectRasa('cemas')}
              className="neu-btn p-6 rounded-3xl flex flex-col items-center gap-3 cursor-pointer group"
            >
              <div className="neu-circle-btn w-20 h-20 text-4xl group-hover:scale-105 transition-transform">
                😰
              </div>
              <span className="text-base font-black text-[#FF7043]">Cemas</span>
              <span className="text-xs text-[#64748B]">Takut salah/tegang. Diberikan misi ringan &amp; afirmasi.</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------- TAHAP 2: RENCANA MISI ---------------- */}
      {stage === 2 && (
        <div className="neu-raised p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-black text-[#3F8F54] uppercase tracking-wider block">
                Tahap 2: Rencana Misi Adaptif
              </span>
              <h2 className="text-2xl font-black text-[#2A3647] font-serif">Pilih Misi Petualangan</h2>
              <p className="text-xs text-[#64748B]">
                Rekomendasi disesuaikan dengan Cek Rasa kamu ({cekRasa?.toUpperCase() || 'TENANG'})
              </p>
            </div>
            <button
              onClick={() => setStage(1)}
              className="neu-btn px-3 py-1.5 text-xs font-bold text-[#64748B] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Ubah Rasa
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            {MISSIONS.map(m => (
              <div
                key={m.id}
                className="neu-raised p-6 rounded-3xl flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="neu-inset-sm px-2 py-0.5 font-black text-[#8C6D42] text-[10px]">{m.regionName}</span>
                    <span className="font-black text-[#FFA726]">+{m.rewardPoints} Poin</span>
                  </div>
                  <h3 className="text-base font-black text-[#2A3647] font-serif">{m.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{m.narrative}</p>
                </div>

                <button
                  onClick={() => handleSelectMission(m.id)}
                  className="neu-btn-primary w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2"
                >
                  <span>Mulai Misi Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- TAHAP 3: PETUALANGAN ADAPTIF ---------------- */}
      {stage === 3 && (
        <div className="neu-raised p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#DCE4ED] pb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="neu-btn px-3 py-1 font-black text-[#3F8F54]">
                Soal {qIndex + 1} / {missionQuestions.length}
              </span>
              <span className="font-bold text-[#2A3647]">{currentSoal.topic}</span>
            </div>
            <span className="neu-inset-sm px-3 py-1 font-bold text-[#64748B] text-[10px] uppercase">
              🌾 Paket: {currentSoal.contextPackage}
            </span>
          </div>

          {/* Konteks Cerita */}
          <div className="neu-inset p-5 rounded-2xl text-xs text-[#475569] leading-relaxed flex items-start gap-3">
            <span className="text-2xl">📖</span>
            <p className="pt-0.5">{currentSoal.storyIntro}</p>
          </div>

          {/* Isi Pertanyaan */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-[#2A3647] leading-relaxed">
              {currentSoal.question}
            </h3>

            {/* Pilihan Jawaban dengan Kedalaman Taktil 3D */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {currentSoal.options.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => handleChooseOption(opt.label)}
                  className="neu-btn p-5 rounded-2xl text-left transition flex items-center gap-4 cursor-pointer group"
                >
                  <span className="neu-circle-btn w-10 h-10 font-black text-sm text-[#3F8F54] group-hover:scale-105 transition-transform shrink-0">
                    {opt.label}
                  </span>
                  <span className="text-sm font-bold text-[#2A3647]">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Petunjuk Bertahap 3 Level (Tanpa Pengurangan Poin!) */}
          <div className="neu-inset p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#8C6D42] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#FFA726]" />
                Petunjuk Bertahap (Mencoba dengan hint tetap dapat poin!)
              </span>
              <span className="neu-btn px-2.5 py-0.5 text-[10px] font-bold text-[#64748B]">
                Level {hintsUnlocked} / 3
              </span>
            </div>

            {hintsUnlocked === 0 && (
              <button
                onClick={() => setHintsUnlocked(1)}
                className="neu-btn px-4 py-2 text-xs font-black text-[#FFA726] flex items-center gap-1.5"
              >
                <span>💡 Buka Hint 1 (Arah Pemikiran)</span>
              </button>
            )}

            {hintsUnlocked >= 1 && (
              <div className="space-y-2 text-xs">
                <div className="neu-btn p-3 rounded-xl space-y-1">
                  <strong className="text-[#3F8F54] block">Hint 1 (Arah Pemikiran):</strong>
                  <p className="text-[#475569]">{currentSoal.hint1}</p>
                </div>
                {hintsUnlocked === 1 && (
                  <button
                    onClick={() => setHintsUnlocked(2)}
                    className="neu-btn px-3 py-1.5 text-[11px] font-bold text-[#FFA726]"
                  >
                    Buka Hint 2 (Langkah Rumus) →
                  </button>
                )}
              </div>
            )}

            {hintsUnlocked >= 2 && (
              <div className="space-y-2 text-xs">
                <div className="neu-btn p-3 rounded-xl space-y-1">
                  <strong className="text-[#FFA726] block">Hint 2 (Langkah Khusus):</strong>
                  <p className="text-[#475569]">{currentSoal.hint2}</p>
                </div>
                {hintsUnlocked === 2 && (
                  <button
                    onClick={() => setHintsUnlocked(3)}
                    className="neu-btn px-3 py-1.5 text-[11px] font-bold text-[#FF7043]"
                  >
                    Buka Hint 3 (Hampir Mengungkap) →
                  </button>
                )}
              </div>
            )}

            {hintsUnlocked >= 3 && (
              <div className="neu-btn p-3 rounded-xl text-xs space-y-1">
                <strong className="text-[#FF7043] block">Hint 3 (Hampir Jawaban):</strong>
                <p className="text-[#475569]">{currentSoal.hint3}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- TAHAP 4: TEBAK YAKIN ---------------- */}
      {stage === 4 && (
        <div className="neu-raised p-8 rounded-3xl space-y-8 text-center">
          <div className="space-y-2 max-w-lg mx-auto">
            <div className="neu-circle-btn w-16 h-16 text-3xl mx-auto mb-2">🤔</div>
            <span className="text-xs font-black text-[#8C6D42] uppercase tracking-wider block">
              Tahap 4: Kalibrasi Metakognisi
            </span>
            <h2 className="text-2xl font-black text-[#2A3647] font-serif">
              Seberapa Yakin Kamu dengan Pilihan Jawabanmu?
            </h2>
            <p className="text-xs text-[#64748B]">
              Kamu memilih jawaban <span className="neu-inset-sm px-2 py-0.5 font-bold text-[#2A3647]">Opsi {selectedAnswer}</span>. 
              Sebelum melihat hasil, refleksikan tingkat keyakinanmu:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-xl mx-auto">
            <button
              onClick={() => handleConfirmConfidence('yakin')}
              className="neu-btn p-6 rounded-3xl flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="neu-circle-btn w-14 h-14 text-2xl group-hover:scale-105 transition-transform">🎯</div>
              <span className="font-black text-base text-[#3F8F54]">Sangat Yakin</span>
              <span className="text-[11px] text-[#64748B]">Langkah hitunganku mantap</span>
            </button>

            <button
              onClick={() => handleConfirmConfidence('ragu')}
              className="neu-btn p-6 rounded-3xl flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="neu-circle-btn w-14 h-14 text-2xl group-hover:scale-105 transition-transform">⚖️</div>
              <span className="font-black text-base text-[#FFA726]">Agak Ragu</span>
              <span className="text-[11px] text-[#64748B]">Masih gamang di langkah akhir</span>
            </button>

            <button
              onClick={() => handleConfirmConfidence('belum_tahu')}
              className="neu-btn p-6 rounded-3xl flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div className="neu-circle-btn w-14 h-14 text-2xl group-hover:scale-105 transition-transform">❓</div>
              <span className="font-black text-base text-[#64748B]">Belum Tahu</span>
              <span className="text-[11px] text-[#64748B]">Hanya menebak saja</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------- TAHAP 5: UMPAN BALIK ---------------- */}
      {stage === 5 && (
        <div className="neu-raised p-8 rounded-3xl space-y-6 text-center">
          {selectedAnswer === currentSoal.correctAnswer ? (
            <div className="space-y-5">
              <div className="neu-circle-btn w-20 h-20 text-4xl mx-auto text-[#3F8F54] animate-bounce">
                ✅
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#3F8F54] font-serif">Hebat Sekali! Jawabanmu Benar!</h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Pilihan <strong>{selectedAnswer}</strong> tepat. Kamu mendapat <strong>+20 Poin Keberanian</strong>!
                </p>
              </div>

              <div className="neu-inset p-5 rounded-2xl text-left text-xs text-[#475569] space-y-2 max-w-lg mx-auto">
                <strong className="text-[#3F8F54] block">Pembahasan Konsep:</strong>
                <p>{currentSoal.explanation}</p>
              </div>

              <div>
                <button
                  onClick={handleProceedAfterFeedback}
                  className="neu-btn-primary px-8 py-3.5 rounded-2xl font-black text-sm inline-flex items-center gap-2"
                >
                  <span>Lanjutkan Petualangan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="neu-circle-btn w-20 h-20 text-4xl mx-auto text-[#FF7043]">
                💡
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#FF7043] font-serif">Belum Tepat, Tapi Usahamu Hebat!</h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Tidak ada poin yang berkurang. Mari kita bedah penyebabnya agar konsep ini menempel kuat di ingatan.
                </p>
              </div>

              <div className="neu-inset p-5 rounded-2xl text-left text-xs text-[#475569] space-y-2 max-w-lg mx-auto">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[#FF7043]">Jawabanmu: {selectedAnswer}</span>
                  <span className="text-[#3F8F54]">Kunci: {currentSoal.correctAnswer}</span>
                </div>
                <p>{currentSoal.explanation}</p>
              </div>

              <div>
                <button
                  onClick={handleProceedAfterFeedback}
                  className="neu-btn-accent px-8 py-3.5 rounded-2xl font-black text-sm inline-flex items-center gap-2"
                >
                  <span>Lanjut ke Tahap 7: Bedah Salah</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------- TAHAP 7: BEDAH SALAH ---------------- */}
      {stage === 7 && (
        <div className="neu-raised p-8 rounded-3xl space-y-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black text-[#8C6D42] uppercase tracking-wider block">
              🔍 Tahap 7: Bedah Salah (Bukan Sekadar Salah)
            </span>
            <h2 className="text-2xl font-black text-[#2A3647] font-serif">
              Apa Akar Masalah Jawabanmu Belum Tepat?
            </h2>
            <p className="text-xs text-[#64748B]">
              Sentuh kategori yang paling sesuai agar sistem dapat merancang pemulihan terarah:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleConfirmBedahSalah('salah_hitung')}
              className="neu-btn p-5 rounded-2xl text-left space-y-2 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="neu-circle-btn w-10 h-10 text-xl">🧮</span>
                <span className="font-black text-sm text-[#2A3647]">1. Salah Hitung</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Rumus dan langkah sudah benar, hanya perkalian/penjumlahan angkanya yang keliru.
              </p>
            </button>

            <button
              onClick={() => handleConfirmBedahSalah('lupa_konsep')}
              className="neu-btn p-5 rounded-2xl text-left space-y-2 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="neu-circle-btn w-10 h-10 text-xl">🧠</span>
                <span className="font-black text-sm text-[#2A3647]">2. Lupa Konsep / Rumus</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Tahu arah soalnya, tapi lupa bentuk pastinya (misal tripel phytagoras).
              </p>
            </button>

            <button
              onClick={() => handleConfirmBedahSalah('salah_baca')}
              className="neu-btn p-5 rounded-2xl text-left space-y-2 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="neu-circle-btn w-10 h-10 text-xl">👓</span>
                <span className="font-black text-sm text-[#2A3647]">3. Salah Baca Soal</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Kurang cermat melihat satuan atau salah memahami apa yang diminta di akhir soal.
              </p>
            </button>

            <button
              onClick={() => handleConfirmBedahSalah('belum_paham')}
              className="neu-btn p-5 rounded-2xl text-left space-y-2 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="neu-circle-btn w-10 h-10 text-xl">🌱</span>
                <span className="font-black text-sm text-[#2A3647]">4. Belum Paham Dasarnya</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Bingung harus mulai dari mana. Butuh panduan materi prasyarat.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* ---------------- TAHAP 6: CEK KALIBRASI ---------------- */}
      {stage === 6 && (
        <div className="neu-raised p-8 rounded-3xl space-y-8 text-center">
          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-black text-[#3F8F54] uppercase tracking-wider block">
              Tahap 6: Meter Kalibrasi Diri
            </span>
            <h2 className="text-2xl font-black text-[#2A3647] font-serif">
              Akurasi Metakognisi Dirimu
            </h2>
            <p className="text-xs text-[#64748B]">
              Perbandingan antara keyakinan batinmu dan ketepatan penyelesaian soal
            </p>
          </div>

          {/* Neumorphic Donut Gauge Ring (Matching Reference Image) */}
          <div className="w-48 h-48 neu-gauge-ring p-4 mx-auto">
            <div className="w-full h-full neu-gauge-inner">
              <div className="w-28 h-28 neu-gauge-center-knob">
                <span className="text-3xl font-black text-[#2A3647]">
                  {calculateCalibration()}%
                </span>
                <span className="text-[10px] text-[#3F8F54] font-bold mt-1">
                  AKURASI TEPAT
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Kemampuanmu menilai diri sendiri berkembang pesat. Kamu tahu kapan merasa yakin dan kapan perlu meminta petunjuk.
          </p>

          <div>
            <button
              onClick={() => setStage(8)}
              className="neu-btn-primary px-8 py-3.5 rounded-2xl font-black text-sm inline-flex items-center gap-2"
            >
              <span>Lanjut ke Tahap 8: Jurnal Refleksi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------- TAHAP 8: JURNAL REFLEKSI ---------------- */}
      {stage === 8 && (
        <div className="neu-raised p-8 rounded-3xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black text-[#8C6D42] uppercase tracking-wider block">
              Tahap 8: Jurnal Refleksi Mandiri
            </span>
            <h2 className="text-2xl font-black text-[#2A3647] font-serif">
              Catat Satu Kalimat Pembelajaranmu
            </h2>
            <p className="text-xs text-[#64748B]">
              Tuliskan apa yang paling berkesan hari ini untuk memperkuat memori konsep di otak:
            </p>
          </div>

          <div className="neu-inset p-5 rounded-2xl space-y-3">
            <label className="block text-sm font-bold text-[#2A3647]">
              "Hari ini aku belajar bahwa..."
            </label>
            <textarea
              rows={4}
              value={journal}
              onChange={e => setJournal(e.target.value)}
              placeholder="Contoh: Ternyata Teorema Pythagoras itu sangat mudah dipahami saat dibayangkan sebagai perahu nelayan di laut..."
              className="w-full bg-transparent border-none text-sm text-[#2A3647] resize-none focus:outline-none placeholder:text-[#94A3B8]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#8494A8] italic">
              💡 Refleksi singkat melatih regulasi diri (SRL).
            </span>
            <button
              onClick={handleFinishJournal}
              className="neu-btn-primary px-6 py-3 rounded-2xl font-black text-xs inline-flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#FFE082]" />
              <span>Simpan &amp; Buka Rapor</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------- TAHAP 9: RAPOR BELAJARKU ---------------- */}
      {stage === 9 && (
        <div className="neu-raised p-8 rounded-3xl space-y-8 text-center">
          <div className="neu-circle-btn w-20 h-20 text-4xl mx-auto text-[#3F8F54]">
            📜
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-black text-[#3F8F54] uppercase tracking-wider block">
              Tahap 9: Rapor Belajarku
            </span>
            <h2 className="text-3xl font-black text-[#2A3647] font-serif">
              Sesi 9 Tahap Selesai dengan Gemilang!
            </h2>
            <p className="text-xs text-[#64748B]">
              Selamat {currentUser.name}! Kamu telah menuntaskan seluruh siklus dengan gigih dan jujur pada dirimu sendiri.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-xl mx-auto">
            <div className="neu-btn p-5 rounded-2xl text-center">
              <span className="text-3xl block mb-1">🪙</span>
              <span className="text-[10px] text-[#8494A8] font-bold block uppercase">Poin Tambahan</span>
              <span className="text-xl font-black text-[#FFA726]">+{activeMission?.rewardPoints || 120} Poin</span>
            </div>

            <div className="neu-btn p-5 rounded-2xl text-center">
              <span className="text-3xl block mb-1">🏅</span>
              <span className="text-[10px] text-[#8494A8] font-bold block uppercase">Lencana Baru</span>
              <span className="text-sm font-black text-[#3F8F54]">{activeMission?.rewardBadge || 'Penjelajah'}</span>
            </div>

            <div className="neu-btn p-5 rounded-2xl text-center">
              <span className="text-3xl block mb-1">🎯</span>
              <span className="text-[10px] text-[#8494A8] font-bold block uppercase">Skor Kalibrasi</span>
              <span className="text-xl font-black text-[#3E78B2]">{calculateCalibration()}%</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('rapor')}
              className="neu-btn-primary px-6 py-3.5 rounded-2xl font-black text-xs inline-flex items-center gap-2"
            >
              <span>Buka Rapor Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setStage(1);
                setCurrentPage('beranda');
              }}
              className="neu-btn px-6 py-3.5 rounded-2xl font-black text-xs text-[#64748B]"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
