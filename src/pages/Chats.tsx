import { Link } from 'react-router-dom'
import { characters } from '../data/characters'
import { MoreVertical } from 'lucide-react'

export default function Chats() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Chats</h1>
      <div className="space-y-2">
        {characters.slice(0, 15).map(char => (
          <Link
            key={char.id}
            to={`/chat/${char.username}`}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[4%] transition-all group"
          >
            <div className="relative shrink-0">
              <img src={char.avatar} alt={char.name} className="size-14 rounded-full object-cover" />
              <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-400 border-2 border-gl-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm">{char.name}</h3>
                <span className="text-white/30 text-xs">2:30 PM</span>
              </div>
              <p className="text-white/50 text-sm truncate mt-0.5">
                Hey baby! I've been waiting for you...
              </p>
            </div>
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={e => e.preventDefault()}
            >
              <MoreVertical size={16} className="text-white/40" />
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}