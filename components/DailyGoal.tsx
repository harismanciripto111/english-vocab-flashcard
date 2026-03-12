'use client'

interface Props {
  current: number
  goal: number
}

export default function DailyGoal({ current, goal }: Props) {
  const percent = Math.min(100, Math.round((current / goal) * 100))
  const achieved = current >= goal

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-yellow-500/20">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-yellow-400">🎯 Target Harian</h3>
        {achieved && <span className="text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">Tercapai!</span>}
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">{current} / {goal} kata</span>
        <span className="text-yellow-400 font-bold">{percent}%</span>
      </div>
      <div className="w-full bg-[#0f3460] rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${
            achieved ? 'bg-green-500' : 'bg-gradient-to-r from-yellow-600 to-yellow-400'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-gray-500 text-xs mt-2">
        {achieved ? '🎉 Target hari ini sudah tercapai!' : `${goal - current} kata lagi untuk mencapai target`}
      </p>
    </div>
  )
}
