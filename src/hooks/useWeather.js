import { useState } from 'react'
import { getCurrentWeather, getForecast } from '../services/weatherApi'
import { groupForecastByDay } from '../utils/forecast'

/**
 * Hook que guarda o estado do clima e oferece as funções de busca.
 * Os componentes só precisam chamar searchByCity("Gramado") ou searchByCurrentLocation().
 */
export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function loadWeather(location) {
    setIsLoading(true)
    setErrorMessage('')

    try {
      // As duas requisições são independentes, então rodam ao mesmo tempo
      const [currentWeatherData, forecastData] = await Promise.all([
        getCurrentWeather(location),
        getForecast(location),
      ])

      setWeather(currentWeatherData)
      setForecast(groupForecastByDay(forecastData))
    } catch (error) {
      setErrorMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  function searchByCity(city) {
    const cityName = city.trim()

    if (!cityName) {
      setErrorMessage('Digite o nome de uma cidade.')
      return
    }

    loadWeather({ city: cityName })
  }

  function searchByCurrentLocation() {
    if (!navigator.geolocation) {
      setErrorMessage('Seu navegador não permite usar a localização.')
      return
    }

    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        loadWeather({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      () => {
        setIsLoading(false)
        setErrorMessage('Não conseguimos acessar sua localização. Libere a permissão ou busque pelo nome.')
      },
    )
  }

  return {
    weather,
    forecast,
    isLoading,
    errorMessage,
    searchByCity,
    searchByCurrentLocation,
  }
}
