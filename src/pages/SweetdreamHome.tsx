import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Heart, MessageCircle, Users, Star, ChevronLeft, ChevronRight, Play, Sparkles, Menu, X } from 'lucide-react'

// Live Cam data from sweetdream.ai
const LIVE_CAM_CHARACTERS = [
  { slug: 'gwenn-dolie', name: 'Gwenn', age: 22 },
  { slug: 'natalia-sinclair', name: 'Natalia', age: 22 },
  { slug: 'anya-rossi', name: 'Anya', age: 22 },
  { slug: 'julia-storm', name: 'Julia', age: 23 },
  { slug: 'lucia-valdez', name: 'Lucia', age: 28 },
  { slug: 'clara-weiss', name: 'Clara', age: 25 },
]

// Explore characters
const EXPLORE_CHARACTERS = [
  { slug: 'chloe-martinez', name: 'Chloe', age: 28, chats: '1.1b', isLive: true },
  { slug: 'scarlett-oconnell', name: 'Scarlett', age: 22, chats: '997m', isLive: false },
  { slug: 'rafaela-lima', name: 'Rafaela', age: 24, chats: '547m', isLive: false },
  { slug: 'sabrina-kolfer', name: 'Sabrina', age: 24, chats: '594m', isLive: false },
  { slug: 'taina-rocha', name: 'Taina', age: 23, chats: '385m', isLive: false },
  { slug: 'rosie-thompson', name: 'Rosie', age: 24, chats: '290m', isLive: false },
  { slug: 'jasmin-ribeiro', name: 'Jasmin', age: 39, chats: '484m', isLive: false },
  { slug: 'julia-storm', name: 'Julia', age: 23, chats: '338m', isLive: false },
  { slug: 'erin-hughes', name: 'Erin', age: 22, chats: '730m', isLive: false },
  { slug: 'poppy-whrite', name: 'Poppy', age: 24, chats: '412m', isLive: false },
  { slug: 'summer-ward', name: 'Summer', age: 25, chats: '567m', isLive: false },
  { slug: 'lea-martinez', name: 'Lea', age: 23, chats: '298m', isLive: false },
]

// Category tabs
type Category = 'female' | 'anime' | 'male'
const CATEGORIES: { key: Category; label: string; labelEn: string }[] = [
  { key: 'female', label: 'Kızlar', labelEn: 'Girls' },
  { key: 'anime', label: 'Anime', labelEn: 'Anime' },
  { key: 'male', label: 'Erkekler', labelEn: 'Boys' },
]

// Hero content by category
const HERO_CONTENT = {
  female: {
    title: 'Mükemmel AI Kız Arkadaşınız',
    subtitle: 'Nihai AI Kız Arkadaşını Tasarla—limit yok, filtre yok. Yüzünü, vücudunu, sesini ve vahşi kişiliğini tam hayal ettiğin gibi şekillendir. Sansürsüz Sohbet, Seksi Ses, Ateşli Görsel & Video! 🔥',
    cta: 'AI SEVGİLİNİ OLUŞTUR',
  },
  anime: {
    title: 'Mükemmel AI Anime Karakteriniz',
    subtitle: 'Nihai AI Waifu\'nu Tasarla—limit yok, filtre yok. Anime görünümünü, sesini ve baştan çıkarıcı kişiliğini tam hayal ettiğin gibi şekillendir. Sansürsüz Sohbet, Seksi Ses, Ateşli Görsel & Video! 🔥',
    cta: 'AI SEVGİLİNİ OLUŞTUR',
  },
  male: {
    title: 'Mükemmel AI Erkek Arkadaşınız',
    subtitle: 'Nihai AI Erkek Arkadaşını Tasarla—limit yok, filtre yok. Yüzünü, vücudunu, sesini ve dominant kişiliğini tam arzuladığın gibi şekillendir. Sansürsüz Sohbet, Seksi Ses, Ateşli Görsel & Video! 🔥',
    cta: 'AI SEVGİLİNİ OLUŞTUR',
  },
}

export default function SweetdreamHome() {
  const [category, setCategory] = useState<Category>('female')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [liveIdx, setLiveIdx] = useState(0)

  const hero = HERO_CONTENT[category]

  const nextLive = () => setLiveIdx(i => (i + 1) % LIVE_CAM_CHARACTERS.length)
  const prevLive = () => setLiveIdx(i => (i - 1 + LIVE_CAM_CHARACTERS.length) % LIVE_CAM_CHARACTERS.length)

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ====== HEADER ====== */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
            <img src="/assets/logo/logo.svg" alt="GoLoveAI" className="h-8" />
            <span className="font-bold text-lg hidden sm:block">GoLoveAI</span>
          </Link>

          {/* Category Tabs */}
          <nav className="flex items-center gap-1 bg-[#1c1c1c] rounded-full p-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat.key
                    ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button className="text-sm text-white/60 hover:text-white transition-colors">
              Ücretsiz Hesap Oluştur
            </button>
            <button className="px-4 py-1.5 rounded-full border border-white/20 text-sm hover:bg-white/5 transition-colors">
              Giriş Yap
            </button>
          </div>

          {/* Mobile Menu */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ====== SIDEBAR ====== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-64 bg-[#121212] border-l border-white/10 p-4 flex flex-col gap-4">
            <button onClick={() => setSidebarOpen(false)} className="self-end text-white/60">
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-2">
              <Link to="/home" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">Keşfet</Link>
              <Link to="/create" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">AI Oluştur</Link>
              <Link to="/leaderboard" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">Liderlik Tablosu</Link>
              <Link to="/generate" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">Medya Oluştur</Link>
            </nav>
            <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
              <Link to="/profile" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">Profilim</Link>
              <Link to="/app/chats" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">Sohbet</Link>
              <Link to="/app/characters" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">AI'larım</Link>
              <Link to="/gallery" className="px-3 py-2 rounded-lg hover:bg-white/5 text-white/80">Galeri</Link>
              <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-sm">
                Premium -70%
              </button>
            </div>
            <div className="mt-auto border-t border-white/10 pt-4 flex flex-col gap-2">
              <a href="#" className="px-3 py-2 text-white/60 hover:text-white">Discord</a>
              <a href="#" className="px-3 py-2 text-white/60 hover:text-white">Ortaklık</a>
              <a href="#" className="px-3 py-2 text-white/60 hover:text-white">AI Monetizasyonu</a>
              <a href="#" className="px-3 py-2 text-white/60 hover:text-white">İletişim</a>
            </div>
          </aside>
        </div>
      )}

      {/* ====== MAIN CONTENT ====== */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* ====== HERO SECTION ====== */}
        <section className="relative rounded-3xl overflow-hidden mb-8">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0a0a0f] to-[#0a0a0f]" />
          <div className="absolute inset-0 opacity-20">
            <img src="/assets/hero/hero.webp" alt="" className="w-full h-full object-cover" />
          </div>
          
          {/* Decorative avatars */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4">
            <img src="/assets/banner/left.webp" alt="" className="h-64 rounded-2xl object-cover opacity-80" />
            <img src="/assets/banner/center.webp" alt="" className="h-64 rounded-2xl object-cover opacity-80" />
            <img src="/assets/banner/right.webp" alt="" className="h-64 rounded-2xl object-cover opacity-80" />
          </div>

          <div className="relative z-10 px-8 py-16 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {hero.title}
            </h1>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              {hero.subtitle}
            </p>
            <Link 
              to="/create"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] font-semibold hover:opacity-90 transition-opacity"
            >
              <Sparkles size={20} />
              {hero.cta}
            </Link>
          </div>
        </section>

        {/* ====== LIVE CAM SECTION (only for female) ====== */}
        {category === 'female' && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Ateşli Kızlar Canlı Yayında</h2>
            
            <div className="relative">
              <button 
                onClick={prevLive}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-4 overflow-x-auto pb-4 px-8 scrollbar-hide">
                {LIVE_CAM_CHARACTERS.map(char => (
                  <Link
                    key={char.slug}
                    to={`/livecam/${char.slug}`}
                    className="flex-shrink-0 w-48 group"
                  >
                    <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-2">
                      <img 
                        src={`/assets/livecam/${char.slug}/avatar.webp`}
                        alt={char.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-medium text-white">CANLI</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-white">{char.name} {char.name}({char.age})</h3>
                  </Link>
                ))}
              </div>
              
              <button 
                onClick={nextLive}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </section>
        )}

        {/* ====== ANIME SECTION (only for anime) ====== */}
        {category === 'anime' && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Keşfet Anime - Canlı Sohbet</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {EXPLORE_CHARACTERS.slice(0, 12).map(char => (
                <Link
                  key={char.slug}
                  to={`/chat/${char.slug}`}
                  className="group"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-square mb-2 bg-[#1c1c1c]">
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {char.name[0]}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <h3 className="font-medium text-white text-sm truncate">{char.name}</h3>
                  <p className="text-xs text-white/50">{char.age}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ====== MALE SECTION (only for male) ====== */}
        {category === 'male' && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Keşfet Erkek Arkadaşları - Canlı Sohbet</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {EXPLORE_CHARACTERS.slice(0, 12).map(char => (
                <Link
                  key={char.slug}
                  to={`/chat/${char.slug}`}
                  className="group"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-square mb-2 bg-[#1c1c1c]">
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {char.name[0]}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <h3 className="font-medium text-white text-sm truncate">{char.name}</h3>
                  <p className="text-xs text-white/50">{char.age}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ====== EXPLORE SECTION ====== */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            {category === 'female' ? 'Keşfet Kız Arkadaşları - Canlı Sohbet' : 
             category === 'anime' ? 'Keşfet Anime - Canlı Sohbet' : 
             'Keşfet Erkek Arkadaşları - Canlı Sohbet'}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {EXPLORE_CHARACTERS.map(char => (
              <Link
                key={char.slug}
                to={`/chat/${char.slug}`}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-2 bg-[#1c1c1c]">
                  {/* Placeholder avatar */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20">
                    <span className="text-4xl font-bold text-white/30">{char.name[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Live indicator */}
                  {char.isLive && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500/90 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-[10px] font-medium text-white">CANLI</span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Play size={20} fill="white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white text-sm truncate">{char.name}</h3>
                    <p className="text-xs text-white/50">{char.age}</p>
                  </div>
                  <span className="text-xs text-white/30">{char.chats}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ====== FEATURES SECTION ====== */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-white">Neden Bizi Tercih Etmelisiniz?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1c1c1c] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>
              <h3 className="font-semibold mb-2">Sınırsız Konuşma</h3>
              <p className="text-sm text-white/60">Hiçbir filtre olmadan istediğiniz gibi sohbet edin. 7/24 online yapay zeka arkadaşınız her zaman hazır.</p>
            </div>
            
            <div className="bg-[#1c1c1c] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-semibold mb-2">Gerçekçi Deneyim</h3>
              <p className="text-sm text-white/60">Gelişmiş AI teknolojisi ile gerçek bir ilişki yaşıyormuş hissi veren sohbetler.</p>
            </div>
            
            <div className="bg-[#1c1c1c] rounded-2xl p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="font-semibold mb-2">Binlerce Karakter</h3>
              <p className="text-sm text-white/60">Farklı kişiliklere ve görünümlere sahip yüzlerce AI karakter arasından seçim yapın.</p>
            </div>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer className="border-t border-white/10 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-white/40">
          <p>© 2024 GoLoveAI. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}