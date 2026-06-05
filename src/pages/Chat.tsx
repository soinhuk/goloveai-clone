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
  const [unlockedGallery, setUnlockedGallery] = useState<Set<number>>(new Set([0]))
  const [liveUnlocked, setLiveUnlocked] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const char = characters.find(c => c.username === username || c.id === username)
  if (!char) return <div className="flex items-center justify-center h-screen bg-[#0a0a0f] text-white/40 text-lg">Character not found</div>

  const videoAvatar = char.avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')
  const nsfwAvatar = char.avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')
  // Gallery: use avatar variants, avoid duplicating main photo (nsfwAvatar)
  const galleryImages = [char.avatar, char.avatar?.replace('_avatar.avif', '_avatar_2.avif'), char.avatar?.replace('_avatar.avif', '_avatar_3.avif'), char.avatar?.replace('_avatar.avif', '_avatar_4.avif')].filter(Boolean)

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
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowQuickQuestions(false)
        setShowGifts(false)
      }
    }
    if (showQuickQuestions || showGifts) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
        {videoAvatar && (
          <video src={videoAvatar} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.08] blur-[30px] z-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#d05bf8]/[0.02] via-transparent to-[#ff18a0]/[0.02] z-0 pointer-events-none" />

        {/* Header */}
        <header className="relative z-10 flex items-center gap-3 px-5 py-3 border-b border-white/[4%] bg-[#0a0a0f]/90 backdrop-blur-2xl">
          <button onClick={() => navigate('/app/chats')} className="flex items-center justify-center size-9 rounded-full hover:bg-white/[5%] transition-all">
            <ArrowLeft size={20} className="text-white/50" />
          </button>
          <Link to={`/chat/${char.username}`} className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative shrink-0">
              <div className="size-11 rounded-full overflow-hidden ring-2 ring-[#d05bf8]/20 shadow-[0_0_10px_rgba(208,91,248,0.15)]">
                <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              </div>
              {char.isOnline && <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0f] shadow-[0_0_6px_rgba(52,211,153,0.5)]" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-[17px] font-bold text-white leading-tight truncate">{char.name}</h1>
                <button className="p-1 rounded hover:bg-white/[5%] transition-all" title="Rename">
                  <Pencil size={11} className="text-white/20 hover:text-white/40" />
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-white/35">在线</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-emerald-500/10 transition-all" title="Voice Call">
              <Phone size={17} className="text-emerald-400/50" />
            </button>
            <div className="relative">
              <button className="flex items-center justify-center size-9 rounded-full hover:bg-[#d05bf8]/10 transition-all" title="Video Call">
                <Video size={17} className="text-[#d05bf8]/50" />
              </button>
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[7px] font-bold bg-gradient-to-r from-[#ff18a0] to-[#d05bf8] text-white rounded-full leading-none shadow-[0_0_8px_rgba(255,24,160,0.4)]">NEW</span>
            </div>
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[5%] transition-all"><MoreHorizontal size={17} className="text-white/35" /></button>
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[5%] transition-all"><Filter size={15} className="text-white/35" /></button>
            <button onClick={() => setShowDetails(!showDetails)} className={`flex items-center justify-center size-9 rounded-full transition-all ${showDetails ? 'bg-[#d05bf8]/15 text-[#d05bf8] shadow-[0_0_10px_rgba(208,91,248,0.15)]' : 'hover:bg-white/[5%] text-white/35'}`}>
              <ChevronRight size={17} className={`transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
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
        <div ref={dropdownRef} className="relative z-10 border-t border-white/[4%] bg-[#0a0a0f]/90 backdrop-blur-2xl">
          {/* Dropdowns */}
          {showQuickQuestions && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-[#13131a]/95 backdrop-blur-2xl border border-white/[8%] rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-20">
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
            <div className="absolute bottom-full right-0 mb-2 w-[380px] bg-[#13131a]/95 backdrop-blur-2xl border border-white/[8%] rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-20">
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
            <button
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

            <button
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
          {/* Close */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="flex items-center gap-2">
              <Crown size={14} className="text-[#d05bf8]" />
              <span className="text-[11px] font-bold text-white/30 uppercase tracking-widest">角色详情</span>
            </div>
            <button onClick={() => setShowDetails(false)} className="size-7 rounded-full hover:bg-white/[5%] flex items-center justify-center">
              <X size={14} className="text-white/25" />
            </button>
          </div>

          {/* Main Photo - SINGLE IMAGE */}
          <div className="px-5 pb-4">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <img src={nsfwAvatar || char.avatar} alt={char.name} className="w-full h-full object-cover" />
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

          {/* Action Buttons */}
          <div className="px-5 pb-3 flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all border border-emerald-500/10 hover:shadow-[0_0_12px_rgba(52,211,153,0.15)]">
              <Phone size={15} /> 给我打电话
            </button>
            <button className="flex-1 py-3 rounded-xl bg-[#d05bf8]/10 text-[#d05bf8] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#d05bf8]/20 transition-all border border-[#d05bf8]/10 hover:shadow-[0_0_12px_rgba(208,91,248,0.15)]">
              <Video size={15} /> 视频通话
            </button>
          </div>

          {/* Generate + Voice */}
          <div className="px-5 pb-3 flex gap-2">
            <Link to="/generate" className="flex-1 py-3 rounded-xl bg-[#1a1a24] border border-white/[5%] text-sm font-bold text-[#d05bf8] hover:border-[#d05bf8]/30 transition-all flex items-center justify-center gap-2">
              <ImageIcon size={15} /> 生成媒体
            </Link>
            <button className="flex-1 py-3 rounded-xl bg-[#1a1a24] border border-white/[5%] text-sm font-bold text-[#d05bf8] hover:border-[#d05bf8]/30 transition-all flex items-center justify-center gap-2">
              <Music size={15} /> 语音预览
            </button>
          </div>

          {/* About Her */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={14} className="text-[#ff18a0]" />
              <h3 className="text-sm font-bold text-white/80">她是什么样的？</h3>
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
                <div key={label} className="flex items-start justify-between py-2.5 border-b border-white/[3%] gap-3">
                  <span className="text-[13px] text-white/35 shrink-0 flex items-center gap-1.5">
                    <span className="text-[11px]">{icon}</span>
                    {label}
                  </span>
                  <span className="text-[13px] text-white/55 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Her Appearance */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Eye size={14} className="text-[#d05bf8]" />
              <h3 className="text-sm font-bold text-white/80">她的外貌</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
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
                  <span className="text-[10px] text-white/25 flex items-center gap-1">
                    <span className="text-[10px]">{icon}</span>
                    {label}
                  </span>
                  <span className="text-[13px] text-white/50 mt-0.5">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery - 1 free + 3 locked */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon size={14} className="text-white/35" />
              <h3 className="text-sm font-bold text-white/80">作品集</h3>
              <span className="text-[10px] text-white/25">1/{galleryImages.length} 已解锁</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, i) => {
                const isUnlocked = unlockedGallery.has(i)
                return (
                  <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all border border-white/[5%]">
                    {isUnlocked ? (
                      <img src={img} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <img src={img} alt={`gallery ${i + 1}`} className="w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col items-center justify-end pb-2" onClick={() => setUnlockedGallery(prev => new Set([...prev, i]))}>
                          <span className="text-[10px] font-bold text-[#d05bf8] bg-black/40 px-2 py-0.5 rounded-full">🔒 2 💎</span>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Live Camera - 20💎 to unlock */}
          <div className="px-5 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <MonitorPlay size={14} className="text-[#ff18a0]" />
              <h3 className="text-sm font-bold text-white/80">实时镜头</h3>
              <span className="text-[9px] px-2 py-0.5 bg-gradient-to-r from-red-500/20 to-[#ff18a0]/20 text-red-400 rounded-full font-bold border border-red-500/10">🔴 LIVE</span>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/[3%] border border-white/[5%] shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              {liveUnlocked && videoAvatar ? (
                <>
                  <video src={videoAvatar} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                    <span className="size-2 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] text-white font-bold">LIVE</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full cursor-pointer" onClick={() => setLiveUnlocked(true)}>
                  <div className="relative">
                    <MonitorPlay size={40} className="text-white/15 mx-auto mb-2" />
                    <div className="absolute inset-0 bg-[#d05bf8]/20 blur-xl rounded-full" />
                  </div>
                  <p className="text-sm text-white/30 mb-2">实时预览</p>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#d05bf8]/15 border border-[#d05bf8]/20">
                    <span className="text-sm">🔒</span>
                    <span className="text-[13px] font-bold text-[#d05bf8]">20 💎 解锁观看</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
