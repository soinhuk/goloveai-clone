import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gl-dark">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-[88px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}