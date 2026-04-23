import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] dark:bg-[#171614] text-[#28251d] dark:text-[#cdccca] transition-colors duration-200">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#01696f] text-white px-4 py-2 rounded-md z-50">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="pt-16">
        <Outlet />
      </main>
    </div>
  )
}
