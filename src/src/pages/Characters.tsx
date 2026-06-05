import { Link } from 'react-router-dom'
import { Plus, Sparkles } from 'lucide-react'
import CharacterCard from '../components/CharacterCard'
import { characters } from '../data/characters'

export default function Characters() {
  // Show user's created characters (empty for now) + suggestions
  const myChars: typeof characters = []
  const suggestions = characters.slice(0, 8)

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-8">
      <div className="px-4 pt-4">
        <h1 className="text-[24px] font-[700] tracking-[-4%] mb-2">My AI</h1>
        <p className="text-[13px] text-white/40 mb-6">Your created characters</p>

        {myChars.length === 0 ? (
          <div className="text-center py-12">
            <div className="size-20 rounded-full bg-white/[4%] flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-white/20" />
            </div>
            <h3 className="text-[16px] font-semibold mb-2">No characters yet</h3>
            <p className="text-[13px] text-white/40 mb-6">Create your first AI character</p>
            <Link to="/create" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[14px] font-semibold">
              <Plus size={16} />
              Create Character
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 desktop:grid-cols-3 xl:grid-cols-4 gap-3">
            {myChars.map(c => <CharacterCard key={c.id} character={c} />)}
          </div>
        )}

        {/* Suggested */}
        <div className="mt-12">
          <h2 className="text-[16px] font-[600] mb-4">Popular Characters</h2>
          <div className="grid grid-cols-2 desktop:grid-cols-3 xl:grid-cols-4 gap-3">
            {suggestions.map(c => <CharacterCard key={c.id} character={c} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
