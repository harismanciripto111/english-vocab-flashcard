# English Vocab Flashcard

Aplikasi flashcard kosakata bahasa Inggris interaktif dengan fitur Pomodoro Timer, Quiz Mode, dan Progress Tracker. Berisi **500+ kata** kosakata dalam **10 kategori**.

## Fitur
- **Flashcard Interaktif** - Flip animasi, navigasi antar kata
- **Pomodoro Timer** - 25 menit belajar + 5 menit istirahat
- **Quiz Mode** - 50 soal multiple choice per sesi dengan scoring
- **Progress Tracker** - Track kata yang sudah dipelajari
- **Daily Goal** - Target harian 20 kata
- **Kategori** - 10 kategori dengan 50 kata masing-masing (500 total)
- **Dark Gold Theme** - Tampilan gelap dengan aksen emas (#F59E0B)
- **LocalStorage** - Progress tersimpan di browser

## Tech Stack
- Next.js 15 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- LocalStorage untuk persistensi data

## Cara Jalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Deploy ke Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/harismanciripto111/english-vocab-flashcard)

## Struktur Folder

```
english-vocab-flashcard/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── FlashCard.tsx
│   ├── PomodoroTimer.tsx
│   ├── ProgressTracker.tsx
│   ├── CategorySelector.tsx
│   ├── QuizMode.tsx
│   └── DailyGoal.tsx
├── data/
│   └── vocabulary.json
├── AGENT.md
├── PLAN.md
├── PROGRESS.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Kategori Kosakata (50 kata per kategori)
1. Teknologi & Media Sosial
2. Sapaan & Perkenalan
3. Makanan & Minuman
4. Perjalanan & Transportasi
5. Pekerjaan & Kantor
6. Belanja & Transaksi
7. Kesehatan & Darurat
8. Perasaan & Ekspresi
9. Sekolah & Belajar
10. Cuaca & Alam

**Total: 500 kata kosakata**

## Changelog

### v1.1.0 - Vocabulary Expansion & Quiz Upgrade
- Expanded all 10 categories from 20 to 50 words each (200 -> 500 total)
- Quiz mode upgraded from 10 to 50 questions per session
- Added project documentation: AGENT.md, PLAN.md, PROGRESS.md
- Updated README with accurate feature descriptions

### v1.0.0 - Initial Release
- 10 vocabulary categories with 20 words each (200 total)
- Flashcard with flip animation
- Quiz mode with multiple choice
- Pomodoro timer, daily goals, progress tracking
- Dark gold theme with localStorage persistence
