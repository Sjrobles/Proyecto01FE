import { Link } from 'react-router-dom'
import WorldLogo from '../components/WorldLogo.jsx'

export default function HomePage() {
  const stats = [
    { label: 'Países', value: '250+' },
    { label: 'Regiones', value: '6' },
    { label: 'Idiomas', value: '2,500+' },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      
      <section className="flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-b from-[#f7f6f2] to-[#f3f0ec] dark:from-[#171614] dark:to-[#1c1b19]">
        <div className="max-w-2xl text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[#cedcd8] dark:bg-[#313b3b] rounded-2xl">
              <WorldLogo size={48} />
            </div>
          </div>
          <h1 className="font-display font-extrabold text-[clamp(2rem,4vw+1rem,3.5rem)] leading-tight text-[#28251d] dark:text-[#cdccca] mb-4">
            Descubre cada rincón del mundo
          </h1>
          <p className="text-base text-[#7a7974] dark:text-[#797876] max-w-[60ch] mx-auto mb-8">
            Explora más de 250 países, conoce sus banderas, capitales, poblaciones y mucho más — todo en tiempo real desde la API de REST Countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/explore"
              className="px-6 py-3 bg-[#01696f] dark:bg-[#4f98a3] text-white rounded-lg font-medium text-sm hover:bg-[#0c4e54] dark:hover:bg-[#227f8b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#01696f] focus:ring-offset-2"
            >
              Explorar países →
            </Link>
            <Link
              to="/favorites"
              className="px-6 py-3 bg-[#f3f0ec] dark:bg-[#1d1c1a] text-[#28251d] dark:text-[#cdccca] rounded-lg font-medium text-sm border border-[#dcd9d5] dark:border-[#393836] hover:bg-[#e6e4df] dark:hover:bg-[#22211f] transition-colors"
            >
              Ver favoritos
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-12 px-4 border-t border-[#dcd9d5] dark:border-[#262523]" aria-label="Estadísticas">
        <div className="max-w-[960px] mx-auto grid grid-cols-3 gap-6 text-center">
          {stats.map(s => (
            <div key={s.label}>
              <p className="font-display font-extrabold text-[clamp(1.5rem,3vw,2.5rem)] text-[#01696f] dark:text-[#4f98a3]">{s.value}</p>
              <p className="text-sm text-[#7a7974] dark:text-[#797876] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-16 px-4 bg-[#f3f0ec] dark:bg-[#1c1b19]" aria-label="Características">
        <div className="max-w-[960px] mx-auto">
          <h2 className="font-display font-bold text-xl text-[#28251d] dark:text-[#cdccca] mb-8">
            Todo lo que necesitas saber
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🗺️', title: 'Exploración completa', desc: 'Navega por todos los países del mundo con búsqueda y filtros en tiempo real.' },
              { icon: '⭐', title: 'Guarda favoritos', desc: 'Marca los países que más te gustan y accede a ellos en cualquier momento.' },
              { icon: '🔍', title: 'Detalle a fondo', desc: 'Conoce capitales, monedas, idiomas, población y más de cada país.' },
            ].map(f => (
              <div key={f.title} className="p-5 bg-[#f9f8f5] dark:bg-[#1c1b19] rounded-xl border border-[#dcd9d5]/60 dark:border-[#393836]/60">
                <span className="text-2xl mb-3 block" aria-hidden="true">{f.icon}</span>
                <h3 className="font-display font-bold text-base text-[#28251d] dark:text-[#cdccca] mb-1">{f.title}</h3>
                <p className="text-sm text-[#7a7974] dark:text-[#797876]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
