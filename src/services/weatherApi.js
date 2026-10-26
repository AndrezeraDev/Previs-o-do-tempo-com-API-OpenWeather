/**
 * Comunicação com a API da OpenWeather.
 * Documentação: https://openweathermap.org/current e https://openweathermap.org/forecast5
 */

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

/**
 * Monta os parâmetros de localização aceitos pela API.
 * Podemos buscar pelo nome da cidade ou pelas coordenadas (latitude e longitude).
 */
function buildLocationParams(location) {
  if (location.city) {
    return { q: location.city }
  }

  return { lat: location.latitude, lon: location.longitude }
}

/**
 * Faz a requisição e trata os erros mais comuns com mensagens amigáveis.
 */
async function request(endpoint, location) {
  const params = new URLSearchParams({
    ...buildLocationParams(location),
    appid: API_KEY,
    units: 'metric', // temperatura em °C e vento em m/s
    lang: 'pt_br', // descrições em português ("céu limpo", "chuva leve"...)
  })

  let response

  try {
    response = await fetch(`${BASE_URL}/${endpoint}?${params}`)
  } catch {
    throw new Error('Sem conexão com a internet. Verifique sua rede e tente de novo.')
  }

  if (response.status === 404) {
    throw new Error('Cidade não encontrada. Confira o nome e tente de novo.')
  }

  if (response.status === 401) {
    throw new Error('Chave da API inválida. Verifique o arquivo .env.')
  }

  if (!response.ok) {
    throw new Error('Não foi possível buscar o clima agora. Tente novamente em instantes.')
  }

  return response.json()
}

/** Clima atual: temperatura, umidade, vento, nascer e pôr do sol... */
export function getCurrentWeather(location) {
  return request('weather', location)
}

/** Previsão dos próximos 5 dias, com um registro a cada 3 horas. */
export function getForecast(location) {
  return request('forecast', location)
}
