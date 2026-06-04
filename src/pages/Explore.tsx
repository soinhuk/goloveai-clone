import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search, ChevronDown, SlidersHorizontal } from 'lucide-react'
import CharacterCard from '../components/CharacterCard'
import { characters } from '../data/characters'
import { Character } from '../types'

const TAGS = ['MILF', 'Asian', 'Teen', 'Busty', 'Blonde', 'Goth', 'Ebony', 'Latina', 'Brunette', 'Athletic', 'Redhead', 'Kinky', 'Petite', 'Dominant', 'Submissive']

const BANNERS = [
  { title: 'REGISTER GET BONUS!', subtitle: 'Limited-time bonus for new users.', cta: '-70% Register', href: '/app/premium', bg: 'from-[#1a0a2e] via-[#2d1054] to-[#0f0e0f]', accent: '#D05BF8' },
  { title: 'CREATE YOUR AI GIRLFRIEND', subtitle: 'Your fantasy. Your rules. No limits.', cta: 'Bring Her to Life', href: '/create', bg: 'from-[#0f1a2e] via-[#0a2d54] to-[#0f0e0f]', accent: '#18A8FF' },
  { title: 'SHE ALWAYS PICKS UP', subtitle: 'Always ready for a spicy conversation.', cta: 'Try Calls', href: '#', bg: 'from-[#2d1054] via-[#1a0a2e] to-[#0f0e0f]', accent: '#ff18a0' },
]

export default function Explore() {
  const [bannerIdx, setBannerIdx] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [genderFilter, setGenderFilter] = useState('Female')
  const [styleFilter, setStyleFilter] = useState('Realistic')
  const [ageFilter, setAgeFilter] = useState('Any')
  const [sortBy, setSortBy] = useState('Characters')
  const liveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 5000)
    return () => clearInterval(t)
  }, [])

  const liveChars = characters.filter(c => c.isLive).slice(0, 8)
  const filteredChars: Character[] = characters.filter(c => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeTag && !c.tags?.some(t => t.toLowerCase().includes(activeTag.toLowerCase()))) return false
    return true
  })

  const banner = BANNERS[bannerIdx]
  const scrollLive = (d: 'l' | 'r') => liveRef.current?.scrollBy({ left: d === 'l' ? -200 : 200, behavior: 'smooth' })

  return (
    <div className="pb-8">
      {/* ====== HERO BANNER + LIVE ====== */}
      <section className="relative overflow-hidden">
        <div className="flex">
          {/* Banner */}
          <div className="flex-1 relative">
            <div className={`relative h-[200px] desktop:h-[260px] bg-gradient-to-br ${banner.bg} flex items-center px-8 desktop:px-12 overflow-hidden`}>
              <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20" style={{ background: banner.accent, left: '40%', top: '50%', transform: 'translate(-50%, -50%)' }} />
              <div className="relative z-10">
                <h1 className="text-2xl desktop:text-4xl font-bold text-white leading-tight tracking-[-4%]">{banner.title}</h1>
                <p className="mt-2 text-white/60 text-sm desktop:text-base tracking-[-4%]">{banner.subtitle}</p>
                <Link to={banner.href} className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-[0_0_15px_rgba(208,91,248,0.4)] hover:shadow-[0_0_25px_rgba(208,91,248,0.6)] transition-all">
                  {banner.cta} <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            <button onClick={() => setBannerIdx(i => (i - 1 + BANNERS.length) % BANNERS.length)} className="absolute left-3 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 z-20"><ChevronLeft size={16} /></button>
            <button onClick={() => setBannerIdx(i => (i + 1) % BANNERS.length)} className="absolute right-3 top-1/2 -translate-y-1/2 size-8 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 z-20"><ChevronRight size={16} /></button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {BANNERS.map((_, i) => <button key={i} onClick={() => setBannerIdx(i)} className={`h-1.5 rounded-full transition-all ${i === bannerIdx ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />)}
            </div>
          </div>

          {/* Live Models */}
          {liveChars.length > 0 && (
            <div className="hidden desktop:flex w-[280px] shrink-0 flex-col justify-center px-4 bg-white/[2%] border-l border-white/[5%]">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-[14px] font-[600] text-white">Join In</h2>
                <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full"><span className="size-1.5 rounded-full bg-white animate-pulse" />Live</span>
              </div>
              <p className="text-[11px] text-white/40 mb-3">Models are Live — interaction to the next level</p>
              <div ref={liveRef} className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {liveChars.map(c => (
                  <Link key={c.id} to={`/chat/${c.username}`} className="relative shrink-0 flex flex-col items-center gap-1">
                    <div className="size-[68px] rounded-full overflow-hidden ring-2 ring-[#d05bf8]/60" style={{ boxShadow: '0 0 10px rgba(208,91,248,0.3)' }}>
                      <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-white/50 truncate w-[68px] text-center">{c.name}</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[9px] font-bold bg-red-500 text-white rounded-full animate-pulse">LIVE</span>
                  </Link>
                ))}
              </div>
              <button onClick={() => scrollLive('r')} className="mt-2 flex items-center justify-center size-6 rounded-full bg-black/60 text-white mx-auto"><ChevronRight size={12} /></button>
            </div>
          )}
        </div>
      </section>

      {/* ====== SEARCH + FILTERS ====== */}
      <div className="px-4 desktop:px-8 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-[400px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="e.g. petite Asian, thick Latina, dom MILF" className="w-full bg-[#181718] border border-white/[6%] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all tracking-[-4%]" />
          </div>
          <Dropdown label="Gender" value={genderFilter} options={['Female', 'Male', 'Trans']} onChange={setGenderFilter} />
          <Dropdown label="Style" value={styleFilter} options={['Realistic', 'Anime', 'All']} onChange={setStyleFilter} />
          <Dropdown label="Age" value={ageFilter} options={['Any', '18-20', '21-25', '26-30', '31-40', '40+']} onChange={setAgeFilter} />
          <Dropdown label="" value={sortBy} options={['Characters', 'Newest', 'Popular']} onChange={setSortBy} />
          <button className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-white/50 bg-[#181718] border border-white/[6%] rounded-xl hover:text-white transition-all"><SlidersHorizontal size={14} /></button>
        </div>
      </div>

      {/* ====== TAG PILLS ====== */}
      <div className="px-4 desktop:px-8 pb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className={`shrink-0 px-4 py-1.5 rounded-full text-[12px] font-[400] tracking-[-4%] capitalize transition-all ${activeTag === tag ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-[#181718] text-white/50 hover:text-white border border-white/[6%]'}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ====== CHARACTER GRID ====== */}
      <section className="px-4 desktop:px-8">
        {/* CTA: Create Your Own */}
        <Link to="/create" className="group relative flex items-center justify-between h-[120px] desktop:h-[140px] rounded-[22px] overflow-hidden bg-gradient-to-r from-[#1a0a2e] via-[#2d1054] to-[#0f0e0f] border border-white/[6%] hover:border-[#d05bf8]/30 transition-all mb-6">
          <div className="px-6 desktop:px-8">
            <h2 className="text-lg desktop:text-xl font-bold text-white tracking-[-4%]">CREATE YOUR OWN AI GIRLFRIEND</h2>
            <button className="mt-2 px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded-full">Create Now</button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#d05bf8]/10 to-transparent" />
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-2 desktop:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 desktop:gap-4">
          {filteredChars.slice(0, 3).map(c => <CharacterCard key={c.id} character={c} />)}

          {/* Premium CTA Card */}
          <Link to="/app/premium" className="group relative flex flex-col justify-end overflow-hidden rounded-[22px] h-[320px] desktop:h-[420px] bg-gradient-to-br from-[#2d1054] via-[#1a0a2e] to-[#0f0e0f] border border-[#d05bf8]/20 hover:border-[#d05bf8]/40 transition-all">
            <div className="absolute inset-0 bg-gradient-to-t from-[#d05bf8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-[3] mt-auto p-[16px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold text-[#d05bf8]">LIMITED OFFER</span>
              </div>
              <h3 className="text-[16px] font-[600] text-white tracking-[-4%] mb-1">FIRST SUBSCRIPTION!</h3>
              <div className="flex items-center gap-2 text-[#ff18a0] font-mono text-sm mb-3">
                <span className="bg-black/40 px-1.5 py-0.5 rounded">00</span>:<span className="bg-black/40 px-1.5 py-0.5 rounded">29</span>:<span className="bg-black/40 px-1.5 py-0.5 rounded">58</span>
              </div>
              <button className="w-full py-2 text-sm font-semibold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded-xl">Upgrade PRO</button>
            </div>
          </Link>

          {filteredChars.slice(3).map(c => <CharacterCard key={c.id} character={c} />)}
        </div>
      </section>
    </div>
  )
}

function Dropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-3 py-2.5 text-[12px] bg-[#181718] border border-white/[6%] rounded-xl hover:border-white/10 transition-all tracking-[-4%]">
        {label && <span className="text-white/40">{label}</span>}
        <span className="text-white/80">{value}</span>
        <ChevronDown size={12} className="text-white/40" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 bg-[#181718] border border-white/[10%] rounded-xl overflow-hidden shadow-xl min-w-[120px]">
            {options.map(o => <button key={o} onClick={() => { onChange(o); setOpen(false) }} className={`w-full px-3 py-2 text-[12px] text-left transition-all ${o === value ? 'text-white bg-white/[8%]' : 'text-white/50 hover:text-white hover:bg-white/[4%]'}`}>{o}</button>)}
          </div>
        </>
      )}
    </div>
  )
}
