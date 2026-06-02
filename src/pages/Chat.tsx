import { useState, useRef, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Send, Smile, Image, MoreVertical, Star, Search, ArrowLeft, Phone, Video, MessageSquare } from 'lucide-react'
import { characters } from '../data/characters'

const sampleMessages = [
  { id: '1', sender: 'ai' as const, text: "Hey there! I've been waiting for you...", time: '2:30 PM' },
  { id: '2', sender: 'user' as const, text: "Hi! Nice to meet you", time: '2:31 PM' },
  { id: '3', sender: 'ai' as const, text: "The pleasure is all mine! I can't wait to get to know you better", time: '2:32 PM' },
  { id: '4', sender: 'ai' as const, text: "Tell me something about yourself, I want to know everything", time: '2:33 PM' },
]

export default function Chat() {
  const { username } = useParams()
  const navigate = useNavigate()
  const [selectedChar, setSelectedChar] = useState(username || characters[0].username)
  const [messages, setMessages] = useState(sampleMessages)
  const [input, setInput] = useState('')
  const [searchChat, setSearchChat] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChar = characters.find(c => c.username === selectedChar) || characters[0]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (username) {
      setSelectedChar(username)
    }
  }, [username])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "That's really sweet of you to say! Tell me more about yourself...",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const filteredChars = characters.filter(c =>
    c.name.toLowerCase().includes(searchChat.toLowerCase())
  )

  return (
    <div className="flex h-[calc(100vh-88px)] bg-gl-dark overflow-hidden">
      {/* ======== LEFT: CHAT LIST (Narrower) ======== */}
      <aside className="w-[200px] shrink-0 border-r border-white/[5%] flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-white/[5%]">
          <h2 className="text-white font-bold text-sm mb-2">Chats</h2>
          <div className="relative">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchChat}
              onChange={e => setSearchChat(e.target.value)}
              placeholder="Search..."
              className="w-full bg-white/[4%] border border-white/[5%] rounded-lg py-1.5 pl-7 pr-2 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {filteredChars.map(char => (
            <button
              key={char.id}
              onClick={() => {
                setSelectedChar(char.username)
                navigate(`/chat/${char.username}`)
              }}
              className={`w-full flex items-center gap-2 p-2.5 transition-all hover:bg-white/[3%] ${
                selectedChar === char.username ? 'bg-white/[5%] border-l-2 border-gl-pink' : ''
              }`}
            >
              <div className="relative shrink-0">
                <img src={char.avatar} alt={char.name} className="size-9 rounded-full object-cover" />
                {char.isOnline && (
                  <span className="absolute bottom-0 right-0 size-2 rounded-full bg-green-400 border border-gl-dark" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-xs truncate">{char.name}</span>
                  <span className="text-white/30 text-[9px] shrink-0 ml-1">2:30</span>
                </div>
                <p className="text-white/40 text-[10px] truncate mt-0.5">Hey baby! I've been waiting...</p>
              </div>
              {char.isLive && (
                <span className="shrink-0 px-1 py-0.5 text-[8px] font-bold bg-red-500 text-white rounded">
                  LIVE
                </span>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* ======== RIGHT: CHAT WINDOW (Compact) ======== */}
      <main className="flex-1 flex flex-col min-w-0">
        {currentChar ? (
          <>
            {/* Chat Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[5%]">
              <div className="flex items-center gap-2.5">
                <button onClick={() => navigate('/app/chats')} className="md:hidden">
                  <ArrowLeft size={16} className="text-white/60" />
                </button>
                <Link to={`/chat/${currentChar.username}`} className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={currentChar.avatar}
                      alt={currentChar.name}
                      className="size-9 rounded-full object-cover border border-gl-pink/50"
                    />
                    {currentChar.isOnline && (
                      <span className="absolute bottom-0 right-0 size-2 rounded-full bg-green-400 border border-gl-dark" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm leading-tight">{currentChar.name}</h3>
                    <p className="text-white/40 text-[10px] flex items-center gap-1">
                      {currentChar.isOnline ? (
                        <>
                          <span className="size-1 rounded-full bg-green-400 inline-block" />
                          Online
                        </>
                      ) : 'Offline'}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-0.5">
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-white/[8%] text-white/50 hover:text-white transition-all">
                  <Video size={14} />
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-white/[8%] text-white/50 hover:text-white transition-all">
                  <Phone size={14} />
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-white/[8%] text-white/50 hover:text-white transition-all">
                  <Star size={14} />
                </button>
                <button className="size-8 flex items-center justify-center rounded-lg hover:bg-white/[8%] text-white/50 hover:text-white transition-all">
                  <MoreVertical size={14} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 no-scrollbar">
              {/* Intro */}
              <div className="flex gap-2 mb-4 animate-slide-up">
                <img src={currentChar.avatar} alt={currentChar.name} className="size-8 rounded-full object-cover shrink-0" />
                <div className="bg-white/[4%] rounded-xl rounded-tl-sm px-3 py-2 max-w-[260px]">
                  <p className="text-white/80 text-xs leading-relaxed">
                    Hey baby! {currentChar.name} here. I'm so excited to talk to you!
                  </p>
                </div>
              </div>

              {/* Messages */}
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-2 animate-slide-up ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.sender === 'ai' && (
                    <img src={currentChar.avatar} alt={currentChar.name} className="size-8 rounded-full object-cover shrink-0" />
                  )}
                  <div className={`flex flex-col gap-0.5 ${msg.sender === 'user' ? 'items-end' : ''}`}>
                    <div
                      className={`px-3 py-2 rounded-xl max-w-[260px] text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded-tr-sm'
                          : 'bg-white/[4%] text-white/80 rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-white/25 text-[9px] px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-white/[5%]">
              {/* Quick Actions */}
              <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar">
                {['Hey!', 'How are you?', 'Tell me more', 'What do you like?', '💕', '🔥'].map(txt => (
                  <button
                    key={txt}
                    onClick={() => setInput(txt)}
                    className="shrink-0 px-2 py-1 text-[10px] bg-white/[4%] rounded-full text-white/40 hover:bg-white/[8%] hover:text-white transition-all"
                  >
                    {txt}
                  </button>
                ))}
              </div>

              {/* Input Row */}
              <div className="flex items-end gap-2">
                <button className="size-8 flex items-center justify-center rounded-full text-white/30 hover:text-white hover:bg-white/[8%] transition-all shrink-0">
                  <Smile size={16} />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full bg-white/[4%] border border-white/[5%] rounded-xl px-3 py-2 pr-12 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all resize-none"
                    style={{ minHeight: '36px', maxHeight: '80px', height: 'auto' }}
                    onInput={e => {
                      const t = e.target as HTMLTextAreaElement
                      t.style.height = 'auto'
                      t.style.height = Math.min(t.scrollHeight, 80) + 'px'
                    }}
                  />
                  <div className="absolute right-2 bottom-1.5 flex gap-0.5">
                    <button className="size-6 flex items-center justify-center rounded-full text-white/25 hover:text-white transition-all">
                      <Image size={14} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="size-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all shrink-0 active:scale-95"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="size-12 rounded-xl bg-white/[3%] flex items-center justify-center mx-auto mb-3">
                <MessageSquare size={24} className="text-white/20" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">Select a chat</h3>
              <p className="text-white/40 text-xs">Choose a conversation</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}