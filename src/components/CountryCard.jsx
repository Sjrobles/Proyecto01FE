import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { toast } from 'sonner'

export default function CountryCard({ country }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(country.cca3)

  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (fav) {
      removeFavorite(country.cca3)
      toast.info(`${country.name.common} eliminado de favoritos`)
    } else {
      addFavorite(country)
      toast.success(`${country.name.common} agregado a favoritos`)
    }
  }

  const population = country.population?.toLocaleString('es-CO') ?? '—'
  const region = country.region ?? '—'
  const capital = country.capital?.[0] ?? '—'

  return (
    <article className="group bg-[#f9f8f5] dark:bg-[#1c1b19] border border-[#dcd9d5]/60 dark:border-[#393836]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 animate-fade-in-up">
      <Link to={`/country/${country.cca3}`} className="block">
        <div className="relative overflow-hidden aspect-[3/2]">
          <img
            src={country.flags?.svg ?? country.flags?.png}
            alt={country.flags?.alt ?? `Bandera de ${country.name.common}`}
            width="300"
            height="200"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h2 className="font-display font-bold text-base text-[#28251d] dark:text-[#cdccca] truncate mb-2">
            {country.name.common}
          </h2>
          <dl className="space-y-1 text-xs text-[#7a7974] dark:text-[#797876]">
            <div className="flex gap-1">
              <dt className="font-medium text-[#28251d] dark:text-[#cdccca]">Capital:</dt>
              <dd className="truncate">{capital}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-medium text-[#28251d] dark:text-[#cdccca]">Región:</dt>
              <dd>{region}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="font-medium text-[#28251d] dark:text-[#cdccca]">Población:</dt>
              <dd>{population}</dd>
            </div>
          </dl>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={handleFav}
          aria-label={fav ? `Quitar ${country.name.common} de favoritos` : `Agregar ${country.name.common} a favoritos`}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
            fav
              ? 'bg-[#cedcd8] dark:bg-[#313b3b] text-[#01696f] dark:text-[#4f98a3] hover:bg-[#b8cfcb] dark:hover:bg-[#2a3535]'
              : 'bg-[#f3f0ec] dark:bg-[#1d1c1a] text-[#7a7974] dark:text-[#797876] hover:bg-[#e6e4df] dark:hover:bg-[#22211f]'
          }`}
        >
          {fav ? '★ En favoritos' : '☆ Agregar'}
        </button>
      </div>
    </article>
  )
}
