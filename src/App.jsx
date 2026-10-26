import { useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import ErrorMessage from './components/ErrorMessage'
import LoadingState from './components/LoadingState'
import CurrentWeather from './components/CurrentWeather'
import WeatherDetails from './components/WeatherDetails'
import Forecast from './components/Forecast'
import { useWeather } from './hooks/useWeather'
import { DEFAULT_BACKGROUND, getWeatherBackground } from './utils/weatherTheme'

// Cidade exibida assim que o app abre
const DEFAULT_CITY = 'São Paulo'

export default function App() {
  const { weather, forecast, isLoading, errorMessage, searchByCity, searchByCurrentLocation } = useWeather()

  // Carrega a cidade padrão uma única vez, quando a página abre
  useEffect(() => {
    searchByCity(DEFAULT_CITY)
  }, [])

  // O fundo muda de cor conforme o clima e o horário (dia/noite) da cidade
  const background = weather ? getWeatherBackground(weather.weather[0].icon) : DEFAULT_BACKGROUND

  return (
    <div className={`min-h-screen bg-linear-to-br ${background} text-white`}>
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <Header />

        <SearchBar onSearch={searchByCity} onUseLocation={searchByCurrentLocation} isLoading={isLoading} />

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {!weather && isLoading && <LoadingState />}

        {weather && (
          // A "key" faz as animações de entrada rodarem de novo a cada nova cidade
          <div
            key={`${weather.id}-${weather.dt}`}
            className={`flex flex-col gap-6 transition-opacity ${isLoading ? 'opacity-60' : ''}`}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <CurrentWeather weather={weather} />
              <WeatherDetails weather={weather} />
            </div>

            <Forecast days={forecast} />
          </div>
        )}

        <footer className="pt-4 text-center text-xs text-white/60">
          Dados fornecidos por{' '}
          <a href="https://openweathermap.org" target="_blank" rel="noreferrer" className="underline hover:text-white">
            OpenWeather
          </a>
        </footer>
      </main>
    </div>
  )
}
