import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Smile, Image as ImageIcon, Search, ChevronRight, ChevronLeft, X, MonitorPlay, Pencil, Gift, Sparkles, ChevronDown, MessageCircle, Heart, Star, Flame, Wand2, Filter, Crown, Music, MapPin, Clock, Eye } from 'lucide-react'
import { characters } from '../data/characters'

const GIFTS = [
  { icon: '🌹', name: '玫瑰', cost: 99, reward: '解锁一张性感自拍', rewardType: 'photo' },
  { icon: '💎', name: '钻石', cost: 199, reward: '解锁性感内衣写真', rewardType: 'photo' },
  { icon: '👗', name: '晚礼服', cost: 249, reward: '解锁晚礼服实时镜头', rewardType: 'video' },
  { icon: '👑', name: '皇冠', cost: 399, reward: '解锁专属角色扮演', rewardType: 'photo' },
  { icon: '💍', name: '戒指', cost: 599, reward: '解锁亲密语音消息', rewardType: 'voice' },
  { icon: '🏖️', name: '度假', cost: 799, reward: '解锁泳装实时镜头', rewardType: 'video' },
  { icon: '🥂', name: '香槟', cost: 999, reward: '解锁私人定制内容', rewardType: 'video' },
  { icon: '✨', name: '梦幻', cost: 1299, reward: '解锁全部私密内容', rewardType: 'all' },
]

const INPUT_SUGGESTIONS = {
  text: [
    { icon: '👀', text: '给我看看' },
    { icon: '📩', text: '发给我' },
    { icon: '🙏', text: '我能看看吗' },
    { icon: '💋', text: '亲一个' },
    { icon: '😘', text: '想你了' },
    { icon: '💕', text: '抱抱我' },
  ],
  video: [
    { icon: '🎬', text: '给我发视频' },
    { icon: '📹', text: '发给我视频' },
    { icon: '✨', text: '来个实时镜头' },
    { icon: '🎥', text: '给我看看你在干嘛' },
  ],
  hot: [
    { icon: '🔥', text: '给我看看私处' },
    { icon: '🍑', text: '给我看看臀部' },
    { icon: '💋', text: '给我看看胸部' },
    { icon: '😈', text: '脱掉衣服' },
    { icon: '🥵', text: '做给我看' },
    { icon: '💦', text: '让我看看你有多湿' },
  ],
}


export default function Chat() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)
  const [showDetails, setShowDetails] = useState(true)
  const [showQuickQuestions, setShowQuickQuestions] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [unlockedContent, setUnlockedContent] = useState<string[]>([])
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null)
  const [customName, setCustomName] = useState<string>('')
  const [isEditingName, setIsEditingName] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const char = characters.find(c => c.username === username || c.id === username)
  if (!char) return <div className="flex items-center justify-center h-screen bg-[#0a0a0f] text-white/40 text-lg">Character not found</div>

  const videoAvatar = char.avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')
  const nsfwAvatar = char.avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')
  // Only live models have actual video avatars
  const hasLiveVideo = char.isLive && !!videoAvatar
  const displayName = customName || char.name
  // Gallery: only unique images, no duplicates with main photo
  const baseGallery = [char.avatar, nsfwAvatar].filter(Boolean)
  const uniqueGallery = [...new Set(baseGallery)]
  // Combined gallery: base + gift-unlocked content
  const galleryImages = [...uniqueGallery, ...unlockedContent.filter(c => c.startsWith('photo:')).map(c => c.replace('photo:', ''))]

  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai' as const, text: char.greeting || `I love it when a conversation starts with something interesting... so, where do we begin? 😈`, time: '2:09 PM', photos: undefined as string[] | undefined },
  ])

  const handleSend = (text?: string) => {
    const msgText = text || message.trim()
    if (!msgText) return
    const userMsg = { id: Date.now(), sender: 'user' as const, text: msgText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setShowQuickQuestions(false)
    setShowGifts(false)
    setIsTyping(true)

    // If sending a gift, add unlocked content to gallery
    if (msgText.includes('💎')) {
      // Photo gifts add photos, video gifts add videos
      if (msgText.includes('实时镜头') || msgText.includes('泳装') || msgText.includes('定制')) {
        if (hasLiveVideo) setUnlockedContent(prev => [...prev, `video:${videoAvatar}`])
      } else {
        const rewardPhoto = nsfwAvatar || char.avatar
        setUnlockedContent(prev => [...prev, `photo:${rewardPhoto}`])
      }
    }
    setTimeout(() => {
      const replies = [
        "Mmm, I like where this is going... tell me more 😘",
        "You're so sweet! What else is on your mind? 💕",
        "Oh really? That's interesting... I want to know more about you 😊",
        "Haha, you're funny! Keep talking to me 💋",
        "I love that! You have great taste 😉",
        "Mmm, you're making me blush... 😳🔥",
        "I've been waiting for someone like you 💖",
        "That's so hot... don't stop 🔥😈",
        "You really know how to make a girl smile 🥰",
        "I wish you were here right now... 💫",
      ]
      const aiMsg = { id: Date.now() + 1, sender: 'ai' as const, text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  // Close dropdowns on outside click
  useEffect(() => {
    if (!showQuickQuestions && !showGifts) return
    const handleClose = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Don't close if clicking inside dropdown or the toggle buttons
      if (target.closest('[data-dropdown]') || target.closest('[data-dropdown-toggle]')) return
      setShowQuickQuestions(false)
      setShowGifts(false)
    }
    // Use setTimeout to avoid immediate trigger from the current click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClose)
    }, 10)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClose)
    }
  }, [showQuickQuestions, showGifts])

  const otherChars = characters.filter(c => c.id !== char.id).slice(0, 12)

  return (
    <div className="flex h-[calc(100dvh-32px)] bg-[#0a0a0f]">
      {/* ═══════ LEFT PANEL ═══════ */}
      <div className="w-[300px] shrink-0 border-r border-white/[4%] flex flex-col bg-[#0d0d14]">
        <div className="p-4 pb-3">
          <div className="relative group">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-[#d05bf8] transition-colors" />
            <input type="text" placeholder="搜索对话..." className="w-full bg-white/[3%] border border-white/[5%] rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#d05bf8]/30 focus:bg-white/[4%] focus:shadow-[0_0_15px_rgba(208,91,248,0.1)] transition-all" />
          </div>
        </div>

        <div className="px-4 pb-2">
          <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">活跃对话</span>
        </div>
        <div className="px-3 pb-2">
          <Link to={`/chat/${char.username}`} className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-gradient-to-r from-[#d05bf8]/[0.08] to-[#ff18a0]/[0.05] border border-[#d05bf8]/10 hover:border-[#d05bf8]/20 transition-all">
            <div className="relative shrink-0">
              <div className="size-12 rounded-full overflow-hidden ring-2 ring-[#d05bf8]/30 shadow-[0_0_12px_rgba(208,91,248,0.2)]">
                <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              </div>
              {char.isOnline && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-400 border-2 border-[#0d0d14] shadow-[0_0_6px_rgba(52,211,153,0.5)]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-bold text-white">{char.name}</span>
                <span className="text-[11px] text-white/25">2:09 PM</span>
              </div>
              <p className="text-xs text-white/35 truncate leading-relaxed">{char.bio}</p>
            </div>
            <button className="shrink-0 p-1.5 rounded-lg hover:bg-white/[4%] transition-all"><MoreHorizontal size={14} className="text-white/20" /></button>
          </Link>
        </div>

        <div className="px-4 pt-3 pb-2">
          <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">推荐对话</span>
        </div>
        <div className="flex-1 overflow-y-auto px-3 space-y-0.5 scrollbar-hide">
          {otherChars.map(c => (
            <Link key={c.id} to={`/chat/${c.username}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[3%] transition-all group">
              <div className="relative shrink-0">
                <div className="size-11 rounded-full overflow-hidden group-hover:ring-2 group-hover:ring-[#d05bf8]/20 transition-all">
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                </div>
                {c.isOnline && <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 border-2 border-[#0d0d14]" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-white/60 group-hover:text-white/80 transition-colors">{c.name}, {c.age}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ═══════ CENTER PANEL ═══════ */}
      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Dreamy Background */}
        {hasLiveVideo && (
          <video src={videoAvatar} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.08] blur-[30px] z-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d05bf8]/[0.02] via-transparent to-[#ff18a0]/[0.02] z-0 pointer-events-none" />

        {/* Header */}
        <header className="relative z-10 flex items-center gap-3 px-5 py-3 border-b border-white/[4%] bg-[#0a0a0f]/90 backdrop-blur-2xl">
          <button onClick={() => navigate('/app/chats')} className="flex items-center justify-center size-10 rounded-full hover:bg-white/[5%] transition-all">
            <ArrowLeft size={22} className="text-white/60" />
          </button>
          <Link to={`/chat/${char.username}`} className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative shrink-0">
              <div className="size-12 rounded-full overflow-hidden ring-2 ring-[#d05bf8]/25 shadow-[0_0_12px_rgba(208,91,248,0.2)]">
                <img src={char.avatar} alt={displayName} className="w-full h-full object-cover" />
              </div>
              {char.isOnline && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-400 border-2 border-[#0a0a0f] shadow-[0_0_8px_rgba(52,211,153,0.6)]" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <input ref={nameInputRef} type="text" value={customName || char.name}
                    onChange={e => setCustomName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={e => { if (e.key === 'Enter') setIsEditingName(false) }}
                    className="text-[18px] font-bold text-white bg-transparent border-b border-[#d05bf8]/40 outline-none w-[120px] py-0.5" autoFocus />
                ) : (
                  <h1 className="text-[18px] font-bold text-white leading-tight truncate">{displayName}</h1>
                )}
                <button onClick={() => { setIsEditingName(true); setTimeout(() => nameInputRef.current?.focus(), 50) }}
                  className="p-1.5 rounded-lg hover:bg-white/[6%] transition-all" title="编辑名字">
                  <Pencil size={13} className="text-white/30 hover:text-[#d05bf8]" />
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
                <span className="text-xs text-white/40">在线</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center justify-center size-11 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 transition-all border border-emerald-500/10" title="语音通话">
              <Phone size={20} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
            </button>
            <div className="relative">
              <button className="flex items-center justify-center size-11 rounded-full bg-[#d05bf8]/10 hover:bg-[#d05bf8]/20 transition-all border border-[#d05bf8]/15" title="视频通话">
                <Video size={20} className="text-[#d05bf8] drop-shadow-[0_0_8px_rgba(208,91,248,0.4)]" />
              </button>
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[7px] font-bold bg-gradient-to-r from-[#ff18a0] to-[#d05bf8] text-white rounded-full leading-none shadow-[0_0_10px_rgba(255,24,160,0.5)]">NEW</span>
            </div>
            <button className="flex items-center justify-center size-11 rounded-full hover:bg-white/[6%] transition-all border border-white/[5%]"><MoreHorizontal size={20} className="text-white/45" /></button>
            <button className="flex items-center justify-center size-11 rounded-full hover:bg-white/[6%] transition-all border border-white/[5%]"><Filter size={18} className="text-white/45" /></button>
            <button onClick={() => setShowDetails(!showDetails)} className={`flex items-center justify-center size-11 rounded-full transition-all ${showDetails ? 'bg-[#d05bf8]/15 text-[#d05bf8] shadow-[0_0_12px_rgba(208,91,248,0.2)] border border-[#d05bf8]/20' : 'hover:bg-white/[6%] text-white/45 border border-white/[5%]'}`}>
              <ChevronRight size={20} className={`transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </header>

        {/* Hint Banner */}
        <div className="relative z-10 mx-5 mt-4 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#d05bf8]/[0.08] to-[#ff18a0]/[0.06] border border-[#d05bf8]/[0.1] shadow-[0_0_20px_rgba(208,91,248,0.05)]">
          <p className="text-[15px] text-[#d05bf8]/70 leading-relaxed">
            ✨ <span className="font-semibold text-[#d05bf8]/90">这是一个AI角色。</span> 欢迎随便聊聊任何事情！你的对话是私密且无审查的。
          </p>
        </div>

        {/* Messages */}
        <div ref={messagesRef} className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-5 scrollbar-hide">
          <div className="flex justify-center">
            <span className="px-5 py-1.5 text-[11px] text-white/20 bg-white/[3%] rounded-full border border-white/[3%]">Today</span>
          </div>

          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="shrink-0 mt-1">
                  <div className="size-9 rounded-full overflow-hidden ring-1 ring-white/10 shadow-[0_0_8px_rgba(208,91,248,0.1)]">
                    <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                <div className={`rounded-2xl px-5 py-3.5 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-[0_4px_15px_rgba(208,91,248,0.25)]'
                    : 'bg-white/[6%] text-white/85 border border-white/[5%] shadow-[0_2px_10px_rgba(0,0,0,0.2)]'
                }`}>
                  <p className="text-[16px] leading-[24px] tracking-wide">{msg.text}</p>
                </div>
                {msg.photos && (
                  <div className="flex gap-3 mt-3">
                    {msg.photos.filter(Boolean).map((photo, i) => (
                      <div key={i} className="w-[160px] h-[210px] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] ring-1 ring-white/[5%]">
                        <img src={photo} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-[10px] text-white/15 mt-1.5 px-1">{msg.time}</span>
              </div>
              {msg.sender === 'user' && (
                <div className="shrink-0 mt-1">
                  <div className="size-9 rounded-full bg-gradient-to-br from-[#d05bf8] to-[#ff18a0] flex items-center justify-center shadow-[0_2px_8px_rgba(208,91,248,0.3)]">
                    <span className="text-xs text-white font-bold">U</span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="shrink-0 mt-1">
                <div className="size-9 rounded-full overflow-hidden ring-1 ring-white/10">
                  <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="bg-white/[6%] border border-white/[5%] rounded-2xl px-5 py-4 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#d05bf8]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="size-2 rounded-full bg-[#d05bf8]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="size-2 rounded-full bg-[#d05bf8]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Sign Up CTA */}
          <div className="flex flex-col items-center gap-4 pt-6 pb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] rounded-full blur-xl opacity-30" />
              <button className="relative px-10 py-3.5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[15px] font-bold shadow-[0_4px_25px_rgba(208,91,248,0.4)] hover:shadow-[0_4px_35px_rgba(208,91,248,0.6)] hover:scale-105 transition-all">
                注册以查看更多聊天
              </button>
            </div>
            <p className="text-center text-white/25 text-[15px] leading-relaxed max-w-[340px]">
              认识一下<span className="text-white/50 font-semibold">{char.name}</span>，一个毫无过滤的AI女友。<br /><span className="bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] bg-clip-text text-transparent font-semibold">敢问什么吗？</span>
            </p>
          </div>
        </div>

        {/* Quick Reply Suggestions */}
        <div className="relative z-10 px-5 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {INPUT_SUGGESTIONS.text.map((s, i) => (
              <button key={i} onClick={() => handleSend(s.text)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/[6%] bg-white/[3%] text-[13px] text-white/45 hover:bg-gradient-to-r hover:from-[#d05bf8]/10 hover:to-[#ff18a0]/10 hover:text-white/70 hover:border-[#d05bf8]/20 transition-all whitespace-nowrap hover:shadow-[0_0_10px_rgba(208,91,248,0.1)]">
                <span>{s.icon}</span> {s.text}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <div className="relative z-10 px-5 pb-3">
          <button className="w-full py-3 rounded-full border border-[#FF18A0]/20 bg-gradient-to-r from-[#FF18A0]/5 to-[#d05bf8]/5 text-[#FF18A0] text-[15px] font-medium hover:from-[#FF18A0]/10 hover:to-[#d05bf8]/10 hover:border-[#FF18A0]/30 hover:shadow-[0_0_15px_rgba(255,24,160,0.1)] transition-all flex items-center justify-center gap-2">
            <ImageIcon size={16} />
            给我发些辣味照片
          </button>
        </div>

        {/* Input Area */}
        <div className="relative z-10 border-t border-white/[4%] bg-[#0a0a0f]/90 backdrop-blur-2xl">
          {/* Dropdowns */}
          {showQuickQuestions && (
            <div data-dropdown className="absolute bottom-full left-0 mb-2 w-full bg-[#13131a]/95 backdrop-blur-2xl border border-white/[8%] rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-20">
              <div className="p-3 space-y-3">
                {/* Section 1: Text suggestions */}
                <div>
                  <div className="flex items-center gap-2 px-2 pb-2">
                    <span className="text-xs">💬</span>
                    <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider">文字互动</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {INPUT_SUGGESTIONS.text.map((s, i) => (
                      <button key={i} onClick={() => { handleSend(s.text); setShowQuickQuestions(false); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/[6%] bg-white/[3%] text-[13px] text-white/50 hover:bg-[#d05bf8]/10 hover:text-white/80 hover:border-[#d05bf8]/20 transition-all">
                        <span className="text-sm">{s.icon}</span> {s.text}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Section 2: Video suggestions */}
                <div>
                  <div className="flex items-center gap-2 px-2 pb-2">
                    <span className="text-xs">📹</span>
                    <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider">视频互动</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded-full">实时镜头</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {INPUT_SUGGESTIONS.video.map((s, i) => (
                      <button key={i} onClick={() => { handleSend(s.text); setShowQuickQuestions(false); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-[#d05bf8]/10 bg-[#d05bf8]/[3%] text-[13px] text-[#d05bf8]/60 hover:bg-[#d05bf8]/10 hover:text-[#d05bf8] hover:border-[#d05bf8]/25 transition-all">
                        <span className="text-sm">{s.icon}</span> {s.text}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Section 3: Hot topics */}
                <div>
                  <div className="flex items-center gap-2 px-2 pb-2">
                    <span className="text-xs">🔥</span>
                    <span className="text-[11px] font-bold text-red-400/50 uppercase tracking-wider">热门私密话题</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {INPUT_SUGGESTIONS.hot.map((s, i) => (
                      <button key={i} onClick={() => { handleSend(s.text); setShowQuickQuestions(false); }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-red-500/10 bg-red-500/[3%] text-[13px] text-red-400/50 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/25 transition-all">
                        <span className="text-sm">{s.icon}</span> {s.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {showGifts && (
            <div data-dropdown className="absolute bottom-full right-0 mb-2 w-[380px] bg-[#13131a]/95 backdrop-blur-2xl border border-white/[8%] rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-20">
              <div className="px-5 py-3.5 border-b border-white/[5%] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift size={14} className="text-[#d05bf8]" />
                  <span className="text-sm font-bold text-white/60">发送礼物解锁内容</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 text-[#d05bf8] rounded-full font-medium">✨ 实时镜头</span>
              </div>
              <div className="p-3 grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto scrollbar-hide">
                {GIFTS.map((gift, i) => (
                  <button
                    key={i}
                    onClick={() => { handleSend(`送你${gift.cost}💎 ${gift.name}！`); setShowGifts(false); }}
                    className="flex flex-col p-3 rounded-xl border border-white/[5%] bg-white/[2%] hover:bg-[#d05bf8]/[5%] hover:border-[#d05bf8]/15 transition-all text-left group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-2xl">{gift.icon}</span>
                      <div className="flex-1">
                        <span className="text-[13px] font-semibold text-white/70 group-hover:text-white/90 transition-colors">{gift.name}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] font-bold text-[#d05bf8]">{gift.cost} 💎</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/[3%]">
                      <span className="text-[10px]">{gift.rewardType === 'photo' ? '📸' : gift.rewardType === 'video' ? '🎬' : gift.rewardType === 'voice' ? '🎤' : '🎁'}</span>
                      <span className="text-[11px] text-white/40">{gift.reward}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-end gap-2 px-5 py-3.5">
            <button data-dropdown-toggle
              onClick={() => { setShowQuickQuestions(!showQuickQuestions); setShowGifts(false); }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[3%] hover:bg-white/[5%] border border-white/[5%] hover:border-[#d05bf8]/20 text-white/45 text-[15px] transition-all shrink-0"
            >
              <MessageCircle size={16} />
              <span>提问</span>
              <ChevronDown size={12} />
            </button>

            <button className="flex items-center justify-center size-10 rounded-full hover:bg-white/[5%] transition-all shrink-0">
              <Smile size={20} className="text-white/30" />
            </button>

            <div className="flex-1">
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder={`给 ${char.name} 发消息...`}
                rows={1}
                className="w-full bg-white/[3%] border border-white/[5%] rounded-2xl py-3 px-5 text-[16px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#d05bf8]/25 focus:bg-white/[4%] focus:shadow-[0_0_15px_rgba(208,91,248,0.08)] transition-all resize-none min-h-[46px] max-h-[120px]"
              />
            </div>

            <button data-dropdown-toggle
              onClick={() => { setShowGifts(!showGifts); setShowQuickQuestions(false); }}
              className="relative flex items-center justify-center size-10 rounded-full bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 border border-[#d05bf8]/20 hover:border-[#d05bf8]/40 hover:shadow-[0_0_20px_rgba(208,91,248,0.2)] transition-all shrink-0 group"
            >
              <Gift size={18} className="text-[#d05bf8] group-hover:text-[#e87bff] transition-colors" />
              <Sparkles size={8} className="absolute -top-0.5 -right-0.5 text-[#ff18a0] animate-pulse" />
            </button>

            <button
              onClick={() => handleSend()}
              disabled={!message.trim()}
              className={`flex items-center justify-center size-10 rounded-full transition-all shrink-0 ${
                message.trim()
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-[0_4px_15px_rgba(208,91,248,0.35)] hover:shadow-[0_4px_25px_rgba(208,91,248,0.5)] hover:scale-105'
                  : 'bg-white/[3%] text-white/10'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ RIGHT PANEL ═══════ */}
      {showDetails && (
        <div className="w-[330px] shrink-0 border-l border-white/[4%] flex flex-col bg-[#0d0d14] overflow-y-auto scrollbar-hide">
          {/* Close - hidden title */}
          <div className="flex items-center justify-end px-5 pt-4 pb-1">
            <button onClick={() => setShowDetails(false)} className="size-8 rounded-full hover:bg-white/[5%] flex items-center justify-center">
              <X size={16} className="text-white/30" />
            </button>
          </div>

          {/* Main Photo - SINGLE IMAGE, clickable */}
          <div className="px-5 pb-4">
            <div onClick={() => setLightboxImage(nsfwAvatar || char.avatar)} className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer group">
              <img src={nsfwAvatar || char.avatar} alt={displayName} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ImageIcon size={28} className="text-white/60 drop-shadow-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Character Self-Introduction - ABOVE call buttons */}
          <div className="px-5 pb-4">
            <div className="p-4 rounded-2xl bg-[#1a1a24] border border-white/[5%]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">💬</span>
                <span className="text-xs font-bold text-white/40">{char.name}的个人简介</span>
              </div>
              <p className="text-[13px] text-white/55 leading-relaxed">
                {char.name}是一个{char.personality?.split(',')[0]?.trim()?.toLowerCase() || '迷人'}的灵魂。
                {char.occupation ? ` 她是一位${char.occupation}，` : ''}
                {char.bio}
                {char.fantasy ? ` 在她的幻想中，${char.fantasy.toLowerCase()}。` : ''}
                {char.greeting ? ` 她想对你说：「${char.greeting}」` : ''}
              </p>
            </div>
          </div>

          {/* Action Buttons - Dreamy */}
          <div className="px-5 pb-3 flex gap-2">
            <button className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 text-emerald-300 text-sm font-bold flex items-center justify-center gap-2 hover:from-emerald-500/25 hover:to-emerald-400/20 transition-all border border-emerald-500/15 shadow-[0_0_12px_rgba(52,211,153,0.1)] hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]">
              <Phone size={16} className="drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]" /> 给我打电话
            </button>
            <button className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#d05bf8]/15 to-[#ff18a0]/10 text-[#d05bf8] text-sm font-bold flex items-center justify-center gap-2 hover:from-[#d05bf8]/25 hover:to-[#ff18a0]/20 transition-all border border-[#d05bf8]/15 shadow-[0_0_12px_rgba(208,91,248,0.1)] hover:shadow-[0_0_20px_rgba(208,91,248,0.2)]">
              <Video size={16} className="drop-shadow-[0_0_4px_rgba(208,91,248,0.5)]" /> 视频通话
            </button>
          </div>

          {/* Generate + Voice - Dreamy */}
          <div className="px-5 pb-3 flex gap-2">
            <Link to="/generate" className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#d05bf8]/10 to-[#ff18a0]/10 border border-[#d05bf8]/15 text-sm font-bold text-[#d05bf8] hover:from-[#d05bf8]/20 hover:to-[#ff18a0]/15 transition-all flex items-center justify-center gap-2 shadow-[0_0_8px_rgba(208,91,248,0.08)]">
              <ImageIcon size={16} className="drop-shadow-[0_0_4px_rgba(208,91,248,0.4)]" /> 生成媒体
            </Link>
            <button className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#ff18a0]/10 to-[#d05bf8]/10 border border-[#ff18a0]/15 text-sm font-bold text-[#ff18a0] hover:from-[#ff18a0]/20 hover:to-[#d05bf8]/15 transition-all flex items-center justify-center gap-2 shadow-[0_0_8px_rgba(255,24,160,0.08)]">
              <Music size={16} className="drop-shadow-[0_0_4px_rgba(255,24,160,0.4)]" /> 语音预览
            </button>
          </div>

          {/* About Her */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={15} className="text-[#ff18a0]" />
              <h3 className="text-[15px] font-bold text-white/90">她是什么样的？</h3>
            </div>
            <div className="space-y-0">
              {[
                ['💗', '性格', char.personality || char.tags.join(', ')],
                ['💼', '职业', char.occupation || '—'],
                ['🎯', '爱好', char.hobbies?.join(', ') || '—'],
                ['💕', '关系', char.relationship || '—'],
                ['✨', '幻想', char.fantasy || '—'],
                ['🎂', '年龄', `${char.age || '—'}`],
                ['🟢', '状态', char.isOnline ? '在线' : '离线'],
                ['🌐', '语言', 'English'],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex items-start justify-between py-3 border-b border-white/[4%] gap-3">
                  <span className="text-[14px] text-white/50 shrink-0 flex items-center gap-2">
                    <span className="text-sm">{icon}</span>
                    {label}
                  </span>
                  <span className="text-[14px] text-white/70 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Her Appearance */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={15} className="text-[#d05bf8]" />
              <h3 className="text-[15px] font-bold text-white/90">她的外貌</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              {[
                ['🌍', '种族', char.ethnicity || '—'],
                ['🎂', '年龄', `${char.age || '—'}`],
                ['💃', '体型', char.bodyType || '—'],
                ['👁', '眼睛', char.eyeColor || '—'],
                ['💇', '发型', char.hairStyle || '—'],
                ['🎨', '发色', char.hairColor || '—'],
                ['✨', '胸部', char.chest || '—'],
                ['🍑', '臀部', char.butt || '—'],
                ['👗', '服装', char.outfit || '—'],
                ['⭐', '特征', char.specialFeature || '—'],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[11px] text-white/40 flex items-center gap-1.5">
                    <span className="text-sm">{icon}</span>
                    {label}
                  </span>
                  <span className="text-[14px] text-white/65 mt-0.5 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery - unique images + gift-unlocked content */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon size={14} className="text-white/35" />
              <h3 className="text-[15px] font-bold text-white/90">作品集</h3>
              <span className="text-[11px] text-white/30">{galleryImages.length + unlockedContent.filter(c => c.startsWith('video:')).length} 项</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, i) => (
                <div key={`p-${i}`} onClick={() => setLightboxImage(img)} className="aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all border border-white/[5%]">
                  <img src={img} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              {unlockedContent.filter(c => c.startsWith('video:')).map((v, i) => (
                <div key={`v-${i}`} onClick={() => setLightboxVideo(v.replace('video:', ''))} className="aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all border border-white/[5%] relative">
                  <video src={v.replace('video:', '')} muted className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <MonitorPlay size={20} className="text-white/80" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Camera - only if character has live video */}
          {hasLiveVideo && (
          <div className="px-5 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <MonitorPlay size={14} className="text-[#ff18a0]" />
              <h3 className="text-sm font-bold text-white/80">实时镜头</h3>
              <span className="text-[9px] px-2 py-0.5 bg-gradient-to-r from-red-500/20 to-[#ff18a0]/20 text-red-400 rounded-full font-bold border border-red-500/10">🔴 LIVE</span>
            </div>
            <div onClick={() => setLightboxVideo(videoAvatar)} className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/[3%] border border-white/[5%] shadow-[0_4px_15px_rgba(0,0,0,0.3)] cursor-pointer group">
              <video src={videoAvatar} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                <span className="size-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] text-white font-bold">LIVE</span>
              </div>
            </div>
          </div>
          )}

        </div>
      )}

      {/* ═══════ LIGHTBOX ═══════ */}
      {(lightboxImage || lightboxVideo) && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center" onClick={() => { setLightboxImage(null); setLightboxVideo(null) }}>
          <button onClick={() => { setLightboxImage(null); setLightboxVideo(null) }} className="absolute top-5 right-5 size-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all z-10">
            <X size={24} className="text-white" />
          </button>
          {lightboxImage && (
            <img src={lightboxImage} alt="fullscreen" className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()} />
          )}
          {lightboxVideo && (
            <video src={lightboxVideo} autoPlay loop controls className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl" onClick={e => e.stopPropagation()} />
          )}
        </div>
      )}
    </div>
  )
}
