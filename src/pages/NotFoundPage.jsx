import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <svg
        width="80" height="80" viewBox="0 0 80 80" fill="none"
        aria-hidden="true"
        className="text-[#bab9b4] dark:text-[#5a5957] mb-6"
      >
        <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2" strokeDasharray="8 5" />
        <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize="28" fontWeight="700" fill="currentColor" fontFamily="system-ui">404</text>
      </svg>
      <h1 className="font-display font-extrabold text-xl text-[#28251d] dark:text-[#cdccca] mb-2">Página no encontrada</h1>
      <p className="text-sm text-[#7a7974] dark:text-[#797876] max-w-[36ch] mb-8">
        Parece que te perdiste. Esta página no existe o fue movida a otra ubicación.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link to="/" className="px-5 py-2.5 bg-[#01696f] dark:bg-[#4f98a3] text-white rounded-lg text-sm font-medium hover:bg-[#0c4e54] transition-colors">
          Ir al inicio
        </Link>
        <Link to="/explore" className="px-5 py-2.5 bg-[#f3f0ec] dark:bg-[#1d1c1a] text-[#28251d] dark:text-[#cdccca] border border-[#dcd9d5] dark:border-[#393836] rounded-lg text-sm font-medium hover:bg-[#e6e4df] dark:hover:bg-[#22211f] transition-colors">
          Explorar países
        </Link>
      </div>
    </div>
  )
}
