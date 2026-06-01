import { Link } from 'react-router-dom'
import { Heart, Sparkles, Zap, Video, Image } from 'lucide-react'
import { characters } from '../data/characters'

export default function Characters() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">My AI Characters</h1>
        <Link to="/create" className="btn-pink rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
          <Sparkles size={16} />
          Create New
        </Link>
      </div>

      {characters.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-white/40 text-lg mb-4">You haven't created any AI characters yet</p>
          <Link to="/create" className="btn-pink rounded-full px-6 py-3 inline-flex items-center gap-2">
            <Sparkles size={16} />
            Create Your First
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters.slice(0, 20).map(char => (
            <Link
              key={char.id}
              to={`/chat/${char.username}`}
              className="group relative rounded-[22px] overflow-hidden h-64 card-hover"
              style={{ backgroundImage: `url(${char.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-semibold">{char.name}</h3>
                <p className="text-white/60 text-xs mt-1">Last active: Just now</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}