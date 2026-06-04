import { useState } from 'react'
import { Check, Crown, Sparkles, Zap, Shield, MessageSquare, Image as ImageIcon, Video, ChevronDown } from 'lucide-react'

const plans = [
  { name: 'Monthly', price: '$9.99', period: '/month', badge: null, features: ['Unlimited Chat', '100 Images/day', '10 Videos/day', 'All Characters', 'Priority Support'] },
  { name: 'Quarterly', price: '$6.99', period: '/month', badge: 'Popular', features: ['Unlimited Chat', '300 Images/day', '50 Videos/day', 'All Characters', 'Priority Support', 'Early Access'] },
  { name: 'Yearly', price: '$3.99', period: '/month', badge: 'Best Value', features: ['Unlimited Chat', 'Unlimited Images', 'Unlimited Videos', 'All Characters', 'Priority Support', 'Early Access', 'Exclusive Content', 'Custom Characters'] },
]

export default function Premium() {
  const [selected, setSelected] = useState(1)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[#0F0E0F] text-white pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden px-4 pt-8 pb-12 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d05bf8]/10 via-transparent to-transparent" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF18A0]/10 border border-[#FF18A0]/20 mb-4">
            <Sparkles size={12} className="text-[#FF18A0]" />
            <span className="text-[11px] font-semibold text-[#FF18A0]">LIMITED TIME OFFER</span>
          </div>
          <h1 className="text-[28px] font-[700] tracking-[-4%] mb-2">Sign up and get</h1>
          <h1 className="text-[28px] font-[700] tracking-[-4%] gradient-text">Star Extra bonus</h1>
          <p className="mt-3 text-[14px] text-white/50">Unlock all features with premium</p>
        </div>
      </div>

      {/* Plans */}
      <div className="px-4 space-y-3">
        {plans.map((plan, i) => (
          <button key={i} onClick={() => setSelected(i)} className={`w-full text-left rounded-[20px] p-4 transition-all border-2 ${
            selected === i ? 'border-[#d05bf8] bg-gradient-to-br from-[#d05bf8]/10 to-[#ff18a0]/5' : 'border-white/[6%] bg-white/[2%]'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-[600]">{plan.name}</span>
                {plan.badge && <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded-full">{plan.badge}</span>}
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[24px] font-[700]">{plan.price}</span>
                <span className="text-[12px] text-white/40">{plan.period}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {plan.features.map((f, j) => (
                <div key={j} className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <Check size={12} className="text-[#d05bf8] shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="px-4 mt-6">
        <button className="w-full py-4 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white text-[16px] font-bold shadow-[0_0_30px_rgba(208,91,248,0.4)] hover:shadow-[0_0_40px_rgba(208,91,248,0.6)] transition-all">
          Claim bonus & Sign up
        </button>
      </div>

      {/* Features */}
      <div className="px-4 mt-12 space-y-6">
        <h2 className="text-[20px] font-[700] tracking-[-4%] text-center">Why Go Premium?</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MessageSquare, title: 'Unlimited Chat', desc: 'No limits on conversations' },
            { icon: ImageIcon, title: 'AI Images', desc: 'Generate custom photos' },
            { icon: Video, title: 'AI Videos', desc: 'Create video content' },
            { icon: Shield, title: 'NSFW Content', desc: 'Uncensored experience' },
            { icon: Zap, title: 'Priority', desc: 'Faster responses' },
            { icon: Crown, title: 'Exclusive', desc: 'Premium characters' },
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-[16px] bg-white/[2%] border border-white/[6%]">
              <f.icon size={20} className="text-[#d05bf8] mb-2" />
              <h3 className="text-[13px] font-semibold mb-1">{f.title}</h3>
              <p className="text-[11px] text-white/40">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-4 mt-12 space-y-3">
        <h2 className="text-[20px] font-[700] tracking-[-4%] mb-4">FAQ</h2>
        {[
          { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. No questions asked.' },
          { q: 'Is there a free trial?', a: 'Yes! Start for free and upgrade when you want more features.' },
          { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and cryptocurrency.' },
          { q: 'Is my data safe?', a: 'Absolutely. We use end-to-end encryption and never share your data.' },
        ].map((faq, i) => (
          <div key={i} className="border border-white/[6%] rounded-[16px] overflow-hidden">
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-left">
              <span className="text-[13px] font-medium">{faq.q}</span>
              <ChevronDown size={14} className={`text-white/40 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === i && <div className="px-4 pb-3 text-[12px] text-white/50">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
