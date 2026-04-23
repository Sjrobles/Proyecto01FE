import { useParams, Link, useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { toast } from 'sonner'

export default function CountryDetailPage() {
  const { cca3 } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useFetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const country = Array.isArray(data) ? data[0] : data
  const fav = country ? isFavorite(country.cca3) : false

  const handleFav = () => {
    if (!country) return
    if (fav) {
      removeFavorite(country.cca3)
      toast.info(`${country.name.common} eliminado de favoritos`)
    } else {
      addFavorite(country)
      toast.success(`${country.name.common} agregado a favoritos`)
    }
  }

  if (loading) return (
    <div className="max-w-[960px] mx-auto px-4 py-10">
      <div className="skeleton h-8 w-32 mb-8 rounded-lg" />
      <div className="grid md:grid-cols-2 gap-10">
        <div className="skeleton aspect-[3/2] rounded-xl" />
        <div className="space-y-4">
          <div className="skeleton h-8 w-3/4" />
          {Array.from({length: 6}).map((_,i) => <div key={i} className="skeleton h-4 w-2/3" />)}
        </div>
      </div>
    </div>
  )

  if (error || !country) return (
    <div className="max-w-[960px] mx-auto px-4 py-20 text-center">
      <p className="text-[#7a7974] dark:text-[#797876] mb-4">País no encontrado o error al cargar los datos.</p>
      <Link to="/explore" className="text-[#01696f] dark:text-[#4f98a3] underline text-sm">← Volver a explorar</Link>
    </div>
  )

  const languages = country.languages ? Object.values(country.languages).join(', ') : '—'
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol ?? ''})`).join(', ')
    : '—'
  const borders = country.borders ?? []

  return (
    <div className="max-w-[960px] mx-auto px-4 py-10 animate-fade-in-up">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[#7a7974] dark:text-[#797876] hover:text-[#28251d] dark:hover:text-[#cdccca] mb-8 transition-colors"
        aria-label="Volver a la página anterior"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Volver
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <figure>
          <img
            src={country.flags?.svg ?? country.flags?.png}
            alt={country.flags?.alt ?? `Bandera de ${country.name.common}`}
            width="600" height="400"
            className="rounded-xl shadow-md w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="font-display font-extrabold text-xl text-[#28251d] dark:text-[#cdccca]">
                {country.name.common}
              </h1>
              {country.name.official !== country.name.common && (
                <p className="text-sm text-[#7a7974] dark:text-[#797876] mt-1">{country.name.official}</p>
              )}
            </div>
            <button
              onClick={handleFav}
              aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className={`shrink-0 p-2.5 rounded-lg transition-colors ${
                fav
                  ? 'bg-[#cedcd8] dark:bg-[#313b3b] text-[#01696f] dark:text-[#4f98a3]'
                  : 'bg-[#f3f0ec] dark:bg-[#1d1c1a] text-[#7a7974] dark:text-[#797876] hover:bg-[#e6e4df] dark:hover:bg-[#22211f]'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
          </div>

          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm mb-8">
            {[
              ['Capital', country.capital?.[0] ?? '—'],
              ['Región', country.region ?? '—'],
              ['Subregión', country.subregion ?? '—'],
              ['Población', country.population?.toLocaleString('es-CO') ?? '—'],
              ['Idiomas', languages],
              ['Monedas', currencies],
              ['Área', country.area ? `${country.area.toLocaleString('es-CO')} km²` : '—'],
              ['Código', country.cca3],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-medium text-[#28251d] dark:text-[#cdccca]">{k}:</dt>
                <dd className="text-[#7a7974] dark:text-[#797876]">{v}</dd>
              </div>
            ))}
          </dl>

          {borders.length > 0 && (
            <div>
              <h2 className="font-medium text-sm text-[#28251d] dark:text-[#cdccca] mb-3">Países fronterizos:</h2>
              <div className="flex flex-wrap gap-2">
                {borders.map(b => (
                  <Link
                    key={b}
                    to={`/country/${b}`}
                    className="px-3 py-1.5 text-xs bg-[#f3f0ec] dark:bg-[#1d1c1a] text-[#28251d] dark:text-[#cdccca] border border-[#dcd9d5] dark:border-[#393836] rounded-full hover:bg-[#cedcd8] dark:hover:bg-[#313b3b] hover:text-[#01696f] dark:hover:text-[#4f98a3] transition-colors"
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
