import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search, Grid3X3, List, Heart, Sparkles, Play } from 'lucide-react'
import CharacterCard from '../components/CharacterCard'
import { characters } from '../data/characters'
import { Character } from '../types'

// Filter tabs
const FILTER_TABS = ['All', 'Teen', 'Young Adult', '20s', '30s', 'MILF', 'Asian', 'Blonde', 'Brunette', 'Ebony', 'Curvy', 'Petite']

const BANNERS = [
  {
    title: 'Your fantasy.\nYour rules.',
    subtitle: 'No limits.',
    cta: 'Join Free',
    ctaHref: '/app/premium',
    bg: 'from-[#1a0a2e] via-[#2d1054] to-[#0f0e0f]',
    accent: '#D05BF8',
  },
  {
    title: 'Always ready for\na spicy conversation.',
    subtitle: 'She never sleeps.',
    cta: 'Try Premium',
    ctaHref: '/app/premium',
    bg: 'from-[#0f1a2e] via-[#0a2d54] to-[#0f0e0f]',
    accent: '#18A8FF',
  },
]

export default function Explore() {
  const [bannerIdx, setBannerIdx] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx(i => (i + 1) % BANNERS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const banner = BANNERS[bannerIdx]
  const liveChars = characters.filter(c => c.isLive).slice(0, 8)
  const filteredChars: Character[] = characters.filter(c => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeFilter !== 'All' && !c.tags?.includes(activeFilter)) return false
    return true
  })

  return (
    <div className="pb-8">
      {/* ======== HERO BANNER (Top of content, full width) ======== */}
      <section className="relative overflow-hidden mb-0">
        <div
          className={`relative h-[320px] desktop:h-[380px] bg-gradient-to-br ${banner.bg} flex items-center px-8 desktop:px-12 overflow-hidden`}
        >
          {/* Glow */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
            style={{ background: banner.accent, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          />

          {/* Banner Content */}
          <div className="relative z-10 max-w-lg">
            <h1 className="text-3xl desktop:text-4xl font-bold text-white leading-tight tracking-tight whitespace-pre-line">
              {banner.title}
            </h1>
            <p className="mt-2 text-white/60 text-lg">{banner.subtitle}</p>
            <Link
              to={banner.ctaHref}
              className="mt-6 inline-flex items-center gap-2 btn-pink rounded-full px-6 py-3 text-sm font-semibold"
            >
              {banner.cta}
            </Link>
          </div>
        </div>

        {/* Banner Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === bannerIdx ? 'w-8 bg-gradient-to-r from-[#d05bf8] to-[#ff18a0]' : 'w-1.5 bg-white/30'}`}
            />
          ))}
        </div>

        {/* Arrow Buttons */}
        <button
          onClick={() => setBannerIdx(i => (i - 1 + BANNERS.length) % BANNERS.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-20"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setBannerIdx(i => (i + 1) % BANNERS.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all z-20"
        >
          <ChevronRight size={18} />
        </button>
      </section>

      {/* ======== LIVE MODELS (Right below banner, same level) ======== */}
      {liveChars.length > 0 && (
        <section className="px-8 desktop:px-12 py-4 border-b border-white/[5%]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="live-badge"><span className="size-1.5 rounded-full bg-white" /> LIVE</span>
              <span className="text-white/50 text-xs">Models are Live - interaction to the next level</span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {liveChars.map(char => (
                <Link
                  key={char.id}
                  to={`/chat/${char.username}?live`}
                  className="relative shrink-0 group"
                >
                  <div className="size-[52px] rounded-full overflow-hidden ring-2 ring-gl-pink" style={{ boxShadow: '0 0 10px rgba(208,91,248,0.4)' }}>
                    <img
                      src={char.avatar}
                      alt={char.name}
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).src = '' }}
                    />
                  </div>
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[9px] font-bold bg-red-500 text-white rounded-full">
                    LIVE
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======== TOP FILTER BAR ======== */}
      <div className="sticky top-[88px] z-30 bg-[#0f0e0f]/95 backdrop-blur-md border-b border-white/[5%] px-8 desktop:px-12 py-3">
        <div className="flex items-center gap-4">
          {/* Filter Tabs */}
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
            {FILTER_TABS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg'
                    : 'bg-white/[4%] text-white/50 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-48 shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white/[4%] border border-white/[5%] rounded-xl py-2 pl-9 pr-3 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all"
            />
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 bg-white/[4%] rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/[8%] text-white' : 'text-white/40'}`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/[8%] text-white' : 'text-white/40'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ======== RESULTS INFO ======== */}
      <div className="px-8 desktop:px-12 py-4">
        <p className="text-white/40 text-sm">{filteredChars.length} models found</p>
      </div>

      {/* ======== CHARACTER GRID ======== */}
      <section className="px-8 desktop:px-12">
        {filteredChars.length > 0 ? (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-2 desktop:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'
            : 'flex flex-col gap-3'
          }>
            {filteredChars.map(char => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-white/40">
            <p className="text-lg">No models found</p>
          </div>
        )}
      </section>
    </div>
  )
}