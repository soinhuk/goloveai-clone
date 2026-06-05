import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Smile, Image as ImageIcon, Search, ChevronRight, X, MonitorPlay, Pencil, Gift, Sparkles, ChevronDown, MessageCircle, Heart, Flame, Wand2 } from 'lucide-react'
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

export default function Chat() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)
  const [showDetails, setShowDetails] = useState(true)
  const [showQuickQuestions, setShowQuickQuestions] = useState(false)
  const [showGifts, setShowGifts] = useState(false)

  const char = characters.find(c => c.username === username || c.id === username)
  if (!char) return <div className="flex items-center justify-center h-screen text-white/40 text-lg">Character not found</div>

  const videoAvatar = char.avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')
  const nsfwAvatar = char.avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')

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
    setTimeout(() => {
      const replies = [
        "Mmm, I like where this is going... tell me more 😘",
        "You're so sweet! What else is on your mind? 💕",
        "Oh really? That's interesting... I want to know more about you 😊",
        "Haha, you're funny! Keep talking to me 💋",
        "I love that! You have great taste 😉",
        "Mmm, you're making me blush... 😳🔥",
        "I've been waiting for someone like you 💖",
      ]
      const aiMsg = { id: Date.now() + 1, sender: 'ai' as const, text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
      setMessages(prev => [...prev, aiMsg])
    }, 1500)
  }

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const otherChars = characters.filter(c => c.id !== char.id).slice(0, 10)

  return (
    <div className="flex h-[calc(100dvh-32px)] bg-[#0F0E0F]">
      {/* LEFT PANEL - Chat List */}
      <div className="w-[300px] shrink-0 border-r border-white/[6%] flex flex-col bg-[#0F0E0F]">
        <div className="p-4">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" placeholder="搜索对话..." className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/30" />
          </div>
        </div>

        <div className="px-4 pb-1.5">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">活跃对话</span>
        </div>
        <div className="px-3">
          <Link to={`/chat/${char.username}`} className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[6%] transition-all">
            <div className="relative shrink-0">
              <div className="size-12 rounded-full overflow-hidden">
                <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              </div>
              {char.isOnline && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-400 border-2 border-[#0F0E0F]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">{char.name}</span>
                <span className="text-[11px] text-white/30">2:09 PM</span>
              </div>
              <p className="text-xs text-white/40 truncate mt-0.5">{char.bio}</p>
            </div>
            <button className="shrink-0 p-1 rounded hover:bg-white/[4%]"><MoreHorizontal size={14} className="text-white/30" /></button>
          </Link>
        </div>

        <div className="px-4 pt-4 pb-1.5">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">推荐对话</span>
        </div>
        <div className="flex-1 overflow-y-auto px-3 space-y-0.5">
          {otherChars.map(c => (
            <Link key={c.id} to={`/chat/${c.username}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[3%] transition-all">
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

      {/* CENTER PANEL - Chat Area */}
      <div className="flex-1 flex flex-col relative max-w-2xl mx-auto">
        {/* Video Background */}
        {videoAvatar && (
          <video src={videoAvatar} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.12] blur-[20px] z-0" />
        )}

        {/* Chat Header */}
        <header className="relative z-10 flex items-center gap-3 px-5 py-3.5 border-b border-white/[6%] bg-[#0F0E0F]/80 backdrop-blur-md">
          <button onClick={() => navigate('/app/chats')} className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all">
            <ArrowLeft size={20} className="text-white/70" />
          </button>
          <Link to={`/chat/${char.username}`} className="flex items-center gap-3 flex-1">
            <div className="size-10 rounded-full overflow-hidden ring-2 ring-white/10">
              <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-white leading-tight">{char.name}</h1>
                <button className="p-1 rounded hover:bg-white/[6%] transition-all" title="Rename">
                  <Pencil size={12} className="text-white/30" />
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-green-400" />
                <span className="text-xs text-white/40">在线</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-green-500/10 transition-all" title="Voice Call">
              <Phone size={18} className="text-green-400/70" />
            </button>
            <div className="relative">
              <button className="flex items-center justify-center size-9 rounded-full hover:bg-[#d05bf8]/10 transition-all" title="Video Call">
                <Video size={18} className="text-[#d05bf8]/70" />
              </button>
              <span className="absolute -top-1 -right-1 px-1 py-0.5 text-[7px] font-bold bg-[#ff18a0] text-white rounded-full leading-none">NEW</span>
            </div>
            <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all"><MoreHorizontal size={18} className="text-white/50" /></button>
            <button onClick={() => setShowDetails(!showDetails)} className={`flex items-center justify-center size-9 rounded-full transition-all ${showDetails ? 'bg-[#d05bf8]/20 text-[#d05bf8]' : 'hover:bg-white/[6%] text-white/50'}`}>
              <ChevronRight size={18} className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </header>

        {/* Hint Banner */}
        <div className="relative z-10 mx-5 mt-4 px-5 py-3 rounded-xl bg-[#d05bf8]/10 border border-[#d05bf8]/20">
          <p className="text-sm text-[#d05bf8]/80 leading-relaxed">
            💡 <span className="font-medium">This is an AI character.</span> Feel free to chat about anything! Your conversation is private and uncensored.
          </p>
        </div>

        {/* Messages */}
        <div ref={messagesRef} className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div className="flex justify-center">
            <span className="px-4 py-1 text-xs text-white/30 bg-white/[4%] rounded-full">Today</span>
          </div>

          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[80%] rounded-[20px] px-5 py-3 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                  : 'bg-white/[10%] text-white/90'
              }`}>
                <p className="text-[15px] leading-[22px]">{msg.text}</p>
              </div>
              {msg.photos && (
                <div className="flex gap-3 mt-3">
                  {msg.photos.filter(Boolean).map((photo, i) => (
                    <div key={i} className="w-[140px] h-[180px] rounded-[16px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                      <img src={photo} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
              <span className="text-[10px] text-white/20 mt-1.5">{msg.time}</span>
            </div>
          ))}

          <div className="flex justify-center pt-4">
            <button className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-sm font-semibold shadow-[0_0_15px_rgba(208,91,248,0.3)] hover:shadow-[0_0_25px_rgba(208,91,248,0.5)] transition-all">
              Sign Up
            </button>
          </div>
          <div className="flex justify-center pt-2">
            <p className="text-center text-white/30 text-sm leading-relaxed max-w-[300px]">
              Meet {char.name}, an AI Girlfriend<br />with no filter.<br />Dare to ask anything?
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
                className="shrink-0 px-4 py-2 rounded-full border border-white/[8%] bg-white/[3%] text-[13px] text-white/60 hover:bg-white/[6%] hover:text-white/80 hover:border-[#d05bf8]/30 transition-all whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="relative z-10 px-5 pb-3 flex gap-2">
          <button className="flex-1 py-2.5 rounded-full border border-[#FF18A0]/30 bg-[#FF18A0]/5 text-[#FF18A0] text-sm font-medium hover:bg-[#FF18A0]/10 transition-all flex items-center justify-center gap-2">
            <ImageIcon size={15} />
            Send me spicy photos
          </button>
        </div>

        {/* Input Area */}
        <div className="relative z-10 border-t border-white/[6%] bg-[#0F0E0F]/80 backdrop-blur-md">
          {/* Dropdown menus */}
          {showQuickQuestions && (
            <div className="absolute bottom-full left-5 mb-2 w-[280px] bg-[#1a1a1a] border border-white/[10%] rounded-xl shadow-xl overflow-hidden z-20">
              <div className="p-2 border-b border-white/[6%]">
                <span className="text-xs font-semibold text-white/40 px-2">Quick Questions</span>
              </div>
              {QUICK_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { handleSend(q.text); setShowQuickQuestions(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[4%] transition-all text-left"
                >
                  <span className="text-base">{q.icon}</span>
                  <span className="text-sm text-white/70">{q.text}</span>
                </button>
              ))}
            </div>
          )}
          {showGifts && (
            <div className="absolute bottom-full right-5 mb-2 w-[220px] bg-[#1a1a1a] border border-white/[10%] rounded-xl shadow-xl overflow-hidden z-20">
              <div className="p-2 border-b border-white/[6%]">
                <span className="text-xs font-semibold text-white/40 px-2">Send a Gift</span>
              </div>
              {['🌹 Rose', '💎 Diamond', '🎁 Mystery Box', '👑 Crown', '🍫 Chocolate', '🥂 Champagne'].map((gift, i) => (
                <button
                  key={i}
                  onClick={() => { handleSend(`I sent you a ${gift.split(' ')[1]}! ${gift.split(' ')[0]}`); setShowGifts(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-white/[4%] transition-all text-left"
                >
                  <span className="text-lg">{gift.split(' ')[0]}</span>
                  <span className="text-sm text-white/70">{gift.split(' ').slice(1).join(' ')}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 px-5 py-3.5">
            {/* Ask button */}
            <div className="relative">
              <button
                onClick={() => { setShowQuickQuestions(!showQuickQuestions); setShowGifts(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[4%] hover:bg-white/[6%] text-white/50 text-sm transition-all"
              >
                <MessageCircle size={16} />
                <span>提问</span>
                <ChevronDown size={12} />
              </button>
            </div>

            <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all">
              <Smile size={20} className="text-white/40" />
            </button>

            <div className="flex-1">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="输入消息..."
                className="w-full bg-white/[5%] border border-white/[6%] rounded-full py-2.5 px-5 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/30 transition-all"
              />
            </div>

            {/* Gifts + Live Camera button */}
            <div className="relative">
              <button
                onClick={() => { setShowGifts(!showGifts); setShowQuickQuestions(false); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#d05bf8]/10 to-[#ff18a0]/10 border border-[#d05bf8]/20 hover:border-[#d05bf8]/40 text-[#d05bf8] text-sm transition-all"
              >
                <Gift size={15} />
                <span>礼物</span>
                <Sparkles size={12} className="text-[#ff18a0]" />
                <span className="text-[10px] text-[#ff18a0]">实时镜头</span>
                <ChevronDown size={12} />
              </button>
            </div>

            <button
              onClick={() => handleSend()}
              disabled={!message.trim()}
              className={`flex items-center justify-center size-10 rounded-full transition-all ${
                message.trim() ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-[0_0_10px_rgba(208,91,248,0.3)]' : 'bg-white/[4%] text-white/20'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Character Details */}
      {showDetails && (
        <div className="w-[320px] shrink-0 border-l border-white/[6%] flex flex-col bg-[#0F0E0F] overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-end p-3">
            <button onClick={() => setShowDetails(false)} className="size-8 rounded-full hover:bg-white/[6%] flex items-center justify-center">
              <X size={16} className="text-white/40" />
            </button>
          </div>

          {/* Character Photo */}
          <div className="px-5 pb-4">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="text-xl font-bold text-white">{char.name}, {char.age}</h2>
                <p className="text-sm text-white/60 mt-1 line-clamp-2">{char.bio}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-5 pb-4 flex gap-2">
            <button className="flex-1 py-2.5 rounded-xl bg-green-500/20 text-green-400 text-sm font-medium flex items-center justify-center gap-2 hover:bg-green-500/30 transition-all">
              <Phone size={15} /> 打电话
            </button>
            <button className="flex-1 py-2.5 rounded-xl bg-[#d05bf8]/20 text-[#d05bf8] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#d05bf8]/30 transition-all">
              <Video size={15} /> 视频通话
            </button>
          </div>

          {/* Generate Media Link */}
          <div className="px-5 pb-4">
            <Link to="/generate" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 border border-[#d05bf8]/20 text-sm font-medium text-[#d05bf8] hover:border-[#d05bf8]/40 transition-all">
              <MonitorPlay size={16} /> 生成媒体
            </Link>
          </div>

          {/* About Her */}
          <div className="px-5 pb-4">
            <h3 className="text-base font-semibold text-white mb-3">她是什么样的？</h3>
            <div className="space-y-2.5">
              {[
                ['性格', char.tags.join(', ')],
                ['年龄', `${char.age || '—'}`],
                ['状态', char.isOnline ? '🟢 在线' : '⚪ 离线'],
                ['关系', 'AI Girlfriend'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-white/[4%]">
                  <span className="text-sm text-white/40">{label}</span>
                  <span className="text-sm text-white/70">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Her Appearance */}
          <div className="px-5 pb-4">
            <h3 className="text-base font-semibold text-white mb-3">她的外貌</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                ['种族', '—'], ['年龄', `${char.age || '—'}`],
                ['体型', '—'], ['眼睛', '—'],
                ['发型', '—'], ['发色', '—'],
                ['胸部', '—'], ['服装', '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase">{label}</span>
                  <span className="text-sm text-white/60">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="px-5 pb-4">
            <h3 className="text-base font-semibold text-white mb-3">作品集</h3>
            <div className="grid grid-cols-3 gap-2">
              {[char.avatar, nsfwAvatar, char.avatar].filter(Boolean).map((img, i) => (
                <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={img} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Live Camera */}
          <div className="px-5 pb-5">
            <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
              <MonitorPlay size={16} className="text-[#d05bf8]" /> 实时镜头
            </h3>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/[4%] border border-white/[6%]">
              {videoAvatar ? (
                <video src={videoAvatar} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MonitorPlay size={28} className="text-white/20 mx-auto mb-2" />
                    <p className="text-sm text-white/30">实时预览</p>
                  </div>
                </div>
              )}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/80 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] text-white font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
