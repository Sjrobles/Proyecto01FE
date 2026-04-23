export default function LoadingGrid({ count = 12 }) {
  return (
    <div role="status" aria-label="Cargando países">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-[#f9f8f5] dark:bg-[#1c1b19] rounded-xl overflow-hidden border border-[#dcd9d5]/60 dark:border-[#393836]/60">
            <div className="skeleton aspect-[3/2] w-full" />
            <div className="p-4 space-y-3">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
              <div className="skeleton h-3 w-2/3" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Cargando…</span>
    </div>
  )
}
