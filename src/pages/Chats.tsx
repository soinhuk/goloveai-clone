import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { characters } from '../data/characters'

export default function Chats() {
  const recentChats = characters.slice(0, 10).map(c => ({
    ...c,
    lastMessage: c.bio || 'Tap to start chatting...',
    time: '2:09 PM',
    unread: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
  }))

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-[24px] font-[700] tracking-[-4%] mb-4">Chats</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="text" placeholder="Search conversations..." className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-2.5 pl-10 pr-4 text-[13px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
        </div>
      </div>

      <div className="px-4 py-2">
        {recentChats.map(chat => (
          <Link key={chat.id} to={`/chat/${chat.username}`} className="flex items-center gap-3 px-2 py-3 rounded-xl hover:bg-white/[3%] transition-all">
            <div className="relative shrink-0">
              <div className="size-12 rounded-full overflow-hidden">
                <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
              </div>
              {chat.isOnline && <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-400 border-2 border-[#0F0E0F]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[14px] font-[600]">{chat.name}</span>
                <span className="text-[11px] text-white/30">{chat.time}</span>
              </div>
              <p className="text-[12px] text-white/40 truncate">{chat.lastMessage}</p>
            </div>
            {chat.unread > 0 && (
              <span className="shrink-0 size-5 flex items-center justify-center rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-[10px] font-bold">{chat.unread}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
