/** Logo do app: um sol saindo de trás de uma nuvem. */
export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="white" fillOpacity="0.15" />
      <circle cx="38" cy="25" r="10" fill="#fde68a" />
      <path d="M20 46h24a9 9 0 0 0 0-18 12 12 0 0 0-23 3 7.5 7.5 0 0 0-1 15z" fill="white" />
    </svg>
  )
}
