import { useState, useMemo } from 'react'
import { useFetch } from '../hooks/useFetch.js'
import { useDebounce } from '../hooks/useDebounce.js'
import CountryCard from '../components/CountryCard.jsx'
import LoadingGrid from '../components/LoadingGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
import FilterBar from '../components/FilterBar.jsx'
import { Link } from 'react-router-dom'

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3'

export default function ExplorePage() {
  const { data, loading, error } = useFetch(API_URL)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const debouncedSearch = useDebounce(search, 250)

  const regions = useMemo(() => {
    if (!data) return []
    return [...new Set(data.map(c => c.region).filter(Boolean))].sort()
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    const q = debouncedSearch.toLowerCase()
    return data.filter(c => {
      const matchSearch = !q ||
        c.name.common.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q) ||
        c.region?.toLowerCase().includes(q)
      const matchRegion = !region || c.region === region
      return matchSearch && matchRegion
    }).sort((a, b) => a.name.common.localeCompare(b.name.common))
  }, [data, debouncedSearch, region])

  if (error) return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">
      <EmptyState
        title="Error al cargar los países"
        description={`No pudimos conectar con la API. ${error}`}
        action={
          <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-[#01696f] dark:bg-[#4f98a3] text-white rounded-lg text-sm font-medium hover:bg-[#0c4e54] transition-colors">
            Reintentar
          </button>
        }
      />
    </div>
  )

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="font-display font-extrabold text-xl text-[#28251d] dark:text-[#cdccca] mb-1">
          Explorar países
        </h1>
        <p className="text-sm text-[#7a7974] dark:text-[#797876]">
          {data ? `${filtered.length} de ${data.length} países` : 'Cargando…'}
        </p>
      </div>

      <FilterBar
        search={search} onSearch={setSearch}
        region={region} onRegion={setRegion}
        regions={regions}
      />

      {loading && <LoadingGrid count={12} />}

      {!loading && filtered.length === 0 && (
        <EmptyState
          title="Sin resultados"
          description={`No encontramos países que coincidan con "${debouncedSearch || region}". Intenta con otro término.`}
          action={
            <button onClick={() => { setSearch(''); setRegion('') }} className="px-5 py-2.5 bg-[#01696f] dark:bg-[#4f98a3] text-white rounded-lg text-sm font-medium hover:bg-[#0c4e54] transition-colors">
              Limpiar filtros
            </button>
          }
        />
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((country, i) => (
            <div key={country.cca3} style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
