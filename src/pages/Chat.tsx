import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Smile, Image as ImageIcon, Search, ChevronRight, ChevronLeft, X, MonitorPlay, Pencil, Gift, Sparkles, ChevronDown, MessageCircle, Heart, Star, Flame, Wand2, Filter, Crown, Music, MapPin, Clock, Eye } from 'lucide-react'
import { characters } from '../data/characters'

const QUICK_REPLIES = [
  { text: "Hey, what are you wearing? 😏", icon: "😏" },
  { text: "Tell me about yourself 💕", icon: "💕" },
  { text: "What's your biggest fantasy?", icon: "🔥" },
  { text: "Send me a selfie 📸", icon: "📸" },
  { text: "Let's play a game 🎮", icon: "🎮" },
  { text: "What turns you on? 🔥", icon: "💋" },
  { text: "Describe your ideal date 💋", icon: "🌙" },
  { text: "I can't stop thinking about you...", icon: "💭" },
]

const QUICK_QUESTIONS = [
  { icon: '💬', text: "How's your day going?", desc: "Start a casual chat" },
  { icon: '😍', text: "You look amazing today", desc: "Give a compliment" },
  { icon: '🎭', text: "Let's roleplay", desc: "Start an adventure" },
  { icon: '🌙', text: "What are you doing tonight?", desc: "Set the mood" },
  { icon: '🔥', text: "Tell me something naughty", desc: "Get spicy" },
  { icon: '💕', text: "I miss you", desc: "Show affection" },
  { icon: '📸', text: "Send me a photo", desc: "Request a pic" },
  { icon: '🎵', text: "Sing me a song", desc: "Be creative" },
]

const GIFTS = [
  { icon: '🌹', name: 'Rose', price: 'Free', color: 'from-red-500/20 to-pink-500/20' },
  { icon: '💎', name: 'Diamond', price: '50', color: 'from-blue-500/20 to-cyan-500/20' },
  { icon: '🎁', name: 'Mystery', price: '100', color: 'from-purple-500/20 to-pink-500/20' },
  { icon: '👑', name: 'Crown', price: '200', color: 'from-yellow-500/20 to-amber-500/20' },
  { icon: '🍫', name: 'Chocolate', price: 'Free', color: 'from-amber-600/20 to-orange-500/20' },
  { icon: '🥂', name: 'Champagne', price: '150', color: 'from-yellow-400/20 to-orange-400/20' },
  { icon: '💍', name: 'Ring', price: '500', color: 'from-pink-500/20 to-rose-500/20' },
  { icon: '🏖️', name: 'Vacation', price: '1000', color: 'from-teal-500/20 to-blue-500/20' },
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
  const [isTyping, setIsTyping] = useState(false)

  const char = characters.find(c => c.username === username || c.id === username)
  if (!char) return <div className="flex items-center justify-center h-screen bg-[#0a0a0f] text-white/40 text-lg">Character not found</div>

  const videoAvatar = char.avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')
  const nsfwAvatar = char.avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')
  const galleryImages = [char.avatar, nsfwAvatar, char.avatar, char.avatar].filter(Boolean)

  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai' as const, text: char.greeting || `I love it when a conversation starts with something interesting... so, where do we begin? 😈`, time: '2:09 PM', photos: [nsfwAvatar, char.avatar] },
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
      <div className="flex-1 flex flex-col relative max-w-2xl mx-auto">
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
            ✨ <span className="font-semibold text-[#d05bf8]/90">This is an AI character.</span> Feel free to chat about anything! Your conversation is private and uncensored.
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
                Sign Up to Chat More
              </button>
            </div>
            <p className="text-center text-white/25 text-[15px] leading-relaxed max-w-[340px]">
              Meet <span className="text-white/50 font-semibold">{char.name}</span>, an AI Girlfriend<br />with no filter.<br /><span className="bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] bg-clip-text text-transparent font-semibold">Dare to ask anything?</span>
            </p>
          </div>
        </div>

        {/* Quick Reply Suggestions */}
        <div className="relative z-10 px-5 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {QUICK_REPLIES.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply.text)}
                className="shrink-0 px-4 py-2.5 rounded-full border border-white/[6%] bg-white/[3%] text-[13px] text-white/45 hover:bg-gradient-to-r hover:from-[#d05bf8]/10 hover:to-[#ff18a0]/10 hover:text-white/70 hover:border-[#d05bf8]/20 transition-all whitespace-nowrap hover:shadow-[0_0_10px_rgba(208,91,248,0.1)]"
              >
                {reply.text}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action */}
        <div className="relative z-10 px-5 pb-3">
          <button className="w-full py-3 rounded-full border border-[#FF18A0]/20 bg-gradient-to-r from-[#FF18A0]/5 to-[#d05bf8]/5 text-[#FF18A0] text-[15px] font-medium hover:from-[#FF18A0]/10 hover:to-[#d05bf8]/10 hover:border-[#FF18A0]/30 hover:shadow-[0_0_15px_rgba(255,24,160,0.1)] transition-all flex items-center justify-center gap-2">
            <ImageIcon size={16} />
            Send me spicy photos
          </button>
        </div>

        {/* Input Area */}
        <div className="relative z-10 border-t border-white/[4%] bg-[#0a0a0f]/90 backdrop-blur-2xl">
          {/* Dropdowns */}
          {showQuickQuestions && (
            <div className="absolute bottom-full left-5 mb-2 w-[320px] bg-[#13131a]/95 backdrop-blur-2xl border border-white/[8%] rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-20">
              <div className="px-5 py-3.5 border-b border-white/[5%] flex items-center gap-2">
                <Sparkles size={14} className="text-[#d05bf8]" />
                <span className="text-sm font-semibold text-white/50">快速提问</span>
              </div>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { handleSend(q.text); setShowQuickQuestions(false); }}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/[3%] transition-all text-left border-b border-white/[3%] last:border-0 group"
                >
                  <span className="text-xl">{q.icon}</span>
                  <div className="flex-1">
                    <span className="text-[15px] text-white/60 group-hover:text-white/80 transition-colors">{q.text}</span>
                    <p className="text-[11px] text-white/20 mt-0.5">{q.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {showGifts && (
            <div className="absolute bottom-full right-5 mb-2 w-[280px] bg-[#13131a]/95 backdrop-blur-2xl border border-white/[8%] rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)] overflow-hidden z-20">
              <div className="px-5 py-3.5 border-b border-white/[5%] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift size={14} className="text-[#d05bf8]" />
                  <span className="text-sm font-semibold text-white/50">发送礼物</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 text-[#d05bf8] rounded-full font-medium">✨ 实时镜头</span>
              </div>
              <div className="p-3 grid grid-cols-4 gap-1.5">
                {GIFTS.map((gift, i) => (
                  <button
                    key={i}
                    onClick={() => { handleSend(`I sent you a ${gift.name}! ${gift.icon}`); setShowGifts(false); }}
                    className={`flex flex-col items-center gap-1 py-3 px-1 rounded-xl bg-gradient-to-b ${gift.color} hover:scale-105 transition-all border border-white/[3%]`}
                  >
                    <span className="text-2xl">{gift.icon}</span>
                    <span className="text-[9px] text-white/40 truncate w-full text-center">{gift.name}</span>
                    <span className="text-[8px] text-[#d05bf8]/50">{gift.price}</span>
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
                placeholder="输入消息..."
                rows={1}
                className="w-full bg-white/[3%] border border-white/[5%] rounded-2xl py-3 px-5 text-[16px] text-white placeholder:text-white/20 focus:outline-none focus:border-[#d05bf8]/25 focus:bg-white/[4%] focus:shadow-[0_0_15px_rgba(208,91,248,0.08)] transition-all resize-none min-h-[46px] max-h-[120px]"
              />
            </div>

            <button
              onClick={() => { setShowGifts(!showGifts); setShowQuickQuestions(false); }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d05bf8]/[0.12] to-[#ff18a0]/[0.08] border border-[#d05bf8]/15 hover:border-[#d05bf8]/30 hover:shadow-[0_0_12px_rgba(208,91,248,0.15)] text-[15px] transition-all shrink-0"
            >
              <Gift size={15} className="text-[#d05bf8]" />
              <span className="text-[#d05bf8]">礼物</span>
              <Sparkles size={11} className="text-[#ff18a0]" />
              <span className="text-[10px] text-[#ff18a0]/70">实时镜头</span>
              <ChevronDown size={11} className="text-white/25" />
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

          {/* Photo Slideshow */}
          <div className="px-5 pb-4">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
              <img src={galleryImages[photoIndex]} alt={char.name} className="w-full h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              {/* Name overlay */}
              <div className="absolute bottom-5 left-5 right-5">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">{char.name}, {char.age}</h2>
                <p className="text-sm text-white/50 mt-1.5 line-clamp-2 drop-shadow">{char.bio}</p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {char.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-0.5 text-[10px] font-medium bg-white/[10%] backdrop-blur-sm text-white/70 rounded-full border border-white/[10%]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* Nav arrows */}
              <button onClick={() => setPhotoIndex(i => (i - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/50">
                <ChevronLeft size={18} className="text-white" />
              </button>
              <button onClick={() => setPhotoIndex(i => (i + 1) % galleryImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/50">
                <ChevronRight size={18} className="text-white" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, i) => (
                  <button key={i} onClick={() => setPhotoIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === photoIndex ? 'bg-white w-6' : 'bg-white/30 w-1.5'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-5 pb-3 flex gap-2">
            <button className="flex-1 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-all border border-emerald-500/10 hover:shadow-[0_0_12px_rgba(52,211,153,0.15)]">
              <Phone size={15} /> 打电话
            </button>
            <button className="flex-1 py-3 rounded-xl bg-[#d05bf8]/10 text-[#d05bf8] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#d05bf8]/20 transition-all border border-[#d05bf8]/10 hover:shadow-[0_0_12px_rgba(208,91,248,0.15)]">
              <Video size={15} /> 视频通话
            </button>
          </div>

          {/* Generate Media */}
          <div className="px-5 pb-4">
            <Link to="/generate" className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d05bf8]/[0.12] to-[#ff18a0]/[0.08] border border-[#d05bf8]/[0.12] text-sm font-bold text-[#d05bf8] hover:border-[#d05bf8]/25 hover:shadow-[0_0_20px_rgba(208,91,248,0.1)] transition-all">
              <Wand2 size={16} /> 生成媒体
            </Link>
          </div>

          {/* About Her */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={14} className="text-[#ff18a0]" />
              <h3 className="text-sm font-bold text-white/80">她是什么样的？</h3>
            </div>
            <div className="space-y-0">
              {[
                ['性格', char.personality || char.tags.join(', ')],
                ['职业', char.occupation || '—'],
                ['爱好', char.hobbies?.join(', ') || '—'],
                ['关系', char.relationship || '—'],
                ['幻想', char.fantasy || '—'],
                ['年龄', `${char.age || '—'}`],
                ['状态', char.isOnline ? '🟢 在线' : '⚪ 离线'],
                ['语言', 'English'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between py-2.5 border-b border-white/[3%] gap-3">
                  <span className="text-[13px] text-white/30 shrink-0">{label}</span>
                  <span className="text-[13px] text-white/60 font-medium text-right">{value}</span>
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
                ['种族', char.ethnicity || '—'],
                ['年龄', `${char.age || '—'}`],
                ['体型', char.bodyType || '—'],
                ['眼睛', char.eyeColor || '—'],
                ['发型', char.hairStyle || '—'],
                ['发色', char.hairColor || '—'],
                ['胸部', char.chest || '—'],
                ['臀部', char.butt || '—'],
                ['服装', char.outfit || '—'],
                ['特征', char.specialFeature || '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[10px] text-white/20 uppercase tracking-wider">{label}</span>
                  <span className="text-[13px] text-white/50 mt-0.5">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon size={14} className="text-white/35" />
              <h3 className="text-sm font-bold text-white/80">作品集</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.map((img, i) => (
                <div key={i} onClick={() => setPhotoIndex(i)} className={`aspect-[3/4] rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all border-2 ${i === photoIndex ? 'border-[#d05bf8]/40 shadow-[0_0_8px_rgba(208,91,248,0.2)]' : 'border-transparent hover:border-white/10'}`}>
                  <img src={img} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Live Camera */}
          <div className="px-5 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <MonitorPlay size={14} className="text-[#ff18a0]" />
              <h3 className="text-sm font-bold text-white/80">实时镜头</h3>
              <span className="text-[9px] px-2 py-0.5 bg-gradient-to-r from-red-500/20 to-[#ff18a0]/20 text-red-400 rounded-full font-bold border border-red-500/10">🔴 LIVE</span>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/[3%] border border-white/[5%] shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
              {videoAvatar ? (
                <video src={videoAvatar} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="relative">
                      <MonitorPlay size={36} className="text-white/10 mx-auto mb-2" />
                      <div className="absolute inset-0 bg-[#d05bf8]/20 blur-xl rounded-full" />
                    </div>
                    <p className="text-sm text-white/20">实时预览</p>
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/80 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]">
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
