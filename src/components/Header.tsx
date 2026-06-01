import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Bell, Search } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/app/explore', label: 'Explore' },
    { href: '/create', label: 'Create' },
    { href: '/app/characters', label: 'My AI' },
    { href: '/app/chats', label: 'Chats' },
    { href: '/app/search', label: 'Match' },
  ]

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] h-[68px] flex items-center justify-between gap-4 px-4 py-3
        bg-gradient-to-b from-[#181718] from-95% to-transparent pointer-events-none">
        {/* Logo */}
        <Link to="/" className="flex items-center pointer-events-auto">
          <img src="https://goloveai.com/logo.svg" alt="GoLove" className="h-8" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 pointer-events-auto">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all
                ${location.pathname === link.href
                  ? 'text-white bg-white/[4%]'
                  : 'text-white/60 hover:text-white hover:bg-white/[4%]'
                }`}
            >
              {link.label}
              {link.label === 'New' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-gl-pink rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <Link
            to="/app/premium"
            className="relative flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl
              bg-pink-gradient text-white shadow-[0_0_13.64px_rgba(232,27,157,0.5)]
              hover:shadow-[0_0_20px_rgba(232,27,157,0.7)] transition-all"
          >
            70% Premium
          </Link>

          <button className="outline-none flex size-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-white/[8%]">
            <Bell size={18} className="text-white/70" />
          </button>

          <Link
            to="/app/premium"
            className="hidden md:flex size-9 items-center justify-center rounded-full bg-white/[4%] transition-all hover:bg-white/[8%] text-white/50 hover:text-white"
          >
            <Search size={18} />
          </Link>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6 md:hidden">
          <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4">
            <X size={32} className="text-white" />
          </button>
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold text-white hover:text-gl-pink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}