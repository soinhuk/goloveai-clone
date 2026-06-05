import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Smile, Image as ImageIcon, Search, ChevronRight, ChevronLeft, X, MonitorPlay, Pencil, Gift, Sparkles, ChevronDown, MessageCircle, Heart, Flame, Wand2, Filter, Star } from 'lucide-react'
import { characters } from '../data/characters'

const QUICK_REPLIES = [
  "Hey, what are you wearing? 😏",
  "Tell me about yourself 💕",
  "What's your biggest fantasy?",
  "Send me a selfie 📸",
  "Let's play a game 🎮",
  "What turns you on? 🔥",
  "Describe your ideal date 💋",
  "I can't stop thinking about you...",
]

const QUICK_QUESTIONS = [
  { icon: '💬', text: "How's your day going?" },
  { icon: '😍', text: "You look amazing today" },
  { icon: '🎭', text: "Let's roleplay" },
  { icon: '🌙', text: "What are you doing tonight?" },
  { icon: '🔥', text: "Tell me something naughty" },
  { icon: '💕', text: "I miss you" },
]

const GIFTS = [
  { icon: '🌹', name: 'Rose', price: 'Free' },
  { icon: '💎', name: 'Diamond', price: '50 coins' },
  { icon: '🎁', name: 'Mystery Box', price: '100 coins' },
  { icon: '👑', name: 'Crown', price: '200 coins' },
  { icon: '🍫', name: 'Chocolate', price: 'Free' },
  { icon: '🥂', name: 'Champagne', price: '150 coins' },
  { icon: '💍', name: 'Ring', price: '500 coins' },
  { icon: '🏖️', name: 'Vacation', price: '1000 coins' },
]

export default function Chat() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)
  const [showDetails, setShowDetails] = useState(true)
  const [showQuickQuestions, setShowQuickQuestions] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const char = characters.find(c => c.username === username || c.id === username)
  if (!char) return <div className="flex items-center justify-center h-screen bg-[#0F0E0F] text-white/40 text-lg">Character not found</div>

  const videoAvatar = char.avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')
  const nsfwAvatar = char.avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')
  const galleryImages = [char.avatar, nsfwAvatar, char.avatar, char.avatar].filter(Boolean)

  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai' as const, text: `I love it when a conversation starts with something interesting... so, where do we begin? 😈`, time: '2:09 PM', photos: [nsfwAvatar, char.avatar] },
  ])

  const handleSend = (text?: string) => {
    const msgText = text || message.trim()
    if (!msgText) return
    const userMsg = { id: Date.now(), sender: 'user' as const, text: msgText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setShowQuickQuestions(false)
    setShowGifts(false)
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
      ]
      const aiMsg = { id: Date.now() + 1, sender: 'ai' as const, text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
      setMessages(prev => [...prev, aiMsg])
    }, 1500)
  }

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const otherChars = characters.filter(c => c.id !== char.id).slice(0, 12)

  return (
    <div className="flex h-[calc(100dvh-32px)] bg-[#0F0E0F]">
      {/* ═══════ LEFT PANEL - Chat List ═══════ */}
      <div className="w-[300px] shrink-0 border-r border-white/[6%] flex flex-col bg-[#0F0E0F]">
        {/* Search */}
        <div className="p-4 pb-3">
          <div className="relative group">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#d05bf8] transition-colors" />
            <input type="text" placeholder="搜索对话..." className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 focus:bg-white/[5%] transition-all" />
          </div>
        </div>

        {/* Active Conversations */}
        <div className="px-4 pb-2">
          <span className="text-xs font-bold text-white/40 uppercase tracking-wider">活跃对话</span>
        </div>
        <div className="px-3 pb-2">
          <Link to={`/chat/${char.username}`} className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/[6%] hover:bg-white/[8%] transition-all">
            <div className="relative shrink-0">
              <div className="size-12 rounded-full overflow-hidden ring-2 ring-[#d05bf8]/30">
                <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              </div>
              {char.isOnline && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-400 border-2 border-[#0F0E0F]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-semibold text-white">{char.name}</span>
                <span className="text-[11px] text-white/30">2:09 PM</span>
              </div>
              <p className="text-xs text-white/40 truncate leading-relaxed">{char.bio}</p>
            </div>
            <button className="shrink-0 p-1.5 rounded-lg hover:bg-white/[4%] transition-all"><MoreHorizontal size={14} className="text-white/25" /></button>
          </Link>
        </div>

        {/* Recommended */}
        <div className="px-4 pt-2 pb-2">
          <span className="text-xs font-bold text-white/40 uppercase tracking-wider">推荐对话</span>
        </div>
        <div className="flex-1 overflow-y-auto px-3 space-y-0.5 scrollbar-hide">
          {otherChars.map(c => (
            <Link key={c.id} to={`/chat/${c.username}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[4%] transition-all">
              <div className="relative shrink-0">
                <div className="size-11 rounded-full overflow-hidden">
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                </div>
                {c.isOnline && <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-400 border-2 border-[#0F0E0F]" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-medium text-white/70">{c.name}, {c.age}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ═══════ CENTER PANEL - Chat Area ═══════ */}
      <div className="flex-1 flex flex-col relative max-w-2xl mx-auto">
        {/* Video Background */}
        {videoAvatar && (
          <video src={videoAvatar} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.10] blur-[25px] z-0" />
        )}

        {/* Chat Header */}
        <header className="relative z-10 flex items-center gap-3 px-5 py-3 border-b border-white/[6%] bg-[#0F0E0F]/85 backdrop-blur-xl">
          <button onClick={() => navigate('/app/chats')} className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all">
            <ArrowLeft size={20} className="text-white/60" />
          </button>
          <Link to={`/chat/${char.username}`} className="flex items-center gap-3 flex-1 min-w-0">
            <div className="size-11 rounded-full overflow-hidden ring-2 ring-white/10 shrink-0">
              <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white leading-tight truncate">{char.name}</h1>
                <button className="p-1 rounded hover:bg-white/[6%] transition-all" title="Rename">
                  <Pencil size={12} className="text-white/30 hover:text-white/50" />
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-white/40">在线</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-green-500/10 transition-all" title="Voice Call">
              <Phone size={18} className="text-green-400/60" />
            </button>
            <div className="relative">
              <button className="flex items-center justify-center size-9 rounded-full hover:bg-[#d05bf8]/10 transition-all" title="Video Call">
                <Video size={18} className="text-[#d05bf8]/60" />
              </button>
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[7px] font-bold bg-gradient-to-r from-[#ff18a0] to-[#d05bf8] text-white rounded-full leading-none shadow-lg">NEW</span>
            </div>
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all" title="More">
              <MoreHorizontal size={18} className="text-white/40" />
            </button>
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all" title="Filter">
              <Filter size={16} className="text-white/40" />
            </button>
            <button onClick={() => setShowDetails(!showDetails)} className={`flex items-center justify-center size-9 rounded-full transition-all ${showDetails ? 'bg-[#d05bf8]/20 text-[#d05bf8]' : 'hover:bg-white/[6%] text-white/40'}`}>
              <ChevronRight size={18} className={`transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </header>

        {/* Hint Banner */}
        <div className="relative z-10 mx-5 mt-4 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d05bf8]/10 to-[#ff18a0]/10 border border-[#d05bf8]/15">
          <p className="text-sm text-[#d05bf8]/80 leading-relaxed">
            💡 <span className="font-semibold">This is an AI character.</span> Feel free to chat about anything! Your conversation is private and uncensored.
          </p>
        </div>

        {/* Messages */}
        <div ref={messagesRef} className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-5">
          <div className="flex justify-center">
            <span className="px-4 py-1.5 text-xs text-white/25 bg-white/[3%] rounded-full">Today</span>
          </div>

          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="shrink-0 size-8 rounded-full overflow-hidden mt-1">
                  <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                <div className={`rounded-2xl px-5 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-[0_2px_10px_rgba(208,91,248,0.2)]'
                    : 'bg-white/[8%] text-white/90 border border-white/[4%]'
                }`}>
                  <p className="text-[15px] leading-[22px] tracking-wide">{msg.text}</p>
                </div>
                {msg.photos && (
                  <div className="flex gap-3 mt-3">
                    {msg.photos.filter(Boolean).map((photo, i) => (
                      <div key={i} className="w-[150px] h-[200px] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all shadow-lg">
                        <img src={photo} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <span className="text-[10px] text-white/15 mt-1.5 px-1">{msg.time}</span>
              </div>
              {msg.sender === 'user' && (
                <div className="shrink-0 size-8 rounded-full bg-gradient-to-br from-[#d05bf8] to-[#ff18a0] flex items-center justify-center mt-1">
                  <span className="text-xs text-white font-bold">U</span>
                </div>
              )}
            </div>
          ))}

          {/* Sign Up CTA */}
          <div className="flex flex-col items-center gap-3 pt-4">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-sm font-bold shadow-[0_4px_20px_rgba(208,91,248,0.4)] hover:shadow-[0_4px_30px_rgba(208,91,248,0.6)] hover:scale-105 transition-all">
              Sign Up to Chat More
            </button>
            <p className="text-center text-white/25 text-sm leading-relaxed max-w-[320px]">
              Meet <span className="text-white/50 font-medium">{char.name}</span>, an AI Girlfriend<br />with no filter.<br /><span className="text-[#d05bf8]/50">Dare to ask anything?</span>
            </p>
          </div>
        </div>

        {/* Quick Reply Suggestions */}
        <div className="relative z-10 px-5 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {QUICK_REPLIES.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className="shrink-0 px-4 py-2 rounded-full border border-white/[8%] bg-white/[3%] text-[13px] text-white/50 hover:bg-white/[6%] hover:text-white/80 hover:border-[#d05bf8]/30 transition-all whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <div className="relative z-10 px-5 pb-3">
          <button className="w-full py-3 rounded-full border border-[#FF18A0]/25 bg-[#FF18A0]/5 text-[#FF18A0] text-sm font-medium hover:bg-[#FF18A0]/10 hover:border-[#FF18A0]/40 transition-all flex items-center justify-center gap-2">
            <ImageIcon size={15} />
            Send me spicy photos
          </button>
        </div>

        {/* Input Area */}
        <div className="relative z-10 border-t border-white/[6%] bg-[#0F0E0F]/85 backdrop-blur-xl">
          {/* Dropdowns */}
          {showQuickQuestions && (
            <div className="absolute bottom-full left-5 mb-2 w-[300px] bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/[10%] rounded-2xl shadow-2xl overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-white/[6%]">
                <span className="text-sm font-semibold text-white/50">快速提问</span>
              </div>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { handleSend(q.text); setShowQuickQuestions(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[4%] transition-all text-left border-b border-white/[3%] last:border-0"
                >
                  <span className="text-lg">{q.icon}</span>
                  <span className="text-sm text-white/65">{q.text}</span>
                </button>
              ))}
            </div>
          )}
          {showGifts && (
            <div className="absolute bottom-full right-5 mb-2 w-[260px] bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/[10%] rounded-2xl shadow-2xl overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-white/[6%] flex items-center justify-between">
                <span className="text-sm font-semibold text-white/50">发送礼物</span>
                <span className="text-[10px] text-[#d05bf8]/60">✨ 实时镜头</span>
              </div>
              <div className="p-2 grid grid-cols-4 gap-1">
                {GIFTS.map((gift, i) => (
                  <button
                    key={i}
                    onClick={() => { handleSend(`I sent you a ${gift.name}! ${gift.icon}`); setShowGifts(false); }}
                    className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl hover:bg-white/[4%] transition-all"
                  >
                    <span className="text-2xl">{gift.icon}</span>
                    <span className="text-[9px] text-white/40 truncate w-full text-center">{gift.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-end gap-2 px-5 py-3.5">
            {/* Ask button */}
            <button
              onClick={() => { setShowQuickQuestions(!showQuickQuestions); setShowGifts(false); }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/[4%] hover:bg-white/[6%] text-white/50 text-sm transition-all shrink-0"
            >
              <MessageCircle size={16} />
              <span>提问</span>
              <ChevronDown size={12} />
            </button>

            <button className="flex items-center justify-center size-10 rounded-full hover:bg-white/[6%] transition-all shrink-0">
              <Smile size={20} className="text-white/35" />
            </button>

            <div className="flex-1">
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="输入消息..."
                rows={1}
                className="w-full bg-white/[4%] border border-white/[6%] rounded-2xl py-3 px-5 text-[15px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#d05bf8]/30 focus:bg-white/[5%] transition-all resize-none min-h-[44px] max-h-[120px]"
              />
            </div>

            {/* Gifts button */}
            <button
              onClick={() => { setShowGifts(!showGifts); setShowQuickQuestions(false); }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#d05bf8]/15 to-[#ff18a0]/15 border border-[#d05bf8]/20 hover:border-[#d05bf8]/40 text-sm transition-all shrink-0"
            >
              <Gift size={15} className="text-[#d05bf8]" />
              <span className="text-[#d05bf8]">礼物</span>
              <Sparkles size={11} className="text-[#ff18a0]" />
              <span className="text-[10px] text-[#ff18a0]/80">实时镜头</span>
              <ChevronDown size={11} className="text-white/30" />
            </button>

            <button
              onClick={() => handleSend()}
              disabled={!message.trim()}
              className={`flex items-center justify-center size-10 rounded-full transition-all shrink-0 ${
                message.trim()
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-[0_2px_12px_rgba(208,91,248,0.4)] hover:shadow-[0_2px_20px_rgba(208,91,248,0.6)]'
                  : 'bg-white/[4%] text-white/15'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════ RIGHT PANEL - Character Details ═══════ */}
      {showDetails && (
        <div className="w-[320px] shrink-0 border-l border-white/[6%] flex flex-col bg-[#0F0E0F] overflow-y-auto scrollbar-hide">
          {/* Close */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <span className="text-xs font-bold text-white/30 uppercase tracking-wider">详情面板</span>
            <button onClick={() => setShowDetails(false)} className="size-7 rounded-full hover:bg-white/[6%] flex items-center justify-center">
              <X size={14} className="text-white/30" />
            </button>
          </div>

          {/* Photo Slideshow */}
          <div className="px-4 pb-4">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group">
              <img src={galleryImages[photoIndex]} alt={char.name} className="w-full h-full object-cover transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl font-bold text-white">{char.name}, {char.age}</h2>
                <p className="text-sm text-white/50 mt-1 line-clamp-2">{char.bio}</p>
              </div>
              {/* Nav arrows */}
              <button onClick={() => setPhotoIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft size={16} className="text-white" />
              </button>
              <button onClick={() => setPhotoIndex(i => (i + 1) % galleryImages.length)} className="absolute right-2 top-1/2 -translate-y-1/2 size-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={16} className="text-white" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5">
                {galleryImages.map((_, i) => (
                  <button key={i} onClick={() => setPhotoIndex(i)} className={`size-1.5 rounded-full transition-all ${i === photoIndex ? 'bg-white w-4' : 'bg-white/40'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-3 flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl bg-green-500/15 text-green-400 text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-500/25 transition-all border border-green-500/10">
              <Phone size={15} /> 打电话
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-[#d05bf8]/15 text-[#d05bf8] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#d05bf8]/25 transition-all border border-[#d05bf8]/10">
              <Video size={15} /> 视频通话
            </button>
          </div>

          {/* Generate Media */}
          <div className="px-4 pb-4">
            <Link to="/generate" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#d05bf8]/15 to-[#ff18a0]/15 border border-[#d05bf8]/15 text-sm font-semibold text-[#d05bf8] hover:border-[#d05bf8]/30 hover:from-[#d05bf8]/20 hover:to-[#ff18a0]/20 transition-all">
              <Wand2 size={16} /> 生成媒体
            </Link>
          </div>

          {/* About Her */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={14} className="text-[#ff18a0]" />
              <h3 className="text-sm font-bold text-white">她是什么样的？</h3>
            </div>
            <div className="space-y-0">
              {[
                ['性格', char.tags.join(', ')],
                ['年龄', `${char.age || '—'}`],
                ['状态', char.isOnline ? '🟢 在线' : '⚪ 离线'],
                ['关系', 'AI Girlfriend'],
                ['语言', 'English'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/[4%]">
                  <span className="text-sm text-white/35">{label}</span>
                  <span className="text-sm text-white/65 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Her Appearance */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-[#d05bf8]" />
              <h3 className="text-sm font-bold text-white">她的外貌</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                ['种族', '—'], ['年龄', `${char.age || '—'}`],
                ['体型', '—'], ['眼睛', '—'],
                ['发型', '—'], ['发色', '—'],
                ['胸部', '—'], ['臀部', '—'],
                ['服装', '—'], ['特殊特征', '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[10px] text-white/25 uppercase tracking-wider">{label}</span>
                  <span className="text-sm text-white/55 mt-0.5">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon size={14} className="text-white/40" />
              <h3 className="text-sm font-bold text-white">作品集</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {galleryImages.map((img, i) => (
                <div key={i} onClick={() => setPhotoIndex(i)} className={`aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-all border-2 ${i === photoIndex ? 'border-[#d05bf8]/50' : 'border-transparent'}`}>
                  <img src={img} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Live Camera */}
          <div className="px-4 pb-5">
            <div className="flex items-center gap-2 mb-3">
              <MonitorPlay size={14} className="text-[#ff18a0]" />
              <h3 className="text-sm font-bold text-white">实时镜头</h3>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#ff18a0]/20 text-[#ff18a0] rounded-full font-medium">LIVE</span>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/[3%] border border-white/[6%]">
              {videoAvatar ? (
                <video src={videoAvatar} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MonitorPlay size={32} className="text-white/15 mx-auto mb-2" />
                    <p className="text-sm text-white/25">实时预览</p>
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/80 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] text-white font-bold">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
