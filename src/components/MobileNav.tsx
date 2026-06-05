import { NavLink } from 'react-router-dom'
import { ExploreIcon, ChatIcon, CreateIcon, GenerateIcon, MyAIIcon } from './Icons'

const items = [
  { to: '/app/explore', Icon: ExploreIcon, label: 'Explore' },
  { to: '/app/chats', Icon: ChatIcon, label: 'Chat' },
  { to: '/create', Icon: CreateIcon, label: 'Create' },
  { to: '/generate', Icon: GenerateIcon, label: 'Generate' },
  { to: '/app/characters', Icon: MyAIIcon, label: 'My AI' },
]

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-around bg-[#0F0E0F]/95 backdrop-blur-md border-t border-white/[6%] py-2 px-2 desktop:hidden">
      {items.map(({ to, Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              isActive ? 'text-white' : 'text-white/40'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative">
                <Icon className="h-[20px] w-auto" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-[#d05bf8] to-[#ff18a0]" />
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
