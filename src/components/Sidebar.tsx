import { NavLink, useLocation } from 'react-router-dom'
import {
  Compass, MessageSquare, Wand2, Users, Sparkles, Crown, PlusCircle, LayoutGrid
} from 'lucide-react'

const navItems = [
  { to: '/create', icon: PlusCircle, label: 'Create' },
  { to: '/', icon: Compass, label: 'Explore' },
  { to: '/app/chats', icon: MessageSquare, label: 'Chat' },
  { to: '/generate', icon: Wand2, label: 'Generate' },
  { to: '/app/characters', icon: Users, label: 'My AI' },
  { to: '/app/search', icon: Sparkles, label: 'Match' },
  { to: '/app/premium', icon: Crown, label: 'Premium' },
]

interface Props {
  className?: string
}

export default function Sidebar({ className = '' }: Props) {
  return (
    <aside className={`fixed left-0 top-0 bottom-0 w-[85px] flex flex-col items-center py-4 gap-1 z-[90] bg-[#0f0e0f] border-r border-white/[4%] ${className}`}>
      {/* Logo - Click to go home */}
      <NavLink to="/" className="w-full px-3 mb-4 flex items-center justify-center">
        <img
          src="https://goloveai.com/logo_gradient_simple.svg"
          alt="GoLove"
          className="w-full max-w-[60px] cursor-pointer hover:opacity-80 transition-opacity"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
      </NavLink>

      {/* Nav Items */}
      <nav className="flex flex-col items-center gap-1 w-full px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavItem key={to} to={to} icon={Icon} label={label} />
        ))}
      </nav>

      {/* Bottom - Grid icon */}
      <div className="mt-auto pt-4">
        <div className="size-10 rounded-xl bg-white/[4%] flex items-center justify-center text-white/40">
          <LayoutGrid size={18} />
        </div>
      </div>
    </aside>
  )
}

function NavItem({ to, icon: Icon, label }: { to: string, icon: React.ComponentType<{ size: number }>, label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `relative flex flex-col items-center rounded-xl py-3 px-2 w-full transition-all cursor-pointer group ${
          isActive
            ? 'text-white bg-white/[5%]'
            : 'text-white/50 hover:text-white hover:bg-white/[5%]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={22} />
          <span className="text-[10px] font-medium mt-1 leading-none">{label}</span>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full" style={{ background: 'linear-gradient(to bottom, #d05bf8, #ff18a0)' }} />
          )}
        </>
      )}
    </NavLink>
  )
}