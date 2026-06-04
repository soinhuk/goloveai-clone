import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#0F0E0F] text-white">
      <Sidebar />
      <main className="@container/layout-content relative z-[1] flex min-h-[100dvh] w-full min-w-0 flex-col transition-[padding] duration-500 pt-[32px] pl-[20px] pb-0">
        <Outlet />
      </main>
    </div>
  )
}
