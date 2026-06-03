import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Sparkles, User, Palette, Heart, Mic, Briefcase, Coffee, Users, Eye, Check, Wand2 } from 'lucide-react'

// ========== STEP DATA ==========

const GENDER_OPTIONS = ['Female', 'Trans']
const STYLE_OPTIONS = ['Realistic', 'Anime']

const ETHNICITY_OPTIONS = ['Caucasian', 'Asian', 'African', 'Latin', 'Indian', 'Middle Eastern', 'Mixed', 'Demon']

const AGE_OPTIONS = ['18-22', '23-26', '27-30', '31-35', '36-40', '41+']

const EYE_COLOR_OPTIONS = ['Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Amber', 'Red', 'Purple', 'Black', 'Heterochromia']

const HAIR_COLOR_OPTIONS = ['Black', 'Brown', 'Blonde', 'Red', 'Pink', 'Blue', 'Purple', 'White', 'Gray', 'Rainbow']

const HAIR_STYLE_OPTIONS = ['Long', 'Short', 'Medium', 'Curly', 'Straight', 'Wavy', 'Ponytail', 'Braids', 'Bun', 'Bald']

const BODY_TYPE_OPTIONS = ['Slim', 'Athletic', 'Average', 'Curvy', 'Plump', 'Petite']

const BREAST_SIZE_OPTIONS = ['Small', 'Medium', 'Large', 'Extra Large']

const BUTT_SIZE_OPTIONS = ['Small', 'Medium', 'Large', 'Extra Large']

const PERSONALITY_OPTIONS = ['Shy', 'Bold', 'Playful', 'Mysterious', 'Sweet', 'Sensual', 'Intellectual', 'Adventurous', 'Caring', 'Dominant', 'Submissive', 'Yandere']

const VOICE_OPTIONS = ['Sweet', 'Mature', 'Young', 'Senpai', 'Tsundere', 'Mommy', 'Girl Next Door', 'Queen', 'Professional', 'Seductive']

const OCCUPATION_OPTIONS = ['Student', 'Office Worker', 'Model', 'Nurse', 'Teacher', 'Artist', 'Streamer', 'Chef', 'Athlete', 'Doctor', 'Lawyer', 'Influencer', 'None']

const RELATIONSHIP_OPTIONS = ['Girlfriend', 'Wife', 'Hookup', 'Friend', 'Sister', 'Mentee', 'Daughter', 'Colleague']

const HOBBY_OPTIONS = ['Gaming', 'Reading', 'Music', 'Anime', 'Cooking', 'Sports', 'Art', 'Dancing', 'Travel', 'Photography', 'Fashion', 'Movies']

const FETISH_OPTIONS = ['None', 'Cosplay', 'Uniform', 'Lingerie', 'Foot', 'Yuri', 'Futanari', 'Big Ass', 'Small Breasts', 'Petite', 'Tall', 'Muscle']

// ========== COMPONENTS ==========

function StepIndicator({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="relative flex items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i < currentStep
                ? 'bg-gradient-to-br from-[#d05bf8] to-[#ff18a0] text-white'
                : i === currentStep
                ? 'bg-white/[15%] text-white border-2 border-[#d05bf8]'
                : 'bg-white/[5%] text-white/30'
            }`}
          >
            {i < currentStep ? (
              <Check size={16} />
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          {i < totalSteps - 1 && (
            <div className={`absolute top-1/2 -right-3 w-6 h-[2px] ${
              i < currentStep ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0]' : 'bg-white/[10%]'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-1">
        <div className="size-9 rounded-xl bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center">
          <Icon size={18} className="text-gl-pink" />
        </div>
        <div>
          <h3 className="text-white text-base font-semibold">{title}</h3>
          {subtitle && <p className="text-white/40 text-xs">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

function OptionGrid({ options, selected, onSelect, columns = 4 }: { options: string[], selected: string, onSelect: (v: string) => void, columns?: number }) {
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
            selected === opt
              ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
              : 'bg-white/[4%] text-white/60 hover:bg-white/[8%] hover:text-white'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

// ========== MAIN COMPONENT ==========

export default function Create() {
  const [step, setStep] = useState(0)
  const [gender, setGender] = useState('')
  const [style, setStyle] = useState('')

  const [ethnicity, setEthnicity] = useState('')
  const [age, setAge] = useState('')

  const [eyeColor, setEyeColor] = useState('')
  const [hairColor, setHairColor] = useState('')
  const [hairStyle, setHairStyle] = useState('')

  const [bodyType, setBodyType] = useState('')
  const [breastSize, setBreastSize] = useState('')
  const [buttSize, setButtSize] = useState('')

  const [personality, setPersonality] = useState<string[]>([])
  const [charName, setCharName] = useState('')
  const [voice, setVoice] = useState('')
  const [occupation, setOccupation] = useState('')
  const [relationship, setRelationship] = useState('')
  const [hobby, setHobby] = useState('')
  const [fetish, setFetish] = useState('')

  const [created, setCreated] = useState(false)

  const totalSteps = 6

  const canContinue = () => {
    switch (step) {
      case 0: return gender && style
      case 1: return ethnicity && age
      case 2: return eyeColor && hairColor && hairStyle
      case 3: return bodyType && breastSize && buttSize
      case 4: return charName && personality.length > 0 && voice && relationship
      case 5: return false
      default: return false
    }
  }

  const nextStep = () => {
    if (step < totalSteps - 1 && canContinue()) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  const togglePersonality = (p: string) => {
    if (personality.includes(p)) {
      setPersonality(personality.filter(x => x !== p))
    } else if (personality.length < 3) {
      setPersonality([...personality, p])
    }
  }

  const handleCreate = () => {
    const charData = {
      name: charName,
      gender,
      style,
      ethnicity,
      age,
      eyeColor,
      hairColor,
      hairStyle,
      bodyType,
      breastSize,
      buttSize,
      personality,
      voice,
      occupation,
      relationship,
      hobby,
      fetish
    }
    console.log('Creating character:', charData)
    setCreated(true)
  }

  const avatarGradient = style === 'Anime'
    ? 'from-pink-500 to-purple-600'
    : 'from-amber-600 to-rose-700'

  return (
    <div className="min-h-screen bg-gl-dark">
      {/* Top Bar */}
      <div className="border-b border-white/[5%] px-6 py-4">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-white font-bold text-xl">Create Your AI Dream GF</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-4 py-8">
        <StepIndicator currentStep={step} totalSteps={totalSteps} />

        {/* ======== STEP 0: Gender + Style ======== */}
        {step === 0 && (
          <div className="space-y-8 animate-fade-in">
            <SectionTitle icon={Users} title="Gender" />
            <div className="flex gap-3">
              {GENDER_OPTIONS.map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    gender === g
                      ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                      : 'bg-white/[4%] text-white/60 hover:bg-white/[8%]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <SectionTitle icon={Sparkles} title="Style" subtitle="Choose the art style for your character" />
            <div className="grid grid-cols-2 gap-4">
              {STYLE_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`relative overflow-hidden rounded-2xl transition-all cursor-pointer ${
                    style === s ? 'ring-2 ring-[#d05bf8]' : 'hover:ring-1 hover:ring-white/20'
                  }`}
                  style={{ width: '100%', height: 402, maxWidth: 302 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    s === 'Realistic'
                      ? 'from-[#8B7355] via-[#D4A574] to-[#C4956A]'
                      : 'from-[#FF69B4] via-[#DA70D6] to-[#9370DB]'
                  }`} />
                  {/* Card content overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
                    <span className="text-white text-xl font-bold drop-shadow-lg">{s}</span>
                    <span className="text-white/70 text-xs mt-1 drop-shadow">
                      {s === 'Realistic' ? 'Photorealistic appearance' : 'Anime / illustration style'}
                    </span>
                  </div>
                  {style === s && (
                    <div className="absolute top-3 right-3 size-7 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ======== STEP 1: Ethnicity + Age ======== */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <SectionTitle icon={Users} title="Ethnicity" subtitle="Choose her ethnic background" />
            <OptionGrid options={ETHNICITY_OPTIONS} selected={ethnicity} onSelect={setEthnicity} columns={4} />

            <SectionTitle icon={Heart} title="Age" subtitle="Select age range" />
            <OptionGrid options={AGE_OPTIONS} selected={age} onSelect={setAge} columns={3} />
          </div>
        )}

        {/* ======== STEP 2: Eye/Hair ======== */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
            <SectionTitle icon={Eye} title="Eye Color" subtitle="Her eye color" />
            <OptionGrid options={EYE_COLOR_OPTIONS} selected={eyeColor} onSelect={setEyeColor} columns={5} />

            <SectionTitle icon={Palette} title="Hair Color" subtitle="Her hair color" />
            <OptionGrid options={HAIR_COLOR_OPTIONS} selected={hairColor} onSelect={setHairColor} columns={5} />

            <SectionTitle icon={Sparkles} title="Hair Style" subtitle="Her hairstyle" />
            <OptionGrid options={HAIR_STYLE_OPTIONS} selected={hairStyle} onSelect={setHairStyle} columns={5} />
          </div>
        )}

        {/* ======== STEP 3: Body ======== */}
        {step === 3 && (
          <div className="space-y-8 animate-fade-in">
            <SectionTitle icon={User} title="Body Type" subtitle="Overall body shape" />
            <OptionGrid options={BODY_TYPE_OPTIONS} selected={bodyType} onSelect={setBodyType} columns={3} />

            <SectionTitle icon={Heart} title="Breast Size" subtitle="Breast size preference" />
            <OptionGrid options={BREAST_SIZE_OPTIONS} selected={breastSize} onSelect={setBreastSize} columns={4} />

            <SectionTitle icon={Users} title="Butt Size" subtitle="Buttock size preference" />
            <OptionGrid options={BUTT_SIZE_OPTIONS} selected={buttSize} onSelect={setButtSize} columns={4} />
          </div>
        )}

        {/* ======== STEP 4: Personality + Details ======== */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <SectionTitle icon={User} title="Character Name" />
            <input
              type="text"
              value={charName}
              onChange={e => setCharName(e.target.value)}
              placeholder="Enter her name..."
              className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 transition-all"
            />

            <SectionTitle icon={Heart} title="Personality" subtitle="Select up to 3 traits" />
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_OPTIONS.map(p => (
                <button
                  key={p}
                  onClick={() => togglePersonality(p)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    personality.includes(p)
                      ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white'
                      : 'bg-white/[4%] text-white/60 hover:bg-white/[8%]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <SectionTitle icon={Mic} title="Voice Style" />
            <OptionGrid options={VOICE_OPTIONS} selected={voice} onSelect={setVoice} columns={5} />

            <SectionTitle icon={Briefcase} title="Occupation" />
            <OptionGrid options={OCCUPATION_OPTIONS} selected={occupation} onSelect={setOccupation} columns={4} />

            <SectionTitle icon={Heart} title="Relationship" subtitle="What is she to you?" />
            <OptionGrid options={RELATIONSHIP_OPTIONS} selected={relationship} onSelect={setRelationship} columns={4} />

            <SectionTitle icon={Coffee} title="Hobby" subtitle="What does she like to do?" />
            <OptionGrid options={HOBBY_OPTIONS} selected={hobby} onSelect={setHobby} columns={4} />

            <SectionTitle icon={Sparkles} title="Fetish (Optional)" />
            <OptionGrid options={FETISH_OPTIONS} selected={fetish} onSelect={setFetish} columns={4} />
          </div>
        )}

        {/* ======== STEP 5: Result/Preview ======== */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center">
              <div
                className={`w-[151px] h-[201px] rounded-2xl bg-gradient-to-br ${avatarGradient} flex flex-col items-center justify-end pb-4 shadow-2xl ring-1 ring-white/10`}
              >
                <div className="text-white text-2xl font-bold drop-shadow-lg">{charName || '???'}</div>
                <div className="text-white/70 text-xs mt-1 drop-shadow">{style} · {ethnicity || '???'}</div>
              </div>
              <h2 className="text-white text-xl font-bold mt-4">{charName}</h2>
              <p className="text-white/50 text-xs mt-1">{relationship || '???'} · {occupation || 'None'}</p>
            </div>

            {/* Attributes Summary */}
            <div className="bg-white/[3%] rounded-2xl border border-white/[5%] p-4">
              <h3 className="text-white font-semibold text-sm mb-3">Character Attributes</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  ['Style', style],
                  ['Gender', gender],
                  ['Ethnicity', ethnicity],
                  ['Age', age],
                  ['Eye Color', eyeColor],
                  ['Hair Color', hairColor],
                  ['Hair Style', hairStyle],
                  ['Body Type', bodyType],
                  ['Breast Size', breastSize],
                  ['Butt Size', buttSize],
                  ['Personality', personality.join(', ')],
                  ['Voice', voice],
                  ['Relationship', relationship],
                  ['Hobby', hobby],
                  ['Fetish', fetish],
                ].filter(([_, v]) => v).map(([label, value]) => (
                  <div key={label} className="flex justify-between px-3 py-1.5 rounded-lg bg-white/[2%]">
                    <span className="text-white/40">{label}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Button */}
            {!created ? (
              <button
                onClick={handleCreate}
                className="w-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-bold py-4 rounded-full text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Wand2 size={16} />
                Create Character
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center">
                  <Check size={32} className="text-green-400 mx-auto mb-2" />
                  <p className="text-white font-semibold text-sm">Character Created Successfully!</p>
                  <p className="text-white/50 text-xs mt-1">"{charName}" is ready to chat</p>
                </div>
                <Link
                  to="/chats"
                  className="block w-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-bold py-4 rounded-full text-sm text-center hover:opacity-90 transition-all"
                >
                  Go to Chat
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ======== Navigation Buttons ======== */}
        {step < 5 && (
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[4%] text-white/60 hover:bg-white/[8%] hover:text-white transition-all"
              >
                <ChevronLeft size={18} />
                Back
              </button>
            )}
            {step < 5 && (
              <button
                onClick={nextStep}
                disabled={!canContinue()}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-semibold py-3 rounded-full disabled:opacity-40 hover:opacity-90 transition-all"
                style={{ maxWidth: 200, marginLeft: 'auto' }}
              >
                Continue
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}