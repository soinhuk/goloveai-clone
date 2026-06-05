import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { href: '/create', label: 'Create', icon: '✨' },
    { href: '/app/explore', label: 'Explore', icon: '🔍' },
    { href: '/app/chats', label: 'Chat', icon: '💬' },
    { href: '/generate', label: 'Generate', icon: '🎨' },
    { href: '/app/characters', label: 'My AI', icon: '🤖', badge: 'NEW' },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] h-[60px] bg-[#121113]/95 backdrop-blur-md border-b border-white/[6%]">
        <div className="h-full max-w-[1400px] mx-auto flex items-center justify-between px-4 desktop:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="https://goloveai.com/logo_gradient_simple.svg" alt="GoLove" className="h-7" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden desktop:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium rounded-lg transition-all
                  ${isActive(link.href)
                    ? 'text-white bg-white/[8%]'
                    : 'text-white/50 hover:text-white hover:bg-white/[4%]'
                  }`}
              >
                <span className="text-sm">{link.icon}</span>
                {link.label}
                {link.badge && (
                  <span className="px-1 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Premium */}
            <Link
              to="/app/premium"
              className="relative flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-lg
                bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white
                shadow-[0_0_13px_rgba(232,27,157,0.4)] hover:shadow-[0_0_20px_rgba(232,27,157,0.6)] transition-all"
            >
              <span className="text-[10px] font-bold px-1 py-0.5 bg-white/20 rounded">70%</span>
              Premium
            </Link>

            {/* Notification */}
            <button className="relative flex size-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/[6%] transition-all">
              <Bell size={16} className="text-white/60" />
              <span className="absolute -top-0.5 -right-0.5 size-2 bg-red-500 rounded-full" />
            </button>

            {/* Sign In / Join Free */}
            <div className="hidden desktop:flex items-center gap-2">
              <button className="px-4 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 text-[13px] font-semibold bg-white text-black rounded-lg hover:bg-white/90 transition-all">
                Join Free
              </button>
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="desktop:hidden flex size-9 items-center justify-center rounded-lg hover:bg-white/[6%] transition-all"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-[#0a0a0f]/98 backdrop-blur-md flex flex-col pt-[80px] px-6 desktop:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full hover:bg-white/[6%]"
          >
            <X size={24} />
          </button>
          <nav className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-lg font-medium rounded-xl transition-all
                  ${isActive(link.href) ? 'text-white bg-white/[8%]' : 'text-white/60 hover:text-white'}`}
              >
                <span>{link.icon}</span>
                {link.label}
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <button className="w-full py-3 text-base font-semibold bg-white text-black rounded-xl">
              Join Free
            </button>
            <button className="w-full py-3 text-base font-medium text-white/70 border border-white/10 rounded-xl">
              Sign In
            </button>
          </div>
          <div className="mt-auto pb-8">
            <Link
              to="/app/premium"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-base font-semibold rounded-xl
                bg-gradient-to-r from-[#d05bf8] to-[#ff18a0] text-white"
            >
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-white/20 rounded">70%</span>
              Get Premium
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
