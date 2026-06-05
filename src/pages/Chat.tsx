import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Video, MoreHorizontal, Send, Smile, Image as ImageIcon } from 'lucide-react'
import { characters } from '../data/characters'

export default function Chat() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)

  const char = characters.find(c => c.username === username || c.id === username)
  if (!char) return <div className="flex items-center justify-center h-screen text-white/40">Character not found</div>

  const videoAvatar = char.avatar?.replace('/images_avif_q50_720/', '/video_avatar/').replace('_avatar.avif', '_video_avatar_nsfw.mp4')
  const nsfwAvatar = char.avatar?.replace('_avatar.avif', '_avatar_nsfw.avif')

  // Simulated initial messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai' as const, text: `I love it when a conversation starts with something interesting... so, where do we begin? 😈`, time: '2:09 PM', photos: [nsfwAvatar, char.avatar] },
  ])

  const handleSend = () => {
    if (!message.trim()) return
    const userMsg = { id: Date.now(), sender: 'user' as const, text: message.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), photos: undefined as string[] | undefined }
    setMessages(prev => [...prev, userMsg])
    setMessage('')
    // Simulate AI reply after 1.5s
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

  return (
    <div className="flex flex-col h-[calc(100dvh-32px)] bg-[#0F0E0F] relative">
      {/* Video Background */}
      {videoAvatar && (
        <video src={videoAvatar} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.15] blur-[20px] z-0" />
      )}

      {/* Chat Header */}
      <header className="relative z-10 flex items-center gap-3 px-4 py-3 border-b border-white/[6%] bg-[#0F0E0F]/80 backdrop-blur-md">
        <button onClick={() => navigate('/app/chats')} className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all">
          <ArrowLeft size={20} className="text-white/70" />
        </button>
        <Link to={`/chat/${char.username}`} className="flex items-center gap-3 flex-1">
          <div className="size-10 rounded-full overflow-hidden ring-2 ring-white/10">
            <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-[16px] font-[600] text-white leading-tight">{char.name}</h1>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-green-400" />
              <span className="text-[11px] text-white/40">Online</span>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all"><Phone size={18} className="text-white/50" /></button>
          <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all"><Video size={18} className="text-white/50" /></button>
          <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all"><MoreHorizontal size={18} className="text-white/50" /></button>
        </div>
      </header>

      {/* Messages */}
      <div ref={messagesRef} className="relative z-10 flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Date */}
        <div className="flex justify-center">
          <span className="px-3 py-1 text-[11px] text-white/30 bg-white/[4%] rounded-full">Today</span>
        </div>

        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] rounded-[20px] px-4 py-3 ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                : 'bg-white/[10%] text-white/90'
            }`}>
              <p className="text-[14px] leading-[20px] tracking-[-4%]">{msg.text}</p>
            </div>
            {/* Photos */}
            {msg.photos && (
              <div className="flex gap-2 mt-2">
                {msg.photos.filter(Boolean).map((photo, i) => (
                  <div key={i} className="w-[140px] h-[180px] rounded-[16px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <img src={photo} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            <span className="text-[10px] text-white/20 mt-1">{msg.time}</span>
          </div>
        ))}

        {/* Sign Up prompt */}
        <div className="flex justify-center pt-4">
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[13px] font-semibold shadow-[0_0_15px_rgba(208,91,248,0.3)] hover:shadow-[0_0_25px_rgba(208,91,248,0.5)] transition-all">
            Sign Up
          </button>
        </div>

        {/* Intro text */}
        <div className="flex justify-center pt-2">
          <p className="text-center text-white/30 text-[12px] leading-[18px] max-w-[300px]">
            Meet {char.name}, an AI Girlfriend<br />with no filter.<br />Dare to ask anything?
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative z-10 px-4 pb-2">
        <button className="w-full py-2.5 rounded-full border border-[#FF18A0]/30 bg-[#FF18A0]/5 text-[#FF18A0] text-[13px] font-medium hover:bg-[#FF18A0]/10 transition-all flex items-center justify-center gap-2">
          <ImageIcon size={14} />
          Send me spicy photos
        </button>
      </div>

      {/* Input */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-3 border-t border-white/[6%] bg-[#0F0E0F]/80 backdrop-blur-md">
        <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%] transition-all">
          <Smile size={20} className="text-white/40" />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Message"
            className="w-full bg-white/[5%] border border-white/[6%] rounded-full py-2.5 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/30 transition-all"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`flex items-center justify-center size-9 rounded-full transition-all ${
            message.trim() ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/20'
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
