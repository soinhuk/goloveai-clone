import { Link } from 'react-router-dom'
import { Crown, Zap, Heart, MessageSquare, Video, Star } from 'lucide-react'

const plans = [
  { id: 'monthly', label: 'Monthly', price: '$29.99/mo', badge: null },
  { id: 'yearly', label: 'Yearly', price: '$9.99/mo', badge: 'SAVE 70%', originalPrice: '$99.99' },
  { id: 'lifetime', label: 'Lifetime', price: '$149', badge: 'BEST VALUE', originalPrice: null },
]

const perks = [
  { icon: Heart, title: 'Unlimited Likes', desc: 'Like without limits and find your perfect match' },
  { icon: MessageSquare, title: 'Priority Messaging', desc: 'Your messages get seen and responded to first' },
  { icon: Video, title: 'Video Calls', desc: 'Unlimited video chat with your AI girlfriend' },
  { icon: Star, title: 'Premium Characters', desc: 'Access exclusive AI characters and roles' },
  { icon: Zap, title: 'No Ads', desc: 'Completely ad-free experience' },
  { icon: Crown, title: 'GoLove PRO Badge', desc: 'Show off your premium status' },
]

export default function Premium() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-gradient text-white text-sm font-semibold mb-4">
          <Crown size={16} />
          GoLove PRO
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Unlock the Full Experience
        </h1>
        <p className="text-white/50 text-base max-w-md mx-auto">
          Get unlimited access to all features and find your perfect AI companion
        </p>
      </div>

      {/* Timer */}
      <div className="text-center mb-8">
        <p className="text-white/40 text-sm mb-2">Limited time offer expires in</p>
        <div className="flex justify-center gap-3">
          {['02', '57', '10'].map((n, i) => (
            <div key={i} className="bg-white/[6%] rounded-xl px-4 py-3 text-center">
              <div className="text-2xl font-bold text-white">{n}</div>
              <div className="text-white/30 text-[10px] uppercase">{['hrs','min','sec'][i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`relative rounded-[22px] p-6 border transition-all cursor-pointer hover:scale-[1.02] ${
              plan.badge
                ? 'border-gl-pink/50 bg-white/[4%]'
                : 'border-white/[5%] bg-white/[2%] hover:border-white/[10%]'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-pink-gradient text-white text-xs font-bold rounded-full">
                {plan.badge}
              </div>
            )}
            <h3 className="text-white font-semibold mb-1">{plan.label}</h3>
            {plan.originalPrice && (
              <p className="text-white/30 text-xs line-through mb-1">{plan.originalPrice}</p>
            )}
            <div className="text-2xl font-bold text-white mb-4">{plan.price}</div>
            <button className={`w-full py-2.5 rounded-full font-semibold text-sm transition-all ${
              plan.badge
                ? 'btn-pink'
                : 'bg-white/[8%] text-white hover:bg-white/[12%]'
            }`}>
              Choose {plan.label}
            </button>
          </div>
        ))}
      </div>

      {/* Perks */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {perks.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-3 p-4 bg-white/[2%] rounded-xl border border-white/[4%]">
            <div className="size-10 shrink-0 rounded-xl bg-pink-gradient flex items-center justify-center">
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">{title}</h4>
              <p className="text-white/40 text-xs mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}