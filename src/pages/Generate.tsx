import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, X, Image as ImageIcon, Video, Shirt, Mountain, Search, Plus, Wand2, Upload } from 'lucide-react'
import { characters } from '../data/characters'

// 分隔真实和动漫角色
const REALISTIC_CHARS = characters.filter(c => c.type === 'realistic')
const ANIME_CHARS = characters.filter(c => c.type === 'anime')
const ALL_GENERATION_CHARS = [...REALISTIC_CHARS, ...ANIME_CHARS]

const ACTIONS = [
  { name: 'POV Handjob Cumshot', image: '/images/generate-page/video-poses/povhandjobcumshot.avif', video: '/videos/generate/actions/pov_handjob_cumshot.mp4' },
  { name: 'Titjob Cum', image: '/images/generate-page/video-poses/titjobcum.avif', video: '/videos/generate/actions/titjob_cum.mp4' },
  { name: 'Tongue Blowjob', image: '/images/generate-page/video-poses/tongueblowjob.avif', video: '' },
  { name: 'Couch Lap Blowjob', image: '/images/generate-page/video-poses/couchlapblowjob.avif', video: '/videos/generate/actions/couch_lap_blowjob.mp4' },
  { name: 'Dildo Anal Riding', image: '/images/generate-page/video-poses/dildoanalriding.avif', video: '/videos/generate/actions/dildo_anal_riding.mp4' },
  { name: 'Foot Job #1', image: '/images/generate-page/video-poses/footjob1.avif', video: '/videos/generate/actions/footjob.mp4' },
  { name: 'Shibaru Swing', image: '/images/generate-page/video-poses/shibaruswing.avif', video: '/videos/generate/actions/shibaruswing.mp4' },
  { name: 'BDSM Ass Tease', image: '/images/generate-page/video-poses/bdsmasstease.avif', video: '/videos/generate/actions/bdsm_ass_tease.mp4' },
  { name: 'Tentacle', image: '/images/generate-page/video-poses/tentacle1.avif', video: '/videos/generate/actions/tentacle.mp4' },
  { name: 'Prone Bone', image: '/images/generate-page/video-poses/pronebone.avif', video: '/videos/generate/actions/prone_bone.mp4' },
  { name: 'Doggy', image: '/images/generate-page/video-poses/doggy_from_behind.avif', video: '/videos/generate/actions/doggy.mp4' },
  { name: 'Blowjob', image: '/images/generate-page/video-poses/video_blowjob.avif', video: '/videos/generate/actions/blowjob.mp4' },
  { name: 'POV Missionary', image: '/images/generate-page/video-poses/video_pov_missionary.avif', video: '/videos/generate/actions/pov_missionary.mp4' },
  { name: 'Reverse Cowgirl', image: '/images/generate-page/video-poses/video_reverse_cowgirl.avif', video: '/videos/generate/actions/reverse_cowgirl.mp4' },
  { name: 'Cumshot', image: '/images/generate-page/video-poses/video_cumshot.avif', video: '/videos/generate/actions/cumshot.mp4' },
  { name: 'Pussy Insertion', image: '/images/generate-page/video-poses/pussy_insertion.avif', video: '/videos/generate/actions/pussy_insertion.mp4' },
  { name: 'Jiggle Tits', image: '/images/generate-page/video-poses/jiggle_tits.avif', video: '/videos/generate/actions/jiggletits.mp4' },
  { name: 'Twerk', image: '/images/generate-page/video-poses/twerk.avif', video: '/videos/generate/actions/twerk.mp4' },
  { name: 'Spread Pussy', image: '/images/generate-page/video-poses/spread_pussy.avif', video: '/videos/generate/actions/spread_pussy.mp4' },
  { name: 'Pussy Show', image: '/images/generate-page/video-poses/pussy_show.avif', video: '/videos/generate/actions/pussy_show.mp4' },
  { name: 'Fingering', image: '/images/generate-page/video-poses/video_fingering.avif', video: '/videos/generate/actions/fingering.mp4' },
  { name: 'Dildo', image: '/images/generate-page/video-poses/video_dildo.avif', video: '/videos/generate/actions/dildo.mp4' },
  { name: 'Shirt Lifting', image: '/images/generate-page/video-poses/shirt_lifting.avif', video: '/videos/generate/actions/shirt_lifting.mp4' },
  { name: 'Anal Missionary', image: '/images/generate-page/video-poses/anal_missionary.avif', video: '/videos/generate/actions/anal_missionary.mp4' },
  { name: 'Doggy Kneel', image: '/images/generate-page/video-poses/doggy_kneel.avif', video: '/videos/generate/actions/doggy_kneel.mp4' },
  { name: 'Drill', image: '/images/generate-page/video-poses/drill.avif', video: '/videos/generate/actions/drill.mp4' },
  { name: 'Zoom Out Riding', image: '/images/generate-page/video-poses/zoom_out_riding.avif', video: '/videos/generate/actions/zoomoutriding.mp4' },
  { name: 'Sex Spoon', image: '/images/generate-page/video-poses/sex_spoon.avif', video: '/videos/generate/actions/sex_spoon.mp4' },
  { name: 'Pussy Licking', image: '/images/generate-page/video-poses/pussy_licking.avif', video: '/videos/generate/actions/pussy_licking.mp4' },
  { name: 'Handjob', image: '/images/generate-page/video-poses/video_handjob.avif', video: '/videos/generate/actions/handjob.mp4' },
  { name: 'Dick Kiss', image: '/images/generate-page/video-poses/dick_kiss.avif', video: '/videos/generate/actions/dick_kiss.mp4' },
  { name: 'French Kiss', image: '/images/generate-page/video-poses/french_kiss.avif', video: '/videos/generate/actions/french_kiss.mp4' },
  { name: 'Huge Cum', image: '/images/generate-page/video-poses/huge_cum.avif', video: '/videos/generate/actions/huge_cum.mp4' },
  { name: 'Mouth Cum', image: '/images/generate-page/video-poses/mouth_cum.avif', video: '/videos/generate/actions/mouth_cum.mp4' },
  { name: 'Squirt', image: '/images/generate-page/video-poses/squirt.avif', video: '/videos/generate/actions/squirt.mp4' },
  { name: 'Ahegao', image: '/images/generate-page/video-poses/video_ahegao.avif', video: '/videos/generate/actions/ahegao.mp4' },
  { name: 'Breast Expand', image: '/images/generate-page/video-poses/breast_expand.avif', video: '/videos/generate/actions/breast_expand.mp4' },
  { name: 'Bouncing Tits', image: '/images/generate-page/video-poses/breast_expand.avif', video: '/videos/generate/actions/bouncingtits.mp4' },
  { name: 'Changing Room', image: '/images/generate-page/video-poses/breast_expand.avif', video: '/videos/generate/actions/changing_room.mp4' },
  { name: 'Pregnant', image: '/images/generate-page/video-poses/pregnant.avif', video: '/videos/generate/actions/pregnant.mp4' },
  { name: 'Footjob', image: '/images/generate-page/video-poses/video_footjob.avif', video: '/videos/generate/actions/footjob.mp4' },
  { name: 'Stockings Feet', image: '/images/generate-page/video-poses/stockings_feet.avif', video: '/videos/generate/actions/stockingfeet.mp4' },
  { name: 'Heels Feet', image: '/images/generate-page/video-poses/heels_feet.avif', video: '/videos/generate/actions/heelsfeet.mp4' },
  { name: 'Bare Feet', image: '/images/generate-page/video-poses/bare_feet.avif', video: '/videos/generate/actions/barefeet.mp4' },
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
const getActionVideo = (name: string) => ACTIONS.find(a => a.name === name)?.video || ''
const getClothesImage = (name: string) => CLOTHES.find(c => c.name === name)?.image || ''

// 生成模式类型
type GenerationMode = 'model-video' | 'model-image' | 'custom-video' | 'custom-image'

export default function Generate() {
  // 当前模式
  const [mode, setMode] = useState<GenerationMode>('model-video')
  
  // 选中的角色（模型生成用）
  const [selectedChar, setSelectedChar] = useState(REALISTIC_CHARS[0] || characters[0])
  const [charIndex, setCharIndex] = useState(0)
  const [showCharPicker, setShowCharPicker] = useState(false)
  const [charTypeFilter, setCharTypeFilter] = useState<'All' | 'Realistic' | 'Anime'>('Realistic')
  const [charSearch, setCharSearch] = useState('')
  
  // 选中的动作/衣服/背景
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedBg, setSelectedBg] = useState('')
  
  // 模型视频设置
  const [videoQuantity, setVideoQuantity] = useState(1)
  const [videoResolution, setVideoResolution] = useState('1080p')
  
  // 模型图片设置
  const [imageQuantity, setImageQuantity] = useState(1)
  const [imageAspect, setImageAspect] = useState('1:1')
  const [imageResolution, setImageResolution] = useState('1080p')
  
  // 自定义视频设置
  const [customVideoQuantity, setCustomVideoQuantity] = useState(1)
  const [customVideoDuration, setCustomVideoDuration] = useState(5)
  const [customVideoAspect, setCustomVideoAspect] = useState('16:9')
  const [customVideoResolution, setCustomVideoResolution] = useState('1080p')
  const [customVideoPrompt, setCustomVideoPrompt] = useState('')
  const [customVideoNegative, setCustomVideoNegative] = useState('')
  
  // 自定义图片设置
  const [customImageQuantity, setCustomImageQuantity] = useState(1)
  const [customImageAspect, setCustomImageAspect] = useState('1:1')
  const [customImageResolution, setCustomImageResolution] = useState('1080p')
  const [customImagePrompt, setCustomImagePrompt] = useState('')
  const [customImageNegative, setCustomImageNegative] = useState('')
  
  // 对话框状态
  const [activeDialog, setActiveDialog] = useState<string | null>(null)
  const [actionSearch, setActionSearch] = useState('')
  const [clothesSearch, setClothesSearch] = useState('')
  const [bgSearch, setBgSearch] = useState('')
  
  // 是否使用模型
  const isModelMode = mode === 'model-video' || mode === 'model-image'
  
  // 根据模式获取角色列表
  const getFilteredChars = () => {
    if (charTypeFilter === 'Anime') return ANIME_CHARS
    if (charTypeFilter === 'Realistic') return REALISTIC_CHARS
    return [...REALISTIC_CHARS, ...ANIME_CHARS]
  }
  
  // 导航角色
  const navigateChar = (dir: 1 | -1) => {
    const filtered = getFilteredChars()
    const newIndex = charIndex + dir
    if (newIndex >= 0 && newIndex < filtered.length) {
      setCharIndex(newIndex)
      setSelectedChar(filtered[newIndex])
    } else if (filtered.length > 0) {
      const idx = dir === 1 ? 0 : filtered.length - 1
      setCharIndex(idx)
      setSelectedChar(filtered[idx])
    }
  }
  
  // 过滤后的数据
  const filteredChars = getFilteredChars().filter(c => 
    c.name.toLowerCase().includes(charSearch.toLowerCase())
  )
  const filteredActions = ACTIONS.filter(a => a.name.toLowerCase().includes(actionSearch.toLowerCase()))
  const filteredClothes = CLOTHES.filter(c => c.name.toLowerCase().includes(clothesSearch.toLowerCase()))
  const filteredBgs = BACKGROUNDS.filter(b => b.toLowerCase().includes(bgSearch.toLowerCase()))
  
  // 是否可以生成
  const canGenerate = isModelMode 
    ? (selectedAction || selectedClothes || selectedBg)
    : (customVideoPrompt.trim() || customImagePrompt.trim())
  
  const closeDialog = () => setActiveDialog(null)
  
  // 模式标签
  const modeTabs = [
    { key: 'model-video' as const, icon: Video, label: 'Model Video' },
    { key: 'model-image' as const, icon: ImageIcon, label: 'Model Image' },
    { key: 'custom-video' as const, icon: Wand2, label: 'Custom Video' },
    { key: 'custom-image' as const, icon: Upload, label: 'Custom Image' },
  ]
  
  // 角色选择器
  const renderCharPicker = () => {
    if (!showCharPicker) return null
    const filtered = getFilteredChars()
    return (
      <div className="fixed inset-0 z-[200] flex flex-col">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCharPicker(false)} />
        <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col items-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%] shrink-0">
              <h2 className="text-[17px] font-bold">Select Model</h2>
              <button onClick={() => setShowCharPicker(false)} className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%]">
                <X size={20} />
              </button>
            </div>
            {/* Realistic / Anime 标签 */}
            <div className="flex gap-2 px-5 py-4 shrink-0">
              {(['All', 'Realistic', 'Anime'] as const).map(type => (
                <button key={type} onClick={() => { setCharTypeFilter(type); setCharIndex(0) }}
                  className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${charTypeFilter === type ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[5%] text-white/50'}`}>
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
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-white/40 text-[14px]">
                  {charTypeFilter === 'Anime' ? 'No anime models available yet' : 'No models found'}
                </div>
              ) : filtered.map((char, i) => (
                <button key={char.id} onClick={() => { 
                  setSelectedChar(char)
                  const allFiltered = filtered
                  setCharIndex(allFiltered.findIndex(c => c.id === char.id))
                  setShowCharPicker(false)
                  setCharSearch('')
                }}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/[6%] transition-all ${selectedChar.id === char.id ? 'bg-white/[8%] ring-1 ring-[#d05bf8]/30' : ''}`}>
                  <div className="size-12 rounded-full overflow-hidden ring-2 ring-white/[10%]">
                    <img src={char.avatar} alt={char.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[15px] font-semibold">{char.name}</div>
                    <div className="text-[12px] text-white/40">{char.age || 'AI Companion'}</div>
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
  
  // 动作/衣服/背景选择对话框
  const renderSelectionDialog = () => {
    if (!activeDialog) return null
    
    let title = ''
    let content: React.ReactNode = null
    
    if (activeDialog === 'action') {
      title = mode === 'model-image' ? 'Select Pose' : 'Select Action'
      content = (
        <>
          <div className="px-5 py-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input type="text" value={actionSearch} onChange={e => setActionSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 px-5 pb-6">
            <div className="grid grid-cols-4 gap-3">
              {filteredActions.map(action => (
                <div key={action.name}
                  onClick={() => { setSelectedAction(action.name); closeDialog() }}
                  className={`cursor-pointer relative rounded-xl overflow-hidden border transition-all hover:scale-[1.02] aspect-[3/4] ${
                    selectedAction === action.name ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20' : 'border-white/[6%] hover:border-white/[15%]'
                  }`}>
                  <img src={action.image} alt={action.name} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <span className="text-[11px] font-medium text-white truncate block">{action.name}</span>
                  </div>
                  {selectedAction === action.name && (
                    <div className="absolute top-2 right-2 size-5 rounded-full bg-white flex items-center justify-center">
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
                placeholder="Search..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 px-5 pb-6">
            <div className="grid grid-cols-4 gap-3">
              {filteredClothes.map(cloth => (
                <div key={cloth.name}
                  onClick={() => { setSelectedClothes(cloth.name); closeDialog() }}
                  className={`cursor-pointer relative rounded-xl overflow-hidden border transition-all hover:scale-[1.02] aspect-[3/4] ${
                    selectedClothes === cloth.name ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20' : 'border-white/[6%] hover:border-white/[15%]'
                  }`}>
                  <img src={cloth.image} alt={cloth.name} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <span className="text-[11px] font-medium text-white truncate block">{cloth.name}</span>
                  </div>
                  {selectedClothes === cloth.name && (
                    <div className="absolute top-2 right-2 size-5 rounded-full bg-white flex items-center justify-center">
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
                placeholder="Search..."
                className="w-full bg-white/[5%] border border-white/[8%] rounded-xl py-3 pl-10 pr-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 px-5 pb-6">
            <div className="grid grid-cols-4 gap-3">
              {filteredBgs.map(bg => (
                <div key={bg}
                  onClick={() => { setSelectedBg(bg); closeDialog() }}
                  className={`cursor-pointer relative rounded-xl overflow-hidden border transition-all hover:scale-[1.02] aspect-[3/4] ${
                    selectedBg === bg ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20' : 'border-white/[6%] hover:border-white/[15%]'
                  }`}>
                  <img src={getBgImagePath(bg)} alt={bg} className="w-full h-full object-cover pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                    <span className="text-[11px] font-medium text-white truncate block">{bg}</span>
                  </div>
                  {selectedBg === bg && (
                    <div className="absolute top-2 right-2 size-5 rounded-full bg-white flex items-center justify-center">
                      <svg className="size-3 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )
    }
    
    return (
      <div className="fixed inset-0 z-[200] flex flex-col">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeDialog} />
        <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col items-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%] shrink-0">
              <h2 className="text-[17px] font-bold">{title}</h2>
              <button onClick={closeDialog} className="size-9 flex items-center justify-center rounded-full hover:bg-white/[8%]">
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
  
  // 动作卡片（用于模型模式预览）
  const ActionCard = ({ onClick, selected, onClear, label }: { 
    onClick: () => void, 
    selected: string, 
    onClear?: () => void,
    label: string 
  }) => {
    const img = selected ? getActionImage(selected) : ''
    const video = selected ? getActionVideo(selected) : ''
    const isModelImg = mode === 'model-image'
    const dim = isModelImg ? 'w-[280px] h-[310px]' : 'w-[280px] h-[310px]'
    
    return (
      <div
        onClick={onClick}
        onMouseEnter={e => {
          if (!selected || !video) return
          const vid = e.currentTarget.querySelector('video') as HTMLVideoElement
          const imgEl = e.currentTarget.querySelector('img') as HTMLImageElement
          if (vid) { vid.style.display = 'block'; if(imgEl) imgEl.style.display = 'none'; vid.play().catch(() => {}) }
        }}
        onMouseLeave={e => {
          const vid = e.currentTarget.querySelector('video') as HTMLVideoElement
          const imgEl = e.currentTarget.querySelector('img') as HTMLImageElement
          if (vid) { vid.style.display = 'none'; if(imgEl) imgEl.style.display = 'block'; vid.pause(); vid.currentTime = 0 }
        }}
        className={`${dim} shrink-0 cursor-pointer rounded-[15px] overflow-hidden border border-white/10 hover:border-pink-start transition-all relative group`}
      >
        {selected ? (
          <>
            <img src={img} alt={selected} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
            {video && (
              <video src={video} muted loop playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover" style={{ display: 'none' }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <div className="text-[11px] text-white/50 mb-1">{label}</div>
              <div className="text-[14px] font-bold">{selected}</div>
            </div>
            {onClear && (
              <button onClick={e => { e.stopPropagation(); onClear() }}
                className="absolute top-3 right-3 size-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center">
                <X size={16} />
              </button>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600/20 to-pink-500/20">
            <div className="size-12 rounded-full bg-pink-start/15 border border-pink-start/25 backdrop-blur-sm flex items-center justify-center mb-2">
              <Plus size={24} className="text-white" />
            </div>
            <span className="text-[12px] font-medium text-white">{label}</span>
          </div>
        )}
      </div>
    )
  }
  
  // 衣服/背景卡片
  const SmallCard = ({ onClick, selected, onClear, label, img }: {
    onClick: () => void,
    selected: string,
    onClear?: () => void,
    label: string,
    img?: string
  }) => (
    <div
      onClick={onClick}
      className="w-[150px] h-[280px] shrink-0 cursor-pointer rounded-[15px] overflow-hidden border border-white/10 hover:border-pink-start transition-all relative group"
    >
      {selected ? (
        <>
          <img src={img || getBgImagePath(selected)} alt={selected} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
            <div className="text-[10px] text-white/50 mb-1">{label}</div>
            <div className="text-[12px] font-bold">{selected}</div>
          </div>
          {onClear && (
            <button onClick={e => { e.stopPropagation(); onClear() }}
              className="absolute top-2 right-2 size-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center">
              <X size={14} />
            </button>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white/[3%]">
          <div className="size-10 rounded-full bg-pink-start/15 border border-pink-start/25 backdrop-blur-sm flex items-center justify-center mb-2">
            <Plus size={20} className="text-white/60" />
          </div>
          <span className="text-[12px] font-medium text-white/40">{label}</span>
        </div>
      )}
    </div>
  )
  
  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-32">
      {/* 顶部模型选择器 */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[6%]">
        <button onClick={() => navigateChar(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-white/[8%] transition-colors active:scale-95">
          <ChevronLeft size={22} className="text-white/60" />
        </button>
        
        {/* 90x90 圆形模型选择器 */}
        <button 
          onClick={() => setShowCharPicker(true)}
          className="flex flex-col items-center gap-1"
        >
          <div className="w-[90px] h-[90px] rounded-full overflow-hidden ring-2 ring-[#c939c9]/50 hover:ring-[#d05bf8] transition-all cursor-pointer">
            <img src={selectedChar.avatar} alt={selectedChar.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <span className="text-[12px] font-semibold block">{selectedChar.name}</span>
            <span className="text-[10px] text-white/40">{charTypeFilter}</span>
          </div>
        </button>
        
        <button onClick={() => navigateChar(1)} className="flex items-center justify-center size-10 rounded-full hover:bg-white/[8%] transition-colors active:scale-95">
          <ChevronRight size={22} className="text-white/60" />
        </button>
      </div>
      
      {/* 模式切换标签 */}
      <div className="flex items-center justify-center gap-1 px-4 py-3 overflow-x-auto no-scrollbar">
        {modeTabs.map(tab => (
          <button 
            key={tab.key} 
            onClick={() => setMode(tab.key)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 ${
              mode === tab.key 
                ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg shadow-[#d05bf8]/25' 
                : 'bg-white/[4%] text-white/50 hover:bg-white/[8%]'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* 生成设置区域 */}
      {isModelMode ? (
        <>
          {/* 模型生成 - 2=1+1 布局 */}
          <div className="flex justify-center px-4 mt-4">
            <div className="flex items-start gap-2">
              {/* 左侧 - 动作/姿势（280x310） */}
              <ActionCard 
                onClick={() => setActiveDialog('action')}
                selected={selectedAction}
                onClear={() => setSelectedAction('')}
                label={mode === 'model-video' ? 'Action' : 'Pose'}
              />
              
              {/* 右侧 - 衣服 + 背景（垂直堆叠） */}
              <div className="flex flex-col gap-2">
                <SmallCard 
                  onClick={() => setActiveDialog('clothes')}
                  selected={selectedClothes}
                  onClear={() => setSelectedClothes('')}
                  label="Clothes"
                  img={selectedClothes ? getClothesImage(selectedClothes) : undefined}
                />
                <SmallCard 
                  onClick={() => setActiveDialog('background')}
                  selected={selectedBg}
                  onClear={() => setSelectedBg('')}
                  label="Background"
                />
              </div>
            </div>
          </div>
          
          {/* 模型视频设置 */}
          {mode === 'model-video' && (
            <div className="px-4 mt-6 max-w-[600px] mx-auto space-y-4">
              {/* 分辨率 */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/40 shrink-0 w-20">Resolution</span>
                <div className="flex gap-1.5">
                  {['480p', '720p', '1080p'].map(r => (
                    <button key={r} onClick={() => setVideoResolution(r)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                        videoResolution === r ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                      }`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              {/* 数量 */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/40 shrink-0 w-20">Quantity</span>
                <div className="flex gap-1.5">
                  {[1, 2, 4].map(q => (
                    <button key={q} onClick={() => setVideoQuantity(q)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                        videoQuantity === q ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                      }`}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* 模型图片设置 */}
          {mode === 'model-image' && (
            <div className="px-4 mt-6 max-w-[600px] mx-auto space-y-4">
              {/* 数量 */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/40 shrink-0 w-20">Quantity</span>
                <div className="flex gap-1.5">
                  {[1, 2, 4, 8].map(q => (
                    <button key={q} onClick={() => setImageQuantity(q)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                        imageQuantity === q ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                      }`}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              {/* 比例 */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/40 shrink-0 w-20">Aspect</span>
                <div className="flex gap-1.5">
                  {['9:16', '16:9', '3:4', '4:3', '1:1', '21:9'].map(r => (
                    <button key={r}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-white/[3%] text-white/20 cursor-not-allowed">
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              {/* 分辨率 */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-white/40 shrink-0 w-20">Resolution</span>
                <div className="flex gap-1.5">
                  {['480p', '720p', '1080p'].map(r => (
                    <button key={r}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-white/[3%] text-white/20 cursor-not-allowed">
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* 自定义生成 - 两个框架输入 */}
          <div className="px-4 mt-4 max-w-[600px] mx-auto space-y-4">
            {/* 视频/图片设置 */}
            {mode === 'custom-video' && (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 shrink-0 w-20">Quantity</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 4].map(q => (
                      <button key={q} onClick={() => setCustomVideoQuantity(q)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                          customVideoQuantity === q ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                        }`}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 shrink-0 w-20">Duration</span>
                  <div className="flex gap-1.5">
                    {[5, 6, 7, 8, 9, 10].map(d => (
                      <button key={d} onClick={() => setCustomVideoDuration(d)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                          customVideoDuration === d ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                        }`}>
                        {d}s
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 shrink-0 w-20">Aspect</span>
                  <div className="flex gap-1.5">
                    {['9:16', '16:9', '1:1'].map(r => (
                      <button key={r} onClick={() => setCustomVideoAspect(r)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                          customVideoAspect === r ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                        }`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 shrink-0 w-20">Resolution</span>
                  <div className="flex gap-1.5">
                    {['480p', '720p', '1080p'].map(r => (
                      <button key={r} onClick={() => setCustomVideoResolution(r)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                          customVideoResolution === r ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                        }`}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {mode === 'custom-image' && (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 shrink-0 w-20">Quantity</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 4, 8].map(q => (
                      <button key={q} onClick={() => setCustomImageQuantity(q)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                          customImageQuantity === q ? 'bg-pink-start/30 text-white' : 'bg-white/[5%] text-white/40'
                        }`}>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 shrink-0 w-20">Aspect</span>
                  <div className="flex gap-1.5">
                    {['9:16', '16:9', '3:4', '4:3', '1:1', '21:9'].map(r => (
                      <button key={r}
                        className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-white/[3%] text-white/20 cursor-not-allowed">
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/40 shrink-0 w-20">Resolution</span>
                  <div className="flex gap-1.5">
                    {['480p', '720p', '1080p'].map(r => (
                      <button key={r}
                        className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-white/[3%] text-white/20 cursor-not-allowed">
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* 自定义提示词输入框 */}
            <div className="space-y-3">
              {/* 正面提示 */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-white/50 font-medium">
                  {mode === 'custom-video' ? 'Video Description' : 'Image Description'}
                </label>
                <textarea 
                  value={mode === 'custom-video' ? customVideoPrompt : customImagePrompt}
                  onChange={e => mode === 'custom-video' ? setCustomVideoPrompt(e.target.value) : setCustomImagePrompt(e.target.value)}
                  placeholder={mode === 'custom-video' ? 'Describe the video scene, actions, mood...' : 'Describe the image scene, subject, mood...'}
                  rows={4}
                  maxLength={1000}
                  className="w-full bg-white/[4%] border border-white/[8%] rounded-xl py-3 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#d05bf8]/40 resize-none"
                />
              </div>
              
              {/* 负面提示 */}
              <div className="space-y-1.5">
                <label className="text-[11px] text-white/50 font-medium">
                  {mode === 'custom-video' ? 'What to Avoid (Video)' : 'What to Avoid (Image)'}
                </label>
                <textarea 
                  value={mode === 'custom-video' ? customVideoNegative : customImageNegative}
                  onChange={e => mode === 'custom-video' ? setCustomVideoNegative(e.target.value) : setCustomImageNegative(e.target.value)}
                  placeholder={mode === 'custom-video' ? 'e.g. blury, low quality, wrong anatomy...' : 'e.g. text, watermark, low quality...'}
                  rows={3}
                  maxLength={500}
                  className="w-full bg-white/[4%] border border-white/[8%] rounded-xl py-3 px-4 text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#d05bf8]/40 resize-none"
                />
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* 生成按钮 */}
      <div className="flex justify-center px-4 mt-6">
        {canGenerate ? (
          <button 
            onClick={() => {
              const info = {
                mode,
                char: isModelMode ? selectedChar.name : 'Custom',
                action: selectedAction || 'None',
                clothes: selectedClothes || 'None',
                background: selectedBg || 'None',
                ...(mode === 'model-video' && { quantity: videoQuantity, resolution: videoResolution }),
                ...(mode === 'model-image' && { quantity: imageQuantity, aspect: imageAspect, resolution: imageResolution }),
                ...(mode === 'custom-video' && { quantity: customVideoQuantity, duration: customVideoDuration, aspect: customVideoAspect, resolution: customVideoResolution, prompt: customVideoPrompt.substring(0, 50) }),
                ...(mode === 'custom-image' && { quantity: customImageQuantity, aspect: customImageAspect, resolution: customImageResolution, prompt: customImagePrompt.substring(0, 50) }),
              }
              alert(`Generate!\n\n${JSON.stringify(info, null, 2)}`)
            }}
            className="w-1/3 py-3.5 rounded-2xl bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-bold text-[14px] shadow-lg shadow-[#d05bf8]/30 hover:shadow-[#d05bf8]/50 transition-all active:scale-[0.98]"
          >
            Generate {mode.includes('video') ? 'Video' : 'Image'}
          </button>
        ) : (
          <div className="w-1/3 py-3.5 rounded-2xl bg-white/[5%] border border-white/[8%] text-center">
            <span className="text-[12px] font-semibold text-white/40">
              {isModelMode ? 'Select Options' : 'Enter Description'}
            </span>
          </div>
        )}
      </div>
      
      {/* 对话框 */}
      {renderCharPicker()}
      {renderSelectionDialog()}
    </div>
  )
}
