import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

// Step indicator icons from original site
const STEP_ICON_PATHS = [
  '/icons/create/steps-icons/style.svg',
  '/icons/create/steps-icons/general.svg',
  '/icons/create/steps-icons/face.svg',
  '/icons/create/steps-icons/body.svg',
  '/icons/create/steps-icons/details.svg',
  '/icons/create/steps-icons/result.svg',
]

// Video URLs - local copies
const VIDEO_URLS = {
  realistic: '/videos/create/realistic.mp4',
  anime: '/videos/create/anime.mp4'
}

// Character avatar placeholders
const CHARACTER_AVATAR = '/characters/barbara_dixon/images_avif_q50_720/barbara_dixon_avatar.avif'

// Eye colors with hex values
const EYE_COLORS = [
  { name: 'Brown', color: '#8B4513' },
  { name: 'Blue', color: '#4169E1' },
  { name: 'Green', color: '#228B22' },
  { name: 'Hazel', color: '#8E7618' },
  { name: 'Gray', color: '#708090' },
  { name: 'Black', color: '#1C1C1C' },
  { name: 'Amber', color: '#FFBF00' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Red', color: '#DC143C' },
  { name: 'Violet', color: '#8B008B' },
]

// Hair colors
const HAIR_COLOR_OPTIONS = [
  { name: 'Brown', color: '#4A2518' },
  { name: 'Black', color: '#1C1C1C' },
  { name: 'Blonde', color: '#D4A76A' },
  { name: 'Red', color: '#8B4513' },
  { name: 'Grey', color: '#808080' },
  { name: 'Hazel', color: '#8E7618' },
  { name: 'Amber', color: '#FFBF00' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Blue', color: '#4169E1' },
  { name: 'Green', color: '#228B22' },
  { name: 'Purple', color: '#8B008B' },
]

// Ethnicity options
const ETHNICITIES = [
  { name: 'Asian', image: CHARACTER_AVATAR },
  { name: 'Black', image: CHARACTER_AVATAR },
  { name: 'White', image: CHARACTER_AVATAR },
  { name: 'Latina', image: CHARACTER_AVATAR },
  { name: 'Arab', image: CHARACTER_AVATAR },
  { name: 'Indian', image: CHARACTER_AVATAR },
  { name: 'Elf', image: CHARACTER_AVATAR },
  { name: 'Demon', image: CHARACTER_AVATAR },
]

// Voice options
const VOICES = ['Bubbly', 'Casual', 'Confident', 'Ethereal', 'Gentle', 'Husky', 'Hypnotic']

// Personality options
const PERSONALITIES = [
  'Sweet', 'Shy', 'Mysterious', 'Tsundere', 'Dominant', 'Intellectual',
  'Caring', 'Passionate', 'Quirky', 'Flirty', 'Playful', 'Sassy',
  'Yandere', 'Submissive', 'Adventurous', 'Witty', 'Charming', 'Seductive'
]

// Occupation options
const OCCUPATIONS = [
  'Stripper', 'Superhero', 'Teacher', 'Influencer', 'Dominatrix', 'Warrior',
  'Lawyer', 'Surfer', 'Porn Star', 'Doctor', 'Gamer', 'Artist', 'Coach',
  'Escort', 'Biologist', 'Engineer', 'Chef', 'Skydiver'
]

// Relationship options
const RELATIONSHIPS = [
  'Step-Mum', 'Step-Daughter', 'Friend', 'Crush', 'Roommate', 'Classmate',
  'Student', 'Admirer', 'Boss', 'Step-Sister', 'Lover', 'Stranger', 'Ex',
  'Colleague', 'Mentor', 'Neighbor', 'Rival', 'Employee'
]

// Hobby options
const HOBBIES = [
  'Reading', 'Cooking', 'Writing', 'Guitar', 'Dancing', 'Knitting', 'Hiking',
  'Fishing', 'Stargazing', 'Yoga', 'Running', 'Gaming', 'Painting', 'Photography',
  'Singing', 'Sculpting', 'Gardening', 'Camping', 'Bird Watching', 'Rock Climbing',
  'Meditation', 'Cycling'
]

// Detail card configuration
const DETAIL_CARDS = [
  { key: 'voice', label: 'Voice', options: VOICES },
  { key: 'personality', label: 'Personality', options: PERSONALITIES },
  { key: 'occupation', label: 'Occupation', options: OCCUPATIONS },
  { key: 'relationship', label: 'Relationship', options: RELATIONSHIPS },
  { key: 'hobby', label: 'Hobby', options: HOBBIES },
  { key: 'fetish', label: 'Fetish', options: ['Bondage', 'Foot', 'Lingerie', 'Uniform', 'Anime', 'Cosplay', 'Schoolgirl', 'Maid', 'Nurse', 'Cheerleader'] },
]

// Detail card icons (SVG paths)
const DETAIL_ICONS: Record<string, JSX.Element> = {
  voice: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  personality: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9"/>
      <line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),
  occupation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  relationship: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  hobby: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  fetish: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
}

export default function Create() {
  const [step, setStep] = useState(0)
  const [style, setStyle] = useState<'realistic' | 'anime'>('realistic')
  const [gender, setGender] = useState<'female' | 'trans'>('female')
  const [ethnicity, setEthnicity] = useState('')
  const [eyeColor, setEyeColor] = useState(EYE_COLORS[0])
  const [hairColor, setHairColor] = useState(HAIR_COLOR_OPTIONS[0])
  const [name, setName] = useState('')
  const [details, setDetails] = useState<Record<string, string>>({
    voice: '',
    personality: '',
    occupation: '',
    relationship: '',
    hobby: '',
    fetish: '',
  })
  const [greeting, setGreeting] = useState('')
  const [selectedVoiceOption, setSelectedVoiceOption] = useState('')
  const [modalOpen, setModalOpen] = useState<string | null>(null)
  const [voiceModalOpen, setVoiceModalOpen] = useState(false)
  const [showDesignAI, setShowDesignAI] = useState(false)

  const totalSteps = 6

  const canContinue = () => {
    switch (step) {
      case 0: return true
      case 1: return !!ethnicity
      case 2: return true
      case 3: return true
      case 4: return name.trim().length > 0
      case 5: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (canContinue() && step < totalSteps - 1) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const openModal = (key: string) => {
    setModalOpen(key)
  }

  const closeModal = () => {
    setModalOpen(null)
  }

  const selectOption = (key: string, value: string) => {
    setDetails(prev => ({ ...prev, [key]: value }))
    closeModal()
  }

  const playVoice = (voice: string) => {
    setSelectedVoiceOption(voice)
  }

  const applyVoice = () => {
    if (selectedVoiceOption) {
      setDetails(prev => ({ ...prev, voice: selectedVoiceOption }))
    }
    setVoiceModalOpen(false)
  }

  const renderModal = (title: string, options: string[], currentValue: string, onSelect: (value: string) => void) => (
    <div
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="bg-[#181718] rounded-[22px] border border-white/[10%] w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/[6%]">
          <h2 className="text-[18px] font-[700]">{title}</h2>
          <button
            onClick={closeModal}
            className="size-8 flex items-center justify-center rounded-full hover:bg-white/[6%] transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-2">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                className={`px-4 py-2.5 rounded-[12px] text-[13px] font-medium transition-all text-left ${
                  currentValue === opt
                    ? 'bg-[#E81B9D] text-white'
                    : 'bg-white/[4%] text-white/70 border border-white/[6%] hover:border-white/[15%]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-24">
      {/* Progress Bar at Top */}
      <div className="px-4 py-4 border-b border-white/[6%]">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const isCompleted = i < step
            const isCurrent = i === step

            return (
              <div key={i} className="flex items-center">
                {i > 0 && (
                  <div
                    className={`w-6 h-[2px] transition-all ${
                      i <= step ? 'bg-[#E81B9D]' : 'bg-[#222122]'
                    }`}
                  />
                )}
                <div
                  className={`flex items-center justify-center rounded-full transition-all w-10 h-10 ${
                    isCompleted || isCurrent
                      ? 'bg-[#E81B9D]'
                      : 'bg-[#222122]'
                  } ${isCurrent ? 'ring-2 ring-[#E81B9D]/50 ring-offset-2 ring-offset-[#0F0E0F]' : ''}`}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <img
                      src={STEP_ICON_PATHS[i]}
                      alt=""
                      className={`h-5 w-5 ${isCurrent ? 'brightness-0 invert' : 'brightness-[0.6]'}`}
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Step 1: Style */}
        {step === 0 && (
          <div className="space-y-6">
            {/* Gender Buttons */}
            <div className="flex gap-3">
              {([
                { key: 'female', label: 'Female', icon: '/icons/create/gender/female.svg' },
                { key: 'trans', label: 'Trans', icon: '/icons/create/gender/tgirl.svg' },
              ] as const).map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => setGender(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all ${
                    gender === key
                      ? 'bg-[#E81B9D] text-white'
                      : 'bg-white/[4%] text-white/50 border border-white/[6%]'
                  }`}
                >
                  <img src={icon} alt="" className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Style Cards with Video Background */}
            <div className="grid grid-cols-2 gap-4">
              {(['realistic', 'anime'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`relative group rounded-[16px] overflow-hidden h-[200px] border-2 transition-all duration-300 ${
                    style === s
                      ? 'border-[#E81B9D] shadow-lg shadow-[#E81B9D]/20'
                      : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  {/* Video Background */}
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={VIDEO_URLS[s]} type="video/mp4" />
                  </video>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Checkmark Badge */}
                  {style === s && (
                    <span className="absolute top-3 right-3 size-6 rounded-full bg-[#E81B9D] flex items-center justify-center shadow-lg">
                      <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  {/* Label */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[16px] font-[600] capitalize">{s}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Ethnicity */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-[20px] font-[700] tracking-[-4%]">Ethnicity</h2>
            <div className="grid grid-cols-4 gap-3">
              {ETHNICITIES.map(e => (
                <button
                  key={e.name}
                  onClick={() => setEthnicity(e.name)}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-[16px] border-2 transition-all ${
                    ethnicity === e.name
                      ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                      : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  <img
                    src={e.image}
                    alt={e.name}
                    className="w-16 h-16 rounded-[12px] object-cover"
                  />
                  <span className="text-[12px] font-medium">{e.name}</span>
                  {ethnicity === e.name && (
                    <span className="absolute top-2 right-2 size-5 rounded-full bg-[#E81B9D] flex items-center justify-center">
                      <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Eye Color */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-[20px] font-[700] tracking-[-4%]">Eye Color</h2>
            {/* Preview Image */}
            <div className="flex justify-center">
              <div className="relative w-48 h-48 rounded-[20px] overflow-hidden bg-[#1a1a1a]">
                <img
                  src={CHARACTER_AVATAR}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {/* Eye color overlay effect */}
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-20 h-4">
                  <div
                    className="w-full h-full rounded-full opacity-60 blur-sm"
                    style={{ backgroundColor: eyeColor.color }}
                  />
                </div>
              </div>
            </div>
            {/* Color Swatches */}
            <div className="flex flex-wrap justify-center gap-3">
              {EYE_COLORS.map(e => (
                <button
                  key={e.name}
                  onClick={() => setEyeColor(e)}
                  className={`size-10 rounded-full transition-all ${
                    eyeColor.name === e.name
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0F0E0F] scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: e.color }}
                  title={e.name}
                />
              ))}
            </div>
            <p className="text-center text-[14px] text-white/60">
              Selected: <span className="text-white font-medium">{eyeColor.name}</span>
            </p>
          </div>
        )}

        {/* Step 4: Hair Color */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-[20px] font-[700] tracking-[-4%]">Hair Color</h2>
            <div className="grid grid-cols-4 gap-3">
              {HAIR_COLOR_OPTIONS.map(h => (
                <button
                  key={h.name}
                  onClick={() => setHairColor(h)}
                  className={`relative flex flex-col items-center gap-2 p-3 rounded-[16px] border-2 transition-all ${
                    hairColor.name === h.name
                      ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                      : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-[12px]"
                    style={{ backgroundColor: h.color }}
                  />
                  <span className="text-[12px] font-medium">{h.name}</span>
                  {hairColor.name === h.name && (
                    <span className="absolute top-2 right-2 size-5 rounded-full bg-[#E81B9D] flex items-center justify-center">
                      <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Character Details */}
        {step === 4 && (
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Character Name</h2>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter character name..."
                className="w-full bg-white/[4%] border border-white/[6%] rounded-[16px] py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E81B9D]/40"
              />
            </div>

            {/* Detail Cards 2x3 Grid */}
            <div className="grid grid-cols-2 gap-3">
              {DETAIL_CARDS.map(card => (
                <button
                  key={card.key}
                  onClick={() => openModal(card.key)}
                  className="flex flex-col gap-2 p-4 bg-white/[4%] border border-white/[6%] rounded-[16px] hover:bg-white/[6%] transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-[12px] bg-[#E81B9D]/20 flex items-center justify-center text-[#E81B9D]">
                      {DETAIL_ICONS[card.key]}
                    </div>
                    <ChevronDown size={16} className="text-white/40" />
                  </div>
                  <span className="text-[12px] text-white/40">{card.label}</span>
                  <span className="text-[14px] font-medium truncate">
                    {details[card.key] || 'Select...'}
                  </span>
                </button>
              ))}
            </div>

            {/* Greeting Textarea */}
            <div>
              <label className="text-[12px] text-white/40 mb-2 block">Custom Greeting (Optional)</label>
              <textarea
                value={greeting}
                onChange={e => setGreeting(e.target.value)}
                placeholder="Write a custom greeting message..."
                rows={3}
                className="w-full bg-white/[4%] border border-white/[6%] rounded-[16px] py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#E81B9D]/40 resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 6: Voice Selection */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-[20px] font-[700] tracking-[-4%]">Voice Selection</h2>
            <div className="grid gap-3">
              {VOICES.map(voice => (
                <button
                  key={voice}
                  onClick={() => playVoice(voice)}
                  className={`flex items-center justify-between p-4 rounded-[16px] border-2 transition-all ${
                    selectedVoiceOption === voice
                      ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                      : 'border-white/[6%] hover:border-white/[15%]'
                  }`}
                >
                  <span className="text-[14px] font-medium">{voice}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); playVoice(voice); }}
                      className="size-10 rounded-full bg-[#E81B9D]/20 flex items-center justify-center hover:bg-[#E81B9D]/30 transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#E81B9D">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </button>
                    {selectedVoiceOption === voice && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E81B9D" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                if (selectedVoiceOption) {
                  setDetails(prev => ({ ...prev, voice: selectedVoiceOption }))
                }
              }}
              disabled={!selectedVoiceOption}
              className={`w-full py-[14px] rounded-[16px] text-[14px] font-semibold transition-all ${
                selectedVoiceOption
                  ? 'bg-[#E81B9D] text-white hover:bg-[#d0188c]'
                  : 'bg-white/[6%] text-white/30 cursor-not-allowed'
              }`}
            >
              Apply Voice
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-3 bg-[#0F0E0F]/95 backdrop-blur-md border-t border-white/[6%]">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center justify-center size-10 rounded-full hover:bg-white/[6%] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Continue Button */}
        <button
          onClick={handleNext}
          disabled={!canContinue()}
          className={`flex-1 py-[10px] rounded-full text-[14px] font-semibold transition-all ${
            canContinue()
              ? 'bg-[#E81B9D] text-white hover:bg-[#d0188c]'
              : 'bg-white/[6%] text-white/30 cursor-not-allowed'
          }`}
        >
          {step === totalSteps - 1 ? 'Create Character' : 'Continue'}
        </button>

        {/* Design AI Button (Step 1 only) */}
        {step === 0 && (
          <button
            onClick={() => setShowDesignAI(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[4%] border border-white/[10%] text-white/70 text-[13px] hover:bg-white/[6%] hover:text-white/80 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Design AI
          </button>
        )}
      </div>

      {/* Detail Modals */}
      {modalOpen && (
        renderModal(
          DETAIL_CARDS.find(c => c.key === modalOpen)?.label || '',
          DETAIL_CARDS.find(c => c.key === modalOpen)?.options || [],
          details[modalOpen] || '',
          (value) => selectOption(modalOpen, value)
        )
      )}

      {/* Design AI Modal */}
      {showDesignAI && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setShowDesignAI(false)}
        >
          <div className="bg-[#181718] rounded-[22px] border border-white/[10%] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-[700]">Design with AI</h2>
              <button
                onClick={() => setShowDesignAI(false)}
                className="size-8 flex items-center justify-center rounded-full hover:bg-white/[6%] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-[13px] text-white/50">Describe your ideal companion and let AI design them.</p>
            <textarea
              placeholder='e.g. "A mysterious girl with long black hair and an intriguing personality..."'
              rows={4}
              className="w-full bg-white/[4%] border border-white/[6%] rounded-[16px] py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#E81B9D]/40 resize-none"
            />
            <button
              onClick={() => setShowDesignAI(false)}
              className="w-full py-3 rounded-[16px] bg-[#E81B9D] text-white text-[14px] font-semibold hover:bg-[#d0188c] transition-colors"
            >
              Generate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}