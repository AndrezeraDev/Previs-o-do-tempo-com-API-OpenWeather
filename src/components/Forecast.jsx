import Card from './Card'
import { getWeatherIcon } from '../utils/weatherTheme'
import { formatTemperature, formatWeekday } from '../utils/formatters'

/** Um dia da previsão: dia da semana, ícone, máxima e mínima */
function ForecastDay({ day }) {
  const WeatherIcon = getWeatherIcon(day.icon)

  return (
    <li className="flex flex-col items-center gap-3 rounded-2xl py-3 transition hover:bg-white/10">
      <span className="text-sm font-medium capitalize text-white/80">
        {formatWeekday(day.timestamp, day.timezoneOffset)}
      </span>
      <WeatherIcon size={32} strokeWidth={1.5} aria-label={day.description} />
      <span className="text-center leading-tight">
        <span className="block font-semibold">{formatTemperature(day.maxTemperature)}</span>
        <span className="block text-sm text-white/60">{formatTemperature(day.minTemperature)}</span>
      </span>
    </li>
  )
}

/**
 * Previsão dos próximos dias.
 */
export default function Forecast({ days }) {
  if (days.length === 0) return null

  return (
    <Card className="animate-fade-up" style={{ animationDelay: '200ms' }}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/70">Próximos dias</h2>

      <ul className="grid grid-cols-5 gap-1">
        {days.map((day) => (
          <ForecastDay key={day.key} day={day} />
        ))}
      </ul>
    </Card>
  )
}
