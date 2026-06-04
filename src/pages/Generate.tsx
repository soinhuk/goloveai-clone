import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, X, Sparkles, Image as ImageIcon, Video, Shirt, Mountain, Settings2 } from 'lucide-react'
import { characters } from '../data/characters'

const PRESETS = ['Sunset Beach', 'Cozy Bedroom', 'City Night', 'Studio Light', 'Rainy Window', 'Garden Party']
const ACTIONS = ['Standing', 'Sitting', 'Lying Down', 'Walking', 'Dancing', 'Stretching']
const CLOTHES = ['Casual', 'Elegant', 'Lingerie', 'Swimwear', 'Cosplay', 'Business', 'Sportswear', 'None']
const BACKGROUNDS = ['Bedroom', 'Beach', 'City', 'Forest', 'Studio', 'Living Room', 'Bathroom', 'Office']

export default function Generate() {
  const [selectedChar, setSelectedChar] = useState(characters[0])
  const [showCharPicker, setShowCharPicker] = useState(false)
  const [mode, setMode] = useState<'video' | 'image'>('video')
  const [genMode, setGenMode] = useState<'presets' | 'custom' | 'i2v'>('presets')
  const [activeTab, setActiveTab] = useState<'presets' | 'action' | 'clothes' | 'background' | 'advanced'>('presets')
  const [selectedPreset, setSelectedPreset] = useState('')
  const [selectedAction, setSelectedAction] = useState('')
  const [selectedClothes, setSelectedClothes] = useState('')
  const [selectedBg, setSelectedBg] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[6%]">
        <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%]">
          <ChevronLeft size={20} className="text-white/70" />
        </button>
        <button onClick={() => setShowCharPicker(true)} className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/[4%] border border-white/[6%] hover:bg-white/[6%]">
          <div className="size-8 rounded-full overflow-hidden">
            <img src={selectedChar.avatar} alt={selectedChar.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[14px] font-medium">{selectedChar.name}</span>
          <ChevronDown size={14} className="text-white/40" />
        </button>
        <button className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%]">
          <ChevronRight size={20} className="text-white/70" />
        </button>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 px-4 py-3">
        <button onClick={() => setMode('video')} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-medium transition-all ${mode === 'video' ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/50'}`}>
          <Video size={14} /> Video
        </button>
        <button onClick={() => setMode('image')} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-medium transition-all ${mode === 'image' ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/50'}`}>
          <ImageIcon size={14} /> Image
        </button>
      </div>

      {/* Content Tabs */}
      <div className="flex gap-1 px-4 pb-4 overflow-x-auto no-scrollbar">
        {[
          { key: 'presets', icon: Sparkles, label: 'Presets' },
          { key: 'action', icon: null, label: 'Action' },
          { key: 'clothes', icon: Shirt, label: 'Clothes' },
          { key: 'background', icon: Mountain, label: 'Background' },
          { key: 'advanced', icon: Settings2, label: 'Advanced Settings' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-medium transition-all ${
            activeTab === tab.key ? 'bg-white/[8%] text-white' : 'text-white/40 hover:text-white/60'
          }`}>
            {tab.icon && <tab.icon size={14} />}
            {tab.label}
            {tab.key === 'presets' && <ChevronDown size={10} className="text-white/30" />}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === 'presets' && (
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold mb-3">Choose a Preset</h3>
            <div className="grid grid-cols-2 gap-3">
              {PRESETS.map(p => (
                <button key={p} onClick={() => setSelectedPreset(p)} className={`relative h-[120px] rounded-[16px] overflow-hidden border-2 transition-all ${
                  selectedPreset === p ? 'border-[#d05bf8]' : 'border-white/[6%]'
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2d1054] to-[#0f0e0f]" />
                  <div className="relative z-10 h-full flex items-end p-3">
                    <span className="text-[13px] font-medium">{p}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'action' && (
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold mb-3">Select Action</h3>
            <div className="grid grid-cols-2 gap-2">
              {ACTIONS.map(a => (
                <button key={a} onClick={() => setSelectedAction(a)} className={`px-4 py-3 rounded-[12px] text-[13px] text-left transition-all ${
                  selectedAction === a ? 'bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 border border-[#d05bf8]/40' : 'bg-white/[4%] border border-white/[6%]'
                }`}>{a}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clothes' && (
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold mb-3">Select Clothes</h3>
            <div className="grid grid-cols-2 gap-2">
              {CLOTHES.map(c => (
                <button key={c} onClick={() => setSelectedClothes(c)} className={`px-4 py-3 rounded-[12px] text-[13px] text-left transition-all ${
                  selectedClothes === c ? 'bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 border border-[#d05bf8]/40' : 'bg-white/[4%] border border-white/[6%]'
                }`}>{c}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-3">
            <h3 className="text-[14px] font-semibold mb-3">Select Background</h3>
            <div className="grid grid-cols-2 gap-2">
              {BACKGROUNDS.map(b => (
                <button key={b} onClick={() => setSelectedBg(b)} className={`px-4 py-3 rounded-[12px] text-[13px] text-left transition-all ${
                  selectedBg === b ? 'bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 border border-[#d05bf8]/40' : 'bg-white/[4%] border border-white/[6%]'
                }`}>{b}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-4">
            <h3 className="text-[14px] font-semibold mb-3">Advanced Settings</h3>
            <div>
              <label className="text-[12px] text-white/40 mb-2 block">Custom Prompt</label>
              <textarea value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} placeholder="Describe the scene..." rows={3} className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 resize-none" />
            </div>
            <div>
              <label className="text-[12px] text-white/40 mb-2 block">Aspect Ratio</label>
              <div className="flex gap-2">{['1:1', '16:9', '9:16', '4:3'].map(r => <button key={r} className="px-4 py-2 rounded-full bg-white/[4%] border border-white/[6%] text-[12px] text-white/60 hover:text-white">{r}</button>)}</div>
            </div>
            <div>
              <label className="text-[12px] text-white/40 mb-2 block">Quality</label>
              <div className="flex gap-2">{['Standard', 'HD', 'Ultra'].map(q => <button key={q} className="px-4 py-2 rounded-full bg-white/[4%] border border-white/[6%] text-[12px] text-white/60 hover:text-white">{q}</button>)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-[#0F0E0F]/95 backdrop-blur-md border-t border-white/[6%]">
        <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[14px] font-semibold hover:shadow-[0_0_20px_rgba(208,91,248,0.4)] transition-all flex items-center justify-center gap-2">
          <Sparkles size={16} />
          Generate {mode === 'video' ? 'Video' : 'Image'}
        </button>
      </div>

      {/* Character Picker Modal */}
      {showCharPicker && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-end justify-center">
          <div className="bg-[#181718] rounded-t-[22px] w-full max-w-lg max-h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/[6%]">
              <h2 className="text-[16px] font-[600]">Select Model</h2>
              <button onClick={() => setShowCharPicker(false)} className="size-8 flex items-center justify-center rounded-full hover:bg-white/[6%]"><X size={18} /></button>
            </div>
            <div className="flex gap-2 px-4 py-3">
              {['Realistic', 'Anime', 'Custom'].map(t => (
                <button key={t} className="px-4 py-1.5 rounded-full bg-white/[4%] border border-white/[6%] text-[12px] text-white/60">{t}</button>
              ))}
            </div>
            <div className="px-4 pb-2">
              <input type="text" placeholder="Search models..." className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-2.5 px-4 text-[13px] text-white placeholder:text-white/30 focus:outline-none" />
            </div>
            <div className="overflow-y-auto max-h-[50vh] px-4 pb-4">
              {characters.map(c => (
                <button key={c.id} onClick={() => { setSelectedChar(c); setShowCharPicker(false) }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[4%] transition-all ${selectedChar.id === c.id ? 'bg-white/[6%]' : ''}`}>
                  <div className="size-10 rounded-full overflow-hidden">
                    <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <span className="text-[14px] font-medium">{c.name}</span>
                    {c.age && <span className="text-[12px] text-white/40 ml-2">{c.age}</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
