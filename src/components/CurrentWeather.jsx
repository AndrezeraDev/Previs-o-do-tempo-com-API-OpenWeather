import { ArrowDown, ArrowUp, MapPin } from 'lucide-react'
import Card from './Card'
import { getWeatherIcon } from '../utils/weatherTheme'
import { formatFullDate, formatTemperature, formatTime } from '../utils/formatters'

/**
 * Card principal: cidade, temperatura atual e descrição do clima.
 */
export default function CurrentWeather({ weather }) {
  const condition = weather.weather[0]
  const WeatherIcon = getWeatherIcon(condition.icon)

  return (
    <Card className="relative overflow-hidden animate-fade-up">
      {/* Brilho suave atrás do ícone */}
      <div className="pointer-events-none absolute -top-10 -right-10 size-56 rounded-full bg-white/25 blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold">
            <MapPin size={20} aria-hidden="true" />
            {weather.name}
            <span className="text-base font-medium text-white/60">{weather.sys.country}</span>
          </h2>
          <p className="mt-1 text-sm text-white/70 first-letter:uppercase">{formatFullDate(weather.dt, weather.timezone)}</p>
        </div>

        <WeatherIcon size={88} strokeWidth={1.25} className="shrink-0 animate-float drop-shadow-lg" aria-hidden="true" />
      </div>

      <p className="relative mt-6 text-8xl font-light tracking-tighter">{formatTemperature(weather.main.temp)}</p>

      <p className="relative mt-2 text-lg font-medium first-letter:uppercase">{condition.description}</p>

      <div className="relative mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
        <span className="flex items-center gap-1">
          <ArrowUp size={14} aria-hidden="true" />
          Máx. {formatTemperature(weather.main.temp_max)}
        </span>
        <span className="flex items-center gap-1">
          <ArrowDown size={14} aria-hidden="true" />
          Mín. {formatTemperature(weather.main.temp_min)}
        </span>
        <span>Atualizado às {formatTime(weather.dt, weather.timezone)}</span>
      </div>
    </Card>
  )
}
