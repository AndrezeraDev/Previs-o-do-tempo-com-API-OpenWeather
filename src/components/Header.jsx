import Logo from './Logo'

export default function Header() {
  return (
    <header className="flex items-center gap-3">
      <Logo />
      <div>
        <h1 className="text-lg font-semibold leading-tight">Previsão do Tempo</h1>
        <p className="text-sm text-white/70">Clima agora e nos próximos dias</p>
      </div>
    </header>
  )
}
