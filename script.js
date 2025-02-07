const API_KEY = 'b898f419eaba1df362b81baa15d9da63'; // OpenWeatherMap API key
const searchButton = document.getElementById('search-btn'); // Corrected ID
const cityInputField = document.getElementById('city-input');
const cityNameElement = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const weatherIconElement = document.getElementById('weather-icon');
const descriptionElement = document.getElementById('description');
const weatherDisplayContainer = document.querySelector('.weather'); // Corrected class

// Add event listener to the search button
searchButton.addEventListener('click', () => {
    const city = cityInputField.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

// Function to fetch weather data
function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => updateWeatherDisplay(data))
        .catch(error => alert(error.message));
}

// Function to update the weather display with fetched data
function updateWeatherDisplay(weatherData) {
    cityNameElement.textContent = weatherData.name;
    temperatureElement.textContent = `${weatherData.main.temp}°C`;
    descriptionElement.textContent = weatherData.weather[0].description;
    weatherIconElement.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    weatherDisplayContainer.style.display = 'block';
}
