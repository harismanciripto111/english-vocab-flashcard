'use client'

import { useState, useEffect, useRef } from 'react'

const WORK_MINUTES = 25
const BREAK_MINUTES = 5

export default function PomodoroTimer() {
  const [isWork, setIsWork] = useState(true)
  const [timeLeft, setTimeLeft] = useState(WORK_MINUTES * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalTime = isWork ? WORK_MINUTES * 60 : BREAK_MINUTES * 60
  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const secs = (timeLeft % 60).toString().padStart(2, '0')

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!)
            if (isWork) {
              setSessions(s => s + 1)
              setIsWork(false)
              setTimeLeft(BREAK_MINUTES * 60)
            } else {
              setIsWork(true)
              setTimeLeft(WORK_MINUTES * 60)
            }
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isRunning, isWork])

  const reset = () => {
    setIsRunning(false)
    setTimeLeft(isWork ? WORK_MINUTES * 60 : BREAK_MINUTES * 60)
  }

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-yellow-500/20">
      <h3 className="text-lg font-bold text-yellow-400 mb-4">⏱ Pomodoro Timer</h3>
      
      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => { setIsWork(true); setIsRunning(false); setTimeLeft(WORK_MINUTES * 60) }}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            isWork ? 'bg-yellow-500 text-black' : 'bg-[#0f3460] text-gray-400'
          }`}
        >
          Belajar 25m
        </button>
        <button
          onClick={() => { setIsWork(false); setIsRunning(false); setTimeLeft(BREAK_MINUTES * 60) }}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
            !isWork ? 'bg-green-500 text-black' : 'bg-[#0f3460] text-gray-400'
          }`}
        >
          Istirahat 5m
        </button>
      </div>

      {/* Circle timer */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#0f3460" strokeWidth="8"/>
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke={isWork ? '#f59e0b' : '#22c55e'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-mono font-bold text-white">{mins}:{secs}</span>
            <span className="text-xs text-gray-400">{isWork ? 'Fokus' : 'Istirahat'}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded-lg transition-all"
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button
          onClick={reset}
          className="px-4 bg-[#0f3460] hover:bg-[#16213e] text-white rounded-lg transition-all"
        >
          ↺
        </button>
      </div>

      {/* Sessions */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-sm">Sesi selesai: <span className="text-yellow-400 font-bold">{sessions}</span></p>
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < sessions % 4 ? 'bg-yellow-500' : 'bg-[#0f3460]'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
