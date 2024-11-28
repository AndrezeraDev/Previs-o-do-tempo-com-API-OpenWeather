const city = document.getElementById('city-name');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search');
const weatherInfo = document.getElementById('weather-info');

const apiKey = 'Insira sua api key aqui';//a api key você encontra em https://home.openweathermap.org/api_keys - faça o login e gere sua key.

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(cityInput.value);
 
    city.innerText = cityInput.value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&lang=pt_br`)
    .then(response => response.json())
    .then(data => {
        const temperature = (data.main.temp - 273.15).toFixed(1);
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = (data.wind.speed * 3.6).toFixed(1);
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        const dt = data.dt;

        const isDay = dt >= sunrise && dt < sunset;

        weatherInfo.innerHTML = `
            <h2>Cidade: ${cityInput.value}</h2>
            <p>Temperatura: ${temperature}°C</p>
            <p>Descrição: ${description}</p>
            <p>Umidade: ${humidity}%</p>
            <p>Velocidade do vento: ${windSpeed} km/h</p>
            <img id="weather-rain" src="/assets/gifs/rain.gif" alt="icone de chuva">
            <img id="weather-sun" src="/assets/gifs/sun.gif" alt="icone de sol">
            <img id="weather-clouds" src="/assets/gifs/clouds.gif" alt="icone de nuvens">
            <img id="weather-night" src="/assets/gifs/night.gif" alt="Noite limpa">
            <img id="weather-rain1" src="/assets/gifs/rain (1).gif" alt="icone de chuva">
            ${isDay ? '<p>Bom dia! 🌤️</p>' : '<p>Boa noite! 🌒</p>'}
        `;

        console.log(data);

        addGif(description, isDay);
    })
    .catch(error => {
        console.error(error);
    });
});

function addGif(description, isDay) {
    const weatherRain = document.getElementById('weather-rain');
    const weatherRain1 = document.getElementById('weather-rain1');
    const weatherSun = document.getElementById('weather-sun');
    const weatherClouds = document.getElementById('weather-clouds');
    const weatherNight = document.getElementById('weather-night');

    if (!weatherRain || !weatherRain1 || !weatherSun || !weatherClouds || !weatherNight) {
        console.error('Um dos elementos de clima não foi encontrado.');
        return;
    }

    try {
        if (!description) {
            console.error('A descrição do clima não foi retornada.');
            return;
        }

        const descriptionLower = description.toLowerCase();

        // Reseta a visibilidade de todos os GIFs
        weatherRain.style.display = 'none';
        weatherRain1.style.display = 'none';
        weatherSun.style.display = 'none';
        weatherClouds.style.display = 'none';
        weatherNight.style.display = 'none';

        // Controle de exibição baseado na descrição e se é dia ou noite
        if (descriptionLower.includes('chuva') || descriptionLower.includes('chuvoso')) {
            if (isDay) {
                weatherRain.style.display = 'block'; 
            } else {
                weatherRain1.style.display = 'block'; 
            }
        } else if (descriptionLower.includes('sol') && isDay) {
            weatherSun.style.display = 'block';
        } else if (descriptionLower.includes('nuvens') || descriptionLower.includes('nublado')) {
            weatherClouds.style.display = 'block';
        } else if (!isDay) {
            weatherNight.style.display = 'block';
        }
    } catch (error) {
        console.error(error);
    }
}
