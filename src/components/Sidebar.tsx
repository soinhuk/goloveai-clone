import { NavLink } from 'react-router-dom'
import { CreateIcon, ExploreIcon, ChatIcon, GenerateIcon, MyAIIcon, PremiumIcon } from './Icons'

const navItems = [
  { to: '/create', label: 'Create', Icon: CreateIcon, special: true },
  { to: '/', label: 'Explore', Icon: ExploreIcon },
  { to: '/app/chats', label: 'Chat', Icon: ChatIcon },
  { to: '/generate', label: 'Generate', Icon: GenerateIcon },
  { to: '/app/characters', label: 'My AI', Icon: MyAIIcon, badge: 'NEW' },
]

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-30 flex h-[100dvh] w-[109px] shrink-0 flex-col items-center bg-[#0F0E0F] px-[12px] pt-[32px] pb-[12px]">
      <NavLink to="/" className="shrink-0">
        <img src="https://goloveai.com/logo_gradient_simple.svg" alt="GoLove" className="size-[32px]" />
      </NavLink>

      <button className="from-pink-start/10 to-pink-end/10 mt-[32px] flex h-[36px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br px-[12px]">
        <span className="text-[14px] font-[600] tracking-[-4%] text-white">0</span>
        <div className="bg-pink-gradient ml-[8px] flex size-[16px] items-center justify-center rounded-full">
          <span className="text-[8px] text-white font-bold">+</span>
        </div>
      </button>

      <nav className="no-scrollbar flex min-h-0 w-[85px] flex-1 flex-col overflow-y-auto">
        <div className="m-auto flex w-full flex-col">
          <div className="flex flex-col gap-[4px]">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => {
                  if (item.special) {
                    return 'group mx-[18px] mt-[22px] flex h-[72px] items-center justify-between gap-[16px] rounded-[16px] border border-[#FF18A0]/40 bg-gradient-to-br from-[#D05BF8]/10 to-[#FF18A0]/10 px-[16px] py-[15px] transition-all hover:border-[#FF18A0]/60 hover:from-[#D05BF8]/15 hover:to-[#FF18A0]/15'
                  }
                  return `group mx-[18px] mt-[8px] flex h-[72px] items-center justify-between gap-[16px] rounded-[16px] border border-white/[6%] bg-white/[4%] px-[16px] py-[15px] transition-colors hover:bg-white/[6%] ${
                    isActive ? 'border-white/[10%] bg-white/[6%]' : ''
                  }`
                }}
              >
                <div className="flex flex-col items-center gap-1 relative">
                  <item.Icon className={item.special ? 'h-[20px] w-auto text-white' : 'h-[20px] w-auto text-white/40'} />
                  <span className={`text-[10px] font-[500] ${item.special ? 'text-white/80' : 'text-white/70'}`}>{item.label}</span>
                  {item.badge && (
                    <span className="px-1 py-0.5 text-[8px] font-bold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <NavLink to="/app/premium" className="relative z-[3] flex h-[56px] w-[85px] flex-col items-center justify-center gap-1 rounded-[12px] text-white/70 transition-all hover:bg-white/[4%]">
        <PremiumIcon className="h-[19px] w-auto text-white/40" />
        <span className="text-[10px] font-[500]">Premium</span>
      </NavLink>
    </aside>
  )
}
