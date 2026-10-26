import { CircleAlert } from 'lucide-react'

export default function ErrorMessage({ message }) {
  return (
    <p
      role="alert"
      className="flex items-center gap-3 rounded-2xl border border-red-200/30 bg-red-500/20 px-4 py-3 text-sm backdrop-blur-md animate-fade-up"
    >
      <CircleAlert size={18} className="shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}
