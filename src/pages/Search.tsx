import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles, SlidersHorizontal } from 'lucide-react'
import { characters } from '../data/characters'

const filters = ['All', 'Teen', 'MILF', 'Asian', 'Blonde', 'Brunette', 'Busty', 'Petite', 'Kinky', 'Romantic']

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('All')

  const results = characters.filter(c =>
    (active === 'All' || c.tags?.includes(active)) &&
    (c.name.toLowerCase().includes(query.toLowerCase()) || query === '')
  ).slice(0, 20)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Find Your Match</h1>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name or trait..."
          className="w-full bg-white/[4%] border border-white/[5%] rounded-full py-3.5 pl-12 pr-4
            text-white placeholder:text-white/30 focus:outline-none focus:border-gl-pink/30 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              active === f ? 'bg-pink-gradient text-white' : 'bg-white/[4%] text-white/60 hover:bg-white/[8%]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {results.map(char => (
          <Link
            key={char.id}
            to={`/chat/${char.username}`}
            className="relative rounded-[22px] overflow-hidden h-64 card-hover"
            style={{ backgroundImage: `url(${char.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-semibold">{char.name}</h3>
              <div className="flex gap-1 mt-1.5">
                {char.tags?.slice(0, 2).map(t => (
                  <span key={t} className="tag-pill">{t}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}