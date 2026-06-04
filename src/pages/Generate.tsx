import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, X, Sparkles, Image as ImageIcon, Video, Shirt, Mountain, Settings2, Wand2, Clapperboard, Upload, Search } from 'lucide-react'
import { characters } from '../data/characters'

// Actions data - 44 actions with VIDEO preview thumbnails
const ACTIONS = [
  { name: 'POV Handjob Cumshot', image: '/images/generate-page/video-poses/povhandjobcumshot.avif' },
  { name: 'Titjob Cum', image: '/images/generate-page/video-poses/titjobcum.avif' },
  { name: 'Tongue Blowjob', image: '/images/generate-page/video-poses/tongueblowjob.avif' },
  { name: 'Couch Lap Blowjob', image: '/images/generate-page/video-poses/couchlapblowjob.avif' },
  { name: 'Dildo Anal Riding', image: '/images/generate-page/video-poses/dildoanalriding.avif' },
  { name: 'Foot Job', image: '/images/generate-page/video-poses/footjob.avif' },
  { name: 'Shibaru Swing', image: '/images/generate-page/video-poses/shibaruswing.avif' },
  { name: 'BDSM Ass Tease', image: '/images/generate-page/video-poses/bdsmbdsmasstease.avif' },
  { name: 'Tentacle', image: '/images/generate-page/video-poses/tentacle.avif' },
  { name: 'Prone Bone', image: '/images/generate-page/video-poses/pronebone.avif' },
  { name: 'Doggy', image: '/images/generate-page/video-poses/doggy.avif' },
  { name: 'Blowjob', image: '/images/generate-page/video-poses/blowjob.avif' },
  { name: 'POV Missionary', image: '/images/generate-page/video-poses/povmissionary.avif' },
  { name: 'Reverse Cowgirl', image: '/images/generate-page/video-poses/reversecowgirl.avif' },
  { name: 'Cumshot', image: '/images/generate-page/video-poses/cumshot.avif' },
  { name: 'Pussy Insertion', image: '/images/generate-page/video-poses/pussyinsertion.avif' },
  { name: 'Jiggle Tits', image: '/images/generate-page/video-poses/jigglittits.avif' },
  { name: 'Twerk', image: '/images/generate-page/video-poses/twerk.avif' },
  { name: 'Spread Pussy', image: '/images/generate-page/video-poses/spreadpussy.avif' },
  { name: 'Pussy Show', image: '/images/generate-page/video-poses/pussyshow.avif' },
  { name: 'Fingering', image: '/images/generate-page/video-poses/fingering.avif' },
  { name: 'Dildo', image: '/images/generate-page/video-poses/dildo.avif' },
  { name: 'Shirt Lifting', image: '/images/generate-page/video-poses/shirtlifting.avif' },
  { name: 'Anal Missionary', image: '/images/generate-page/video-poses/analmissionary.avif' },
  { name: 'Doggy Kneel', image: '/images/generate-page/video-poses/doggykneel.avif' },
  { name: 'Drill', image: '/images/generate-page/video-poses/drill.avif' },
  { name: 'Zoom Out Riding', image: '/images/generate-page/video-poses/zoomoutriding.avif' },
  { name: 'Sex Spoon', image: '/images/generate-page/video-poses/sexspoon.avif' },
  { name: 'Pussy Licking', image: '/images/generate-page/video-poses/pussylicking.avif' },
  { name: 'Handjob', image: '/images/generate-page/video-poses/handjob.avif' },
  { name: 'Dick Kiss', image: '/images/generate-page/video-poses/dickkiss.avif' },
  { name: 'French Kiss', image: '/images/generate-page/video-poses/frenchkiss.avif' },
  { name: 'Huge Cum', image: '/images/generate-page/video-poses/hugecum.avif' },
  { name: 'Mouth Cum', image: '/images/generate-page/video-poses/mouthcum.avif' },
  { name: 'Squirt', image: '/images/generate-page/video-poses/squirt.avif' },
  { name: 'Ahegao', image: '/images/generate-page/video-poses/ahegao.avif' },
  { name: 'Breast Expand', image: '/images/generate-page/video-poses/breastexpand.avif' },
  { name: 'Bouncing Tits', image: '/images/generate-page/video-poses/bouncingtits.avif' },
  { name: 'Changing Room', image: '/images/generate-page/video-poses/changingroom.avif' },
  { name: 'Pregnant', image: '/images/generate-page/video-poses/pregnant.avif' },
  { name: 'Footjob', image: '/images/generate-page/video-poses/footjob2.avif' },
  { name: 'Stockings Feet', image: '/images/generate-page/video-poses/stockingfeet.avif' },
  { name: 'Heels Feet', image: '/images/generate-page/video-poses/heelsfeet.avif' },
  { name: 'Bare Feet', image: '/images/generate-page/video-poses/barefeet.avif' },
]

// Clothes data - 21 options with preview images
const CLOTHES = [
  { name: 'Custom', image: '/images/generate-page/clothes/custom.avif' },
  { name: 'Sweater', image: '/images/generate-page/clothes/sweater.avif' },
  { name: 'Dress', image: '/images/generate-page/clothes/dress.avif' },
  { name: 'Bikini', image: '/images/generate-page/clothes/bikini.avif' },
  { name: 'Naked', image: '/images/generate-page/clothes/naked.avif' },
  { name: 'Blouse', image: '/images/generate-page/clothes/blouse.avif' },
  { name: 'T-Shirt', image: '/images/generate-page/clothes/tshirt.avif' },
  { name: 'Tank Top', image: '/images/generate-page/clothes/tanktop.avif' },
  { name: 'Crop Top', image: '/images/generate-page/clothes/cropbra.avif' },
  { name: 'Bra', image: '/images/generate-page/clothes/bra.avif' },
  { name: 'Hoodie', image: '/images/generate-page/clothes/hoodie.avif' },
  { name: 'Jeans', image: '/images/generate-page/clothes/jeans.avif' },
  { name: 'Skirt', image: '/images/generate-page/clothes/skirt.avif' },
  { name: 'Pants', image: '/images/generate-page/clothes/pants.avif' },
  { name: 'Hosiery', image: '/images/generate-page/clothes/hosiery.avif' },
  { name: 'Footwear', image: '/images/generate-page/clothes/footwear.avif' },
  { name: 'Accessories', image: '/images/generate-page/clothes/accessories.avif' },
  { name: 'Makeup', image: '/images/generate-page/clothes/makeup.avif' },
  { name: 'Fit Details', image: '/images/generate-page/clothes/fitdetails.avif' },
  { name: 'Outerwear', image: '/images/generate-page/clothes/outerwear.avif' },
  { name: 'Headwear', image: '/images/generate-page/clothes/headwear.avif' },
]

// Backgrounds data - 34 options with preview images
const BACKGROUNDS = [
  'Custom', 'Bathroom', 'Kitchen', 'Bedroom', 'Living Room', 'Backyard',
  'Hallway', 'Red Bed', 'Carpet', 'Greenhouse', 'Rooftop', 'Poolside',
  'Luxury Pool', 'Beach', 'Office', 'DJ Room', 'Balcony Trees',
  'City Balcony', 'White Architecture', 'Cozy Living', 'Boat Deck',
  'Urban Park', 'Cozy Cafe', 'Modern Gym', 'Classic Library',
  'Mountain Balcony', 'Neon Bar', 'Fine Dining', 'Sunset Beach',
  'Vineyard Hills', 'Fireplace Room', 'Rooftop Pool', 'Desert Dunes',
  'Piano Lounge'
]

// Image paths
const POSE_PLACEHOLDER = '/images/generate-page/pose-card-placeholder.avif'
const CLOTHES_PLACEHOLDER = '/images/generate-page/clothes-card-placeholder.avif'
const BG_PLACEHOLDER = '/images/generate-page/background-card-placeholder.avif'

// Get background image path
const getBgImagePath = (name: string) => {
  const nameMap: Record<string, string> = {
    'Living Room': 'livingroom',
    'Red Bed': 'redbed',
    'Luxury Pool': 'luxurypool',
    'Balcony Trees': 'balconytrees',
    'City Balcony': 'citybalcony',
    'White Architecture': 'whitearchitecture',
    'Cozy Living': 'cozyliving',
    'Boat Deck': 'boatdeck',
    'Urban Park': 'urbanpark',
    'Cozy Cafe': 'cozycafe',
    'Modern Gym': 'moderngym',
    'Classic Library': 'classiclibrary',
    'Mountain Balcony': 'mountainbalcony',
    'Neon Bar': 'neonbar',
    'Fine Dining': 'finedining',
    'Sunset Beach': 'sunsetbeach',
    'Vineyard Hills': 'vineyardhills',
    'Fireplace Room': 'fireplaceroom',
    'Rooftop Pool': 'rooftoppool',
    'Desert Dunes': 'desertdunes',
    'Piano Lounge': 'pianolounge'
  }
  const key = nameMap[name] || name.toLowerCase().replace(/\s+/g, '')
  return `/images/generate-page/backgrounds/${key}.avif`
}

const ASPECT_RATIOS = [
  { ratio: '1:1', desc: 'Square' },
  { ratio: '16:9', desc: 'Landscape' },
  { ratio: '9:16', desc: 'Portrait' },
  { ratio: '4:3', desc: 'Standard' },
]

const QUALITIES = [
  { name: 'Standard', desc: 'Fast generation' },
  { name: 'HD', desc: 'Better quality' },
  { name: 'Ultra', desc: 'Best quality' },
]

const CHARACTER_TYPES = ['Realistic', 'Anime', 'Custom']

type GenerationMode = 'presets' | 'custom' | 'i2v'
type ContentTab = 'presets' | 'action' | 'clothes' | 'background' | 'advanced'

export default function Generate() {
  const [selectedChar, setSelectedChar] = useState(characters[0])
  const [charIndex, setCharIndex] = useState(0)
  const [showCharPicker, setShowCharPicker] = useState(false)
  const [charTypeFilter, setCharTypeFilter] = useState('Realistic')
  const [charSearch, setCharSearch] = useState('')
  const [mode, setMode] = useState<'video' | 'image'>('video')
  const [genMode, setGenMode] = useState<GenerationMode>('presets')
  const [showGenModeDialog, setShowGenModeDialog] = useState(false)
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [showClothesDialog, setShowClothesDialog] = useState(false)
  const [showBgDialog, setShowBgDialog] = useState(false)
  const [showAdvancedDialog, setShowAdvancedDialog] = useState(false)
  const [activeTab, setActiveTab] = useState<ContentTab>('presets')
  const [selectedPreset, setSelectedPreset] = useState('')
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedBg, setSelectedBg] = useState('')
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [quality, setQuality] = useState('HD')
  const [customPrompt, setCustomPrompt] = useState('')
  const [actionSearch, setActionSearch] = useState('')
  const [clothesSearch, setClothesSearch] = useState('')
  const [bgSearch, setBgSearch] = useState('')

  // Navigate through characters
  const navigateChar = (dir: 1 | -1) => {
    const newIndex = charIndex + dir
    if (newIndex >= 0 && newIndex < characters.length) {
      setCharIndex(newIndex)
      setSelectedChar(characters[newIndex])
    } else if (newIndex < 0 && characters.length > 0) {
      setCharIndex(characters.length - 1)
      setSelectedChar(characters[characters.length - 1])
    } else if (newIndex >= characters.length && characters.length > 0) {
      setCharIndex(0)
      setSelectedChar(characters[0])
    }
  }

  // Filter characters by type and search
  const filteredChars = characters.filter(c => {
    const matchesType = charTypeFilter === 'All' || c.type === charTypeFilter.toLowerCase()
    const matchesSearch = c.name.toLowerCase().includes(charSearch.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleCharSelect = (char: typeof characters[0]) => {
    setSelectedChar(char)
    setCharIndex(characters.findIndex(c => c.id === char.id))
    setShowCharPicker(false)
    setCharSearch('')
  }

  // Filter actions by search (using action.name)
  const filteredActions = ACTIONS.filter(a =>
    a.name.toLowerCase().includes(actionSearch.toLowerCase())
  )

  // Filter clothes by search (using cloth.name)
  const filteredClothes = CLOTHES.filter(c =>
    c.name.toLowerCase().includes(clothesSearch.toLowerCase())
  )

  // Filter backgrounds by search
  const filteredBackgounds = BACKGROUNDS.filter(b =>
    b.toLowerCase().includes(bgSearch.toLowerCase())
  )

  // Handle tab click - open dialog
  const handleTabClick = (tab: ContentTab) => {
    setActiveTab(tab)
    switch (tab) {
      case 'presets':
        setShowGenModeDialog(true)
        break
      case 'action':
        setShowActionDialog(true)
        break
      case 'clothes':
        setShowClothesDialog(true)
        break
      case 'background':
        setShowBgDialog(true)
        break
      case 'advanced':
        setShowAdvancedDialog(true)
        break
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-24">
      {/* Header with Character Navigation */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[6%]">
        <button
          onClick={() => navigateChar(-1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/[8%] transition-colors active:scale-95"
        >
          <ChevronLeft size={22} className="text-white/60" />
        </button>

        <button
          onClick={() => setShowCharPicker(true)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[4%] border border-white/[8%] hover:bg-white/[8%] hover:border-white/[15%] transition-all"
        >
          <div className="size-10 rounded-full overflow-hidden ring-2 ring-[#d05bf8]/30">
            <img src={selectedChar.avatar} alt={selectedChar.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <span className="text-[14px] font-semibold block">{selectedChar.name}</span>
            <span className="text-[11px] text-white/40">{selectedChar.age || 'AI Companion'}</span>
          </div>
          <ChevronDown size={16} className="text-white/40 ml-1" />
        </button>

        <button
          onClick={() => navigateChar(1)}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/[8%] transition-colors active:scale-95"
        >
          <ChevronRight size={22} className="text-white/60" />
        </button>
      </div>

      {/* Mode Tabs - Video/Image */}
      <div className="flex items-center gap-2 px-4 py-4">
        <button
          onClick={() => setMode('video')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
            mode === 'video'
              ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg shadow-[#d05bf8]/25'
              : 'bg-white/[4%] text-white/50 hover:bg-white/[8%] hover:text-white/70'
          }`}
        >
          <Video size={16} />
          Video
        </button>
        <button
          onClick={() => setMode('image')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${
            mode === 'image'
              ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg shadow-[#d05bf8]/25'
              : 'bg-white/[4%] text-white/50 hover:bg-white/[8%] hover:text-white/70'
          }`}
        >
          <ImageIcon size={16} />
          Image
        </button>
      </div>

      {/* Content Tabs */}
      <div className="flex gap-1.5 px-4 pb-4 overflow-x-auto no-scrollbar">
        {[
          { key: 'presets', icon: Sparkles, label: 'Presets' },
          { key: 'action', icon: null, label: 'Action', emoji: '🏃' },
          { key: 'clothes', icon: Shirt, label: 'Clothes' },
          { key: 'background', icon: Mountain, label: 'Background' },
          { key: 'advanced', icon: Settings2, label: 'Advanced' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key as ContentTab)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white/[10%] text-white shadow-sm'
                : 'text-white/40 hover:text-white/70 hover:bg-white/[4%]'
            }`}
          >
            {tab.key === 'action' ? (
              <span className="text-base">{tab.emoji}</span>
            ) : tab.icon ? (
              <tab.icon size={14} />
            ) : null}
            {tab.label}
            <ChevronDown size={10} className="text-white/30" />
          </button>
        ))}
      </div>

      {/* Select Character Button */}
      <div className="px-4">
        <button
          onClick={() => setShowCharPicker(true)}
          className="w-full py-4 rounded-2xl bg-white/[5%] border border-white/[8%] hover:bg-white/[8%] hover:border-white/[15%] transition-all text-center"
        >
          <span className="text-[14px] font-semibold">Select Character</span>
        </button>
      </div>

      {/* Generation Mode Dialog */}
      {showGenModeDialog && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%]">
              <h2 className="text-[17px] font-bold">Generation Mode</h2>
              <button
                onClick={() => setShowGenModeDialog(false)}
                className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mode Options */}
            <div className="p-4 space-y-3">
              {/* Presets Mode */}
              <button
                onClick={() => { setGenMode('presets'); setShowGenModeDialog(false) }}
                className="w-full p-4 rounded-[18px] bg-white/[5%] border border-white/[8%] hover:bg-white/[8%] hover:border-white/[15%] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-semibold mb-1">Presets</div>
                    <div className="text-[12px] text-white/40">Ready-made presets for quick generation</div>
                  </div>
                </div>
              </button>

              {/* Custom Video Mode */}
              <button
                onClick={() => { setGenMode('custom'); setShowGenModeDialog(false) }}
                className="w-full p-4 rounded-[18px] bg-white/[5%] border border-white/[8%] hover:bg-white/[8%] hover:border-white/[15%] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Wand2 size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-semibold mb-1">Custom Video</div>
                    <div className="text-[12px] text-white/40">Write custom prompts for unique content</div>
                  </div>
                </div>
              </button>

              {/* Image to Video */}
              <button
                onClick={() => { setGenMode('i2v'); setShowGenModeDialog(false) }}
                className="w-full p-4 rounded-[18px] bg-white/[5%] border border-white/[8%] hover:bg-white/[8%] hover:border-white/[15%] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Upload size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] font-semibold mb-1">Image to Video</div>
                    <div className="text-[12px] text-white/40">Animate uploaded images into videos</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Safe Area Bottom */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Action Dialog */}
      {showActionDialog && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%]">
              <h2 className="text-[17px] font-bold">Select Action</h2>
              <button
                onClick={() => setShowActionDialog(false)}
                className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={actionSearch}
                  onChange={e => setActionSearch(e.target.value)}
                  placeholder="Search actions..."
                  className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-colors"
                />
              </div>
            </div>

            {/* Actions Grid */}
            <div className="overflow-y-auto flex-1 px-5 pb-6">
              <div className="grid grid-cols-4 gap-2">
                {filteredActions.map(action => (
                  <button
                    key={action.name}
                    onClick={() => { setSelectedAction(action.name); setShowActionDialog(false) }}
                    className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-200 ${
                      selectedAction === action.name
                        ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={action.image}
                      alt={action.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5">
                      <span className="text-[10px] font-medium text-white truncate block">{action.name}</span>
                    </div>
                    {selectedAction === action.name && (
                      <div className="absolute top-1.5 right-1.5 size-4 rounded-full bg-white flex items-center justify-center">
                        <svg className="size-2.5 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Safe Area Bottom */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Clothes Dialog */}
      {showClothesDialog && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%]">
              <h2 className="text-[17px] font-bold">Select Clothes</h2>
              <button
                onClick={() => setShowClothesDialog(false)}
                className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={clothesSearch}
                  onChange={e => setClothesSearch(e.target.value)}
                  placeholder="Search clothes..."
                  className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-colors"
                />
              </div>
            </div>

            {/* Clothes Grid */}
            <div className="overflow-y-auto flex-1 px-5 pb-6">
              <div className="grid grid-cols-4 gap-2">
                {filteredClothes.map(cloth => (
                  <button
                    key={cloth.name}
                    onClick={() => { setSelectedClothes(cloth.name); setShowClothesDialog(false) }}
                    className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-200 ${
                      selectedClothes === cloth.name
                        ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={cloth.image}
                      alt={cloth.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5">
                      <span className="text-[10px] font-medium text-white truncate block">{cloth.name}</span>
                    </div>
                    {selectedClothes === cloth.name && (
                      <div className="absolute top-1.5 right-1.5 size-4 rounded-full bg-white flex items-center justify-center">
                        <svg className="size-2.5 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Safe Area Bottom */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Background Dialog */}
      {showBgDialog && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%]">
              <h2 className="text-[17px] font-bold">Select Background</h2>
              <button
                onClick={() => setShowBgDialog(false)}
                className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={bgSearch}
                  onChange={e => setBgSearch(e.target.value)}
                  placeholder="Search backgrounds..."
                  className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-colors"
                />
              </div>
            </div>

            {/* Backgrounds Grid */}
            <div className="overflow-y-auto flex-1 px-5 pb-6">
              <div className="grid grid-cols-4 gap-2">
                {filteredBackgounds.map(bg => (
                  <button
                    key={bg}
                    onClick={() => { setSelectedBg(bg); setShowBgDialog(false) }}
                    className={`relative aspect-video rounded-xl overflow-hidden border transition-all duration-200 ${
                      selectedBg === bg
                        ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={getBgImagePath(bg)}
                      alt={bg}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5">
                      <span className="text-[10px] font-medium text-white truncate block">{bg}</span>
                    </div>
                    {selectedBg === bg && (
                      <div className="absolute top-1.5 right-1.5 size-4 rounded-full bg-white flex items-center justify-center">
                        <svg className="size-2.5 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Safe Area Bottom */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Advanced Settings Dialog */}
      {showAdvancedDialog && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%]">
              <h2 className="text-[17px] font-bold">Advanced Settings</h2>
              <button
                onClick={() => setShowAdvancedDialog(false)}
                className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-6">
              {/* Custom Prompt */}
              <div className="space-y-2">
                <label className="text-[12px] text-white/50 font-medium">Custom Prompt</label>
                <textarea
                  value={customPrompt}
                  onChange={e => setCustomPrompt(e.target.value)}
                  placeholder="Describe the scene, mood, and actions in detail..."
                  rows={4}
                  maxLength={1000}
                  className="w-full bg-white/[4%] border border-white/[8%] rounded-xl py-3.5 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#d05bf8]/40 resize-none transition-colors"
                />
                <div className="text-right text-[11px] text-white/20">{customPrompt.length}/1000</div>
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-3">
                <label className="text-[12px] text-white/50 font-medium">Aspect Ratio</label>
                <div className="grid grid-cols-4 gap-2">
                  {ASPECT_RATIOS.map(r => (
                    <button
                      key={r.ratio}
                      onClick={() => setAspectRatio(r.ratio)}
                      className={`px-3 py-3 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                        aspectRatio === r.ratio
                          ? 'bg-gradient-to-r from-[#d05bf8]/30 to-[#ff18a0]/30 border border-[#d05bf8]/50 text-white'
                          : 'bg-white/[4%] border border-white/[8%] text-white/50 hover:text-white/70'
                      }`}
                    >
                      <div className="font-semibold">{r.ratio}</div>
                      <div className="text-[10px] text-white/30 mt-0.5">{r.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality */}
              <div className="space-y-3">
                <label className="text-[12px] text-white/50 font-medium">Quality</label>
                <div className="flex gap-2">
                  {QUALITIES.map(q => (
                    <button
                      key={q.name}
                      onClick={() => setQuality(q.name)}
                      className={`flex-1 px-4 py-3 rounded-xl text-[12px] font-semibold transition-all duration-200 ${
                        quality === q.name
                          ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg'
                          : 'bg-white/[4%] border border-white/[8%] text-white/50 hover:text-white/70'
                      }`}
                    >
                      {q.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Safe Area Bottom */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Character Picker Modal */}
      {showCharPicker && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%]">
              <h2 className="text-[17px] font-bold">Select Model</h2>
              <button
                onClick={() => setShowCharPicker(false)}
                className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Type Filter Tabs */}
            <div className="flex gap-2 px-5 py-4 overflow-x-auto no-scrollbar">
              {['All', ...CHARACTER_TYPES].map(type => (
                <button
                  key={type}
                  onClick={() => setCharTypeFilter(type)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
                    charTypeFilter === type
                      ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                      : 'bg-white/[5%] text-white/50 hover:bg-white/[8%]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="px-5 pb-4">
              <input
                type="text"
                value={charSearch}
                onChange={e => setCharSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-colors"
              />
            </div>

            {/* Character List */}
            <div className="overflow-y-auto flex-1 px-5 pb-6 space-y-1">
              {filteredChars.length === 0 ? (
                <div className="text-center py-8 text-white/40 text-[14px]">
                  No models found
                </div>
              ) : (
                filteredChars.map(char => (
                  <button
                    key={char.id}
                    onClick={() => handleCharSelect(char)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/[6%] transition-all ${
                      selectedChar.id === char.id ? 'bg-white/[8%] ring-1 ring-[#d05bf8]/30' : ''
                    }`}
                  >
                    <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/[10%]">
                      <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-[15px] font-semibold">{char.name}</div>
                      {char.age && <div className="text-[12px] text-white/40">{char.age}</div>}
                    </div>
                    {selectedChar.id === char.id && (
                      <div className="size-6 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                        <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Safe Area Bottom */}
            <div className="h-6" />
          </div>
        </div>
      )}
    </div>
  )
}