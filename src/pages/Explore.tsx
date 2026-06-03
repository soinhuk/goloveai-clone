import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search, Grid3X3, List, Heart, Sparkles, Play, Check } from 'lucide-react'
import CharacterCard from '../components/CharacterCard'
import { characters } from '../data/characters'
import { Character } from '../types'

// Filter tabs
const FILTER_TABS = ['All', 'Teen', 'Young Adult', '20s', '30s', 'MILF', 'Asian', 'Blonde', 'Brunette', 'Ebony', 'Curvy', 'Petite']

const BANNERS = [
  {
    title: 'Your AI Girlfriend\nChat',
    subtitle: 'Uncensored · No Judgment · Interactive',
    cta: 'Join Free',
    ctaHref: '/app/premium',
    bg: 'from-[#1a0a2e] via-[#2d1054] to-[#0f0e0f]',
    accent: '#D05BF8',
  },
  {
    title: 'Create Your\nDream GF',
    subtitle: 'Shape every detail, chat instantly',
    cta: 'Try Premium',
    ctaHref: '/app/premium',
    bg: 'from-[#0f1a2e] via-[#0a2d54] to-[#0f0e0f]',
    accent: '#18A8FF',
  },
  {
    title: '70% Off\nLimited Time',
    subtitle: 'Unlock NSFW, Photos & Videos',
    cta: 'Sign Up',
    ctaHref: '/app/premium',
    bg: 'from-[#2d1054] via-[#1a0a2e] to-[#0f0e0f]',
    accent: '#ff18a0',
  },
  {
    title: '200+ AI\nModels',
    subtitle: 'Find your perfect match today',
    cta: 'Explore',
    ctaHref: '/',
    bg: 'from-[#1a0a2e] via-[#2d1054] to-[#0f0e0f]',
    accent: '#D05BF8',
  },
  {
    title: 'Your Fantasy.\nYour Rules.',
    subtitle: 'No limits, no judgment',
    cta: 'Join Free',
    ctaHref: '/app/premium',
    bg: 'from-[#0f1a2e] via-[#1a0a2e] to-[#0f0e0f]',
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
      {/* ======== TOP ROW: LEFT 2/3 BANNER + RIGHT 1/3 LIVE MODELS ======== */}
      <section className="relative overflow-hidden">
        <div className="flex">
          {/* LEFT: Hero Banner (2/3 width, height reduced 1/3) */}
          <div
            className={`relative flex-1 h-[220px] desktop:h-[260px] bg-gradient-to-br ${banner.bg} flex items-center px-8 desktop:px-12 overflow-hidden rounded-none`}
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
          </div>

          {/* RIGHT: Live Models (1/3 width) */}
          {liveChars.length > 0 && (
            <div className="w-[340px] shrink-0 border-l border-white/[5%] bg-white/[2%] flex flex-col justify-center px-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="live-badge"><span className="size-1.5 rounded-full bg-white" /> LIVE</span>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {liveChars.slice(0, 6).map(char => (
                  <Link
                    key={char.id}
                    to={`/chat/${char.username}?live`}
                    className="relative shrink-0 group flex flex-col items-center gap-1"
                  >
                    <div className="size-14 rounded-full overflow-hidden ring-2 ring-gl-pink" style={{ boxShadow: '0 0 10px rgba(208,91,248,0.4)' }}>
                      <img
                        src={char.avatar}
                        alt={char.name}
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).src = '' }}
                      />
                    </div>
                    <span className="text-[10px] text-white/60 text-center truncate w-14">{char.name}</span>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[9px] font-bold bg-red-500 text-white rounded-full animate-pulse">
                      LIVE
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

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

      {/* ======== STATS BAR ======== */}
      <section className="mx-8 desktop:mx-12 mt-12 mb-8 grid grid-cols-2 desktop:grid-cols-4 gap-4">
        {[
          { value: '20M+', label: 'Monthly Messages' },
          { value: '8200+', label: 'AI Models' },
          { value: '3M+', label: 'Monthly Visits' },
          { value: '70%', label: 'Off Limited' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/[3%] border border-white/[5%] rounded-2xl p-5 text-center">
            <div className="text-2xl desktop:text-3xl font-bold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] bg-clip-text text-transparent">{stat.value}</div>
            <div className="text-white/40 text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ======== PREMIUM CTA BLOCK ======== */}
      <section className="mx-8 desktop:mx-12 mb-10 bg-gradient-to-br from-[#1a0a2e] via-[#2d1054] to-[#1a0a2e] rounded-3xl p-8 desktop:p-10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-[#d05bf8] -right-48 -top-24" />
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-white/[8%] rounded-full px-4 py-1.5 text-xs font-semibold text-white mb-5">
            <span className="size-2 rounded-full bg-red-400 animate-pulse" />
            Limited offer
          </div>
          <h2 className="text-2xl desktop:text-3xl font-bold text-white mb-3">Sign up and get Extra bonus</h2>
          <p className="text-white/50 text-sm mb-8">Unlock Best AI Girlfriends — NSFW, Photos, Videos & more</p>
          {/* Benefits */}
          <div className="grid grid-cols-1 gap-3 mb-8 text-left">
            {[
              { icon: '⭐', text: 'Welcome Stars Bonus' },
              { icon: '🎥', text: 'Unlimited Video & Photo content' },
              { icon: '🔥', text: 'AI Girlfriend NSFW Mode Unlocked' },
              { icon: '💬', text: 'Chat with 350+ AI girls for Free' },
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[4%] rounded-xl px-4 py-3">
                <span className="text-lg">{benefit.icon}</span>
                <span className="text-white text-sm">{benefit.text}</span>
                <Check size={14} className="ml-auto text-gl-pink shrink-0" />
              </div>
            ))}
          </div>
          <Link
            to="/app/premium"
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-bold py-4 rounded-full hover:opacity-90 transition-all text-sm"
          >
            Claim 70% Off
          </Link>
        </div>
      </section>

      {/* ======== HOW IT WORKS / FEATURES ======== */}
      <section className="mx-8 desktop:mx-12 mb-10">
        <h2 className="text-xl font-bold text-white text-center mb-8">The Best AI Girlfriend App</h2>
        <p className="text-white/50 text-sm text-center max-w-2xl mx-auto mb-8">
          Tired of endless swiping? GoLove AI gives you a Free AI Girlfriend who stays by your side whenever you need her. Deep conversations, playful flirting, or hotter moments — she reacts to your mood instantly.
        </p>
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
          {[
            {
              step: '01',
              title: 'Register quickly',
              desc: 'Sign up instantly — no card required. Be chatting in under 20 seconds.',
              color: '#D05BF8',
            },
            {
              step: '02',
              title: 'Select or build your AI GF',
              desc: 'Choose from 8200+ AI Girlfriends or create one from scratch with the full customizer.',
              color: '#18A8FF',
            },
            {
              step: '03',
              title: 'Chat with emotion & personality',
              desc: 'She remembers your jokes, your bad days, your favorite songs. She grows closer with every message.',
              color: '#ff18a0',
            },
            {
              step: '04',
              title: 'Get Pictures & Videos made for you',
              desc: 'Request AI Girlfriend photos and videos tailored to your fantasy. NSFW mode unlocks everything.',
              color: '#d05bf8',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white/[3%] border border-white/[5%] rounded-2xl p-6 flex gap-4">
              <div
                className="size-12 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0"
                style={{ background: `${item.color}20`, color: item.color }}
              >
                {item.step}
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Why thousands pick GoLove AI */}
        <div className="mt-6 bg-white/[2%] border border-white/[5%] rounded-2xl p-6">
          <h3 className="text-white font-semibold text-sm mb-4">Why Thousands Pick GoLove AI</h3>
          <div className="grid grid-cols-1 gap-2">
            {[
              'Holds romantic chats that feel completely natural',
              'Switches between sweet, flirty, or passionate tones exactly when you want',
              'Stays available 24/7 without ever ghosting',
              'Never judges anything you say — complete freedom',
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-2 text-white/60 text-xs">
                <Check size={12} className="text-gl-pink shrink-0" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ BLOCK ======== */}
      <section className="mx-8 desktop:mx-12 mb-12">
        <h2 className="text-xl font-bold text-white text-center mb-6">FAQ</h2>
        <div className="max-w-2xl mx-auto flex flex-col gap-2">
          {[
            {
              q: 'What is an AI Girlfriend?',
              a: 'An AI Girlfriend is a virtual companion powered by advanced AI that feels like a real romantic partner. She chats, remembers your stories, sends pictures and voice messages, and responds with real emotion.',
            },
            {
              q: 'Is the basic AI GF Chat free?',
              a: 'Yes — after free registration, regular text chats, emotional conversations, relationship memory, voice messages, and safe-for-work pictures are completely free and unlimited.',
            },
            {
              q: 'What about NSFW content?',
              a: 'Uncensored talks, spicy role-play, and adult images require a paid subscription. Sweet and romantic chats stay 100% free forever.',
            },
            {
              q: 'Will my AI Girlfriend remember our conversations?',
              a: 'Yes. Once registered, she remembers every detail permanently — your jokes, preferences, and the whole relationship history.',
            },
            {
              q: 'Can I create my own AI Girlfriend?',
              a: 'Yes! Use our full custom creator to design her appearance, personality, voice, and backstory from scratch.',
            },
          ].map((faq, i) => (
            <details key={i} className="bg-white/[3%] border border-white/[5%] rounded-xl group">
              <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none text-white text-sm font-medium hover:text-gl-pink transition-colors">
                {faq.q}
                <ChevronRight size={16} className="shrink-0 text-white/30 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-5 pb-4 text-white/50 text-xs leading-relaxed border-t border-white/[5%] pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}