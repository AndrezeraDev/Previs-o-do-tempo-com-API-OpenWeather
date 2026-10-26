import { toCityDate } from './formatters'

/** Transforma uma data em uma chave de dia, ex.: "2026-10-26" */
function getDayKey(unixSeconds, timezoneOffset) {
  return toCityDate(unixSeconds, timezoneOffset).toISOString().slice(0, 10)
}

/**
 * A previsão gratuita da OpenWeather vem com 40 registros: um a cada 3 horas, por 5 dias.
 * Esta função agrupa os registros por dia e devolve um resumo de cada dia:
 * temperatura mínima, máxima e o ícone do horário mais próximo do meio-dia.
 */
export function groupForecastByDay(forecastData, numberOfDays = 5) {
  const timezoneOffset = forecastData.city.timezone
  const todayKey = getDayKey(Date.now() / 1000, timezoneOffset)
  const days = {}

  for (const item of forecastData.list) {
    const dayKey = getDayKey(item.dt, timezoneOffset)
    const hour = toCityDate(item.dt, timezoneOffset).getUTCHours()
    const distanceFromMidday = Math.abs(hour - 12)

    // Primeiro registro do dia: criamos o resumo
    if (!days[dayKey]) {
      days[dayKey] = {
        key: dayKey,
        timestamp: item.dt,
        timezoneOffset,
        minTemperature: item.main.temp_min,
        maxTemperature: item.main.temp_max,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        distanceFromMidday,
      }
      continue
    }

    // Demais registros: atualizamos mínima e máxima
    const day = days[dayKey]
    day.minTemperature = Math.min(day.minTemperature, item.main.temp_min)
    day.maxTemperature = Math.max(day.maxTemperature, item.main.temp_max)

    // O ícone do dia é o do horário mais perto do meio-dia
    if (distanceFromMidday < day.distanceFromMidday) {
      day.icon = item.weather[0].icon
      day.description = item.weather[0].description
      day.distanceFromMidday = distanceFromMidday
    }
  }

  // Hoje já aparece no card principal, então mostramos só os próximos dias
  return Object.values(days)
    .filter((day) => day.key !== todayKey)
    .slice(0, numberOfDays)
}
