'use client'

interface Category {
  id: string
  name: string
  icon: string
  words: unknown[]
}

interface Props {
  categories: Category[]
  selected: string
  onSelect: (id: string) => void
}

export default function CategorySelector({ categories, selected, onSelect }: Props) {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-5 border border-yellow-500/20">
      <h3 className="text-sm font-bold text-yellow-400 mb-3">🗂 Kategori</h3>
      <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
        <button
          onClick={() => onSelect('all')}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
            selected === 'all'
              ? 'bg-yellow-500/20 text-yellow-400 font-medium'
              : 'text-gray-400 hover:bg-[#0f3460] hover:text-white'
          }`}
        >
          🌟 Semua Kategori
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
              selected === cat.id
                ? 'bg-yellow-500/20 text-yellow-400 font-medium'
                : 'text-gray-400 hover:bg-[#0f3460] hover:text-white'
            }`}
          >
            <span>{cat.icon} {cat.name}</span>
            <span className="text-xs opacity-60">{cat.words.length}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
