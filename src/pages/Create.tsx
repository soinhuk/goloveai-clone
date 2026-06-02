import { useState } from 'react'
import { ChevronRight, ChevronLeft, Sparkles, User, Palette, Heart, Mic, Briefcase, Coffee, Users, Eye } from 'lucide-react'

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
        <div key={i} className="relative">
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
              <Sparkles size={16} />
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          {/* Connector line */}
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

function OptionGrid({ options, selected, onSelect, columns = 4 }: { options: string[], selected: string, onSelect: (v: string) => void, columns?: number }) {
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
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

function SectionTitle({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="size-10 rounded-xl bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center">
          <Icon size={20} className="text-gl-pink" />
        </div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
      </div>
      {subtitle && <p className="text-white/40 text-sm ml-[52px]">{subtitle}</p>}
    </div>
  )
}

// ========== MAIN COMPONENT ==========

export default function Create() {
  const [step, setStep] = useState(0)
  const [gender, setGender] = useState('')
  const [style, setStyle] = useState('')
  
  // Step 2
  const [ethnicity, setEthnicity] = useState('')
  const [age, setAge] = useState('')
  
  // Step 3
  const [eyeColor, setEyeColor] = useState('')
  const [hairColor, setHairColor] = useState('')
  const [hairStyle, setHairStyle] = useState('')
  
  // Step 4
  const [bodyType, setBodyType] = useState('')
  const [breastSize, setBreastSize] = useState('')
  const [buttSize, setButtSize] = useState('')
  
  // Step 5
  const [charName, setCharName] = useState('')
  const [personality, setPersonality] = useState<string[]>([])
  const [voice, setVoice] = useState('')
  const [occupation, setOccupation] = useState('')
  const [relationship, setRelationship] = useState('')
  const [hobby, setHobby] = useState('')
  const [fetish, setFetish] = useState('')
  
  const totalSteps = 5
  
  const canContinue = () => {
    switch (step) {
      case 0: return gender && style
      case 1: return ethnicity && age
      case 2: return eyeColor && hairColor && hairStyle
      case 3: return bodyType && breastSize && buttSize
      case 4: return charName && personality.length > 0 && voice && relationship
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
    alert(`Character "${charName}" created! Check console for full data.`)
  }
  
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
        
        {/* STEP 0: Gender + Style */}
        {step === 0 && (
          <div className="space-y-8 animate-fade-in">
            {/* Gender */}
            <div>
              <h2 className="text-white/60 text-sm font-medium mb-3">Choose Gender</h2>
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
            </div>
            
            {/* Style */}
            <div>
              <h2 className="text-white/60 text-sm font-medium mb-3">Choose Style</h2>
              <div className="grid grid-cols-2 gap-4">
                {STYLE_OPTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`relative overflow-hidden rounded-2xl transition-all ${
                      style === s ? 'ring-2 ring-[#d05bf8]' : 'hover:ring-1 hover:ring-white/20'
                    }`}
                    style={{ aspectRatio: '1/1.33' }}
                  >
                    <div className={`absolute inset-0 ${
                      s === 'Realistic'
                        ? 'bg-gradient-to-br from-[#8B7355] to-[#D4A574]'
                        : 'bg-gradient-to-br from-[#FF69B4] to-[#9370DB]'
                    }`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{s}</span>
                    </div>
                    {style === s && (
                      <div className="absolute top-3 right-3 size-6 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="size-3 rounded-full bg-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 3 Steps Guide */}
            <div className="bg-white/[2%] rounded-2xl p-6 border border-white/[5%]">
              <h3 className="text-white font-semibold mb-4">How to Create Your AI Girlfriend in 3 Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-[#d05bf8]/20 flex items-center justify-center shrink-0">
                    <span className="text-gl-pink text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Design Her Look From Scratch</h4>
                    <p className="text-white/40 text-sm mt-1">Go realistic or anime. Set her skin tone, eyes, hair, body type, and more.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-[#d05bf8]/20 flex items-center justify-center shrink-0">
                    <span className="text-gl-pink text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Shape Her Into Someone Real</h4>
                    <p className="text-white/40 text-sm mt-1">Create AI Girlfriend with 40+ personality types or build one from scratch.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-[#d05bf8]/20 flex items-center justify-center shrink-0">
                    <span className="text-gl-pink text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Define What You Two Are</h4>
                    <p className="text-white/40 text-sm mt-1">Choose your relationship dynamic, shared hobbies, and intimate preferences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* STEP 1: Ethnicity + Age */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <SectionTitle icon={Users} title="Ethnicity" subtitle="Choose her ethnic background" />
            <OptionGrid options={ETHNICITY_OPTIONS} selected={ethnicity} onSelect={setEthnicity} columns={4} />
            
            <SectionTitle icon={Heart} title="Age" subtitle="Select age range" />
            <OptionGrid options={AGE_OPTIONS} selected={age} onSelect={setAge} columns={3} />
          </div>
        )}
        
        {/* STEP 2: Eye/Hair */}
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
        
        {/* STEP 3: Body */}
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
        
        {/* STEP 4: Personality + Details */}
        {step === 4 && (
          <div className="space-y-8 animate-fade-in">
            <SectionTitle icon={User} title="Character Name" />
            <input
              type="text"
              value={charName}
              onChange={e => setCharName(e.target.value)}
              placeholder="Enter her name..."
              className="w-full bg-white/[4%] border border-white/[8%] rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40"
            />
            
            <SectionTitle icon={Heart} title="Personality" subtitle="Select up to 3 traits" />
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_OPTIONS.map(p => (
                <button
                  key={p}
                  onClick={() => togglePersonality(p)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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
            
            {/* Create Button */}
            <button
              onClick={handleCreate}
              disabled={!canContinue()}
              className="w-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-semibold py-4 rounded-full mt-4 disabled:opacity-40 hover:opacity-90 transition-all"
            >
              Create Character
            </button>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[4%] text-white/60 hover:bg-white/[8%] transition-all"
            >
              <ChevronLeft size={18} />
              Back
            </button>
          )}
          {step < 4 && (
            <button
              onClick={nextStep}
              disabled={!canContinue()}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white font-semibold py-3 rounded-full disabled:opacity-40 hover:opacity-90 transition-all ml-auto"
              style={{ maxWidth: 200 }}
            >
              Continue
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}