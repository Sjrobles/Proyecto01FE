export default function FilterBar({ search, onSearch, region, onRegion, regions }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8" role="search">
      <div className="relative flex-1">
        <label htmlFor="country-search" className="sr-only">Buscar país</label>
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bab9b4] dark:text-[#5a5957] pointer-events-none"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          id="country-search"
          type="search"
          placeholder="Buscar por nombre, capital o región…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#dcd9d5] dark:border-[#393836] bg-[#f9f8f5] dark:bg-[#1c1b19] text-[#28251d] dark:text-[#cdccca] placeholder-[#bab9b4] dark:placeholder-[#5a5957] text-sm focus:outline-none focus:ring-2 focus:ring-[#01696f] dark:focus:ring-[#4f98a3] transition-colors"
        />
      </div>
      <div>
        <label htmlFor="region-filter" className="sr-only">Filtrar por región</label>
        <select
          id="region-filter"
          value={region}
          onChange={e => onRegion(e.target.value)}
          className="w-full sm:w-48 px-4 py-2.5 rounded-lg border border-[#dcd9d5] dark:border-[#393836] bg-[#f9f8f5] dark:bg-[#1c1b19] text-[#28251d] dark:text-[#cdccca] text-sm focus:outline-none focus:ring-2 focus:ring-[#01696f] dark:focus:ring-[#4f98a3] transition-colors"
        >
          <option value="">Todas las regiones</option>
          {regions.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
    </div>
  )
}
