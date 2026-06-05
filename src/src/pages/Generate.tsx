import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, X, Image as ImageIcon, Video, Shirt, Mountain, Settings2, Search, Plus, Sparkles, Wand2, Upload } from 'lucide-react'
import { characters } from '../data/characters'

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

const getBgImagePath = (name: string) => {
  const nameMap: Record<string, string> = {
    'Living Room': 'livingroom', 'Red Bed': 'redbed', 'Luxury Pool': 'luxurypool',
    'Balcony Trees': 'balconytrees', 'City Balcony': 'citybalcony',
    'White Architecture': 'whitearchitecture', 'Cozy Living': 'cozyliving',
    'Boat Deck': 'boatdeck', 'Urban Park': 'urbanpark', 'Cozy Cafe': 'cozycafe',
    'Modern Gym': 'moderngym', 'Classic Library': 'classiclibrary',
    'Mountain Balcony': 'mountainbalcony', 'Neon Bar': 'neonbar',
    'Fine Dining': 'finedining', 'Sunset Beach': 'sunsetbeach',
    'Vineyard Hills': 'vineyardhills', 'Fireplace Room': 'fireplaceroom',
    'Rooftop Pool': 'rooftoppool', 'Desert Dunes': 'desertdunes',
    'Piano Lounge': 'pianolounge'
  }
  const key = nameMap[name] || name.toLowerCase().replace(/\s+/g, '')
  return `/images/generate-page/backgrounds/${key}.avif`
}

const getActionImage = (name: string) => ACTIONS.find(a => a.name === name)?.image || ''
const getClothesImage = (name: string) => CLOTHES.find(c => c.name === name)?.image || ''

const CHARACTER_TYPES = ['Realistic', 'Anime', 'Custom']

export default function Generate() {
  const [selectedChar, setSelectedChar] = useState(characters[0])
  const [charIndex, setCharIndex] = useState(0)
  const [showCharPicker, setShowCharPicker] = useState(false)
  const [charTypeFilter, setCharTypeFilter] = useState('Realistic')
  const [charSearch, setCharSearch] = useState('')
  const [mode, setMode] = useState<'video' | 'image'>('video')
  const [activeDialog, setActiveDialog] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedBg, setSelectedBg] = useState('')
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [quality, setQuality] = useState('HD')
  const [customPrompt, setCustomPrompt] = useState('')
  const [actionSearch, setActionSearch] = useState('')
  const [clothesSearch, setClothesSearch] = useState('')
  const [bgSearch, setBgSearch] = useState('')

  const navigateChar = (dir: 1 | -1) => {
    const newIndex = charIndex + dir
    if (newIndex >= 0 && newIndex < characters.length) {
      setCharIndex(newIndex); setSelectedChar(characters[newIndex])
    } else if (characters.length > 0) {
      const idx = dir === 1 ? 0 : characters.length - 1
      setCharIndex(idx); setSelectedChar(characters[idx])
    }
  }

  const filteredChars = characters.filter(c => {
    const matchesType = charTypeFilter === 'All' || c.type === charTypeFilter.toLowerCase()
    return matchesType && c.name.toLowerCase().includes(charSearch.toLowerCase())
  })
  const filteredActions = ACTIONS.filter(a => a.name.toLowerCase().includes(actionSearch.toLowerCase()))
  const filteredClothes = CLOTHES.filter(c => c.name.toLowerCase().includes(clothesSearch.toLowerCase()))
  const filteredBgs = BACKGROUNDS.filter(b => b.toLowerCase().includes(bgSearch.toLowerCase()))

  const canGenerate = selectedAction || selectedClothes || selectedBg

  const closeDialog = () => setActiveDialog(null)

  // Generic dialog renderer
  const renderDialog = () => {
    if (!activeDialog) return null

    let title = ''
    let content: React.ReactNode = null

    if (activeDialog === 'action') {
      title = 'Select Action'
      content = (
        <>
          <div className="px-5 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" value={actionSearch} onChange={e => setActionSearch(e.target.value)}
                placeholder="Search actions..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 px-5 pb-6">
            <div className="grid grid-cols-3 gap-3">
              {filteredActions.map(action => (
                <div key={action.name}
                  data-action={action.name}
                  onClick={() => { setSelectedAction(action.name); closeDialog() }}
                  role="button" tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') { setSelectedAction(action.name); closeDialog() } }}
                  className={`cursor-pointer relative rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] w-[220px] h-[250px] ${
                    selectedAction === action.name ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20' : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  <img src={action.image} alt={action.name} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <span className="text-[11px] font-medium text-white truncate block">{action.name}</span>
                  </div>
                  {selectedAction === action.name && (
                    <div className="absolute top-2 right-2 size-5 rounded-full bg-white flex items-center justify-center pointer-events-none">
                      <svg className="size-3 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )
    } else if (activeDialog === 'clothes') {
      title = 'Select Clothes'
      content = (
        <>
          <div className="px-5 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" value={clothesSearch} onChange={e => setClothesSearch(e.target.value)}
                placeholder="Search clothes..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 px-5 pb-6">
            <div className="grid grid-cols-3 gap-3">
              {filteredClothes.map(cloth => (
                <div key={cloth.name}
                  onClick={() => { setSelectedClothes(cloth.name); closeDialog() }}
                  role="button" tabIndex={0}
                  className={`cursor-pointer relative rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] w-[220px] h-[250px] ${
                    selectedClothes === cloth.name ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20' : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  <img src={cloth.image} alt={cloth.name} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <span className="text-[11px] font-medium text-white truncate block">{cloth.name}</span>
                  </div>
                  {selectedClothes === cloth.name && (
                    <div className="absolute top-2 right-2 size-5 rounded-full bg-white flex items-center justify-center pointer-events-none">
                      <svg className="size-3 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )
    } else if (activeDialog === 'background') {
      title = 'Select Background'
      content = (
        <>
          <div className="px-5 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" value={bgSearch} onChange={e => setBgSearch(e.target.value)}
                placeholder="Search backgrounds..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 px-5 pb-6">
            <div className="grid grid-cols-3 gap-3">
              {filteredBgs.map(bg => (
                <div key={bg}
                  onClick={() => { setSelectedBg(bg); closeDialog() }}
                  role="button" tabIndex={0}
                  className={`cursor-pointer relative rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] w-[220px] h-[250px] ${
                    selectedBg === bg ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20' : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  <img src={getBgImagePath(bg)} alt={bg} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <span className="text-[11px] font-medium text-white truncate block">{bg}</span>
                  </div>
                  {selectedBg === bg && (
                    <div className="absolute top-2 right-2 size-5 rounded-full bg-white flex items-center justify-center pointer-events-none">
                      <svg className="size-3 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )
    } else if (activeDialog === 'advanced') {
      title = 'Advanced Settings'
      content = (
        <div className="px-5 py-4 space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] text-white/50 font-medium">Custom Prompt</label>
            <textarea value={customPrompt} onChange={e => setCustomPrompt(e.target.value)}
              placeholder="Describe the scene, mood, and actions in detail..."
              rows={4} maxLength={1000}
              className="w-full bg-white/[4%] border border-white/[8%] rounded-xl py-3.5 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#d05bf8]/40 resize-none" />
            <div className="text-right text-[11px] text-white/20">{customPrompt.length}/1000</div>
          </div>
          <div className="space-y-3">
            <label className="text-[12px] text-white/50 font-medium">Aspect Ratio</label>
            <div className="grid grid-cols-4 gap-2">
              {[{ r: '1:1', d: 'Square' }, { r: '16:9', d: 'Landscape' }, { r: '9:16', d: 'Portrait' }, { r: '4:3', d: 'Standard' }].map(item => (
                <button key={item.r} onClick={() => setAspectRatio(item.r)}
                  className={`px-3 py-3 rounded-xl text-[13px] font-medium transition-all ${aspectRatio === item.r ? 'bg-gradient-to-r from-[#d05bf8]/30 to-[#ff18a0]/30 border border-[#d05bf8]/50 text-white' : 'bg-white/[4%] border border-white/[8%] text-white/50'}`}>
                  <div className="font-semibold">{item.r}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">{item.d}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[12px] text-white/50 font-medium">Quality</label>
            <div className="flex gap-2">
              {['Standard', 'HD', 'Ultra'].map(q => (
                <button key={q} onClick={() => setQuality(q)}
                  className={`flex-1 px-4 py-3 rounded-xl text-[12px] font-semibold transition-all ${quality === q ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg' : 'bg-white/[4%] border border-white/[8%] text-white/50'}`}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    } else if (activeDialog === 'presets') {
      title = 'Generation Mode'
      content = (
        <div className="p-4 space-y-3">
          {[
            { key: 'presets', icon: Sparkles, color: 'from-purple-500 to-pink-500', label: 'Presets', desc: 'Ready-made presets for quick generation' },
            { key: 'custom', icon: Wand2, color: 'from-blue-500 to-cyan-500', label: 'Custom Video', desc: 'Write custom prompts for unique content' },
            { key: 'i2v', icon: Upload, color: 'from-orange-500 to-amber-500', label: 'Image to Video', desc: 'Animate uploaded images into videos' },
          ].map(item => (
            <button key={item.key} onClick={closeDialog}
              className="w-full p-4 rounded-[18px] bg-white/[5%] border border-white/[8%] hover:bg-white/[8%] transition-all text-left group">
              <div className="flex items-start gap-4">
                <div className={`size-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <item.icon size={22} />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold mb-1">{item.label}</div>
                  <div className="text-[12px] text-white/40">{item.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )
    }

    return (
      <div className="fixed inset-0 z-[200] flex flex-col" style={{ pointerEvents: 'auto' }}>
        {/* Backdrop - clicks close dialog */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeDialog} />
        {/* Dialog content - positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col items-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]" style={{ pointerEvents: 'auto' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%] shrink-0">
              <h2 className="text-[17px] font-bold">{title}</h2>
              <button onClick={closeDialog} className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%] transition-colors">
                <X size={20} />
              </button>
            </div>
            {content}
            <div className="h-6 shrink-0" />
          </div>
        </div>
      </div>
    )
  }

  // Character Picker Modal
  const renderCharPicker = () => {
    if (!showCharPicker) return null
    return (
      <div className="fixed inset-0 z-[200] flex flex-col">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCharPicker(false)} />
        <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col items-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%] shrink-0">
              <h2 className="text-[17px] font-bold">Select Model</h2>
              <button onClick={() => setShowCharPicker(false)} className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%]">
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-2 px-5 py-4 overflow-x-auto no-scrollbar shrink-0">
              {['All', ...CHARACTER_TYPES].map(type => (
                <button key={type} onClick={() => setCharTypeFilter(type)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${charTypeFilter === type ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[5%] text-white/50'}`}>
                  {type}
                </button>
              ))}
            </div>
            <div className="px-5 pb-4 shrink-0">
              <input type="text" value={charSearch} onChange={e => setCharSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
            <div className="overflow-y-auto flex-1 px-5 pb-6 space-y-1">
              {filteredChars.length === 0 ? (
                <div className="text-center py-8 text-white/40 text-[14px]">No models found</div>
              ) : filteredChars.map(char => (
                <button key={char.id} onClick={() => { setSelectedChar(char); setCharIndex(characters.findIndex(c => c.id === char.id)); setShowCharPicker(false); setCharSearch('') }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/[6%] transition-all ${selectedChar.id === char.id ? 'bg-white/[8%] ring-1 ring-[#d05bf8]/30' : ''}`}>
                  <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/[10%]">
                    <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[15px] font-semibold">{char.name}</div>
                    {char.age && <div className="text-[12px] text-white/40">{char.age}</div>}
                  </div>
                  {selectedChar.id === char.id && (
                    <div className="size-6 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                      <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="h-6 shrink-0" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[6%]">
        <button onClick={() => navigateChar(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-white/[8%] transition-colors active:scale-95">
          <ChevronLeft size={22} className="text-white/60" />
        </button>
        <button onClick={() => setShowCharPicker(true)} className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[4%] border border-white/[8%] hover:bg-white/[8%] transition-all">
          <div className="size-10 rounded-full overflow-hidden ring-2 ring-[#d05bf8]/30">
            <img src={selectedChar.avatar} alt={selectedChar.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <span className="text-[14px] font-semibold block">{selectedChar.name}</span>
            <span className="text-[11px] text-white/40">{selectedChar.age || 'AI Companion'}</span>
          </div>
          <ChevronDown size={16} className="text-white/40 ml-1" />
        </button>
        <button onClick={() => navigateChar(1)} className="flex items-center justify-center size-10 rounded-full hover:bg-white/[8%] transition-colors active:scale-95">
          <ChevronRight size={22} className="text-white/60" />
        </button>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 px-4 py-4">
        {(['video', 'image'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 ${mode === m ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg shadow-[#d05bf8]/25' : 'bg-white/[4%] text-white/50 hover:bg-white/[8%]'}`}>
            {m === 'video' ? <Video size={16} /> : <ImageIcon size={16} />}
            {m === 'video' ? 'Video' : 'Image'}
          </button>
        ))}
      </div>

      {/* Content Tabs */}
      <div className="flex gap-1.5 px-4 pb-4 overflow-x-auto no-scrollbar">
        {[
          { key: 'action', label: 'Action', emoji: '🏃' },
          { key: 'clothes', icon: Shirt, label: 'Clothes' },
          { key: 'background', icon: Mountain, label: 'Background' },
          { key: 'advanced', icon: Settings2, label: 'Advanced' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveDialog(tab.key)}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 text-white/40 hover:text-white/70 hover:bg-white/[4%]">
            {tab.key === 'action' ? <span className="text-base">{tab.emoji}</span> : tab.icon ? <tab.icon size={14} /> : null}
            {tab.label}
            <ChevronDown size={10} className="text-white/30" />
          </button>
        ))}
      </div>

      {/* 3-Slot Preview Grid */}
      <div className="px-4 space-y-3">
        {/* Action Slot */}
        <div onClick={() => setActiveDialog('action')}
          className="cursor-pointer w-full h-[250px] rounded-2xl overflow-hidden border border-white/[8%] hover:border-white/[15%] transition-all relative group">
          {selectedAction ? (
            <>
              <img src={getActionImage(selectedAction)} alt={selectedAction} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[11px] text-white/50 mb-1">Action</div>
                <div className="text-[16px] font-bold">{selectedAction}</div>
              </div>
              <button onClick={e => { e.stopPropagation(); setSelectedAction('') }}
                className="absolute top-3 right-3 size-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center">
                <X size={16} />
              </button>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white/[3%]">
              <Plus size={32} className="text-white/20 mb-2" />
              <span className="text-[14px] text-white/30">Select Action</span>
            </div>
          )}
        </div>

        {/* Clothes + Background */}
        <div className="flex gap-3">
          <div onClick={() => setActiveDialog('clothes')}
            className="cursor-pointer flex-1 h-[200px] rounded-2xl overflow-hidden border border-white/[8%] hover:border-white/[15%] transition-all relative group">
            {selectedClothes ? (
              <>
                <img src={getClothesImage(selectedClothes)} alt={selectedClothes} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] text-white/50 mb-1">Clothes</div>
                  <div className="text-[14px] font-bold">{selectedClothes}</div>
                </div>
                <button onClick={e => { e.stopPropagation(); setSelectedClothes('') }}
                  className="absolute top-2 right-2 size-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center">
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-white/[3%]">
                <Plus size={28} className="text-white/20 mb-2" />
                <span className="text-[13px] text-white/30">Select Clothes</span>
              </div>
            )}
          </div>

          <div onClick={() => setActiveDialog('background')}
            className="cursor-pointer flex-1 h-[200px] rounded-2xl overflow-hidden border border-white/[8%] hover:border-white/[15%] transition-all relative group">
            {selectedBg ? (
              <>
                <img src={getBgImagePath(selectedBg)} alt={selectedBg} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] text-white/50 mb-1">Background</div>
                  <div className="text-[14px] font-bold">{selectedBg}</div>
                </div>
                <button onClick={e => { e.stopPropagation(); setSelectedBg('') }}
                  className="absolute top-2 right-2 size-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center">
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-white/[3%]">
                <Plus size={28} className="text-white/20 mb-2" />
                <span className="text-[13px] text-white/30">Select Background</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="px-4 mt-6">
        {canGenerate ? (
          <button onClick={() => alert(`Generation started! (Demo)\n\nCharacter: ${selectedChar.name}\nAction: ${selectedAction || 'None'}\nClothes: ${selectedClothes || 'None'}\nBackground: ${selectedBg || 'None'}\nMode: ${mode}\nAspect: ${aspectRatio}\nQuality: ${quality}`)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-bold text-[16px] shadow-lg shadow-[#d05bf8]/30 hover:shadow-[#d05bf8]/50 transition-all active:scale-[0.98]">
            Generate {mode === 'video' ? 'Video' : 'Image'}
          </button>
        ) : (
          <div className="w-full py-4 rounded-2xl bg-white/[5%] border border-white/[8%] text-center">
            <span className="text-[14px] font-semibold text-white/40">Select Action, Clothes, or Background</span>
          </div>
        )}
      </div>

      {/* Dialogs */}
      {renderDialog()}
      {renderCharPicker()}
    </div>
  )
}
