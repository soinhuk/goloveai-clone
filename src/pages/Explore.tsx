import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search, Play, Heart, MessageCircle, Users, Star, Flame, Sparkles, Crown } from 'lucide-react'
import { characters } from '../data/characters'
import { Character } from '../types'

// 3个分类
type Category = 'girls' | 'anime' | 'male'

const CATEGORIES: { key: Category; label: string; icon: React.ReactNode }[] = [
  { key: 'girls', label: 'Girls', icon: <Flame size={14} /> },
  { key: 'anime', label: 'Anime', icon: <Sparkles size={14} /> },
  { key: 'male', label: 'Male', icon: <Crown size={14} /> },
]

const LIVE_COLORS = ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44AFF', '#6BFFB8', '#6B9DFF']

export default function Explore() {
  const [category, setCategory] = useState<Category>('girls')
  const [searchQuery, setSearchQuery] = useState('')
  const liveRef = useRef<HTMLDivElement>(null)
  
  // 分类筛选角色
  const filteredByCategory = characters.filter(c => {
    if (category === 'girls') return c.type === 'realistic' && c.gender !== 'Male'
    if (category === 'anime') return c.type === 'anime'
    if (category === 'male') return c.type === 'realistic' && c.gender === 'Male'
    return true
  })
  
  // Live角色
  const liveChars = characters.filter(c => c.isLive)
  
  // 搜索筛选
  const searchedChars = filteredByCategory.filter(c => {
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })
  
  const scrollLive = (d: 'l' | 'r') => liveRef.current?.scrollBy({ left: d === 'l' ? -260 : 260, behavior: 'smooth' })
  
  // 获取角色互动数（模拟）
  const getInteractions = (char: Character) => {
    const seed = (char.name.charCodeAt(0) + char.id) % 1000000
    if (seed > 1000) return `${(seed / 1000).toFixed(1)}B`
    return `${seed}M`
  }
  
  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-8">
      {/* ====== 顶部导航（3个分类按钮）====== */}
      <div className="sticky top-0 z-30 bg-[#0F0E0F]/95 backdrop-blur-md border-b border-white/[6%]">
        <div className="flex items-center justify-center gap-2 px-4 py-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all ${
                category === cat.key
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg shadow-[#d05bf8]/25'
                  : 'bg-white/[5%] text-white/50 hover:bg-white/[8%]'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* ====== HERO 区域 ====== */}
      <section className="relative overflow-hidden px-4 py-8">
        <div className="relative max-w-3xl mx-auto text-center">
          {/* 背景光效 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full blur-[120px] bg-gradient-to-r from-[#d05bf8]/30 to-[#ff18a0]/30" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl desktop:text-5xl font-bold tracking-tight">
              Your Perfect <span className="bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] bg-clip-text text-transparent">AI Companion</span>
            </h1>
            <p className="mt-3 text-white/50 text-[15px] desktop:text-[17px] max-w-xl mx-auto leading-relaxed">
              Design your dream companion—no limits, no filters. Shape her face, body, voice & wild personality exactly how you imagine. Uncensored Chat, Sexy Voice & Sizzling Visual! 🔥
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link 
                to="/create"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-bold text-[14px] shadow-lg shadow-[#d05bf8]/30 hover:shadow-[#d05bf8]/50 transition-all"
              >
                <Sparkles size={16} />
                CREATE YOUR AI COMPANION
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* ====== 火辣女孩现场直播（Live Cam） ====== */}
      {liveChars.length > 0 && (
        <section className="px-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Flame size={18} className="text-[#ff6b6b]" />
            <h2 className="text-[16px] font-bold">Hot Girls LIVE</h2>
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-red-500 rounded-full animate-pulse">
              <span className="size-1.5 rounded-full bg-white" />
              LIVE
            </span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => scrollLive('l')}
              className="absolute left-0 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-black/60 text-white z-10 hover:bg-black/80"
            >
              <ChevronLeft size={18} />
            </button>
            
            <div ref={liveRef} className="flex gap-3 overflow-x-auto no-scrollbar pl-9 pr-9">
              {liveChars.map((char, idx) => (
                <Link 
                  key={char.id} 
                  to={`/chat/${char.username}`}
                  className="shrink-0 group"
                >
                  <div className="relative w-[160px] h-[200px] rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#d05bf8]/50 transition-all">
                    <img 
                      src={char.avatar} 
                      alt={char.name} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" 
                    />
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* LIVE 标签 */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold bg-red-500 rounded-full animate-pulse flex items-center gap-1">
                      <span className="size-1 rounded-full bg-white" />
                      LIVE
                    </div>
                    
                    {/* 用户信息 */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center gap-1">
                        <span className="text-[13px] font-bold">{char.name}</span>
                        <span className="text-[11px] text-white/50">({char.age || '22'})</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {LIVE_COLORS.map((color, i) => (
                          <span key={i} className="size-1.5 rounded-full" style={{ background: color }} />
                        ))}
                        <span className="text-[10px] text-white/40 ml-1">watching</span>
                      </div>
                    </div>
                    
                    {/* 播放按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play size={20} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <button 
              onClick={() => scrollLive('r')}
              className="absolute right-0 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-full bg-black/60 text-white z-10 hover:bg-black/80"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      )}
      
      {/* ====== 搜索 ====== */}
      <div className="px-4 mb-4">
        <div className="relative max-w-md mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            placeholder={`Search ${category === 'girls' ? 'girls' : category === 'anime' ? 'anime' : 'male'} companions...`}
            className="w-full bg-white/[4%] border border-white/[8%] rounded-2xl py-3.5 pl-11 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all"
          />
        </div>
      </div>
      
      {/* ====== 角色探索列表 ====== */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold flex items-center gap-2">
            <Users size={18} className="text-[#d05bf8]" />
            Explore Companions
            <span className="text-[12px] text-white/40 font-normal">({searchedChars.length})</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 desktop:grid-cols-3 desktop-lg:grid-cols-4 gap-3">
          {searchedChars.slice(0, 24).map((char, idx) => {
            const interactions = getInteractions(char)
            return (
              <Link 
                key={char.id} 
                to={`/chat/${char.username}`}
                className="group relative rounded-2xl overflow-hidden bg-[#181718] border border-white/[6%] hover:border-[#d05bf8]/30 transition-all"
              >
                {/* 头像 */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={char.avatar} 
                    alt={char.name} 
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* 标签 */}
                  {char.isLive && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold bg-red-500 rounded-full animate-pulse flex items-center gap-1">
                      <span className="size-1 rounded-full bg-white" />
                      LIVE
                    </div>
                  )}
                  
                  {/* 互动按钮 */}
                  <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                      className="size-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Heart size={14} className="text-white" />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                      className="size-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <MessageCircle size={14} className="text-white" />
                    </button>
                  </div>
                </div>
                
                {/* 信息 */}
                <div className="p-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] font-semibold truncate">{char.name}</span>
                    <span className="text-[11px] text-white/40">{char.age || '22'}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center gap-1 text-[11px] text-white/40">
                      <MessageCircle size={11} />
                      {interactions > 1 ? `${interactions.toFixed(1)}B` : `${(interactions * 1000).toFixed(0)}M`}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-yellow-400">
                      <Star size={11} fill="currentColor" />
                      4.{8 + (char.id % 3)}
                    </div>
                  </div>
                  {/* 描述 */}
                  {char.description && (
                    <p className="mt-2 text-[11px] text-white/40 line-clamp-2">{char.description}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
        
        {searchedChars.length === 0 && (
          <div className="text-center py-12">
            <div className="size-16 rounded-full bg-white/[5%] flex items-center justify-center mx-auto mb-3">
              <Search size={24} className="text-white/30" />
            </div>
            <p className="text-white/40 text-[14px]">No companions found</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-2 text-[#d05bf8] text-[13px] hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
        
        {/* Load More */}
        {searchedChars.length > 24 && (
          <div className="mt-6 text-center">
            <button className="px-6 py-3 rounded-2xl bg-white/[5%] text-white/60 text-[13px] font-medium hover:bg-white/[8%] transition-colors">
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  )
}