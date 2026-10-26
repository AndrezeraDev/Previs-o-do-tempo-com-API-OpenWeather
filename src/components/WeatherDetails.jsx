import { Droplets, Eye, Sunrise, Sunset, Thermometer, Wind } from 'lucide-react'
import Card from './Card'
import { formatTemperature, formatTime, formatVisibility, formatWindSpeed } from '../utils/formatters'

/** Um item da lista de detalhes: ícone, título e valor */
function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="flex items-center gap-2 text-sm text-white/70">
        <Icon size={16} aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  )
}

/**
 * Detalhes do clima atual em uma grade de 6 itens.
 */
export default function WeatherDetails({ weather }) {
  const details = [
    { icon: Thermometer, label: 'Sensação', value: formatTemperature(weather.main.feels_like) },
    { icon: Droplets, label: 'Umidade', value: `${weather.main.humidity}%` },
    { icon: Wind, label: 'Vento', value: formatWindSpeed(weather.wind.speed) },
    { icon: Eye, label: 'Visibilidade', value: formatVisibility(weather.visibility) },
    { icon: Sunrise, label: 'Nascer do sol', value: formatTime(weather.sys.sunrise, weather.timezone) },
    { icon: Sunset, label: 'Pôr do sol', value: formatTime(weather.sys.sunset, weather.timezone) },
  ]

  return (
    <Card className="animate-fade-up" style={{ animationDelay: '100ms' }}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">Detalhes</h2>

      <div className="grid grid-cols-2 gap-3">
        {details.map((detail) => (
          <DetailItem key={detail.label} {...detail} />
        ))}
      </div>
    </Card>
  )
}
