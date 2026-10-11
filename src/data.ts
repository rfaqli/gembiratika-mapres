import { atom } from 'jotai';

export type UserRole = 'siswa' | 'guru' | 'kepala_sekolah' | 'orang_tua';

export interface UserProfile {
  id: string;
  name: string; // Nama panggilan (pseudonim untuk siswa)
  email?: string;
  role: UserRole;
  avatar: string;
  classCode?: string;
  className?: string;
  points: number;
  badges: string[];
  level: number;
  completedMissions: number;
  amasScorePre?: number;
  amasScorePost?: number;
  srlScorePre?: number;
  srlScorePost?: number;
  tkaScorePre?: number;
  tkaScorePost?: number;
}

export type CekRasaType = 'tenang' | 'ragu' | 'cemas';

export type KeyakinanType = 'yakin' | 'ragu' | 'belum_tahu';

export type KategoriSalahType = 'salah_hitung' | 'lupa_konsep' | 'salah_baca' | 'belum_paham';

export interface SoalAdaptif {
  id: string;
  region: 'hutan_angka' | 'lautan_geometri' | 'gunung_logika';
  contextPackage: 'pertanian' | 'pasar' | 'transportasi' | 'keuangan';
  topic: string;
  storyIntro: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  difficulty: 1 | 2 | 3;
  prerequisiteConcept?: string;
  hint1: string; // Generik
  hint2: string; // Spesifik
  hint3: string; // Hampir mengungkap jawaban
  explanation: string;
}

export interface JawabanSesi {
  soalId: string;
  userAnswer: string;
  isCorrect: boolean;
  confidence: KeyakinanType;
  hintsUsed: number;
  kategoriSalah?: KategoriSalahType;
  reflectionAction?: string;
}

export interface SesiBelajar {
  id: string;
  timestamp: string;
  cekRasa: CekRasaType;
  selectedMissionId: string;
  answers: JawabanSesi[];
  calibrationScore: number; // 0 - 100%
  journalEntry: string;
  pointsEarned: number;
}

export interface Mission {
  id: string;
  title: string;
  region: 'hutan_angka' | 'lautan_geometri' | 'gunung_logika';
  regionName: string;
  narrative: string;
  difficulty: 1 | 2 | 3;
  targetSkill: string;
  soalIds: string[];
  rewardPoints: number;
  rewardBadge: string;
  recommendedFor: CekRasaType[];
}

// Data Bank Soal Realistis Kontekstual SMP Kelas VIII
export const BANK_SOAL: SoalAdaptif[] = [
  {
    id: 'soal-1',
    region: 'hutan_angka',
    contextPackage: 'pertanian',
    topic: 'Pola Bilangan Aritmetika',
    storyIntro: 'Pak Tani Joko sedang menanam bibit cabai di ladang berteras-teras lereng gunung.',
    question: 'Di teras pertama ditanam 5 bibit, teras kedua 9 bibit, teras ketiga 13 bibit. Mengikuti pola penambahan yang sama, berapakah jumlah bibit cabai pada teras ke-7?',
    options: [
      { label: 'A', text: '25 bibit' },
      { label: 'B', text: '29 bibit' },
      { label: 'C', text: '33 bibit' },
      { label: 'D', text: '37 bibit' }
    ],
    correctAnswer: 'B',
    difficulty: 1,
    prerequisiteConcept: 'Pola loncat bilangan dasar (+4)',
    hint1: 'Perhatikan selisih jumlah bibit dari satu teras ke teras berikutnya.',
    hint2: 'Selisihnya adalah beda tetap: 9 - 5 = 4 bibit tiap teras.',
    hint3: 'Gunakan rumus pola: Suku ke-n = 5 + (n - 1) × 4. Untuk n = 7, hitung 5 + 6 × 4.',
    explanation: 'Beda pola (b) = 4, suku pertama (a) = 5. Suku ke-7 = 5 + (7 - 1) × 4 = 5 + 24 = 29 bibit.'
  },
  {
    id: 'soal-2',
    region: 'hutan_angka',
    contextPackage: 'pasar',
    topic: 'Aljabar & Persamaan Linear',
    storyIntro: 'Bu Ani membeli bahan sayur di Pasar Beringharjo untuk warung makan miliknya.',
    question: 'Harga 2 ikat kangkung dan 3 ikat bayam adalah Rp19.000. Jika harga 1 ikat kangkung adalah Rp3.500, berapakah harga 1 ikat bayam?',
    options: [
      { label: 'A', text: 'Rp3.000' },
      { label: 'B', text: 'Rp4.000' },
      { label: 'C', text: 'Rp4.500' },
      { label: 'D', text: 'Rp5.000' }
    ],
    correctAnswer: 'B',
    difficulty: 1,
    prerequisiteConcept: 'Operasi hitung campuran perkalian dan pengurangan',
    hint1: 'Cari dahulu total harga untuk 2 ikat kangkung yang sudah diketahui harganya.',
    hint2: '2 ikat kangkung = 2 × Rp3.500 = Rp7.000. Sisa uang adalah harga 3 ikat bayam.',
    hint3: 'Rp19.000 - Rp7.000 = Rp12.000 untuk 3 ikat bayam. Bagi Rp12.000 dengan 3.',
    explanation: '2(3.500) + 3y = 19.000 → 7.000 + 3y = 19.000 → 3y = 12.000 → y = Rp4.000 per ikat bayam.'
  },
  {
    id: 'soal-3',
    region: 'lautan_geometri',
    contextPackage: 'transportasi',
    topic: 'Teorema Pythagoras',
    storyIntro: 'Sebuah perahu nelayan berangkat dari dermaga pelabuhan mencari ikan.',
    question: 'Perahu berlayar ke arah barat sejauh 12 mil laut, kemudian berbelok ke arah selatan sejauh 9 mil laut. Berapakah jarak terdekat perahu dari posisi awal dermaga?',
    options: [
      { label: 'A', text: '13 mil laut' },
      { label: 'B', text: '15 mil laut' },
      { label: 'C', text: '18 mil laut' },
      { label: 'D', text: '21 mil laut' }
    ],
    correctAnswer: 'B',
    difficulty: 2,
    prerequisiteConcept: 'Kuadrat dan akar pangkat dua dasar',
    hint1: 'Arah barat dan selatan membentuk sudut siku-siku (90 derajat).',
    hint2: 'Jarak terdekat adalah sisi miring segitiga siku-siku dengan sisi 12 dan 9.',
    hint3: 'Gunakan c² = a² + b² = 12² + 9² = 144 + 81 = 225. Berapakah akar dari 225?',
    explanation: 'c = √(12² + 9²) = √(144 + 81) = √225 = 15 mil laut (Tripel Pythagoras 3-4-5 dikalikan 3).'
  },
  {
    id: 'soal-4',
    region: 'gunung_logika',
    contextPackage: 'keuangan',
    topic: 'Statistika & Rata-rata (Mean)',
    storyIntro: 'Doni mencatat uang tabungan hariannya selama 5 hari berturut-turut di celengan bambu.',
    question: 'Tabungan Doni berturut-turut: Rp4.000, Rp6.000, Rp5.000, Rp8.000, dan Rp7.000. Berapakah rata-rata uang yang ia tabung setiap harinya?',
    options: [
      { label: 'A', text: 'Rp5.500' },
      { label: 'B', text: 'Rp6.000' },
      { label: 'C', text: 'Rp6.500' },
      { label: 'D', text: 'Rp7.000' }
    ],
    correctAnswer: 'B',
    difficulty: 1,
    prerequisiteConcept: 'Penjumlahan dan pembagian bilangan ratusan/ribuan',
    hint1: 'Jumlahkan seluruh uang tabungan selama 5 hari tersebut.',
    hint2: 'Total = 4.000 + 6.000 + 5.000 + 8.000 + 7.000 = Rp30.000.',
    hint3: 'Bagi total Rp30.000 dengan banyaknya hari (5 hari).',
    explanation: 'Rata-rata = Total Uang / Jumlah Hari = 30.000 / 5 = Rp6.000 per hari.'
  },
  {
    id: 'soal-5',
    region: 'lautan_geometri',
    contextPackage: 'pertanian',
    topic: 'Bangun Ruang Sisi Datar (Prisma/Balok)',
    storyIntro: 'Kelompok tani membuat bak penampungan air hujan berbentuk balok di sawah.',
    question: 'Bak air berukuran panjang 4 meter, lebar 2 meter, dan tinggi 1,5 meter. Berapa liter kapasitas maksimal air yang dapat ditampung bak tersebut? (1 m³ = 1.000 liter)',
    options: [
      { label: 'A', text: '8.000 liter' },
      { label: 'B', text: '10.000 liter' },
      { label: 'C', text: '12.000 liter' },
      { label: 'D', text: '15.000 liter' }
    ],
    correctAnswer: 'C',
    difficulty: 2,
    prerequisiteConcept: 'Konversi satuan m³ ke liter dan perkalian desimal',
    hint1: 'Hitung volume balok dengan rumus: Volume = panjang × lebar × tinggi.',
    hint2: 'Volume = 4 m × 2 m × 1,5 m = 12 meter kubik (m³).',
    hint3: 'Kalikan hasil 12 m³ dengan 1.000 untuk mendapatkan satuan liter.',
    explanation: 'V = 4 × 2 × 1,5 = 12 m³. Karena 1 m³ = 1.000 liter, maka kapasitas = 12 × 1.000 = 12.000 liter.'
  }
];

export const MISSIONS: Mission[] = [
  {
    id: 'misi-1',
    title: 'Misi 1: Terasering Panen Raya',
    region: 'hutan_angka',
    regionName: 'Hutan Angka',
    narrative: 'Bantu para petani lereng bukit menata pola bibit dan menyusun anggaran panen agar lumbung desa melimpah!',
    difficulty: 1,
    targetSkill: 'Pola Bilangan & Aljabar Kontekstual',
    soalIds: ['soal-1', 'soal-2'],
    rewardPoints: 120,
    rewardBadge: 'Petani Teliti',
    recommendedFor: ['tenang', 'ragu', 'cemas']
  },
  {
    id: 'misi-2',
    title: 'Misi 2: Pelayaran Bahari Nusantara',
    region: 'lautan_geometri',
    regionName: 'Lautan Geometri',
    narrative: 'Kemudikan kapal menyusuri rute kompas tercepat menggunakan kaidah phytagoras dan hitung cadangan air tawar.',
    difficulty: 2,
    targetSkill: 'Teorema Pythagoras & Geometri Ruang',
    soalIds: ['soal-3', 'soal-5'],
    rewardPoints: 160,
    rewardBadge: 'Nahkoda Cermat',
    recommendedFor: ['tenang', 'ragu']
  },
  {
    id: 'misi-3',
    title: 'Misi 3: Puncak Kebijaksanaan Logika',
    region: 'gunung_logika',
    regionName: 'Gunung Logika',
    narrative: 'Uji kemampuan membaca data keuangan pasar dan rata-rata tabungan untuk mendirikan koperasi desa mandiri.',
    difficulty: 1,
    targetSkill: 'Statistika Kehidupan Nyata',
    soalIds: ['soal-4'],
    rewardPoints: 100,
    rewardBadge: 'Akuntan Cilik',
    recommendedFor: ['tenang', 'ragu', 'cemas']
  }
];

// Instrumen Evaluasi AMAS (9 Item)
export const AMAS_QUESTIONS = [
  { id: 'amas-1', text: 'Saya merasa tegang ketika harus mengerjakan soal matematika baru di kelas.' },
  { id: 'amas-2', text: 'Saya khawatir akan mendapat nilai atau peringkat buruk dalam ujian matematika.' },
  { id: 'amas-3', text: 'Mendengarkan penjelasan materi matematika yang rumit membuat saya merasa bingung dan cemas.' },
  { id: 'amas-4', text: 'Saya merasa panik ketika guru meminta saya maju ke depan untuk mengerjakan soal matematika.' },
  { id: 'amas-5', text: 'Mengerjakan tugas rumah (PR) matematika membuat saya merasa tertekan.' },
  { id: 'amas-6', text: 'Membuka buku matematika dan melihat deretan rumus menimbulkan perasaan tidak nyaman.' },
  { id: 'amas-7', text: 'Saya merasa khawatir teman-teman menganggap saya tidak mampu saat saya salah menjawab soal matematika.' },
  { id: 'amas-8', text: 'Jantung saya berdegup kencang saat lembar soal ujian matematika dibagikan.' },
  { id: 'amas-9', text: 'Saya merasa gugup sehari sebelum jadwal pelajaran matematika dimulai.' }
];

// Instrumen Evaluasi SRL (Self-Regulated Learning - 8 Item)
export const SRL_QUESTIONS = [
  { id: 'srl-1', dimension: 'Perencanaan', text: 'Sebelum mulai belajar, saya menentukan target apa yang ingin saya kuasai hari ini.' },
  { id: 'srl-2', dimension: 'Perencanaan', text: 'Saya memilih tempat dan waktu yang tenang agar tidak mudah terganggu saat belajar matematika.' },
  { id: 'srl-3', dimension: 'Monitoring', text: 'Saat mengerjakan soal, saya mengecek kembali apakah langkah-langkah saya sudah masuk akal.' },
  { id: 'srl-4', dimension: 'Monitoring', text: 'Saya tahu bagian mana dari materi yang sudah saya pahami dan bagian mana yang masih ragu.' },
  { id: 'srl-5', dimension: 'Regulasi', text: 'Jika menemukan soal yang sulit, saya mencoba mencari petunjuk atau membaca kembali contoh soal.' },
  { id: 'srl-6', dimension: 'Regulasi', text: 'Saya tidak mudah menyerah meskipun jawaban pertama saya belum tepat.' },
  { id: 'srl-7', dimension: 'Refleksi', text: 'Setelah selesai belajar, saya merenungkan kenapa saya membuat kesalahan agar tidak terulang lagi.' },
  { id: 'srl-8', dimension: 'Refleksi', text: 'Saya merasa puas dan bangga ketika berhasil memahami konsep matematika dengan usaha mandiri.' }
];

// Mock Siswa untuk Dasbor Guru
export interface SiswaKelas {
  id: string;
  pseudonim: string;
  namaLengkap: string;
  statusCekRasa: CekRasaType;
  misiSelesai: number;
  indeksKalibrasi: number; // e.g. 85%
  skorAmas: number; // baseline 9-45
  skorTka: number; // 0-100
  polaSalahUtama: string;
  jurnalTerakhir: string;
  terakhirAktif: string;
}

export const MOCK_KELAS_VIII_A: SiswaKelas[] = [
  { id: 's-1', pseudonim: 'Kancil Gesit (Dika)', namaLengkap: 'Andika Pratama', statusCekRasa: 'tenang', misiSelesai: 12, indeksKalibrasi: 88, skorAmas: 18, skorTka: 78, polaSalahUtama: 'Salah Hitung Minor', jurnalTerakhir: 'Hari ini aku belajar bahwa phytagoras itu seperti segitiga layar perahu nelayan.', terakhirAktif: 'Hari ini' },
  { id: 's-2', pseudonim: 'Elang Rimba', namaLengkap: 'Bagas Firmansyah', statusCekRasa: 'ragu', misiSelesai: 9, indeksKalibrasi: 72, skorAmas: 24, skorTka: 64, polaSalahUtama: 'Lupa Rumus Balok', jurnalTerakhir: 'Aku baru tahu kalau 1 m³ sama dengan 1000 liter air.', terakhirAktif: 'Kemarin' },
  { id: 's-3', pseudonim: 'Bunga Teratai', namaLengkap: 'Citra Dewi', statusCekRasa: 'cemas', misiSelesai: 6, indeksKalibrasi: 58, skorAmas: 31, skorTka: 52, polaSalahUtama: 'Belum Paham Aljabar', jurnalTerakhir: 'Tadi sempat takut salah, tapi hint bertahap sangat membantuku.', terakhirAktif: '2 hari lalu' },
  { id: 's-4', pseudonim: 'Rusa Hutan', namaLengkap: 'Dimas Setiawan', statusCekRasa: 'tenang', misiSelesai: 14, indeksKalibrasi: 92, skorAmas: 16, skorTka: 85, polaSalahUtama: 'Salah Baca Soal', jurnalTerakhir: 'Pola aritmetika ternyata gampang kalau dicari beda teraseringnya.', terakhirAktif: 'Hari ini' },
  { id: 's-5', pseudonim: 'Bintang Pagi', namaLengkap: 'Eka Nuraini', statusCekRasa: 'tenang', misiSelesai: 11, indeksKalibrasi: 84, skorAmas: 19, skorTka: 76, polaSalahUtama: 'Salah Hitung Desimal', jurnalTerakhir: 'Lebih percaya diri menaksir rata-rata belanja pasar.', terakhirAktif: 'Hari ini' }
];

// Global Atoms
export const currentUserAtom = atom<UserProfile>({
  id: 'usr-dika',
  name: 'Kancil Gesit (Dika)',
  role: 'siswa',
  avatar: '🦊',
  classCode: 'VIII-A-SMK1',
  className: 'Kelas VIII-A SMP Gemilang',
  points: 480,
  badges: ['Petani Teliti', 'Nahkoda Cermat', 'Pejuang Kalibrasi'],
  level: 3,
  completedMissions: 5,
  amasScorePre: 29,
  amasScorePost: 17,
  srlScorePre: 55,
  srlScorePost: 78,
  tkaScorePre: 42,
  tkaScorePost: 74
});

export const currentPageAtom = atom<'beranda' | 'sesi' | 'peta' | 'rapor' | 'guru' | 'kepsek' | 'evaluasi' | 'pedoman'>('beranda');

export const currentSesiStageAtom = atom<number>(1);
export const selectedCekRasaAtom = atom(null as CekRasaType | null);
export const activeMissionAtom = atom(MISSIONS[0] as Mission | null);
export const currentQuestionIndexAtom = atom<number>(0);
export const userAnswersLogAtom = atom([] as JawabanSesi[]);
export const currentJournalAtom = atom<string>('');
export const sessionHistoryAtom = atom([] as SesiBelajar[]);
