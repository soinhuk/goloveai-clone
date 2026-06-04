import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#0F0E0F] text-white">
      {/* Desktop Sidebar */}
      <div className="hidden desktop:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="@container/layout-content relative z-[1] flex min-h-[100dvh] w-full min-w-0 flex-col transition-[padding] duration-500 pt-[16px] desktop:pt-[32px] pb-[66px] desktop:pb-0 desktop:pl-[20px]">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  )
}
