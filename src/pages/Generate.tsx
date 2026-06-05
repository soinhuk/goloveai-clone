import { useState } from 'react';
import { 
  ChevronRight, Wand2, Image, Video, Check, RefreshCw, 
  Eye, Play, X, Download, Heart, Search, Sliders, Sparkles
} from 'lucide-react';
import { characters, Character } from '../data/characters';

type GenerateMode = 'model-video' | 'model-image' | 'custom-video' | 'custom-image';
type CharacterFilter = 'all' | 'realistic' | 'anime';

interface ActionItem { id: string; name: string; image: string; video?: string; }
interface ClothItem { id: string; name: string; image: string; }

const ACTIONS: ActionItem[] = [
  { id: 'standing', name: 'Standing', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=60' },
  { id: 'sitting', name: 'Sitting', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=60' },
  { id: 'lying', name: 'Lying Down', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=60' },
  { id: 'dancing', name: 'Dancing', image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=300&q=60' },
  { id: 'sporty', name: 'Sporty', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=60' },
  { id: 'casual', name: 'Casual', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=60' },
  { id: 'romantic', name: 'Romantic', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&q=60' },
  { id: 'seductive', name: 'Seductive', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=60' },
];

const CLOTHES: ClothItem[] = [
  { id: 'nude', name: 'Nude', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=60' },
  { id: 'lingerie', name: 'Lingerie', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&q=60' },
  { id: 'dress', name: 'Dress', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=60' },
  { id: 'casual', name: 'Casual', image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb540?w=300&q=60' },
  { id: 'school', name: 'School Uniform', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=60' },
  { id: 'maid', name: 'Maid Outfit', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=60' },
  { id: 'bikini', name: 'Bikini', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&q=60' },
  { id: 'pajamas', name: 'Pajamas', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&q=60' },
];

const BACKGROUNDS = [
  'Bedroom', 'Bathroom', 'Beach', 'City Night', 'Forest', 
  'Studio', 'Cafe', 'Abstract', 'Garden', 'Rooftop'
];

const ASPECT_RATIOS = ['9:16', '16:9', '1:1', '4:3', '3:4'];
const RESOLUTIONS = ['480p', '720p', '1080p'];
const QUANTITIES = [1, 2, 4, 8];

export default function Generate() {
  const [mode, setMode] = useState<GenerateMode>('model-image');
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0]);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [charFilter, setCharFilter] = useState<CharacterFilter>('all');
  const [charSearch, setCharSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedClothes, setSelectedClothes] = useState<string>('');
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  // Model Video/Image settings
  const [videoRes, setVideoRes] = useState('720p');
  const [imageQty, setImageQty] = useState(4);

  // Custom Video/Image settings
  const [customQty, setCustomQty] = useState(2);
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [resolution, setResolution] = useState('720p');
  const [posPrompt, setPosPrompt] = useState('');
  const [negPrompt, setNegPrompt] = useState('');

  const isModelMode = mode === 'model-video' || mode === 'model-image';
  const isVideoMode = mode === 'model-video' || mode === 'custom-video';

  const filteredCharacters = characters.filter(c => {
    const matchFilter = charFilter === 'all' || 
      (charFilter === 'realistic' && !c.tags.some(t => t.toLowerCase().includes('anime'))) ||
      (charFilter === 'anime' && c.tags.some(t => t.toLowerCase().includes('anime')));
    const matchSearch = c.name.toLowerCase().includes(charSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setResults(prev => [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=512&q=80',
        ...prev
      ].slice(0, 8));
      setGenerating(false);
    }, 3000);
  };

  const modeButtons: { key: GenerateMode; label: string }[] = [
    { key: 'model-video', label: 'Model Video' },
    { key: 'model-image', label: 'Model Image' },
    { key: 'custom-video', label: 'Custom Video' },
    { key: 'custom-image', label: 'Custom Image' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-8">
      {/* Header */}
      <div className="border-b border-white/[5%] px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <h1 className="text-white font-bold text-lg shrink-0">Generate</h1>
          
          {/* 90x90 Circle Character Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCharacterSelect(!showCharacterSelect)}
              className="w-[90px] h-[90px] rounded-full overflow-hidden border-2 border-[#d05bf8]/50 hover:border-[#d05bf8] transition-all shadow-lg shadow-[#d05bf8]/20"
            >
              <img 
                src={selectedCharacter.avatar} 
                alt={selectedCharacter.name}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = ''; }}
              />
            </button>
            
            {showCharacterSelect && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowCharacterSelect(false)} />
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#181718] border border-white/[10%] rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-3 border-b border-white/[5%]">
                    <div className="flex gap-2 mb-2">
                      {(['all', 'realistic', 'anime'] as CharacterFilter[]).map(f => (
                        <button
                          key={f}
                          onClick={() => setCharFilter(f)}
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                            charFilter === f
                              ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                              : 'bg-white/[4%] text-white/50 hover:text-white'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        type="text"
                        value={charSearch}
                        onChange={e => setCharSearch(e.target.value)}
                        placeholder="Search characters..."
                        className="w-full bg-white/[4%] rounded-lg pl-9 pr-3 py-2 text-white text-xs placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#d05bf8]/40"
                      />
                    </div>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {filteredCharacters.slice(0, 30).map(char => (
                      <button
                        key={char.id}
                        onClick={() => {
                          setSelectedCharacter(char);
                          setShowCharacterSelect(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 hover:bg-white/[5%] transition-all ${
                          selectedCharacter.id === char.id ? 'bg-white/[5%]' : ''
                        }`}
                      >
                        <img src={char.avatar} alt={char.name} className="size-10 rounded-full object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                        <div className="text-left flex-1">
                          <div className="text-white text-sm font-medium">{char.name}</div>
                          <div className="text-white/40 text-xs">{char.tags[0] || 'AI Girlfriend'}</div>
                        </div>
                        {selectedCharacter.id === char.id && <Check size={16} className="text-[#ff18a0]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="flex-1" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6">
        {/* Mode Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {modeButtons.map(btn => (
            <button
              key={btn.key}
              onClick={() => setMode(btn.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all ${
                mode === btn.key
                  ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg shadow-[#d05bf8]/30'
                  : 'bg-white/[4%] text-white/50 hover:text-white hover:bg-white/[8%]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Model Mode Layout: 2=1+1 */}
        {isModelMode && (
          <div className="mb-6">
            <div className="flex gap-4">
              {/* Left: Action/Pose 280x310 */}
              <div className="w-[280px] shrink-0">
                <div className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wide">Action / Pose</div>
                <div className="grid grid-cols-2 gap-2">
                  {ACTIONS.map(action => (
                    <button
                      key={action.id}
                      onClick={() => setSelectedAction(action.id === selectedAction ? '' : action.id)}
                      className={`relative rounded-xl overflow-hidden transition-all ${
                        selectedAction === action.id ? 'ring-2 ring-[#d05bf8] ring-offset-2 ring-offset-[#0F0E0F]' : 'hover:ring-1 hover:ring-white/20'
                      }`}
                      style={{ height: '130px' }}
                    >
                      <img src={action.image} alt={action.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <span className="text-white text-xs font-medium">{action.name}</span>
                      </div>
                      {selectedAction === action.id && (
                        <div className="absolute top-2 right-2 size-5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Clothes + Background stacked */}
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <div className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wide">Clothes</div>
                  <div className="grid grid-cols-3 gap-2">
                    {CLOTHES.map(cloth => (
                      <button
                        key={cloth.id}
                        onClick={() => setSelectedClothes(cloth.id === selectedClothes ? '' : cloth.id)}
                        className={`relative rounded-xl overflow-hidden transition-all ${
                          selectedClothes === cloth.id ? 'ring-2 ring-[#d05bf8] ring-offset-2 ring-offset-[#0F0E0F]' : 'hover:ring-1 hover:ring-white/20'
                        }`}
                        style={{ height: '130px' }}
                      >
                        <img src={cloth.image} alt={cloth.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <span className="text-white text-xs font-medium">{cloth.name}</span>
                        </div>
                        {selectedClothes === cloth.id && (
                          <div className="absolute top-2 right-2 size-5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-white/70 text-xs font-medium mb-2 uppercase tracking-wide">Background</div>
                  <div className="grid grid-cols-3 gap-2">
                    {BACKGROUNDS.slice(0, 6).map(bg => (
                      <button
                        key={bg}
                        onClick={() => setSelectedBackground(bg === selectedBackground ? '' : bg)}
                        className={`relative rounded-xl overflow-hidden transition-all ${
                          selectedBackground === bg ? 'ring-2 ring-[#d05bf8] ring-offset-2 ring-offset-[#0F0E0F]' : 'hover:ring-1 hover:ring-white/20'
                        }`}
                        style={{ height: '130px' }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{bg}</span>
                        </div>
                        {selectedBackground === bg && (
                          <div className="absolute top-2 right-2 size-5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings based on mode */}
        <div className="mb-6">
          {mode === 'model-video' && (
            <div className="bg-white/[3%] rounded-2xl p-4 border border-white/[5%]">
              <div className="flex gap-6 flex-wrap">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Resolution</label>
                  <div className="flex gap-2">
                    {RESOLUTIONS.map(r => (
                      <button
                        key={r}
                        onClick={() => setVideoRes(r)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          videoRes === r
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Quantity</label>
                  <div className="flex gap-2">
                    {[1, 2, 4].map(q => (
                      <button
                        key={q}
                        onClick={() => setImageQty(q)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          imageQty === q
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'model-image' && (
            <div className="bg-white/[3%] rounded-2xl p-4 border border-white/[5%]">
              <div className="flex gap-6 flex-wrap">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Quantity</label>
                  <div className="flex gap-2">
                    {QUANTITIES.map(q => (
                      <button
                        key={q}
                        onClick={() => setImageQty(q)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          imageQty === q
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {['9:16', '16:9', '1:1'].map(r => (
                      <button
                        key={r}
                        disabled
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[4%] text-white/20 cursor-not-allowed"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Resolution</label>
                  <div className="flex gap-2">
                    {['480p', '720p', '1080p'].map(r => (
                      <button
                        key={r}
                        disabled
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[4%] text-white/20 cursor-not-allowed"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'custom-video' && (
            <div className="bg-white/[3%] rounded-2xl p-4 border border-white/[5%]">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Quantity</label>
                  <div className="flex gap-2">
                    {[1, 2, 4].map(q => (
                      <button
                        key={q}
                        onClick={() => setCustomQty(q)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          customQty === q
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Duration</label>
                  <div className="flex gap-2">
                    {[5, 6, 7, 8, 9, 10].map(d => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          duration === d
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {d}s
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {ASPECT_RATIOS.map(r => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          aspectRatio === r
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Resolution</label>
                  <div className="flex gap-2">
                    {RESOLUTIONS.map(r => (
                      <button
                        key={r}
                        onClick={() => setResolution(r)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          resolution === r
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Positive Prompt</label>
                <textarea
                  value={posPrompt}
                  onChange={e => setPosPrompt(e.target.value)}
                  placeholder="Describe what you want to see..."
                  rows={3}
                  className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Negative Prompt</label>
                <textarea
                  value={negPrompt}
                  onChange={e => setNegPrompt(e.target.value)}
                  placeholder="Describe what you want to avoid..."
                  rows={2}
                  className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all resize-none"
                />
              </div>
            </div>
          )}

          {mode === 'custom-image' && (
            <div className="bg-white/[3%] rounded-2xl p-4 border border-white/[5%]">
              <div className="flex gap-6 flex-wrap mb-4">
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Quantity</label>
                  <div className="flex gap-2">
                    {QUANTITIES.map(q => (
                      <button
                        key={q}
                        onClick={() => setCustomQty(q)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          customQty === q
                            ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                            : 'bg-white/[4%] text-white/50 hover:text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Aspect Ratio</label>
                  <div className="flex gap-2">
                    {['9:16', '16:9', '1:1'].map(r => (
                      <button
                        key={r}
                        disabled
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[4%] text-white/20 cursor-not-allowed"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Resolution</label>
                  <div className="flex gap-2">
                    {['480p', '720p', '1080p'].map(r => (
                      <button
                        key={r}
                        disabled
                        className="px-4 py-2 rounded-lg text-sm font-medium bg-white/[4%] text-white/20 cursor-not-allowed"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Positive Prompt</label>
                <textarea
                  value={posPrompt}
                  onChange={e => setPosPrompt(e.target.value)}
                  placeholder="Describe what you want to see..."
                  rows={3}
                  className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wide block mb-2">Negative Prompt</label>
                <textarea
                  value={negPrompt}
                  onChange={e => setNegPrompt(e.target.value)}
                  placeholder="Describe what you want to avoid..."
                  rows={2}
                  className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] rounded-full py-4 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-[#d05bf8]/30"
        >
          {generating ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 size={16} />
              Generate {isVideoMode ? 'Video' : 'Image'}
            </>
          )}
        </button>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8">
            <h3 className="text-white font-semibold text-sm mb-4">Generated Results</h3>
            <div className={`grid gap-4 ${isVideoMode ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {results.map((url, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden">
                  {isVideoMode ? (
                    <div className="relative">
                      <img src={url} alt={'Generated ' + (idx + 1)} className="w-full aspect-video object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-12 rounded-full bg-black/50 flex items-center justify-center">
                          <Play size={20} className="text-white ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={url} alt={'Generated ' + (idx + 1)} className="w-full aspect-square object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                    <button className="size-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Eye size={16} />
                    </button>
                    <button className="size-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Heart size={16} />
                    </button>
                    <button className="size-9 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 backdrop-blur-sm">
                      <Download size={16} />
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}