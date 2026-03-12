'use client'

import { useState, useEffect, useCallback } from 'react'

interface Word {
  id: number
  english: string
  pronunciation: string
  meaning: string
  category?: string
  icon?: string
}

interface Props {
  words: Word[]
  onComplete: (score: number) => void
}

export default function QuizMode({ words, onComplete }: Props) {
  const [questions, setQuestions] = useState<{ word: Word; choices: string[]; correct: string }[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const generateQuiz = useCallback(() => {
    if (words.length < 4) return
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 10)
    const qs = shuffled.map(word => {
      const others = words.filter(w => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3)
      const choices = [...others.map(o => o.meaning), word.meaning].sort(() => Math.random() - 0.5)
      return { word, choices, correct: word.meaning }
    })
    setQuestions(qs)
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }, [words])

  useEffect(() => {
    generateQuiz()
  }, [generateQuiz])

  const handleAnswer = (choice: string) => {
    if (selected) return
    setSelected(choice)
    const isCorrect = choice === questions[currentQ].correct
    const newScore = isCorrect ? score + 1 : score
    if (isCorrect) {
      setScore(newScore)
    }
    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setFinished(true)
        onComplete(newScore)
      } else {
        setCurrentQ(q => q + 1)
        setSelected(null)
      }
    }, 1200)
  }

  if (words.length < 4) {
    return (
      <div className="bg-[#1a1a2e] rounded-2xl p-8 text-center border border-yellow-500/20">
        <p className="text-gray-400">Pilih kategori dengan minimal 4 kata untuk quiz</p>
      </div>
    )
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="bg-[#1a1a2e] rounded-2xl p-8 text-center border border-yellow-500/20">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">Quiz Selesai!</h3>
        <p className="text-4xl font-bold text-white mb-1">{score}/{questions.length}</p>
        <p className="text-gray-400 mb-6">{pct}% benar</p>
        <button
          onClick={generateQuiz}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-all"
        >
          Coba Lagi
        </button>
      </div>
    )
  }

  if (!questions.length) return <div className="text-gray-400 text-center">Memuat quiz...</div>

  const q = questions[currentQ]

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-yellow-500/20">
      <div className="flex justify-between text-sm text-gray-400 mb-4">
        <span>Soal {currentQ + 1}/{questions.length}</span>
        <span className="text-yellow-400">{score} benar</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[#0f3460] rounded-full h-1.5 mb-6">
        <div
          className="progress-bar h-1.5"
          style={{ width: `${((currentQ) / questions.length) * 100}%` }}
        />
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-400 text-sm mb-2">Apa arti dari:</p>
        <h2 className="text-4xl font-bold text-yellow-400">{q.word.english}</h2>
        <p className="text-gray-500 mt-1">/{q.word.pronunciation}/</p>
      </div>

      <div className="space-y-3">
        {q.choices.map((choice, i) => {
          let style = 'bg-[#0f3460] text-white hover:bg-[#16213e] border border-transparent'
          if (selected) {
            if (choice === q.correct) style = 'bg-green-500/20 text-green-400 border border-green-500'
            else if (choice === selected) style = 'bg-red-500/20 text-red-400 border border-red-500'
            else style = 'bg-[#0f3460] text-gray-500 border border-transparent opacity-50'
          }
          return (
            <button
              key={i}
              onClick={() => handleAnswer(choice)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${style}`}
            >
              {String.fromCharCode(65 + i)}. {choice}
            </button>
          )
        })}
      </div>
    </div>
  )
}
