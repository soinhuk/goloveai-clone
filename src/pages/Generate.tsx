import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ChevronRight, ChevronLeft, Wand2, User, Video, Image, 
  Sparkles, Download, Heart, Share2, Check, RefreshCw, 
  Eye, Play, X, Upload, Star, Sliders
} from 'lucide-react'
import { characters } from '../data/characters'

type Mode = 'video' | 'image'
type Tab = 'action' | 'clothes' | 'background' | 'advanced'

// Action models with preview images
const ACTION_MODELS = [
  { id: 'standing', label: 'Standing', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=60' },
  { id: 'sitting', label: 'Sitting', preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=60' },
  { id: 'lying', label: 'Lying Down', preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=60' },
  { id: 'dancing', label: 'Dancing', preview: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=300&q=60' },
  { id: 'sporty', label: 'Sporty', preview: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=60' },
  { id: 'casual', label: 'Casual', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=60' },
  { id: 'romantic', label: 'Romantic', preview: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&q=60' },
  { id: 'seductive', label: 'Seductive', preview: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=60' },
]

const CLOTHES_MODELS = [
  { id: 'nude', label: 'Nude', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=60' },
  { id: 'lingerie', label: 'Lingerie', preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=60' },
  { id: 'dress', label: 'Dress', preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=60' },
  { id: 'casual', label: 'Casual', preview: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=300&q=60' },
  { id: 'school', label: 'School Uniform', preview: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=60' },
  { id: 'maid', label: 'Maid Outfit', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=60' },
  { id: 'bikini', label: 'Bikini', preview: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&q=60' },
  { id: 'pajamas', label: 'Pajamas', preview: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=60' },
]

const BACKGROUND_MODELS = [
  { id: 'bedroom', label: 'Bedroom', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=60' },
  { id: 'bathroom', label: 'Bathroom', preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=60' },
  { id: 'beach', label: 'Beach', preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=60' },
  { id: 'city', label: 'City Night', preview: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=300&q=60' },
  { id: 'forest', label: 'Forest', preview: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=60' },
  { id: 'studio', label: 'Studio', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=60' },
  { id: 'cafe', label: 'Cafe', preview: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&q=60' },
  { id: 'abstract', label: 'Abstract', preview: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=60' },
]

export default function Generate() {
  const [mode, setMode] = useState<Mode>('image')
  const [activeTab, setActiveTab] = useState<Tab>('action')
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])
  const [showCharacterSelect, setShowCharacterSelect] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedBackground, setSelectedBackground] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<string[]>([])

  // Advanced Settings state
  const [quality, setQuality] = useState('High')
  const [style, setStyle] = useState('Realistic')
  const [lighting, setLighting] = useState('Natural')
  const [cameraAngle, setCameraAngle] = useState('Front')
  const [pose, setPose] = useState('Standing')
  const [backgroundDetail, setBackgroundDetail] = useState('Simple')
  const [aspectRatio, setAspectRatio] = useState('1:1')
  const [negativePrompt, setNegativePrompt] = useState('')

  const models = activeTab === 'action' ? ACTION_MODELS
    : activeTab === 'clothes' ? CLOTHES_MODELS
    : BACKGROUND_MODELS

  const getSelected = () => {
    if (activeTab === 'action') return selectedAction
    if (activeTab === 'clothes') return selectedClothes
    return selectedBackground
  }

  const setSelected = (id: string) => {
    if (activeTab === 'action') setSelectedAction(id)
    if (activeTab === 'clothes') setSelectedClothes(id)
    if (activeTab === 'background') setSelectedBackground(id)
  }

  const handleGenerate = () => {
    if (!selectedAction && !selectedClothes && !selectedBackground && !prompt.trim()) return
    setGenerating(true)
    setTimeout(() => {
      setResults(prev => [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=512&q=80',
        ...prev
      ].slice(0, 4))
      setGenerating(false)
    }, 3000)
  }

  const selectedCount = [selectedAction, selectedClothes, selectedBackground].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gl-dark">
      {/* ======== TOP BAR ======== */}
      <div className="border-b border-white/[5%] px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-white font-bold text-base shrink-0">Generate</h1>

          {/* Character Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCharacterSelect(!showCharacterSelect)}
              className="flex items-center gap-2 bg-white/[8%] border border-white/[10%] rounded-xl px-3 py-1.5 pr-8 text-white text-xs font-medium hover:bg-white/[12%] transition-all"
            >
              <img src={selectedCharacter.avatar} alt="" className="size-5 rounded-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              {selectedCharacter.name}
              <ChevronRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 rotate-90" />
            </button>

            {/* Character Dropdown */}
            {showCharacterSelect && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCharacterSelect(false)} />
                <div className="absolute top-full left-0 mt-1.5 w-56 bg-[#181718] border border-white/[10%] rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                  <div className="p-1.5 border-b border-white/[5%]">
                    <input
                      type="text"
                      placeholder="Search characters..."
                      className="w-full bg-white/[4%] rounded-lg px-2.5 py-1.5 text-white text-xs placeholder:text-white/30 focus:outline-none"
                    />
                  </div>
                  <div className="max-h-52 overflow-y-auto">
                    {characters.slice(0, 8).map(char => (
                      <button
                        key={char.id}
                        onClick={() => {
                          setSelectedCharacter(char)
                          setShowCharacterSelect(false)
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 hover:bg-white/[5%] transition-all ${
                          selectedCharacter.id === char.id ? 'bg-white/[5%]' : ''
                        }`}
                      >
                        <img src={char.avatar} alt={char.name} className="size-8 rounded-full object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
                        <div className="text-left">
                          <div className="text-white text-xs font-medium">{char.name}</div>
                          <div className="text-white/40 text-[10px]">{char.tags?.[0] || 'AI Girlfriend'}</div>
                        </div>
                        {selectedCharacter.id === char.id && (
                          <Check size={12} className="ml-auto text-gl-pink" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Video/Image Toggle */}
          <div className="flex items-center gap-0.5 bg-white/[4%] rounded-lg p-0.5">
            <button
              onClick={() => setMode('image')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mode === 'image' ? 'bg-white/[8%] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              <Image size={12} /> Image
            </button>
            <button
              onClick={() => setMode('video')}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mode === 'video' ? 'bg-white/[8%] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              <Video size={12} /> Video
            </button>
          </div>

          <div className="flex-1" />

          {/* Presets indicator */}
          {selectedCount > 0 && (
            <span className="text-white/40 text-xs">{selectedCount} model{selectedCount > 1 ? 's' : ''} selected</span>
          )}
        </div>
      </div>

      {/* ======== MAIN CONTENT ======== */}
      <div className="max-w-[720px] mx-auto px-4 py-6">
        {/* Action / Clothes / Background / Advanced Tabs */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {(['action', 'clothes', 'background', 'advanced'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                  : 'bg-white/[4%] text-white/50 hover:text-white'
              }`}
            >
              {tab === 'advanced' ? (
                <span className="flex items-center gap-1.5">
                  <Sliders size={11} /> Advanced Settings
                </span>
              ) : tab}
            </button>
          ))}
        </div>

        {/* Models Grid - 2 columns, larger cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {models.map(model => {
            const isSelected = getSelected() === model.id
            return (
              <button
                key={model.id}
                onClick={() => setSelected(model.id)}
                className={`relative overflow-hidden rounded-2xl transition-all group ${
                  isSelected
                    ? 'ring-2 ring-[#d05bf8] ring-offset-2 ring-offset-[#0f0e0f]'
                    : 'hover:ring-1 hover:ring-white/20'
                }`}
                style={{ aspectRatio: '1/1.1' }}
              >
                <img
                  src={model.preview}
                  alt={model.label}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={e => { (e.target as HTMLImageElement).src = '' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-white font-medium text-xs">{model.label}</span>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 size-6 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Add custom details to your generation..."
            rows={2}
            className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating || (!prompt.trim() && !selectedAction && !selectedClothes && !selectedBackground)}
          className="w-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] rounded-full py-3.5 text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {generating ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              Generating {mode}...
            </>
          ) : (
            <>
              <Wand2 size={14} />
              Generate {mode === 'image' ? 'Image' : 'Video'}
            </>
          )}
        </button>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-white font-semibold text-sm mb-3">Generated Results</h3>
            <div className={`grid gap-3 ${mode === 'image' ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {results.map((url, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden">
                  {mode === 'video' ? (
                    <div className="relative">
                      <img src={url} alt={'Generated ' + (idx + 1)} className="w-full aspect-video object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-10 rounded-full bg-black/50 flex items-center justify-center">
                          <Play size={18} className="text-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={url} alt={'Generated ' + (idx + 1)} className="w-full aspect-square object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <button className="size-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Eye size={14} />
                    </button>
                    <button className="size-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Heart size={14} />
                    </button>
                    <button className="size-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Download size={14} />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/50 text-white text-[10px] font-medium backdrop-blur-sm">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}