import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Smile, Image as ImageIcon, Search, ChevronRight, X, MonitorPlay } from 'lucide-react'
import { characters } from '../data/characters'

export default function Chat() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)
  const [showDetails, setShowDetails] = useState(true)

  const char = characters.find(c => c.username === username || c.id === username)
  if (!char) return <div className="flex items-center justify-center h-screen text-white/40">Character not found</div>

  const videoAvatar = char.avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')
  const nsfwAvatar = char.avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')

  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai' as const, text: `I love it when a conversation starts with something interesting... so, where do we begin? 😈`, time: '2:09 PM', photos: [nsfwAvatar, char.avatar] },
  ])

  const handleSend = () => {
    if (!message.trim()) return
    const userMsg = { id: Date.now(), sender: 'user' as const, text: message.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    setTimeout(() => {
      const replies = [
        "Mmm, I like where this is going... tell me more 😘",
        "You're so sweet! What else is on your mind? 💕",
        "Oh really? That's interesting... I want to know more about you 😊",
        "Haha, you're funny! Keep talking to me 💋",
        "I love that! You have great taste 😉",
      ]
      const aiMsg = { id: Date.now() + 1, sender: 'ai' as const, text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
      setMessages(prev => [...prev, aiMsg])
    }, 1500)
  }

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const otherChars = characters.filter(c => c.id !== char.id).slice(0, 8)

  return (
    <div className="flex h-[calc(100dvh-32px)] bg-[#0F0E0F]">
      {/* LEFT PANEL - Chat List */}
      <div className="w-[280px] shrink-0 border-r border-white/[6%] flex flex-col bg-[#0F0E0F]">
        <div className="p-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input type="text" placeholder="Search conversations..." className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-2 pl-9 pr-3 text-[12px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/30" />
          </div>
        </div>

        <div className="px-3 pb-1">
          <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Active Conversations</span>
        </div>
        <div className="px-2">
          <Link to={`/chat/${char.username}`} className="flex items-center gap-2.5 px-2 py-2.5 rounded-xl bg-white/[6%] transition-all">
            <div className="relative shrink-0">
              <div className="size-10 rounded-full overflow-hidden">
                <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              </div>
              {char.isOnline && <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-400 border-2 border-[#0F0E0F]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-white">{char.name}</span>
                <span className="text-[10px] text-white/30">2:09 PM</span>
              </div>
              <p className="text-[11px] text-white/40 truncate">{char.bio}</p>
            </div>
          </Link>
        </div>

        <div className="px-3 pt-3 pb-1">
          <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">Suggested</span>
        </div>
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {otherChars.map(c => (
            <Link key={c.id} to={`/chat/${c.username}`} className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/[3%] transition-all">
              <div className="relative shrink-0">
                <div className="size-10 rounded-full overflow-hidden">
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                </div>
                {c.isOnline && <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-400 border-2 border-[#0F0E0F]" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] font-medium text-white/70">{c.name}, {c.age}</span>
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
        <header className="relative z-10 flex items-center gap-3 px-4 py-3 border-b border-white/[6%] bg-[#0F0E0F]/80 backdrop-blur-md">
          <button onClick={() => navigate('/app/chats')} className="flex items-center justify-center size-8 rounded-full hover:bg-white/[6%] transition-all">
            <ArrowLeft size={18} className="text-white/70" />
          </button>
          <Link to={`/chat/${char.username}`} className="flex items-center gap-2.5 flex-1">
            <div className="size-9 rounded-full overflow-hidden ring-2 ring-white/10">
              <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-[14px] font-semibold text-white leading-tight">{char.name}</h1>
              <div className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-white/40">Online</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-0.5">
            <button className="flex items-center justify-center size-8 rounded-full hover:bg-white/[6%] transition-all"><Phone size={16} className="text-white/50" /></button>
            <button className="flex items-center justify-center size-8 rounded-full hover:bg-white/[6%] transition-all"><Video size={16} className="text-white/50" /></button>
            <button onClick={() => setShowDetails(!showDetails)} className={`flex items-center justify-center size-8 rounded-full transition-all ${showDetails ? 'bg-[#d05bf8]/20 text-[#d05bf8]' : 'hover:bg-white/[6%] text-white/50'}`}>
              <ChevronRight size={16} className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} />
            </button>
            <button className="flex items-center justify-center size-8 rounded-full hover:bg-white/[6%] transition-all"><MoreHorizontal size={16} className="text-white/50" /></button>
          </div>
        </header>

        {/* Hint Banner */}
        <div className="relative z-10 mx-4 mt-3 px-4 py-2.5 rounded-xl bg-[#d05bf8]/10 border border-[#d05bf8]/20">
          <p className="text-[11px] text-[#d05bf8]/80 leading-relaxed">
            💡 <span className="font-medium">This is an AI character.</span> Feel free to chat about anything! Your conversation is private and uncensored.
          </p>
        </div>

        {/* Messages */}
        <div ref={messagesRef} className="relative z-10 flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <div className="flex justify-center">
            <span className="px-3 py-1 text-[10px] text-white/30 bg-white/[4%] rounded-full">Today</span>
          </div>

          {messages.map(msg => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[75%] rounded-[18px] px-3.5 py-2.5 ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                  : 'bg-white/[10%] text-white/90'
              }`}>
                <p className="text-[13px] leading-[18px]">{msg.text}</p>
              </div>
              {msg.photos && (
                <div className="flex gap-2 mt-2">
                  {msg.photos.filter(Boolean).map((photo, i) => (
                    <div key={i} className="w-[120px] h-[160px] rounded-[14px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                      <img src={photo} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
              <span className="text-[9px] text-white/20 mt-1">{msg.time}</span>
            </div>
          ))}

          <div className="flex justify-center pt-3">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[12px] font-semibold shadow-[0_0_15px_rgba(208,91,248,0.3)] hover:shadow-[0_0_25px_rgba(208,91,248,0.5)] transition-all">
              Sign Up
            </button>
          </div>
          <div className="flex justify-center pt-1">
            <p className="text-center text-white/30 text-[11px] leading-[16px] max-w-[250px]">
              Meet {char.name}, an AI Girlfriend<br />with no filter.<br />Dare to ask anything?
            </p>
          </div>
        </div>

        {/* Quick Action */}
        <div className="relative z-10 px-4 pb-2">
          <button className="w-full py-2 rounded-full border border-[#FF18A0]/30 bg-[#FF18A0]/5 text-[#FF18A0] text-[12px] font-medium hover:bg-[#FF18A0]/10 transition-all flex items-center justify-center gap-2">
            <ImageIcon size={13} />
            Send me spicy photos
          </button>
        </div>

        {/* Input */}
        <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-t border-white/[6%] bg-[#0F0E0F]/80 backdrop-blur-md">
          <button className="flex items-center justify-center size-8 rounded-full hover:bg-white/[6%] transition-all">
            <Smile size={18} className="text-white/40" />
          </button>
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Message..."
              className="w-full bg-white/[5%] border border-white/[6%] rounded-full py-2 px-4 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/30 transition-all"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`flex items-center justify-center size-8 rounded-full transition-all ${
              message.trim() ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/20'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* RIGHT PANEL - Character Details */}
      {showDetails && (
        <div className="w-[300px] shrink-0 border-l border-white/[6%] flex flex-col bg-[#0F0E0F] overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-end p-2">
            <button onClick={() => setShowDetails(false)} className="size-7 rounded-full hover:bg-white/[6%] flex items-center justify-center">
              <X size={14} className="text-white/40" />
            </button>
          </div>

          {/* Character Photo */}
          <div className="px-4 pb-3">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h2 className="text-[18px] font-bold text-white">{char.name}, {char.age}</h2>
                <p className="text-[11px] text-white/60 mt-0.5 line-clamp-2">{char.bio}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-3 flex gap-2">
            <button className="flex-1 py-2 rounded-xl bg-green-500/20 text-green-400 text-[11px] font-medium flex items-center justify-center gap-1.5 hover:bg-green-500/30 transition-all">
              <Phone size={13} /> Call
            </button>
            <button className="flex-1 py-2 rounded-xl bg-[#d05bf8]/20 text-[#d05bf8] text-[11px] font-medium flex items-center justify-center gap-1.5 hover:bg-[#d05bf8]/30 transition-all">
              <Video size={13} /> Video
            </button>
          </div>

          {/* Generate Media Link */}
          <div className="px-4 pb-3">
            <Link to="/generate" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 border border-[#d05bf8]/20 text-[12px] font-medium text-[#d05bf8] hover:border-[#d05bf8]/40 transition-all">
              <MonitorPlay size={14} /> Generate Media
            </Link>
          </div>

          {/* About Her */}
          <div className="px-4 pb-3">
            <h3 className="text-[13px] font-semibold text-white mb-2">About Her</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1.5 border-b border-white/[4%]">
                <span className="text-[11px] text-white/40">Personality</span>
                <span className="text-[11px] text-white/70">{char.tags.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/[4%]">
                <span className="text-[11px] text-white/40">Age</span>
                <span className="text-[11px] text-white/70">{char.age || '—'}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/[4%]">
                <span className="text-[11px] text-white/40">Status</span>
                <span className="text-[11px] text-white/70">{char.isOnline ? '🟢 Online' : '⚪ Offline'}</span>
              </div>
            </div>
          </div>

          {/* Her Appearance */}
          <div className="px-4 pb-3">
            <h3 className="text-[13px] font-semibold text-white mb-2">Her Appearance</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {[
                ['Ethnicity', '—'], ['Age', `${char.age || '—'}`],
                ['Body Type', '—'], ['Eyes', '—'],
                ['Hair Style', '—'], ['Hair Color', '—'],
                ['Chest', '—'], ['Outfit', '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[9px] text-white/30 uppercase">{label}</span>
                  <span className="text-[11px] text-white/60">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="px-4 pb-4">
            <h3 className="text-[13px] font-semibold text-white mb-2">Gallery</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {[char.avatar, nsfwAvatar, char.avatar].filter(Boolean).map((img, i) => (
                <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img src={img} alt={`gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Live Camera Placeholder */}
          <div className="px-4 pb-4">
            <h3 className="text-[13px] font-semibold text-white mb-2 flex items-center gap-1.5">
              <MonitorPlay size={14} className="text-[#d05bf8]" /> Live Camera
            </h3>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/[4%] border border-white/[6%]">
              {videoAvatar ? (
                <video src={videoAvatar} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MonitorPlay size={24} className="text-white/20 mx-auto mb-1" />
                    <p className="text-[10px] text-white/30">Real-time preview</p>
                  </div>
                </div>
              )}
              <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/80 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[9px] text-white font-medium">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
