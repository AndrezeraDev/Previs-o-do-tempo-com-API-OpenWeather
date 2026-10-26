/**
 * "Esqueleto" mostrado enquanto o primeiro clima carrega.
 * Blocos cinzas pulsando no lugar onde os dados vão aparecer.
 */
export default function LoadingState() {
  return (
    <div className="grid gap-6 lg:grid-cols-2" aria-busy="true" aria-label="Carregando clima">
      <div className="h-80 animate-pulse rounded-3xl bg-white/10" />
      <div className="h-80 animate-pulse rounded-3xl bg-white/10" />
      <div className="h-44 animate-pulse rounded-3xl bg-white/10 lg:col-span-2" />
    </div>
  )
}
