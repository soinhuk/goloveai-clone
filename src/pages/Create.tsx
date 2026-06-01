import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Play, Sparkles, Users, Mic, Heart, Shield, Zap, Star, MessageSquare, ArrowRight, Check } from 'lucide-react'

const GENDERS = ['Female', 'Trans']
const STYLES = [
  { id: 'realistic', label: 'Realistic', desc: 'Photorealistic characters with natural skin and lifelike details.' },
  { id: 'anime', label: 'Anime', desc: 'Vibrant anime-inspired designs with bold colors and expressive eyes.' },
]
const STEPS = [
  {
    num: 1,
    title: 'Design Her Look From Scratch',
    desc: 'Go realistic or anime. Set her skin tone, eyes, hair, body type, and more.',
    icon: '🎨',
  },
  {
    num: 2,
    title: 'Shape Her Into Someone Real',
    desc: '40+ personality types, 19 voice options. Make her uniquely yours.',
    icon: '✨',
  },
  {
    num: 3,
    title: 'Define What You Two Are',
    desc: 'Set your relationship dynamic. Friends, partners, or something else.',
    icon: '💜',
  },
]
const FEATURES = [
  { icon: Users, title: '40+ Personality Types', desc: 'Shy, bold, playful, or intense — design your own.' },
  { icon: Mic, title: '19 Voice Options', desc: 'Soft, sweet, or sultry — pick what you love.' },
  { icon: Heart, title: 'Fully Customizable', desc: 'Every detail shaped exactly as you want.' },
  { icon: Zap, title: 'Instant Chat', desc: 'Start talking in under 2 minutes.' },
]
const FAQS = [
  { q: 'Can I Create AI Girlfriend Free?', a: 'Yes — no card needed. Build her and start chatting right now.' },
  { q: 'How do I Create Your AI Girlfriend from scratch?', a: 'Pick her look, set her personality, choose your dynamic. Done in under 2 minutes.' },
  { q: 'Can I Create Girlfriend AI with a custom personality?', a: 'Absolutely. Choose from 40+ types or design her personality yourself.' },
  { q: 'What makes this AI GF different from other chatbots?', a: 'She remembers your conversations, evolves with you, and feels genuinely personal.' },
]

export default function Create() {
  const [gender, setGender] = useState('Female')
  const [style, setStyle] = useState('realistic')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gl-dark">
      {/* ======== HERO SECTION ======== */}
      <section className="relative min-h-[520px] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#d05bf8]/10 via-[#ff18a0]/5 to-transparent blur-[120px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          {/* Logo area */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <img
              src="https://goloveai.com/logo_gradient_simple.svg"
              alt="GoLove"
              className="h-8"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </div>

          <h1 className="text-4xl desktop:text-5xl font-bold text-white mb-4 leading-tight">
            Create Your <span className="gradient-text">AI Dream GF</span>
          </h1>
          <p className="text-white/60 text-lg mb-10">
            Start for free — shape every detail, and chat instantly.
          </p>

          {/* Gender Selection */}
          <div className="flex justify-center gap-3 mb-6">
            {GENDERS.map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-8 py-3.5 rounded-full text-sm font-semibold transition-all ${
                  gender === g
                    ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg'
                    : 'bg-white/[8%] text-white/60 hover:bg-white/[12%] hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Style Selection */}
          <div className="flex justify-center gap-3 mb-10">
            {STYLES.map(s => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  style === s.id
                    ? 'bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white shadow-lg'
                    : 'bg-white/[8%] text-white/60 hover:bg-white/[12%] hover:text-white'
                }`}
              >
                {s.id === 'realistic' ? '📷' : '🎨'} {s.label}
              </button>
            ))}
          </div>

          {/* Style Preview Video/Image */}
          <div className="relative rounded-3xl overflow-hidden mb-10 bg-black/40 aspect-video max-w-xl mx-auto">
            <img
              src={style === 'realistic'
                ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
                : 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80'
              }
              alt={`${style} preview`}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium">
                {style === 'realistic' ? 'Realistic AI Girlfriend' : 'Anime Style Girlfriend'}
              </p>
            </div>
            <button className="absolute inset-0 flex items-center justify-center group">
              <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={24} className="text-white ml-1" />
              </div>
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-3">
            <button className="btn-pink rounded-full px-8 py-4 text-sm font-bold flex items-center gap-2">
              <Sparkles size={16} />
              Design AI
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">New</span>
            </button>
            <button className="px-8 py-4 rounded-full bg-white/[8%] text-white text-sm font-semibold hover:bg-white/[12%] transition-all flex items-center gap-2">
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ======== HOW IT WORKS - 3 STEPS ======== */}
      <section className="px-8 desktop:px-16 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl desktop:text-3xl font-bold text-white mb-2">
              How to Create Your AI Girlfriend <br />in 3 Steps
            </h2>
            <p className="text-white/50">Simple. Fast. Completely yours.</p>
          </div>

          <div className="grid grid-cols-1 desktop:grid-cols-3 gap-6">
            {STEPS.map(step => (
              <div
                key={step.num}
                className="relative p-6 rounded-3xl bg-white/[3%] border border-white/[5%] hover:border-[#d05bf8]/30 transition-all group"
                onMouseEnter={() => setHoveredStep(step.num)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="size-7 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-sm font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                  <h3 className="text-white font-semibold text-base">{step.title}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                {hoveredStep === step.num && (
                  <div className="absolute top-4 right-4">
                    <ArrowRight size={16} className="text-[#d05bf8]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FEATURES ======== */}
      <section className="px-8 desktop:px-16 py-16 bg-gradient-to-b from-transparent via-[#d05bf8]/[2%] to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl desktop:text-3xl font-bold text-white mb-2">
              Everything You Need
            </h2>
            <p className="text-white/50">Premium features, unlimited possibilities.</p>
          </div>

          <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-5 rounded-2xl bg-white/[3%] border border-white/[5%] text-center">
                <div className="size-12 rounded-2xl bg-gradient-to-br from-[#d05bf8]/20 to-[#ff18a0]/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-gl-pink" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-white/40 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FAQ ======== */}
      <section className="px-8 desktop:px-16 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/[3%] border border-white/[5%] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-white/40 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 pb-5 pt-0 text-white/50 text-sm animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== FINAL CTA ======== */}
      <section className="px-8 desktop:px-16 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-[#1a0a2e] via-[#2d1054] to-[#0f0e0f] border border-white/[5%] p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d05bf8] rounded-full blur-[120px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">Ready to Meet Her?</h2>
              <p className="text-white/50 mb-8">No credit card required. Start chatting in 2 minutes.</p>
              <button className="btn-pink rounded-full px-10 py-4 text-sm font-bold inline-flex items-center gap-2">
                <Sparkles size={16} />
                Create Your AI Girlfriend Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}