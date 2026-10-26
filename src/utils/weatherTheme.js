import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudSun,
  CloudSunRain,
  Cloudy,
  Moon,
  Snowflake,
  Sun,
} from 'lucide-react'

/*
 * A API envia um código de ícone para cada clima, por exemplo "01d" ou "10n".
 * - Os dois números indicam o tipo de clima (01 = céu limpo, 10 = chuva...)
 * - A letra indica se é dia ("d") ou noite ("n")
 * Lista completa: https://openweathermap.org/weather-conditions
 */

const WEATHER_ICONS = {
  '01': { day: Sun, night: Moon }, // céu limpo
  '02': { day: CloudSun, night: CloudMoon }, // poucas nuvens
  '03': { day: Cloud, night: Cloud }, // nuvens dispersas
  '04': { day: Cloudy, night: Cloudy }, // nublado
  '09': { day: CloudDrizzle, night: CloudDrizzle }, // garoa / pancadas
  '10': { day: CloudSunRain, night: CloudMoonRain }, // chuva
  '11': { day: CloudLightning, night: CloudLightning }, // tempestade
  '13': { day: Snowflake, night: Snowflake }, // neve
  '50': { day: CloudFog, night: CloudFog }, // névoa / neblina
}

// Fundo da página para cada clima (classes do Tailwind para gradiente)
const WEATHER_BACKGROUNDS = {
  '01': { day: 'from-sky-400 via-sky-500 to-blue-600', night: 'from-slate-900 via-indigo-950 to-slate-950' },
  '02': { day: 'from-sky-400 via-blue-500 to-indigo-500', night: 'from-slate-800 via-indigo-950 to-slate-950' },
  '03': { day: 'from-slate-400 via-sky-600 to-slate-600', night: 'from-slate-700 via-slate-800 to-slate-950' },
  '04': { day: 'from-slate-400 via-slate-500 to-slate-700', night: 'from-slate-700 via-slate-800 to-slate-950' },
  '09': { day: 'from-slate-500 via-blue-700 to-slate-800', night: 'from-slate-800 via-blue-950 to-slate-950' },
  '10': { day: 'from-slate-500 via-blue-700 to-slate-800', night: 'from-slate-800 via-blue-950 to-slate-950' },
  '11': { day: 'from-slate-600 via-violet-900 to-slate-900', night: 'from-slate-900 via-violet-950 to-black' },
  '13': { day: 'from-sky-300 via-slate-400 to-slate-600', night: 'from-slate-600 via-slate-800 to-slate-950' },
  '50': { day: 'from-stone-400 via-slate-500 to-slate-600', night: 'from-stone-700 via-slate-800 to-slate-950' },
}

// Usado enquanto o primeiro clima ainda não carregou
export const DEFAULT_BACKGROUND = WEATHER_BACKGROUNDS['01'].day

/** Separa o código "10n" em tipo ("10") e período ("night") */
function parseIconCode(iconCode) {
  const weatherType = iconCode.slice(0, 2)
  const period = iconCode.endsWith('n') ? 'night' : 'day'

  return { weatherType, period }
}

/** Devolve o componente de ícone (Lucide) para o código da API */
export function getWeatherIcon(iconCode) {
  const { weatherType, period } = parseIconCode(iconCode)
  const icons = WEATHER_ICONS[weatherType] ?? WEATHER_ICONS['03']

  return icons[period]
}

/** Devolve as classes de gradiente do fundo para o código da API */
export function getWeatherBackground(iconCode) {
  const { weatherType, period } = parseIconCode(iconCode)
  const backgrounds = WEATHER_BACKGROUNDS[weatherType] ?? WEATHER_BACKGROUNDS['03']

  return backgrounds[period]
}
