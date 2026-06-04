import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, Sparkles, X } from 'lucide-react'
import { CreateIcon } from '../components/Icons'

const PERSONALITIES = ['Shy', 'Bold', 'Playful', 'Intense', 'Caring', 'Dominant', 'Submissive', 'Romantic', 'Kinky', 'Intellectual', 'Mysterious', 'Cheerful']
const VOICES = ['Soft & Sweet', 'Deep & Sultry', 'Cheerful', 'Calm & Gentle', 'Playful', 'Serious', 'Exotic', 'Childlike', 'Mature']
const RELATIONSHIPS = ['Flirty Stranger', 'New Girlfriend', 'Devoted Partner', 'Best Friend', 'Secret Affair', 'Childhood Friend', 'Rival', 'Teacher', 'Roommate', 'Boss']
const SKIN_TONES = ['#FDEBD0', '#F5CBA7', '#E0AC69', '#C68642', '#8D5524', '#4A2511']
const HAIR_COLORS = ['#2C1B18', '#4A2518', '#8B4513', '#D4A76A', '#F5DEB3', '#FF6B6B', '#9B59B6', '#3498DB', '#2ECC71', '#1A1A1A']

export default function Create() {
  const [step, setStep] = useState(0)
  const [style, setStyle] = useState<'realistic' | 'anime'>('realistic')
  const [gender, setGender] = useState<'female' | 'trans'>('female')
  const [showAI, setShowAI] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [name, setName] = useState('')
  const [skinTone, setSkinTone] = useState(SKIN_TONES[0])
  const [hairColor, setHairColor] = useState(HAIR_COLORS[0])
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([])
  const [selectedVoice, setSelectedVoice] = useState('')
  const [selectedRelationship, setSelectedRelationship] = useState('')

  const togglePersonality = (p: string) => {
    setSelectedPersonality(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-20">
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[6%]">
        <button onClick={() => step > 0 ? setStep(step - 1) : null} className="flex items-center justify-center size-9 rounded-full hover:bg-white/[6%]">
          <ArrowLeft size={20} className="text-white/70" />
        </button>
        <div className="flex-1 flex items-center gap-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0]' : 'bg-white/[6%]'}`} />
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-[24px] font-[700] text-white tracking-[-4%] mb-6">Create Your AI Dream GF</h1>

        {/* Step 0: Style Selection */}
        {step === 0 && (
          <div className="space-y-6">
            {/* Gender */}
            <div className="flex gap-2">
              {(['female', 'trans'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all capitalize ${
                  gender === g ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/50 border border-white/[6%]'
                }`}>{g}</button>
              ))}
            </div>

            {/* Style Cards with Video */}
            <div className="grid grid-cols-2 gap-4">
              {(['realistic', 'anime'] as const).map(s => (
                <button key={s} onClick={() => setStyle(s)} className={`relative group rounded-[22px] overflow-hidden h-[240px] border-2 transition-all ${
                  style === s ? 'border-[#d05bf8]' : 'border-white/[6%]'
                }`}>
                  {/* Demo Video */}
                  <video
                    src={`https://goloveai.com/videos/app-create/style-step/${s}.mp4`}
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {/* Label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[16px] font-[600] capitalize">{s}</span>
                    {style === s && (
                      <span className="size-6 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] flex items-center justify-center">
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Design with AI Button */}
            <button onClick={() => setShowAI(true)} className="w-full py-3 rounded-[16px] bg-gradient-to-r from-[#d05bf8]/10 to-[#ff18a0]/10 border border-[#d05bf8]/20 text-white flex items-center justify-center gap-2 hover:border-[#d05bf8]/40 transition-all">
              <Sparkles size={16} className="text-[#d05bf8]" />
              <span className="text-[14px] font-semibold">Design with AI</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded">New</span>
            </button>
          </div>
        )}

        {/* Step 1: Design Look */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-[12px] text-white/40 mb-2 block">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Give her a name..." className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40" />
            </div>
            <div>
              <label className="text-[12px] text-white/40 mb-2 block">Skin Tone</label>
              <div className="flex gap-2">{SKIN_TONES.map(c => <button key={c} onClick={() => setSkinTone(c)} className={`size-10 rounded-full border-2 transition-all ${skinTone === c ? 'border-[#d05bf8] scale-110' : 'border-transparent'}`} style={{ background: c }} />)}</div>
            </div>
            <div>
              <label className="text-[12px] text-white/40 mb-2 block">Hair Color</label>
              <div className="flex gap-2">{HAIR_COLORS.map(c => <button key={c} onClick={() => setHairColor(c)} className={`size-10 rounded-full border-2 transition-all ${hairColor === c ? 'border-[#d05bf8] scale-110' : 'border-transparent'}`} style={{ background: c }} />)}</div>
            </div>
          </div>
        )}

        {/* Step 2: Personality */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-[14px] font-semibold mb-3 block">Personality Types</label>
              <div className="flex flex-wrap gap-2">
                {PERSONALITIES.map(p => (
                  <button key={p} onClick={() => togglePersonality(p)} className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${
                    selectedPersonality.includes(p) ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/50 border border-white/[6%]'
                  }`}>{p}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[14px] font-semibold mb-3 block">Voice</label>
              <div className="flex flex-wrap gap-2">
                {VOICES.map(v => (
                  <button key={v} onClick={() => setSelectedVoice(v)} className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all ${
                    selectedVoice === v ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/50 border border-white/[6%]'
                  }`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Relationship */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="text-[14px] font-semibold mb-3 block">Relationship Type</label>
              <div className="grid grid-cols-2 gap-2">
                {RELATIONSHIPS.map(r => (
                  <button key={r} onClick={() => setSelectedRelationship(r)} className={`px-4 py-3 rounded-[16px] text-[13px] font-medium transition-all text-left ${
                    selectedRelationship === r ? 'bg-gradient-to-r from-[#d05bf8]/20 to-[#ff18a0]/20 border border-[#d05bf8]/40 text-white' : 'bg-white/[4%] text-white/50 border border-white/[6%]'
                  }`}>{r}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* How to Create Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-[20px] font-[700] tracking-[-4%]">How to Create Your AI Girlfriend in 3 Steps</h2>
          <p className="text-[14px] text-white/50">Start for free — Create Your GF AI, shape every detail, and chat instantly.</p>
          {[
            { step: 'First Step', title: 'Design Her Look From Scratch', desc: 'Go realistic or anime. Set her skin tone, eyes, hair, body type, and style.' },
            { step: 'Second Step', title: 'Shape Her Into Someone Real', desc: 'Create AI Girlfriend with 40+ personality types or build one from scratch. Pick from 19 voices and 135 career roles.' },
            { step: 'Third Step', title: 'Define What You Two Are', desc: 'Choose from 29 relationship types — from a flirty stranger to a devoted partner.' },
          ].map((s, i) => (
            <div key={i} className="space-y-2">
              <span className="text-[10px] font-bold text-[#d05bf8] uppercase tracking-wider">{s.step}</span>
              <h3 className="text-[16px] font-[600]">{s.title}</h3>
              <p className="text-[13px] text-white/50 leading-[20px]">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-12 space-y-4">
          <h2 className="text-[20px] font-[700] tracking-[-4%]">FAQ</h2>
          {[
            { q: 'Can I Create AI Girlfriend Free?', a: 'Yes — no card needed. Build her and start chatting right now.' },
            { q: 'How do I Create Your AI Girlfriend from scratch?', a: 'Pick her look, set her personality, choose your dynamic. Done in under 2 minutes.' },
            { q: 'Can I Create Girlfriend AI with a custom personality?', a: 'Absolutely. Choose from 40+ types or design her personality yourself — she\'s 100% yours.' },
            { q: 'What makes this AI GF different from other chatbots?', a: 'You Create Your AI Girlfriend your way — her face, voice, and personality are all set by you, not by default.' },
          ].map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 px-4 py-3 bg-[#0F0E0F]/95 backdrop-blur-md border-t border-white/[6%]">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[4%] border border-white/[6%] text-white/70 text-[13px] hover:bg-white/[6%]">
          <Sparkles size={14} className="text-[#d05bf8]" />
          Design AI
          <span className="px-1 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded">New</span>
        </button>
        <button onClick={() => step < 3 ? setStep(step + 1) : null} className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[14px] font-semibold hover:shadow-[0_0_20px_rgba(208,91,248,0.4)] transition-all">
          Continue
        </button>
      </div>

      {/* AI Design Modal */}
      {showAI && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181718] rounded-[22px] border border-white/[10%] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#d05bf8]" />
                <h2 className="text-[18px] font-[700]">Design with AI</h2>
              </div>
              <button onClick={() => setShowAI(false)} className="size-8 flex items-center justify-center rounded-full hover:bg-white/[6%]"><X size={18} /></button>
            </div>
            <p className="text-[13px] text-white/50">Enter your custom prompt and get instant AI-powered results.</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-full bg-white/[4%] border border-white/[6%] text-[12px] text-white/60">Style <span className="text-white/80">Realistic</span> <ChevronDown size={10} /></button>
              <button className="px-3 py-1.5 rounded-full bg-white/[4%] border border-white/[6%] text-[12px] text-white/60">Gender <span className="text-white/80">Female</span> <ChevronDown size={10} /></button>
            </div>
            <textarea
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              placeholder='Tell us about your ideal companion ... (e.g. "Playful yet dominant, intense gaze, craving passion and electric nights.")'
              rows={4}
              maxLength={2000}
              className="w-full bg-white/[4%] border border-white/[6%] rounded-xl py-3 px-4 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#d05bf8]/40 resize-none"
            />
            <div className="text-right text-[11px] text-white/20">{aiPrompt.length}/2000</div>
            <button disabled={!aiPrompt.trim()} className={`w-full py-3 rounded-xl text-[14px] font-semibold transition-all ${
              aiPrompt.trim() ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white' : 'bg-white/[4%] text-white/20'
            }`}>Create Character</button>
          </div>
        </div>
      )}
    </div>
  )
}

function FAQItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border border-white/[6%] rounded-[16px] overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[2%] transition-all">
        <span className="text-[14px] font-[500]">{question}</span>
        <ChevronDown size={16} className={`text-white/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 pb-3 text-[13px] text-white/50 leading-[20px]">{answer}</div>}
    </div>
  )
}
