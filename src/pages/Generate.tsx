import { useState } from 'react'
import { Wand2, Download, Copy, RefreshCw, ChevronDown, Play, Image, Video, Sparkles, Eye, Heart, Share2, Settings, User, X, Check, Upload, Wand } from 'lucide-react'
import { characters } from '../data/characters'

type Mode = 'image' | 'video'
type PresetTab = 'action' | 'clothes' | 'background'

// Action models - larger cards with preview images
const ACTION_MODELS = [
  { id: 'standing', label: 'Standing', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=60' },
  { id: 'sitting', label: 'Sitting', preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=60' },
  { id: 'lying', label: 'Lying Down', preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=60' },
  { id: 'dancing', label: 'Dancing', preview: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=400&q=60' },
  { id: 'sporty', label: 'Sporty', preview: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=60' },
  { id: 'casual', label: 'Casual Pose', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60' },
]

const CLOTHES_MODELS = [
  { id: 'nude', label: 'Nude', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=60' },
  { id: 'lingerie', label: 'Lingerie', preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=60' },
  { id: 'dress', label: 'Dress', preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=60' },
  { id: 'casual', label: 'Casual', preview: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=400&q=60' },
  { id: 'school', label: 'School Uniform', preview: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=60' },
  { id: 'maid', label: 'Maid Outfit', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60' },
]

const BACKGROUND_MODELS = [
  { id: 'bedroom', label: 'Bedroom', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=60' },
  { id: 'bathroom', label: 'Bathroom', preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=60' },
  { id: 'beach', label: 'Beach', preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=60' },
  { id: 'city', label: 'City Night', preview: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=400&q=60' },
  { id: 'forest', label: 'Forest', preview: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=60' },
  { id: 'studio', label: 'Studio', preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60' },
]

export default function Generate() {
  const [mode, setMode] = useState<Mode>('image')
  const [presetTab, setPresetTab] = useState<PresetTab>('action')
  const [selectedCharacter, setSelectedCharacter] = useState('Luna')
  const [showCharacterSelect, setShowCharacterSelect] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedBackground, setSelectedBackground] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [showPresets, setShowPresets] = useState(false)

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

  const currentModels = presetTab === 'action' ? ACTION_MODELS
    : presetTab === 'clothes' ? CLOTHES_MODELS
    : BACKGROUND_MODELS

  const selectedCount = [selectedAction, selectedClothes, selectedBackground].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gl-dark">
      {/* ======== TOP BAR ======== */}
      <div className="border-b border-white/[5%] px-4 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-bold text-lg shrink-0">Generate</h1>

          {/* Character Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCharacterSelect(!showCharacterSelect)}
              className="flex items-center gap-2 bg-white/[8%] border border-white/[10%] rounded-xl px-4 py-2 pr-10 text-white text-sm font-medium hover:bg-white/[12%] transition-all"
            >
              <User size={14} />
              {selectedCharacter}
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
            </button>

            {/* Character Dropdown */}
            {showCharacterSelect && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#181718] border border-white/[10%] rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in">
                <div className="p-2 border-b border-white/[5%]">
                  <input
                    type="text"
                    placeholder="Search characters..."
                    className="w-full bg-white/[4%] rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/30 focus:outline-none"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {characters.slice(0, 8).map(char => (
                    <button
                      key={char.id}
                      onClick={() => {
                        setSelectedCharacter(char.name)
                        setShowCharacterSelect(false)
                      }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-white/[5%] transition-all ${
                        selectedCharacter === char.name ? 'bg-white/[5%]' : ''
                      }`}
                    >
                      <img src={char.avatar} alt={char.name} className="size-10 rounded-full object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
                      <div className="text-left">
                        <div className="text-white text-sm font-medium">{char.name}</div>
                        <div className="text-white/40 text-xs">{char.tags?.[0] || 'AI Girlfriend'}</div>
                      </div>
                      {selectedCharacter === char.name && (
                        <Check size={16} className="ml-auto text-gl-pink" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Video/Image Toggle */}
          <div className="flex items-center gap-1 bg-white/[4%] rounded-xl p-1">
            <button
              onClick={() => setMode('image')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'image' ? 'bg-white/[8%] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              <Image size={14} /> Image
            </button>
            <button
              onClick={() => setMode('video')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === 'video' ? 'bg-white/[8%] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              <Video size={14} /> Video
            </button>
          </div>

          <div className="flex-1" />

          {/* Presets Button */}
          <button
            onClick={() => setShowPresets(!showPresets)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              showPresets ? 'bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 text-white border border-[#d05bf8]/30' : 'bg-white/[4%] text-white/60 hover:text-white'
            }`}
          >
            <Sparkles size={14} /> Presets
          </button>
        </div>
      </div>

      {/* ======== PRESETS PANEL (Expandable) ======== */}
      {showPresets && (
        <div className="border-b border-white/[5%] px-4 py-4 bg-[#181718]/50 animate-fade-in">
          <div className="max-w-[920px] mx-auto">
            <div className="flex gap-4">
              {/* Image to Video */}
              <button className="flex-1 flex items-center gap-4 p-4 rounded-2xl bg-white/[3%] border border-white/[5%] hover:border-[#d05bf8]/30 transition-all text-left group">
                <div className="size-12 rounded-xl bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center">
                  <Image size={20} className="text-gl-pink" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm flex items-center gap-2">
                    Image to Video
                    <span className="px-1.5 py-0.5 bg-gl-pink/20 text-gl-pink text-[10px] font-bold rounded">NEW</span>
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">Transform images into animated videos</div>
                </div>
                <ChevronDown size={16} className="ml-auto text-white/30 group-hover:text-white/60 transition-colors rotate-[-90deg]" />
              </button>

              {/* Custom Video */}
              <button className="flex-1 flex items-center gap-4 p-4 rounded-2xl bg-white/[3%] border border-white/[5%] hover:border-[#d05bf8]/30 transition-all text-left group">
                <div className="size-12 rounded-xl bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center">
                  <Video size={20} className="text-gl-pink" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Custom Video</div>
                  <div className="text-white/40 text-xs mt-0.5">Create unique videos from scratch</div>
                </div>
                <ChevronDown size={16} className="ml-auto text-white/30 group-hover:text-white/60 transition-colors rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======== MAIN CONTENT - CENTERED ======== */}
      <div className="max-w-[920px] mx-auto px-4 py-6">
        {/* Action / Clothes / Background Tabs */}
        <div className="flex gap-2 mb-4">
          {(['action', 'clothes', 'background'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setPresetTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                presetTab === tab
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                  : 'bg-white/[4%] text-white/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Models Grid - 2 columns, large cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {currentModels.map(model => {
            const isSelected =
              (presetTab === 'action' && selectedAction === model.id) ||
              (presetTab === 'clothes' && selectedClothes === model.id) ||
              (presetTab === 'background' && selectedBackground === model.id)

            return (
              <button
                key={model.id}
                onClick={() => {
                  if (presetTab === 'action') setSelectedAction(isSelected ? '' : model.id)
                  if (presetTab === 'clothes') setSelectedClothes(isSelected ? '' : model.id)
                  if (presetTab === 'background') setSelectedBackground(isSelected ? '' : model.id)
                }}
                className={`relative overflow-hidden rounded-[20px] transition-all group ${
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
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-white font-semibold text-sm">{model.label}</span>
                </div>
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 size-8 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                    <Check size={14} className="text-white" />
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
            className="w-full bg-white/[4%] border border-white/[8%] rounded-2xl px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating || (!prompt.trim() && !selectedAction && !selectedClothes && !selectedBackground)}
          className="w-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] rounded-full py-[16px] text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {generating ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Generating {mode}...
            </>
          ) : (
            <>
              <Wand2 size={16} />
              Generate {mode === 'image' ? 'Image' : 'Video'}
            </>
          )}
        </button>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-white font-semibold text-base mb-4">Generated Results</h3>
            <div className={`grid gap-4 ${mode === 'image' ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {results.map((url, idx) => (
                <div key={idx} className="relative group rounded-2xl overflow-hidden">
                  {mode === 'video' ? (
                    <div className="relative">
                      <img src={url} alt={`Generated ${idx + 1}`} className="w-full aspect-video object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-14 rounded-full bg-black/50 flex items-center justify-center">
                          <Play size={24} className="text-white ml-1" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={url} alt={`Generated ${idx + 1}`} className="w-full aspect-square object-cover" onError={e => { (e.target as HTMLImageElement).src = '' }} />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <button className="size-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Eye size={18} />
                    </button>
                    <button className="size-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Heart size={18} />
                    </button>
                    <button className="size-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Download size={18} />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close character select */}
      {showCharacterSelect && (
        <div className="fixed inset-0 z-40" onClick={() => setShowCharacterSelect(false)} />
      )}
    </div>
  )
}