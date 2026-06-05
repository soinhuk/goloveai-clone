import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Heart, MessageCircle, Share2, Gift, MoreVertical } from 'lucide-react'

// Live Cam action buttons data
const LIVE_CAM_ACTIONS: Record<string, { label: string; icon: string; free?: boolean }[]> = {
  'gwenn-dolie': [
    { label: 'El Salla', icon: '👋', free: true },
    { label: 'Öne Eğil', icon: '💋', free: true },
    { label: 'Dört Ayak Üstüne Geç', icon: '🐾' },
    { label: 'Ahegao Yüzü', icon: '😵' },
    { label: 'Zıpla', icon: '⬆️' },
    { label: 'Beni Kışkırt', icon: '🔥' },
    { label: 'Dans Et', icon: '💃' },
    { label: 'Kendine Dokun', icon: '✋' },
    { label: 'Airjob Yap', icon: '🦶' },
    { label: 'Dildo', icon: '🔴' },
    { label: 'Külodunu Çıkar', icon: '🩲' },
    { label: 'Göğüslerini Sık', icon: '🤏' },
    { label: 'Poposunu Göster', icon: '🍑' },
    { label: 'Masturbasyon Yap', icon: '🔞' },
  ],
  'natalia-sinclair': [
    { label: 'Öne Eğil', icon: '💋' },
    { label: 'El Salla', icon: '👋', free: true },
    { label: 'Zıpla', icon: '⬆️' },
    { label: 'Dans Et', icon: '💃' },
    { label: 'Dildo', icon: '🔴' },
    { label: 'Airjob Yap', icon: '🦶' },
    { label: 'Kendine Dokun', icon: '✋' },
    { label: 'Külodunu Çıkar', icon: '🩲' },
    { label: 'Göğüslerini Sık', icon: '🤏' },
    { label: 'Masturbasyon Yap', icon: '🔞' },
  ],
  'anya-rossi': [
    { label: 'Zıpla', icon: '⬆️' },
    { label: 'Poposunu Göster', icon: '🍑' },
    { label: 'Gül Gönder', icon: '🌹' },
    { label: 'Parmaklarını Yala', icon: '👅' },
    { label: 'Dans Et', icon: '💃' },
    { label: 'Uzan', icon: '🛏️' },
    { label: 'Öpücük Gönder', icon: '💋' },
    { label: 'Bacaklarını Aç', icon: '🦵' },
    { label: 'Kendine Dokun', icon: '✋' },
    { label: 'Striptiz', icon: '💃' },
  ],
  'julia-storm': [
    { label: 'El Salla', icon: '👋', free: true },
    { label: 'Öne Eğil', icon: '💋' },
    { label: 'Zıpla', icon: '⬆️' },
    { label: 'Beni Kışkırt', icon: '🔥' },
    { label: 'Dans Et', icon: '💃' },
    { label: 'Kendine Dokun', icon: '✋' },
    { label: 'Dildo', icon: '🔴' },
    { label: 'Külodunu Çıkar', icon: '🩲' },
    { label: 'Göğüslerini Sık', icon: '🤏' },
    { label: 'Masturbasyon Yap', icon: '🔞' },
    { label: 'Poposunu Göster', icon: '🍑' },
  ],
  'lucia-valdez': [
    { label: 'El Salla', icon: '👋', free: true },
    { label: 'Öne Eğil', icon: '💋' },
    { label: 'Zıpla', icon: '⬆️' },
    { label: 'Beni Kışkırt', icon: '🔥' },
    { label: 'Dans Et', icon: '💃' },
    { label: 'Kendine Dokun', icon: '✋' },
    { label: 'Airjob Yap', icon: '🦶' },
    { label: 'Dildo', icon: '🔴' },
    { label: 'Külodunu Çıkar', icon: '🩲' },
    { label: 'Göğüslerini Sık', icon: '🤏' },
  ],
  'clara-weiss': [
    { label: 'El Salla', icon: '👋', free: true },
    { label: 'Öne Eğil', icon: '💋' },
    { label: 'Dört Ayak Üstüne Geç', icon: '🐾' },
    { label: 'Ahegao Yüzü', icon: '😵' },
    { label: 'Zıpla', icon: '⬆️' },
    { label: 'Beni Kışkırt', icon: '🔥' },
    { label: 'Dans Et', icon: '💃' },
    { label: 'Kendine Dokun', icon: '✋' },
    { label: 'Dildo', icon: '🔴' },
    { label: 'Göğüslerini Sık', icon: '🤏' },
    { label: 'Poposunu Göster', icon: '🍑' },
    { label: 'Masturbasyon Yap', icon: '🔞' },
  ],
}

// Default actions if character not found
const DEFAULT_ACTIONS = [
  { label: 'El Salla', icon: '👋', free: true },
  { label: 'Öne Eğil', icon: '💋' },
  { label: 'Zıpla', icon: '⬆️' },
  { label: 'Dans Et', icon: '💃' },
  { label: 'Kendine Dokun', icon: '✋' },
  { label: 'Beni Kışkırt', icon: '🔥' },
]

interface Character {
  slug: string
  name: string
  age: number
  tagline?: string
}

const CHARACTERS: Record<string, Character> = {
  'gwenn-dolie': { slug: 'gwenn-dolie', name: 'Gwenn', age: 22, tagline: 'Sende olmak istiyorum...' },
  'natalia-sinclair': { slug: 'natalia-sinclair', name: 'Natalia', age: 22, tagline: 'Benimle sohbet et' },
  'anya-rossi': { slug: 'anya-rossi', name: 'Anya', age: 22, tagline: 'Harika vaktimiz olacak' },
  'julia-storm': { slug: 'julia-storm', name: 'Julia', age: 23, tagline: 'Sınırları zorla' },
  'lucia-valdez': { slug: 'lucia-valdez', name: 'Lucia', age: 28, tagline: 'Her şeyi yapabilirim' },
  'clara-weiss': { slug: 'clara-weiss', name: 'Clara', age: 25, tagline: 'Beni keşfet' },
}

export default function LiveCam() {
  const { slug } = useParams<{ slug: string }>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeAction, setActiveAction] = useState<string | null>(null)

  const character = slug ? CHARACTERS[slug] : null
  const actions = slug ? (LIVE_CAM_ACTIONS[slug] || DEFAULT_ACTIONS) : DEFAULT_ACTIONS

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [slug])

  const handleAction = (label: string) => {
    setActiveAction(label)
    // In a real implementation, this would trigger video playback
    // For now, just show visual feedback
    setTimeout(() => setActiveAction(null), 2000)
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Character Not Found</h1>
          <Link to="/home" className="text-[#d05bf8] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ====== HEADER ====== */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-2">
            <img src="/assets/logo/logo.svg" alt="GoLoveAI" className="h-8" />
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/home" className="text-sm text-white/60 hover:text-white">Keşfet</Link>
            <Link to="/create" className="text-sm text-white/60 hover:text-white">AI Oluştur</Link>
            <button className="px-4 py-1.5 rounded-full border border-white/20 text-sm">
              Giriş Yap
            </button>
          </nav>
        </div>
      </header>

      {/* ====== MAIN CONTENT ====== */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* ====== VIDEO SECTION ====== */}
          <div className="space-y-4">
            {/* Video Player */}
            <div className="relative aspect-[9/16] max-h-[70vh] mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-[#1c1c1c]">
              <video
                ref={videoRef}
                src={`https://aigf.sfo2.cdn.digitaloceanspaces.com/livecam/${slug}/l1_idle_2.mp4`}
                poster={`/assets/livecam/${slug}/avatar.webp`}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Top bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-medium">CANLI</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Share2 size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Gift size={20} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
              
              {/* Bottom info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-xl font-bold">{character.name}</h1>
                    <p className="text-sm text-white/60">{character.age} years old</p>
                  </div>
                  <Link 
                    to={`/chat/${slug}`}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] font-medium text-sm"
                  >
                    Sohbet etmek için kaydol
                  </Link>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-[#121212] rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold">Canlı Aksiyon</h2>
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Beta</span>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAction(action.label)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                      activeAction === action.label
                        ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] scale-95'
                        : 'bg-[#1c1c1c] hover:bg-[#252525] active:scale-95'
                    }`}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-[10px] text-center text-white/80 leading-tight">
                      {action.label.length > 15 ? action.label.substring(0, 15) + '...' : action.label}
                    </span>
                    {action.free && (
                      <span className="text-[9px] text-green-400">Ücretsiz</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ====== SIDEBAR ====== */}
          <aside className="space-y-4">
            {/* Profile Card */}
            <div className="bg-[#121212] rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={`/assets/livecam/${slug}/avatar.webp`}
                  alt={character.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-bold">{character.name}</h2>
                  <p className="text-sm text-white/60">{character.age} years old</p>
                </div>
              </div>
              
              <p className="text-sm text-white/70 mb-4">{character.tagline}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] font-medium text-sm">
                  Takip Et
                </button>
                <Link 
                  to={`/chat/${slug}`}
                  className="flex-1 py-2 rounded-full border border-white/20 font-medium text-sm text-center hover:bg-white/5"
                >
                  Mesaj Gönder
                </Link>
              </div>
            </div>

            {/* Chat Preview */}
            <div className="bg-[#121212] rounded-2xl p-4">
              <h3 className="font-semibold mb-4">Canlı Sohbet</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <span className="text-[#d05bf8]">User123:</span>
                  <span className="text-white/70">Merhaba, nasılsın?</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#ff18a0]">{character.name}:</span>
                  <span className="text-white/70">Harika, sen nasılsın?</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#d05bf8]">User456:</span>
                  <span className="text-white/70">Çok güzel! ❤️</span>
                </div>
              </div>
            </div>

            {/* Related Characters */}
            <div className="bg-[#121212] rounded-2xl p-4">
              <h3 className="font-semibold mb-4">Diğer Canlı Yayınlar</h3>
              <div className="space-y-3">
                {Object.values(CHARACTERS)
                  .filter(c => c.slug !== slug)
                  .slice(0, 4)
                  .map(c => (
                    <Link 
                      key={c.slug} 
                      to={`/livecam/${c.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <img 
                        src={`/assets/livecam/${c.slug}/avatar.webp`}
                        alt={c.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-sm">{c.name}</p>
                        <p className="text-xs text-white/50">{c.age} years old</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}