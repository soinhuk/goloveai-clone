import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, X, Sparkles, Image as ImageIcon, Video, Shirt, Mountain, Settings2, Wand2, Clapperboard, Upload } from 'lucide-react'
import { characters } from '../data/characters'

// Preset configurations with visual styling
const PRESETS = [
  { name: 'Sunset Beach', gradient: 'from-orange-400 via-pink-500 to-purple-600', emoji: '🏖️' },
  { name: 'Cozy Bedroom', gradient: 'from-amber-400 via-orange-500 to-red-500', emoji: '🛏️' },
  { name: 'City Night', gradient: 'from-blue-600 via-indigo-700 to-purple-900', emoji: '🌃' },
  { name: 'Studio Light', gradient: 'from-gray-300 via-gray-400 to-gray-500', emoji: '💡' },
  { name: 'Rainy Window', gradient: 'from-blue-300 via-blue-400 to-slate-600', emoji: '🌧️' },
  { name: 'Garden Party', gradient: 'from-green-400 via-emerald-500 to-teal-600', emoji: '🌸' },
  { name: 'Romantic Dinner', gradient: 'from-rose-400 via-pink-500 to-fuchsia-500', emoji: '🥂' },
  { name: 'Underwater', gradient: 'from-cyan-400 via-blue-500 to-indigo-600', emoji: '🫧' },
]

const ACTIONS = [
  { name: 'Standing', icon: '🧍' },
  { name: 'Sitting', icon: '🪑' },
  { name: 'Lying Down', icon: '😴' },
  { name: 'Walking', icon: '🚶' },
  { name: 'Dancing', icon: '💃' },
  { name: 'Stretching', icon: '🧘' },
  { name: 'Laughing', icon: '😂' },
  { name: 'Thinking', icon: '🤔' },
]

const CLOTHES = [
  { name: 'Casual', emoji: '👕' },
  { name: 'Elegant', emoji: '👗' },
  { name: 'Lingerie', emoji: '🥰' },
  { name: 'Swimwear', emoji: '👙' },
  { name: 'Cosplay', emoji: '✨' },
  { name: 'Business', emoji: '👔' },
  { name: 'Sportswear', emoji: '🏃' },
  { name: 'None', emoji: '⬜' },
]

const BACKGROUNDS = [
  { name: 'Bedroom', gradient: 'from-slate-700 to-slate-900', icon: '🛏️' },
  { name: 'Beach', gradient: 'from-cyan-400 to-blue-500', icon: '🏖️' },
  { name: 'City', gradient: 'from-slate-800 to-slate-900', icon: '🌆' },
  { name: 'Forest', gradient: 'from-green-600 to-emerald-800', icon: '🌲' },
  { name: 'Studio', gradient: 'from-gray-600 to-gray-800', icon: '🎬' },
  { name: 'Living Room', gradient: 'from-amber-700 to-orange-800', icon: '🛋️' },
  { name: 'Bathroom', gradient: 'from-cyan-300 to-blue-400', icon: '🚿' },
  { name: 'Office', gradient: 'from-slate-500 to-slate-700', icon: '💼' },
]

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
  const [activeTab, setActiveTab] = useState<ContentTab>('presets')
  const [selectedPreset, setSelectedPreset] = useState('')
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedBg, setSelectedBg] = useState('')
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [quality, setQuality] = useState('HD')
  const [customPrompt, setCustomPrompt] = useState('')

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

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-20">
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
            onClick={() => setActiveTab(tab.key as ContentTab)}
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
            {tab.key === 'presets' && <ChevronDown size={10} className="text-white/30" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4 pb-32">
        {/* Presets Tab */}
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold">Choose a Preset</h3>
              <span className="text-[11px] text-white/40">{PRESETS.length} presets</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map((preset, idx) => (
                <button
                  key={preset.name}
                  onClick={() => setSelectedPreset(preset.name)}
                  className={`relative h-[130px] rounded-[18px] overflow-hidden border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    selectedPreset === preset.name
                      ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20'
                      : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${preset.gradient}`} />

                  {/* Decorative Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-3 right-3 size-12 rounded-full bg-white/20 blur-xl" />
                    <div className="absolute bottom-8 left-4 size-16 rounded-full bg-white/10 blur-2xl" />
                  </div>

                  {/* Selection Indicator */}
                  {selectedPreset === preset.name && (
                    <div className="absolute top-3 right-3 size-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                      <svg className="size-3.5 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
                    <span className="text-3xl">{preset.emoji}</span>
                    <span className="text-[13px] font-semibold text-white drop-shadow-lg">{preset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Tab */}
        {activeTab === 'action' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold">Select Action</h3>
              <span className="text-[11px] text-white/40">Choose pose</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {ACTIONS.map(action => (
                <button
                  key={action.name}
                  onClick={() => setSelectedAction(action.name)}
                  className={`px-4 py-4 rounded-[14px] text-[13px] font-medium transition-all duration-200 flex items-center gap-3 ${
                    selectedAction === action.name
                      ? 'bg-gradient-to-r from-[#d05bf8]/25 to-[#ff18a0]/25 border border-[#d05bf8]/50 text-white shadow-lg'
                      : 'bg-white/[5%] border border-white/[8%] text-white/70 hover:bg-white/[8%] hover:text-white/90'
                  }`}
                >
                  <span className="text-xl">{action.icon}</span>
                  {action.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Clothes Tab */}
        {activeTab === 'clothes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold">Select Outfit</h3>
              <span className="text-[11px] text-white/40">{CLOTHES.length} options</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {CLOTHES.map(cloth => (
                <button
                  key={cloth.name}
                  onClick={() => setSelectedClothes(cloth.name)}
                  className={`px-4 py-4 rounded-[14px] text-[13px] font-medium transition-all duration-200 flex items-center gap-3 ${
                    selectedClothes === cloth.name
                      ? 'bg-gradient-to-r from-[#d05bf8]/25 to-[#ff18a0]/25 border border-[#d05bf8]/50 text-white shadow-lg'
                      : 'bg-white/[5%] border border-white/[8%] text-white/70 hover:bg-white/[8%] hover:text-white/90'
                  }`}
                >
                  <span className="text-xl">{cloth.emoji}</span>
                  {cloth.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Background Tab */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold">Choose Background</h3>
              <span className="text-[11px] text-white/40">{BACKGROUNDS.length} scenes</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BACKGROUNDS.map(bg => (
                <button
                  key={bg.name}
                  onClick={() => setSelectedBg(bg.name)}
                  className={`relative h-[110px] rounded-[16px] overflow-hidden border-2 transition-all duration-200 hover:scale-[1.02] ${
                    selectedBg === bg.name
                      ? 'border-[#d05bf8] shadow-lg shadow-[#d05bf8]/20'
                      : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${bg.gradient}`} />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-40">{bg.icon}</span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[13px] font-semibold drop-shadow-lg">{bg.name}</span>
                  </div>
                  {selectedBg === bg.name && (
                    <div className="absolute top-3 right-3 size-5 rounded-full bg-white flex items-center justify-center">
                      <svg className="size-3 text-[#d05bf8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Settings Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <h3 className="text-[15px] font-semibold">Advanced Settings</h3>

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
        )}
      </div>

      {/* Generate Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-[#0F0E0F]/95 backdrop-blur-xl border-t border-white/[6%]">
        <button
          onClick={() => setShowGenModeDialog(true)}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[14px] font-bold hover:shadow-[0_0_25px_rgba(208,91,248,0.45)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Sparkles size={18} />
          Generate {mode === 'video' ? 'Video' : 'Image'}
        </button>
      </div>

      {/* Generation Mode Dialog */}
      {showGenModeDialog && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[6%]">
              <h2 className="text-[17px] font-bold">Choose Generation Mode</h2>
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
                    <div className="text-[15px] font-semibold mb-1">Use Presets</div>
                    <div className="text-[12px] text-white/40">Quick generation with pre-made scenes</div>
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
                    <div className="text-[12px] text-white/40">Write your own prompt for unique content</div>
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
                    <div className="text-[12px] text-white/40">Upload an image and animate it</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Safe Area Bottom */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Character Picker Modal */}
      {showCharPicker && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[24px] w-full max-w-lg max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
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
            <div className="overflow-y-auto max-h-[50vh] px-5 pb-6 space-y-1">
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