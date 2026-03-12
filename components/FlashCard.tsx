'use client'

import { useState } from 'react'

interface Word {
  id: number
  english: string
  pronunciation: string
  meaning: string
  category: string
  icon: string
}

interface Props {
  word: Word
  total: number
  current: number
  isLearned: boolean
  onNext: () => void
  onPrev: () => void
  onMarkLearned: () => void
}

export default function FlashCard({ word, total, current, isLearned, onNext, onPrev, onMarkLearned }: Props) {
  const [flipped, setFlipped] = useState(false)

  const handleNext = () => {
    setFlipped(false)
    setTimeout(onNext, 100)
  }

  const handlePrev = () => {
    setFlipped(false)
    setTimeout(onPrev, 100)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="w-full flex items-center justify-between text-sm text-gray-400">
        <span>{word.icon} {word.category}</span>
        <span>{current + 1} / {total}</span>
      </div>

      {/* Card */}
      <div
        className="perspective w-full cursor-pointer"
        style={{ height: '320px' }}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="card-front bg-[#1a1a2e] border border-yellow-500/30 gold-glow flex flex-col items-center justify-center p-8">
            <div className="text-5xl font-bold text-yellow-400 mb-4">{word.english}</div>
            <div className="text-gray-400 text-lg">/{word.pronunciation}/</div>
            <div className="mt-6 text-gray-500 text-sm">Tap untuk lihat arti</div>
            {isLearned && (
              <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                ✓ Dipelajari
              </div>
            )}
          </div>
          {/* Back */}
          <div className="card-back bg-[#16213e] border border-yellow-500/50 gold-glow flex flex-col items-center justify-center p-8">
            <div className="text-2xl font-bold text-white mb-3">{word.meaning}</div>
            <div className="text-yellow-400 text-lg mb-2">{word.english}</div>
            <div className="text-gray-400 text-sm">/{word.pronunciation}/</div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 w-full">
        <button
          onClick={handlePrev}
          className="flex-1 bg-[#1a1a2e] hover:bg-[#16213e] text-white py-3 rounded-xl transition-all border border-yellow-500/20 hover:border-yellow-500/50"
        >
          ← Prev
        </button>
        <button
          onClick={onMarkLearned}
          disabled={isLearned}
          className={`flex-1 py-3 rounded-xl font-medium transition-all ${
            isLearned
              ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-400 text-black'
          }`}
        >
          {isLearned ? '✓ Learned' : 'Mark Learned'}
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-[#1a1a2e] hover:bg-[#16213e] text-white py-3 rounded-xl transition-all border border-yellow-500/20 hover:border-yellow-500/50"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
