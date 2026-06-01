import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Character } from '../types'
import { Heart, Play } from 'lucide-react'

interface Props {
  character: Character
  className?: string
}

export default function CharacterCard({ character, className = '' }: Props) {
  const { name, username, avatar, tags = [], isOnline, isLive, isNew } = character
  const [imgError, setImgError] = useState(false)
  const [liked, setLiked] = useState(false)

  const avatarUrl = imgError
    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'
    : avatar

  return (
    <Link
      to={`/chat/${username}`}
      className={`group/card relative flex flex-col justify-end overflow-hidden rounded-[22px] select-none cursor-pointer
        h-[280px] desktop:h-[360px] w-full
        ${className}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/card:scale-110"
        style={{ backgroundImage: `url(${avatarUrl})` }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#d05bf8]/0 to-[#ff18a0]/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-1.5">
        {isLive && (
          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-red-500 text-white rounded flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white animate-pulse" />
            LIVE
          </span>
        )}
        {isNew && (
          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded">
            NEW
          </span>
        )}
        {!isLive && !isNew && tags[0] && (
          <span className="px-2 py-0.5 text-[9px] font-medium tracking-wider bg-white/20 backdrop-blur-sm text-white/90 rounded">
            {tags[0]}
          </span>
        )}
      </div>

      {/* Like Button */}
      <button
        className="absolute top-3 right-3 z-10 size-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110 active:scale-95"
        onClick={e => { e.preventDefault(); setLiked(!liked) }}
      >
        <Heart
          size={16}
          className={`transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-white'}`}
        />
      </button>

      {/* Online indicator */}
      {isOnline && (
        <div className="absolute top-3 right-3 z-10 size-2.5 rounded-full bg-green-400 border-2 border-[#0f0e0f]" />
      )}

      {/* Content */}
      <div className="relative z-[2] mt-auto p-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white font-semibold text-base desktop:text-lg leading-tight">
            {name || username}
          </h3>
          {isOnline && (
            <span className="size-1.5 rounded-full bg-green-400" />
          )}
        </div>

        {/* Tags */}
        {tags.length > 1 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(1, 3).map(tag => (
              <span key={tag} className="text-[10px] font-medium text-white/50">{tag}</span>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] font-medium text-white/30">+{tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Quick Action on Hover */}
        <div className="flex gap-2 mt-3 opacity-0 group-hover/card:opacity-100 transition-all translate-y-2 group-hover/card:translate-y-0">
          <button className="flex-1 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-white/30 transition-all">
            <Play size={12} /> Chat
          </button>
        </div>
      </div>
    </Link>
  )
}