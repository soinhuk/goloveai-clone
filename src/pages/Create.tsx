import { useState } from 'react'
import { X, ChevronDown, ChevronUp, Play, ChevronLeft, ChevronRight } from 'lucide-react'

// Step indicator icons
const STEP_ICONS = [
  '/icons/create/steps-icons/style.svg',
  '/icons/create/steps-icons/general.svg',
  '/icons/create/steps-icons/face.svg',
  '/icons/create/steps-icons/body.svg',
  '/icons/create/steps-icons/details.svg',
  '/icons/create/steps-icons/result.svg',
]

// Video URLs
const VIDEO_URLS = {
  realistic: '/videos/create/realistic.mp4',
  anime: '/videos/create/anime.mp4'
}

// Default avatar for preview
const DEFAULT_AVATAR = '/images/create/ethnicity-step/asian.avif'

// Eye colors with hex values
const EYE_COLORS = [
  { name: 'Brown', color: '#8B4513', image: '/images/create/face/eye-color/brown.avif' },
  { name: 'Blue', color: '#4169E1', image: '/images/create/face/eye-color/blue.avif' },
  { name: 'Green', color: '#228B22', image: '/images/create/face/eye-color/green.avif' },
  { name: 'Hazel', color: '#8E7618', image: '/images/create/face/eye-color/hazel.avif' },
  { name: 'Gray', color: '#708090', image: '/images/create/face/eye-color/gray.avif' },
  { name: 'Black', color: '#1C1C1C', image: '/images/create/face/eye-color/black.avif' },
  { name: 'Amber', color: '#FFBF00', image: '/images/create/face/eye-color/amber.avif' },
  { name: 'Gold', color: '#FFD700', image: '/images/create/face/eye-color/gold.avif' },
  { name: 'Red', color: '#DC143C', image: '/images/create/face/eye-color/red.avif' },
  { name: 'Violet', color: '#8B008B', image: '/images/create/face/eye-color/violet.avif' },
]

// Hair colors with preview URLs
const HAIR_COLORS = [
  { name: 'Brown', color: '#4A2518', image: '/images/create/face/hair-color/brown.avif' },
  { name: 'Black', color: '#1C1C1C', image: '/images/create/face/hair-color/black.avif' },
  { name: 'Blonde', color: '#D4A76A', image: '/images/create/face/hair-color/blonde.avif' },
  { name: 'Red', color: '#8B4513', image: '/images/create/face/hair-color/red.avif' },
  { name: 'Grey', color: '#808080', image: '/images/create/face/hair-color/grey.avif' },
  { name: 'Hazel', color: '#8E7618', image: '/images/create/face/hair-color/hazel.avif' },
  { name: 'Amber', color: '#FFBF00', image: '/images/create/face/hair-color/amber.avif' },
  { name: 'Gold', color: '#FFD700', image: '/images/create/face/hair-color/gold.avif' },
  { name: 'Blue', color: '#4169E1', image: '/images/create/face/hair-color/blue.avif' },
  { name: 'Green', color: '#228B22', image: '/images/create/face/hair-color/green.avif' },
  { name: 'Violet', color: '#8B008B', image: '/images/create/face/hair-color/violet.avif' },
]

// Hair styles
const HAIR_STYLES = [
  { name: 'Long Straight', image: '/images/create/face/hair-style/long.avif' },
  { name: 'Long Wavy', image: '/images/create/face/hair-style/wavy.avif' },
  { name: 'Short Bob', image: '/images/create/face/hair-style/short.avif' },
  { name: 'Bangs', image: '/images/create/face/hair-style/bangs.avif' },
  { name: 'Ponytail', image: '/images/create/face/hair-style/ponytail.avif' },
  { name: 'Braids', image: '/images/create/face/hair-style/braided.avif' },
  { name: 'Bun', image: '/images/create/face/hair-style/bun.avif' },
  { name: 'Pigtails', image: '/images/create/face/hair-style/buns.avif' },
]

// Ethnicity options
const ETHNICITIES = [
  { name: 'Asian', image: '/images/create/ethnicity-step/asian.avif' },
  { name: 'Black', image: '/images/create/ethnicity-step/black.avif' },
  { name: 'White', image: '/images/create/ethnicity-step/white.avif' },
  { name: 'Latina', image: '/images/create/ethnicity-step/latina.avif' },
  { name: 'Arab', image: '/images/create/ethnicity-step/arab.avif' },
  { name: 'Indian', image: '/images/create/ethnicity-step/indian.avif' },
  { name: 'Elf', image: '/images/create/ethnicity-step/elf.avif' },
  { name: 'Demon', image: '/images/create/ethnicity-step/demon.avif' },
]

// Body types
const BODY_TYPES = [
  { name: 'Slim', image: '/images/create/body-type/slim.avif' },
  { name: 'Athletic', image: '/images/create/body-type/athletic.avif' },
  { name: 'Voluptuous', image: '/images/create/body-type/voluptuous.avif' },
  { name: 'Curvy', image: '/images/create/body-type/curvy.avif' },
  { name: 'Muscular', image: '/images/create/body-type/muscular.avif' },
]

// Breast sizes
const BREAST_SIZES = [
  { name: 'Flat', image: '/images/create/breast-size/flat.avif' },
  { name: 'Small', image: '/images/create/breast-size/small.avif' },
  { name: 'Medium', image: '/images/create/breast-size/medium.avif' },
  { name: 'Large', image: '/images/create/breast-size/large.avif' },
  { name: 'Huge', image: '/images/create/breast-size/xl.avif' },
]

// Butt sizes
const BUTT_SIZES = [
  { name: 'Small', image: '/images/create/butt-size/small.avif' },
  { name: 'Medium', image: '/images/create/butt-size/athletic.avif' },
  { name: 'Large', image: '/images/create/butt-size/medium.avif' },
  { name: 'XL', image: '/images/create/butt-size/large.avif' },
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

// Fetish options
const FETISHES = ['Bondage', 'Foot', 'Lingerie', 'Uniform', 'Anime', 'Cosplay', 'Schoolgirl', 'Maid', 'Nurse', 'Cheerleader']

// Detail card configuration
const DETAIL_CARDS = [
  { key: 'voice', label: 'Voice', options: VOICES, hasPlayButton: true, image: '/images/create/personality/voice.avif' },
  { key: 'personality', label: 'Personality', options: PERSONALITIES, hasPlayButton: false, image: '/images/create/personality/personality.avif' },
  { key: 'occupation', label: 'Occupation', options: OCCUPATIONS, hasPlayButton: false, image: '/images/create/personality/occupation.avif' },
  { key: 'relationship', label: 'Relationship', options: RELATIONSHIPS, hasPlayButton: false, image: '/images/create/personality/relationship.avif' },
  { key: 'hobby', label: 'Hobby', options: HOBBIES, hasPlayButton: false, image: '/images/create/personality/hobby.avif' },
  { key: 'fetish', label: 'Fetish', options: FETISHES, hasPlayButton: false, image: '/images/create/personality/fetish.avif' },
]

// Detail card icons
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

// Icon paths
const ICONS = {
  magicWand: '/icons/create/details/magic-wand.svg',
  info: '/icons/create/details/info.svg',
}

// FAQ data
const FAQ_ITEMS = [
  { question: 'How long does it take to create an AI girlfriend?', answer: 'Creating your AI girlfriend takes just a few minutes. Simply select your preferences and customize your character to your liking.' },
  { question: 'Can I customize my AI girlfriend after creation?', answer: 'Yes! You can always go back and modify your AI girlfriend\'s appearance, personality, and other settings at any time.' },
  { question: 'Is my privacy protected?', answer: 'Absolutely. All your conversations and creations are kept private and secure. We never share your data with third parties.' },
  { question: 'What makes each AI girlfriend unique?', answer: 'Every AI girlfriend has a unique combination of appearance, personality traits, voice, and backstory that you choose during creation.' },
]

// Name generation hints
const NAME_HINTS = [
  'Luna', 'Aria', 'Zara', 'Nova', 'Ivy', 'Raven', 'Luna', 'Chloe', 'Mia', 'Aria',
  'Luna', 'Sofia', 'Maya', 'Luna', 'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia'
]

export default function Create() {
  const [step, setStep] = useState(0)
  const [style, setStyle] = useState<'realistic' | 'anime'>('realistic')
  const [gender, setGender] = useState<'female' | 'trans'>('female')

  // Step 2 - Ethnicity & Age
  const [ethnicity, setEthnicity] = useState('')
  const [age, setAge] = useState(25)

  // Step 3 - Face (Eye Color, Hair Color, Hair Style)
  const [eyeColor, setEyeColor] = useState(EYE_COLORS[0])
  const [hairColor, setHairColor] = useState(HAIR_COLORS[0])
  const [hairStyle, setHairStyle] = useState('Long Straight')

  // Step 4 - Body
  const [bodyType, setBodyType] = useState('Slim')
  const [breastSize, setBreastSize] = useState('Medium')
  const [buttSize, setButtSize] = useState('Medium')

  // Step 5 - Character Details
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
  const [scenario, setScenario] = useState('')
  const [tags, setTags] = useState('')
  const [playingVoice, setPlayingVoice] = useState<string | null>(null)

  // Step 6 - Review
  const [additionalStyles, setAdditionalStyles] = useState<string[]>([])

  // Modals
  const [modalOpen, setModalOpen] = useState<string | null>(null)
  const [showDesignAI, setShowDesignAI] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const totalSteps = 6

  const canContinue = () => {
    switch (step) {
      case 0: return true
      case 1: return !!ethnicity
      case 2: return !!hairStyle
      case 3: return !!bodyType && !!breastSize && !!buttSize
      case 4: return name.trim().length > 0
      case 5: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (canContinue() && step < totalSteps - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToStep = (targetStep: number) => {
    setStep(targetStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
    setPlayingVoice(voice)
    // Simulate voice playback
    setTimeout(() => setPlayingVoice(null), 2000)
  }

  const generateName = () => {
    const randomName = NAME_HINTS[Math.floor(Math.random() * NAME_HINTS.length)]
    setName(randomName)
  }

  const toggleAdditionalStyle = (styleName: string) => {
    setAdditionalStyles(prev =>
      prev.includes(styleName)
        ? prev.filter(s => s !== styleName)
        : [...prev, styleName]
    )
  }

  const renderModal = (title: string, options: string[], currentValue: string, onSelect: (value: string) => void, hasPlayButton?: boolean) => (
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
                className={`px-4 py-2.5 rounded-[12px] text-[13px] font-medium transition-all text-left flex items-center justify-between ${
                  currentValue === opt
                    ? 'bg-[#E81B9D] text-white'
                    : 'bg-white/[4%] text-white/70 border border-white/[6%] hover:border-white/[15%]'
                }`}
              >
                <span>{opt}</span>
                {hasPlayButton && currentValue === opt && (
                  <Play size={14} className="ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-32">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 px-4 py-4 border-b border-white/[6%] bg-[#0F0E0F]">
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
                <button
                  onClick={() => i < step && goToStep(i)}
                  disabled={i >= step}
                  className={`flex items-center justify-center rounded-full transition-all w-10 h-10 ${
                    isCompleted || isCurrent
                      ? 'bg-[#E81B9D]'
                      : 'bg-[#222122]'
                  } ${isCurrent ? 'ring-2 ring-[#E81B9D]/50 ring-offset-2 ring-offset-[#0F0E0F]' : ''} ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  {isCompleted ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <img
                      src={STEP_ICONS[i]}
                      alt=""
                      className={`h-5 w-5 ${isCurrent ? 'brightness-0 invert' : 'brightness-[0.6]'}`}
                    />
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Step 1: Style (Landing) */}
        {step === 0 && (
          <div className="space-y-8">
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
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={VIDEO_URLS[s]} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {style === s && (
                    <span className="absolute top-3 right-3 size-6 rounded-full bg-[#E81B9D] flex items-center justify-center shadow-lg">
                      <svg className="size-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[16px] font-[600] capitalize">{s}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* How to Create Section */}
            <div className="pt-4">
              <h3 className="text-[18px] font-[700] text-center mb-6">How to Create Your AI Girlfriend in 3 Steps</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: '01', title: 'Choose Style', desc: 'Select realistic or anime style' },
                  { num: '02', title: 'Customize', desc: 'Pick appearance & personality' },
                  { num: '03', title: 'Chat', desc: 'Start chatting instantly' },
                ].map(item => (
                  <div key={item.num} className="text-center">
                    <div className="text-[32px] font-[800] text-[#E81B9D] mb-2">{item.num}</div>
                    <div className="text-[14px] font-[600] mb-1">{item.title}</div>
                    <div className="text-[12px] text-white/50">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-2 pt-4">
              <h3 className="text-[18px] font-[700] mb-4">FAQ</h3>
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white/[4%] rounded-[16px] border border-white/[6%] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="text-[14px] font-medium pr-4">{item.question}</span>
                    {openFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4">
                      <p className="text-[13px] text-white/60">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Ethnicity + Age */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Ethnicity</h2>
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
                      className="w-24 h-24 rounded-[12px] object-cover"
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

            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Age</h2>
              <div className="bg-white/[4%] rounded-[16px] p-6 border border-white/[6%]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[14px] text-white/50">18</span>
                  <span className="text-[24px] font-[700] text-[#E81B9D]">{age}</span>
                  <span className="text-[14px] text-white/50">50</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-2 bg-white/[10%] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#E81B9D] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#E81B9D]/30"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Eye Color + Hair Color + Hair Style (ALL ON ONE PAGE) */}
        {step === 2 && (
          <div className="space-y-8">
            {/* Eye Color */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Eye Color</h2>
              <div className="flex justify-center mb-4">
                <div className="relative w-48 h-48 rounded-[20px] overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={eyeColor.image || DEFAULT_AVATAR}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-20 h-4">
                    <div
                      className="w-full h-full rounded-full opacity-60 blur-sm"
                      style={{ backgroundColor: eyeColor.color }}
                    />
                  </div>
                </div>
              </div>
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
            </div>

            {/* Hair Color */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Hair Color</h2>
              <div className="grid grid-cols-4 gap-3">
                {HAIR_COLORS.map(h => (
                  <button
                    key={h.name}
                    onClick={() => setHairColor(h)}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-[16px] border-2 transition-all ${
                      hairColor.name === h.name
                        ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={h.image}
                      alt={h.name}
                      className="w-20 h-20 rounded-[12px] object-cover"
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

            {/* Hair Style */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Hair Style</h2>
              <div className="grid grid-cols-4 gap-3">
                {HAIR_STYLES.map(h => (
                  <button
                    key={h.name}
                    onClick={() => setHairStyle(h.name)}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-[16px] border-2 transition-all ${
                      hairStyle === h.name
                        ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={h.image}
                      alt={h.name}
                      className="w-20 h-20 rounded-[12px] object-cover"
                    />
                    <span className="text-[12px] font-medium">{h.name}</span>
                    {hairStyle === h.name && (
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
          </div>
        )}

        {/* Step 4: Body (ALL ON ONE PAGE) */}
        {step === 3 && (
          <div className="space-y-8">
            {/* Body Type */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Body Type</h2>
              <div className="grid grid-cols-5 gap-3">
                {BODY_TYPES.map(b => (
                  <button
                    key={b.name}
                    onClick={() => setBodyType(b.name)}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-[16px] border-2 transition-all ${
                      bodyType === b.name
                        ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-20 h-20 rounded-[12px] object-cover"
                    />
                    <span className="text-[12px] font-medium">{b.name}</span>
                    {bodyType === b.name && (
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

            {/* Breast Size */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Breast Size</h2>
              <div className="grid grid-cols-5 gap-3">
                {BREAST_SIZES.map(b => (
                  <button
                    key={b.name}
                    onClick={() => setBreastSize(b.name)}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-[16px] border-2 transition-all ${
                      breastSize === b.name
                        ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-20 h-20 rounded-[12px] object-cover"
                    />
                    <span className="text-[12px] font-medium">{b.name}</span>
                    {breastSize === b.name && (
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

            {/* Butt Size */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Butt Size</h2>
              <div className="grid grid-cols-4 gap-3">
                {BUTT_SIZES.map(b => (
                  <button
                    key={b.name}
                    onClick={() => setButtSize(b.name)}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-[16px] border-2 transition-all ${
                      buttSize === b.name
                        ? 'border-[#E81B9D] bg-[#E81B9D]/10'
                        : 'border-white/[6%] hover:border-white/[15%]'
                    }`}
                  >
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-20 h-20 rounded-[12px] object-cover"
                    />
                    <span className="text-[12px] font-medium">{b.name}</span>
                    {buttSize === b.name && (
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
          </div>
        )}

        {/* Step 5: Character Details */}
        {step === 4 && (
          <div className="space-y-6">
            {/* Character Name with Magic Wand */}
            <div>
              <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">Character Name</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter character name..."
                  className="flex-1 bg-white/[4%] border border-white/[6%] rounded-[16px] py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E81B9D]/40"
                />
                <button
                  onClick={generateName}
                  className="size-12 rounded-[16px] bg-[#E81B9D]/20 border border-[#E81B9D]/30 flex items-center justify-center hover:bg-[#E81B9D]/30 transition-colors"
                  title="Generate Name"
                >
                  <img src={ICONS.magicWand} alt="Generate" className="size-5 text-[#E81B9D]" />
                </button>
              </div>
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
                    {card.hasPlayButton && details[card.key] && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playVoice(details[card.key]); }}
                        className="size-8 rounded-full bg-[#E81B9D]/20 flex items-center justify-center hover:bg-[#E81B9D]/30 transition-colors"
                      >
                        {playingVoice === details[card.key] ? (
                          <div className="size-3 bg-[#E81B9D] rounded-full animate-pulse" />
                        ) : (
                          <Play size={12} className="text-[#E81B9D]" />
                        )}
                      </button>
                    )}
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
              <label className="text-[14px] font-medium mb-2 block">Custom Greeting (Optional)</label>
              <textarea
                value={greeting}
                onChange={e => setGreeting(e.target.value)}
                placeholder="Write a custom greeting message..."
                rows={3}
                className="w-full bg-white/[4%] border border-white/[6%] rounded-[16px] py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#E81B9D]/40 resize-none"
              />
            </div>

            {/* Scenario Textarea */}
            <div>
              <label className="text-[14px] font-medium mb-2 block">Scenario (Optional)</label>
              <textarea
                value={scenario}
                onChange={e => setScenario(e.target.value)}
                placeholder="Describe the scenario or backstory..."
                rows={3}
                className="w-full bg-white/[4%] border border-white/[6%] rounded-[16px] py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#E81B9D]/40 resize-none"
              />
            </div>

            {/* Tags Input */}
            <div>
              <label className="text-[14px] font-medium mb-2 block">Tags (Optional)</label>
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="Enter tags separated by commas..."
                className="w-full bg-white/[4%] border border-white/[6%] rounded-[16px] py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E81B9D]/40"
              />
            </div>
          </div>
        )}

        {/* Step 6: Review/Summary */}
        {step === 5 && (
          <div className="space-y-6">
            {/* Character Preview */}
            <div className="flex items-center gap-4 p-4 bg-white/[4%] rounded-[16px] border border-white/[6%]">
              <img
                src={DEFAULT_AVATAR}
                alt={name || 'Character'}
                className="w-24 h-24 rounded-[16px] object-cover"
              />
              <div className="flex-1">
                <h2 className="text-[24px] font-[700]">{name || 'Unnamed Character'}</h2>
                <p className="text-[14px] text-white/50 capitalize">{style}</p>
              </div>
              <button
                onClick={() => goToStep(0)}
                className="px-4 py-2 rounded-full bg-white/[6%] text-[13px] hover:bg-white/[10%] transition-colors"
              >
                Edit
              </button>
            </div>

            {/* Main Style */}
            <div className="bg-white/[4%] rounded-[16px] border border-white/[6%] p-4">
              <h3 className="text-[14px] font-medium text-white/50 mb-3">Main Style</h3>
              <div className="text-[16px] font-semibold capitalize">{style}</div>
            </div>

            {/* Additional Styles */}
            <div className="bg-white/[4%] rounded-[16px] border border-white/[6%] p-4">
              <h3 className="text-[14px] font-medium text-white/50 mb-3">Additional Styles</h3>
              <div className="flex gap-2 flex-wrap">
                {['Beauty', 'Natural', 'Glamour'].map(s => (
                  <button
                    key={s}
                    onClick={() => toggleAdditionalStyle(s)}
                    className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                      additionalStyles.includes(s)
                        ? 'bg-[#E81B9D] text-white'
                        : 'bg-white/[6%] text-white/70 border border-white/[10%]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white/[4%] rounded-[16px] border border-white/[6%] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-medium text-white/50">Appearance</h3>
                <button
                  onClick={() => goToStep(1)}
                  className="text-[13px] text-[#E81B9D] hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div className="flex justify-between">
                  <span className="text-white/50">Ethnicity</span>
                  <span>{ethnicity || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Hair Style</span>
                  <span>{hairStyle || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Hair Color</span>
                  <span>{hairColor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Eyes</span>
                  <span>{eyeColor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Age</span>
                  <span>{age}</span>
                </div>
              </div>
            </div>

            {/* Body Settings */}
            <div className="bg-white/[4%] rounded-[16px] border border-white/[6%] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-medium text-white/50">Body</h3>
                <button
                  onClick={() => goToStep(3)}
                  className="text-[13px] text-[#E81B9D] hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-[13px]">
                <div className="flex flex-col items-center p-3 bg-white/[4%] rounded-[12px]">
                  <span className="text-white/50 mb-1">Type</span>
                  <span className="font-medium">{bodyType || '-'}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/[4%] rounded-[12px]">
                  <span className="text-white/50 mb-1">Breasts</span>
                  <span className="font-medium">{breastSize || '-'}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-white/[4%] rounded-[12px]">
                  <span className="text-white/50 mb-1">Butt</span>
                  <span className="font-medium">{buttSize || '-'}</span>
                </div>
              </div>
            </div>

            {/* Personality Settings */}
            <div className="bg-white/[4%] rounded-[16px] border border-white/[6%] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-medium text-white/50">Personality</h3>
                <button
                  onClick={() => goToStep(4)}
                  className="text-[13px] text-[#E81B9D] hover:underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {DETAIL_CARDS.map(card => (
                  <div key={card.key} className="flex justify-between text-[13px]">
                    <span className="text-white/50">{card.label}</span>
                    <span className="truncate ml-2">{details[card.key] || '-'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Greeting Preview */}
            {greeting && (
              <div className="bg-white/[4%] rounded-[16px] border border-white/[6%] p-4">
                <h3 className="text-[14px] font-medium text-white/50 mb-2">Custom Greeting</h3>
                <p className="text-[14px] text-white/70">{greeting}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-[66px] desktop:bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-[#0F0E0F]/95 backdrop-blur-md border-t border-white/[6%]">
        {/* Back Button */}
        <button
          onClick={handleBack}
          disabled={step === 0}
          className={`flex items-center justify-center size-8 rounded-full transition-colors ${
            step === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/[6%]'
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Continue/Create Button - normal size */}
        <button
          onClick={handleNext}
          disabled={!canContinue()}
          className={`px-6 py-2 rounded-full text-[13px] font-medium transition-all flex items-center gap-1.5 ${
            canContinue()
              ? 'bg-[#E81B9D] text-white hover:bg-[#d0188c]'
              : 'bg-white/[6%] text-white/30 cursor-not-allowed'
          }`}
        >
          {step === totalSteps - 1 ? 'Start Creating' : 'Continue'}
          {step < totalSteps - 1 && <ChevronRight size={14} />}
        </button>

        {/* Design AI Button on Step 1 */}
        {step === 0 && (
          <button
            onClick={() => setShowDesignAI(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[4%] border border-white/[10%] text-white/60 text-[12px] hover:bg-white/[6%] transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Design AI
          </button>
        )}
        {/* Spacer when no Design AI button */}
        {step !== 0 && <div className="w-20" />}
      </div>

      {/* Detail Modals */}
      {modalOpen && (
        renderModal(
          DETAIL_CARDS.find(c => c.key === modalOpen)?.label || '',
          DETAIL_CARDS.find(c => c.key === modalOpen)?.options || [],
          details[modalOpen] || '',
          (value) => selectOption(modalOpen, value),
          DETAIL_CARDS.find(c => c.key === modalOpen)?.hasPlayButton
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