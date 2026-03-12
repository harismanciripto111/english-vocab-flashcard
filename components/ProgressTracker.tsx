'use client'

interface Props {
  total: number
  learned: number
}

export default function ProgressTracker({ total, learned }: Props) {
  const percent = total > 0 ? Math.round((learned / total) * 100) : 0

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-yellow-500/20">
      <h3 className="text-sm font-bold text-yellow-400 mb-3">📊 Progress</h3>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-400">{learned} / {total} kata</span>
        <span className="text-yellow-400 font-bold">{percent}%</span>
      </div>
      <div className="w-full bg-[#0f3460] rounded-full h-3">
        <div
          className="progress-bar h-3"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-gray-500 text-xs mt-2">
        {percent === 100 ? '🎉 Semua kata sudah dipelajari!' : `${total - learned} kata lagi`}
      </p>
    </div>
  )
}
