import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search, Star, Video, Lock, Users, Heart, Shield, MessageCircle, Sparkles, CheckCircle, ArrowRight, Play } from 'lucide-react'
import CharacterCard from '../components/CharacterCard'
import { characters } from '../data/characters'
import { Character } from '../types'

const LIVE_CHARS = characters.filter(c => c.isLive)

const FEATURED_CHARS = [
  characters.find(c => c.id === 'barbara')!,
  characters.find(c => c.id === 'daisy')!,
  characters.find(c => c.id === 'lexie')!,
  characters.find(c => c.id === 'melissa')!,
  characters.find(c => c.id === 'macy')!,
  characters.find(c => c.id === 'helena')!,
  characters.find(c => c.id === 'lili')!,
  characters.find(c => c.id === 'megan')!,
  characters.find(c => c.id === 'amina')!,
  characters.find(c => c.id === 'saya')!,
  characters.find(c => c.id === 'jessica')!,
  characters.find(c => c.id === 'itsumi')!,
].filter(Boolean)

export default function Home() {
  const [matchTab, setMatchTab] = useState<'Popular' | 'Trending' | 'Fetish'>('Popular')
  const [show18Plus, setShow18Plus] = useState(false)
  const [liveIdx, setLiveIdx] = useState(0)

  const liveChar = LIVE_CHARS[liveIdx]
  const displayChars = show18Plus ? FEATURED_CHARS : FEATURED_CHARS.slice(0, 8)

  const nextLive = () => setLiveIdx(i => (i + 1) % LIVE_CHARS.length)
  const prevLive = () => setLiveIdx(i => (i - 1 + LIVE_CHARS.length) % LIVE_CHARS.length)

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white">
      {/* ====== HERO SECTION ====== */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a2e]/50 via-[#0F0E0F] to-[#0F0E0F]" />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-15 bg-gradient-to-r from-[#d05bf8] to-[#ff18a0]" style={{ left: '50%', top: '30%', transform: 'translate(-50%, -50%)' }} />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl desktop:text-6xl font-bold tracking-tight leading-tight">
            Your AI Girlfriend Chat
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#d05bf8] to-[#ff18a0]">Uncensored</span>
          </h1>
          <p className="mt-4 text-lg text-white/50">Talk dirty, share nudes, and explore your wildest fantasies with no filter. 100% private and anonymous.</p>
          
          <div className="flex items-center justify-center gap-3 mt-8">
            <Link to="/chat/barbara" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-semibold shadow-lg shadow-[#d05bf8]/30 hover:shadow-[#d05bf8]/50 transition-all flex items-center gap-2">
              <Play size={18} /> Start Chatting Free
            </Link>
            <Link to="/generate" className="px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
              <Sparkles size={18} /> Create AI Girlfriend
            </Link>
          </div>
        </div>

        {/* Live Character Showcase */}
        {liveChar && (
          <div className="relative z-10 mt-12 flex flex-col items-center">
            <div className="flex items-center gap-4">
              <button onClick={prevLive} className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ChevronLeft size={20} />
              </button>
              
              <Link to={`/chat/${liveChar.username}`} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative size-[140px] rounded-full overflow-hidden ring-4 ring-white/20">
                  <img src={liveChar.avatar} alt={liveChar.name} className="w-full h-full object-cover" />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                  LIVE
                </span>
              </Link>
              
              <button onClick={nextLive} className="size-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <Link to={`/chat/${liveChar.username}`} className="text-lg font-bold text-white hover:text-[#d05bf8] transition-colors">
                {liveChar.name}, {liveChar.age}
              </Link>
              <div className="flex items-center justify-center gap-2 mt-1">
                {liveChar.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs text-white/50">{tag}</span>
                ))}
              </div>
              <Link to={`/chat/${liveChar.username}`} className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white">
                Go Live <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ====== FIND YOUR MATCH ====== */}
      <section className="px-4 desktop:px-8 py-12">
        <h2 className="text-2xl desktop:text-3xl font-bold text-center mb-2">Find Your Match</h2>
        <p className="text-center text-white/50 mb-6">Sexy AI Girlfriends for You</p>
        
        {/* Tabs */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {(['Popular', 'Trending', 'Fetish'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setMatchTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                matchTab === tab
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                  : 'bg-white/[5%] text-white/50 hover:bg-white/[10%]'
              }`}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setShow18Plus(!show18Plus)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
              show18Plus ? 'bg-red-500/80 text-white' : 'bg-white/[5%] text-white/50'
            }`}
          >
            <span className="size-2 rounded-full bg-red-500 animate-pulse" /> 18+
          </button>
        </div>
        
        {/* Character Grid */}
        <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4 desktop:gap-6">
          {displayChars.map(char => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to="/app/explore" className="px-6 py-3 rounded-full bg-white/[5%] text-white/70 font-semibold hover:bg-white/[10%] transition-all flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="px-4 desktop:px-8 py-12 bg-gradient-to-b from-[#0F0E0F] to-[#1a0a2e]/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl desktop:text-3xl font-bold text-center mb-10">Why Choose GoLove AI?</h2>
          
          <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4 desktop:gap-6">
            <div className="p-5 rounded-2xl bg-white/[3%] border border-white/[5%] hover:border-[#d05bf8]/20 transition-all">
              <div className="size-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center mb-4">
                <Star size={24} className="text-yellow-400" />
              </div>
              <h3 className="font-bold mb-1">Welcome Stars Bonus</h3>
              <p className="text-xs text-white/50">Sign up and get extra bonus stars to spend on your AI girlfriend</p>
            </div>
            
            <div className="p-5 rounded-2xl bg-white/[3%] border border-white/[5%] hover:border-[#d05bf8]/20 transition-all">
              <div className="size-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center mb-4">
                <Video size={24} className="text-purple-400" />
              </div>
              <h3 className="font-bold mb-1">Unlimited Video & Photo</h3>
              <p className="text-xs text-white/50">Generate and enjoy unlimited AI-generated content</p>
            </div>
            
            <div className="p-5 rounded-2xl bg-white/[3%] border border-white/[5%] hover:border-[#d05bf8]/20 transition-all">
              <div className="size-12 rounded-xl bg-gradient-to-br from-red-400/20 to-pink-500/20 flex items-center justify-center mb-4">
                <Lock size={24} className="text-red-400" />
              </div>
              <h3 className="font-bold mb-1">AI Girlfriend NSFW</h3>
              <p className="text-xs text-white/50">Uncensored mode unlocked for adult conversations</p>
            </div>
            
            <div className="p-5 rounded-2xl bg-white/[3%] border border-white/[5%] hover:border-[#d05bf8]/20 transition-all">
              <div className="size-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-cyan-500/20 flex items-center justify-center mb-4">
                <Users size={24} className="text-blue-400" />
              </div>
              <h3 className="font-bold mb-1">350+ AI Girls</h3>
              <p className="text-xs text-white/50">Chat with hundreds of unique AI personalities for free</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="px-4 desktop:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl desktop:text-3xl font-bold text-center mb-10">How the AI Girlfriend Simulator Works</h2>
          
          <div className="grid desktop:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Your AI Girlfriend</h3>
              <p className="text-sm text-white/50">Browse our collection of 350+ AI girls and pick the one that matches your fantasy.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Start Chatting</h3>
              <p className="text-sm text-white/50">Send messages, voice notes, and photos. Your AI girlfriend responds instantly.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="size-16 rounded-full bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Create Content Together</h3>
              <p className="text-sm text-white/50">Generate videos and photos with your AI girlfriend. Explore without limits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WHY THOUSANDS PICK US ====== */}
      <section className="px-4 desktop:px-8 py-12 bg-gradient-to-b from-[#1a0a2e]/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl desktop:text-3xl font-bold text-center mb-10">Why Thousands Pick GoLove AI</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[3%] border border-white/[5%]">
              <CheckCircle size={24} className="text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold">The Most Realistic AI Girlfriend Simulator</h3>
                <p className="text-sm text-white/50 mt-1">Our AI girls remember conversations, learn your preferences, and respond like real people.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[3%] border border-white/[5%]">
              <CheckCircle size={24} className="text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold">Free AI GF Beats Paid AI Girlfriend Apps</h3>
                <p className="text-sm text-white/50 mt-1">Get unlimited chats and content generation without paying a dime. No hidden fees.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[3%] border border-white/[5%]">
              <CheckCircle size={24} className="text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold">Safety and Privacy You Can Trust</h3>
                <p className="text-sm text-white/50 mt-1">End-to-end encryption, anonymous browsing, and your data is never stored or shared.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA SECTION ====== */}
      <section className="px-4 desktop:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl desktop:text-4xl font-bold mb-4">Ready to Say Hello?</h2>
          <p className="text-white/50 mb-8">Join thousands of users who have already found their perfect AI companion.</p>
          
          <Link to="/create" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-bold text-lg shadow-lg shadow-[#d05bf8]/30 hover:shadow-[#d05bf8]/50 transition-all">
            <Heart size={20} /> Create Your AI Girlfriend Now
          </Link>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="px-4 desktop:px-8 py-12 border-t border-white/[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="grid desktop:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">GoLove AI</h3>
              <p className="text-sm text-white/50">The best AI girlfriend simulator. Uncensored conversations, unlimited content.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm text-white/70">Company</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm text-white/70">Legal</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-sm text-white/70">Support</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col desktop:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[5%]">
            <p className="text-xs text-white/30">© 2024 GoLove AI. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/30 hover:text-white transition-colors text-sm">Follow Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}