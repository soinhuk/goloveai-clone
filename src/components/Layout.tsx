import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gl-dark">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex" />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 ml-[85px]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}