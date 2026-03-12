'use client'

import { useState, useEffect } from 'react'
import FlashCard from '@/components/FlashCard'
import PomodoroTimer from '@/components/PomodoroTimer'
import ProgressTracker from '@/components/ProgressTracker'
import CategorySelector from '@/components/CategorySelector'
import QuizMode from '@/components/QuizMode'
import DailyGoal from '@/components/DailyGoal'
import vocabData from '@/data/vocabulary.json'

type Mode = 'flashcard' | 'quiz'

export default function Home() {
  const [mode, setMode] = useState<Mode>('flashcard')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [learnedWords, setLearnedWords] = useState<Set<number>>(new Set())
  const [dailyCount, setDailyCount] = useState(0)
  const [streak, setStreak] = useState(0)

  const allWords = vocabData.categories.flatMap(c => 
    c.words.map(w => ({ ...w, category: c.name, categoryId: c.id, icon: c.icon }))
  )

  const filteredWords = selectedCategory === 'all'
    ? allWords
    : allWords.filter(w => w.categoryId === selectedCategory)

  useEffect(() => {
    const saved = localStorage.getItem('learnedWords')
    const savedCount = localStorage.getItem('dailyCount')
    const savedStreak = localStorage.getItem('streak')
    if (saved) setLearnedWords(new Set(JSON.parse(saved)))
    if (savedCount) setDailyCount(parseInt(savedCount))
    if (savedStreak) setStreak(parseInt(savedStreak))
  }, [])

  const markLearned = (id: number) => {
    const newLearned = new Set(learnedWords)
    newLearned.add(id)
    setLearnedWords(newLearned)
    localStorage.setItem('learnedWords', JSON.stringify([...newLearned]))
    const newCount = dailyCount + 1
    setDailyCount(newCount)
    localStorage.setItem('dailyCount', newCount.toString())
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredWords.length)
  }

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + filteredWords.length) % filteredWords.length)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">📚 English Vocab</h1>
            <p className="text-gray-400 text-sm mt-1">Flashcard Interaktif Bahasa Inggris</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('flashcard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === 'flashcard'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-[#1a1a2e] text-gray-400 hover:text-white'
              }`}
            >
              Flashcard
            </button>
            <button
              onClick={() => setMode('quiz')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                mode === 'quiz'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-[#1a1a2e] text-gray-400 hover:text-white'
              }`}
            >
              Quiz
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-yellow-500/20">
            <p className="text-gray-400 text-xs">Total Kata</p>
            <p className="text-2xl font-bold text-yellow-400">{allWords.length}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-yellow-500/20">
            <p className="text-gray-400 text-xs">Sudah Dipelajari</p>
            <p className="text-2xl font-bold text-green-400">{learnedWords.size}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-yellow-500/20">
            <p className="text-gray-400 text-xs">Hari Ini</p>
            <p className="text-2xl font-bold text-blue-400">{dailyCount}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-yellow-500/20">
            <p className="text-gray-400 text-xs">Streak</p>
            <p className="text-2xl font-bold text-orange-400">{streak} 🔥</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Category + Progress */}
          <div className="space-y-6">
            <CategorySelector
              categories={vocabData.categories}
              selected={selectedCategory}
              onSelect={(id) => { setSelectedCategory(id); setCurrentIndex(0) }}
            />
            <ProgressTracker
              total={filteredWords.length}
              learned={filteredWords.filter(w => learnedWords.has(w.id)).length}
            />
            <DailyGoal current={dailyCount} goal={20} />
          </div>

          {/* Center: Flashcard / Quiz */}
          <div className="lg:col-span-1">
            {mode === 'flashcard' ? (
              filteredWords.length > 0 ? (
                <FlashCard
                  word={filteredWords[currentIndex]}
                  total={filteredWords.length}
                  current={currentIndex}
                  isLearned={learnedWords.has(filteredWords[currentIndex].id)}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onMarkLearned={() => markLearned(filteredWords[currentIndex].id)}
                />
              ) : (
                <div className="bg-[#1a1a2e] rounded-2xl p-8 text-center">
                  <p className="text-gray-400">Tidak ada kata di kategori ini</p>
                </div>
              )
            ) : (
              <QuizMode words={filteredWords} onComplete={(score) => {
                const newCount = dailyCount + score
                setDailyCount(newCount)
                localStorage.setItem('dailyCount', newCount.toString())
              }} />
            )}
          </div>

          {/* Right: Pomodoro */}
          <div>
            <PomodoroTimer />
          </div>
        </div>
      </div>
    </main>
  )
}
