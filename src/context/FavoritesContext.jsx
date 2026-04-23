import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (country) => {
    setFavorites(prev =>
      prev.find(c => c.cca3 === country.cca3) ? prev : [...prev, country]
    )
  }

  const removeFavorite = (cca3) => {
    setFavorites(prev => prev.filter(c => c.cca3 !== cca3))
  }

  const isFavorite = (cca3) => favorites.some(c => c.cca3 === cca3)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
