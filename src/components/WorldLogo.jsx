
export default function WorldLogo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-label="World Explorer logo"
      role="img"
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" className="text-[#01696f] dark:text-[#4f98a3]" />
      <ellipse cx="16" cy="16" rx="6" ry="14" stroke="currentColor" strokeWidth="1.5" className="text-[#01696f] dark:text-[#4f98a3]" />
      <line x1="2" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" className="text-[#01696f] dark:text-[#4f98a3]" />
      <path d="M4 10 Q16 13 28 10" stroke="currentColor" strokeWidth="1.2" className="text-[#01696f] dark:text-[#4f98a3]" fill="none"/>
      <path d="M4 22 Q16 19 28 22" stroke="currentColor" strokeWidth="1.2" className="text-[#01696f] dark:text-[#4f98a3]" fill="none"/>
    </svg>
  )
}
