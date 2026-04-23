import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import CountryCard from '../components/CountryCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ConfirmModal from '../components/ConfirmModal.jsx'
import { toast } from 'sonner'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingCca3, setPendingCca3] = useState(null)

  const confirmRemove = (cca3) => {
    setPendingCca3(cca3)
    setModalOpen(true)
  }

  const handleConfirm = () => {
    if (pendingCca3) {
      const country = favorites.find(c => c.cca3 === pendingCca3)
      removeFavorite(pendingCca3)
      toast.info(`${country?.name.common ?? 'País'} eliminado de favoritos`)
    }
    setModalOpen(false)
    setPendingCca3(null)
  }

  const handleClearAll = () => {
    setPendingCca3('__all__')
    setModalOpen(true)
  }

  const handleConfirmAll = () => {
    if (pendingCca3 === '__all__') {
      favorites.forEach(c => removeFavorite(c.cca3))
      toast.info('Todos los favoritos eliminados')
    } else {
      handleConfirm()
      return
    }
    setModalOpen(false)
    setPendingCca3(null)
  }

  const country = pendingCca3 && pendingCca3 !== '__all__'
    ? favorites.find(c => c.cca3 === pendingCca3)
    : null

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display font-extrabold text-xl text-[#28251d] dark:text-[#cdccca]">
            Mis favoritos
          </h1>
          <p className="text-sm text-[#7a7974] dark:text-[#797876] mt-0.5">
            {favorites.length} {favorites.length === 1 ? 'país guardado' : 'países guardados'}
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-[#7a7974] dark:text-[#797876] hover:text-[#a12c7b] dark:hover:text-[#d163a7] transition-colors"
            aria-label="Eliminar todos los favoritos"
          >
            Borrar todos
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="Aún no tienes favoritos"
          description="Explora países y agrégatlos a tus favoritos para verlos aquí."
          action={
            <Link to="/explore" className="px-5 py-2.5 bg-[#01696f] dark:bg-[#4f98a3] text-white rounded-lg text-sm font-medium hover:bg-[#0c4e54] transition-colors">
              Explorar países
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((country, i) => (
            <div key={country.cca3} className="relative group" style={{ animationDelay: `${i * 40}ms` }}>
              <CountryCard country={country} />
              <button
                onClick={() => confirmRemove(country.cca3)}
                aria-label={`Eliminar ${country.name.common} de favoritos`}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 focus:opacity-100 p-1.5 bg-white/90 dark:bg-[#1c1b19]/90 rounded-full text-[#a12c7b] dark:text-[#d163a7] hover:scale-110 transition-all shadow-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={modalOpen}
        title={pendingCca3 === '__all__' ? 'Borrar todos los favoritos' : 'Quitar de favoritos'}
        message={
          pendingCca3 === '__all__'
            ? '¿Estás seguro de que quieres eliminar todos tus países favoritos? Esta acción no se puede deshacer.'
            : `¿Quieres quitar ${country?.name.common ?? 'este país'} de tus favoritos?`
        }
        confirmLabel="Sí, eliminar"
        onConfirm={pendingCca3 === '__all__' ? handleConfirmAll : handleConfirm}
        onCancel={() => { setModalOpen(false); setPendingCca3(null) }}
      />
    </div>
  )
}
