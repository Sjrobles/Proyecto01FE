export default function EmptyState({ title = 'Sin resultados', description, action }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center py-24 px-8 text-center">
      
      <svg
        width="64" height="64" viewBox="0 0 64 64" fill="none"
        aria-hidden="true"
        className="text-[#bab9b4] dark:text-[#5a5957] mb-5"
        style={{ animation: 'fade-in-up 0.5s ease both' }}
      >
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
        <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.15" />
        <line x1="4" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="2" />
        <ellipse cx="32" cy="32" rx="12" ry="28" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
      </svg>
      <h3 className="font-display font-bold text-lg text-[#28251d] dark:text-[#cdccca] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#7a7974] dark:text-[#797876] max-w-[36ch] mb-6">{description}</p>
      )}
      {action}
    </div>
  )
}
