/**
 * Funções para formatar os dados da API em textos prontos para a tela.
 */

/**
 * A API envia os horários em "Unix time" (segundos, em UTC) e o fuso da cidade em segundos.
 * Somamos o fuso e depois lemos a data em UTC. Assim mostramos a hora local da cidade
 * pesquisada, e não a hora do computador de quem está usando o app.
 */
export function toCityDate(unixSeconds, timezoneOffset) {
  return new Date((unixSeconds + timezoneOffset) * 1000)
}

/** 1700000000 → "06:42" */
export function formatTime(unixSeconds, timezoneOffset) {
  return toCityDate(unixSeconds, timezoneOffset).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}

/** 1700000000 → "segunda-feira, 26 de outubro" */
export function formatFullDate(unixSeconds, timezoneOffset) {
  return toCityDate(unixSeconds, timezoneOffset).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
}

/** 1700000000 → "seg" */
export function formatWeekday(unixSeconds, timezoneOffset) {
  const weekday = toCityDate(unixSeconds, timezoneOffset).toLocaleDateString('pt-BR', {
    weekday: 'short',
    timeZone: 'UTC',
  })

  return weekday.replace('.', '')
}

/** 23.6 → "24°" */
export function formatTemperature(celsius) {
  return `${Math.round(celsius)}°`
}

/** A API envia o vento em metros por segundo. 5 m/s → "18 km/h" */
export function formatWindSpeed(metersPerSecond) {
  const kilometersPerHour = metersPerSecond * 3.6
  return `${Math.round(kilometersPerHour)} km/h`
}

/** 10000 → "10 km" */
export function formatVisibility(meters) {
  return `${Math.round(meters / 1000)} km`
}
