import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import WorldLogo from './WorldLogo.jsx'
import { useState } from 'react'

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { favorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/explore', label: 'Explorar' },
    { to: '/favorites', label: `Favoritos${favorites.length ? ` (${favorites.length})` : ''}` },
    { to: '/contact', label: 'Contacto' },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 px-3 py-2 rounded-md ${
      isActive
        ? 'text-[#01696f] dark:text-[#4f98a3] bg-[#cedcd8] dark:bg-[#313b3b]'
        : 'text-[#7a7974] dark:text-[#797876] hover:text-[#28251d] dark:hover:text-[#cdccca] hover:bg-[#f3f0ec] dark:hover:bg-[#1d1c1a]'
    }`

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-[#f9f8f5]/90 dark:bg-[#1c1b19]/90 backdrop-blur-sm border-b border-[#dcd9d5] dark:border-[#262523]">
      <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <WorldLogo />
          <span className="font-display font-bold text-[#28251d] dark:text-[#cdccca] text-base hidden sm:block">
            World Explorer
          </span>
        </NavLink>

   
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            className="p-2 rounded-md text-[#7a7974] dark:text-[#797876] hover:bg-[#f3f0ec] dark:hover:bg-[#1d1c1a] transition-colors"
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

  
          <button
            className="md:hidden p-2 rounded-md text-[#7a7974] dark:text-[#797876] hover:bg-[#f3f0ec] dark:hover:bg-[#1d1c1a] transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {menuOpen
                ? <path d="M18 6 6 18M6 6l12 12"/>
                : <path d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>


      {menuOpen && (
        <nav className="md:hidden bg-[#f9f8f5] dark:bg-[#1c1b19] border-t border-[#dcd9d5] dark:border-[#262523] px-4 py-3 flex flex-col gap-1" aria-label="Menú móvil">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setMenuOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
