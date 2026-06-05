import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import CharacterCard from '../components/CharacterCard'
import { characters } from '../data/characters'

const TAGS = ['All', 'Teen', 'MILF', 'Asian', 'Blonde', 'Brunette', 'Ebony', 'Kinky', 'Busty', 'Redhead']

export default function Search() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = characters.filter(c => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false
    if (activeTag !== 'All' && !c.tags?.some(t => t.toLowerCase().includes(activeTag.toLowerCase()))) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-8">
      <div className="px-4 pt-4">
        <h1 className="text-[24px] font-[700] tracking-[-4%] mb-4">Search</h1>
        <div className="relative mb-4">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search characters..." className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-2.5 pl-10 pr-4 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)} className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-medium transition-all capitalize ${activeTag === tag ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/50 border border-white/[6%]'}`}>{tag}</button>
          ))}
        </div>
        <p className="text-[12px] text-white/30 mb-4">{filtered.length} results</p>
        <div className="grid grid-cols-2 desktop:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(c => <CharacterCard key={c.id} character={c} />)}
        </div>
      </div>
    </div>
  )
}
