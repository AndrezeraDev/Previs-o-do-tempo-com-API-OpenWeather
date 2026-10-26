import { useState } from 'react'
import { LoaderCircle, LocateFixed, Search } from 'lucide-react'

/**
 * Campo de busca por cidade + botão para usar a localização atual.
 */
export default function SearchBar({ onSearch, onUseLocation, isLoading }) {
  const [city, setCity] = useState('')

  function handleSubmit(event) {
    event.preventDefault() // evita recarregar a página ao enviar o formulário
    onSearch(city)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label className="flex flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 backdrop-blur-md transition focus-within:border-white/40 focus-within:bg-white/15">
        <Search size={18} className="shrink-0 text-white/70" aria-hidden="true" />
        <span className="sr-only">Nome da cidade</span>
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Buscar cidade..."
          className="h-12 w-full bg-transparent text-white placeholder:text-white/60 focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="flex h-12 items-center gap-2 rounded-2xl bg-white px-5 font-semibold text-slate-900 transition hover:bg-white/90 active:scale-95 disabled:opacity-70"
      >
        {isLoading ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : 'Buscar'}
        {isLoading && <span className="sr-only">Carregando</span>}
      </button>

      <button
        type="button"
        onClick={onUseLocation}
        disabled={isLoading}
        title="Usar minha localização"
        className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md transition hover:bg-white/20 active:scale-95 disabled:opacity-70"
      >
        <LocateFixed size={20} aria-hidden="true" />
        <span className="sr-only">Usar minha localização</span>
      </button>
    </form>
  )
}
