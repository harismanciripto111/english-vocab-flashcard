# English Vocab Flashcard

Aplikasi flashcard kosakata bahasa Inggris interaktif dengan fitur Pomodoro Timer, Quiz Mode, dan Progress Tracker.

## Fitur
- **Flashcard Interaktif** - Flip animasi, navigasi antar kata
- **Pomodoro Timer** - 25 menit belajar + 5 menit istirahat
- **Quiz Mode** - Multiple choice dengan scoring
- **Progress Tracker** - Track kata yang sudah dipelajari
- **Daily Goal** - Target harian 20 kata
- **Kategori** - 10+ kategori: Teknologi, Greetings, Food, Travel, Work, dll.
- **Dark Gold Theme** - Tampilan gelap dengan aksen emas
- **LocalStorage** - Progress tersimpan di browser

## Tech Stack
- Next.js 14 (App Router)
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
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Kategori Kosakata
1. Teknologi & Media Sosial
2. Greetings & Introductions
3. Food & Drinks
4. Travel & Transportation
5. Work & Career
6. Health & Body
7. Nature & Environment
8. Hobbies & Entertainment
9. Shopping & Money
10. Emotions & Feelings

Total: 500+ kata kosakata
