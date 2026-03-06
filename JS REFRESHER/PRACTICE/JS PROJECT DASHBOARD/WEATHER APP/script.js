const searchForm = document.querySelector(".search-form");
const searchCity = document.getElementById("searchCity");

const cityName = document.querySelector(".city-name");
const stateName = document.querySelector(".state-name");
const countryName = document.querySelector(".country-name");
const timezoneName = document.querySelector(".timezone-name");
const localTime = document.querySelector(".localTime");

const temperature = document.querySelector(".temperature");
const weatherCondn = document.querySelector(".weather-condn");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const rain = document.querySelector(".rain");
const feelsLike = document.querySelector(".feels-like");
const weatherIcon = document.querySelector(".weather-icon");

const forecastContainer = document.querySelector(".forecast-cards");

const errorMessage = document.querySelector(".error-message");
const loadingMessage = document.querySelector(".loading-message");
const rainContainer = document.querySelector(".rain-container");

const API_KEY = "f97cc3e5fcb7435d869111902241804"; 



// ================= FETCH WEATHER =================
async function fetchWeather(city) {
  try {
    loadingMessage.textContent = "Loading...";
    errorMessage.textContent = "";

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    updateCurrentWeather(data);
    updateForecast(data.forecast.forecastday);

    loadingMessage.textContent = "";
  } catch (error) {
    loadingMessage.textContent = "";
    errorMessage.textContent = error.message;
  }
}



// ================= UPDATE CURRENT WEATHER =================
function updateCurrentWeather(data) {
  cityName.textContent = `City: ${data.location.name}`;
  stateName.textContent = `State: ${data.location.region}`;
  countryName.textContent = `Country: ${data.location.country}`;
  timezoneName.textContent = `Timezone: ${data.location.tz_id}`;
  localTime.textContent = `Local Time: ${data.location.localtime}`;

  temperature.textContent = `Temperature: ${data.current.temp_c} °C`;
  weatherCondn.textContent = `Condition: ${data.current.condition.text}`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  windSpeed.textContent = `Wind: ${data.current.wind_kph} km/h`;
  rain.textContent = `Cloud: ${data.current.cloud}%`;
  feelsLike.textContent = `Feels Like: ${data.current.feelslike_c} °C`;

  weatherIcon.src = data.current.condition.icon;

  // 🎨 Change Background Based On Weather
  setWeatherBackground(data.current.condition.text);
}



// ================= WEATHER BACKGROUND LOGIC =================
function setWeatherBackground(conditionText) {
  const body = document.body;

  // Remove previous weather classes
  body.classList.remove("sunny", "cloudy", "rainy", "night", "thunder");

  // Remove existing rain drops
  rainContainer.innerHTML = "";

  const condition = conditionText.toLowerCase();

  if (condition.includes("sunny") || condition.includes("clear")) {
    body.classList.add("sunny");
  } 
  else if (condition.includes("cloud")) {
    body.classList.add("cloudy");
  } 
  else if (condition.includes("rain") || condition.includes("drizzle")) {
    body.classList.add("rainy");
    createRain();
  } 
  else if (condition.includes("thunder")) {
    body.classList.add("thunder");
  } 
  else {
    body.classList.add("night");
  }
}



// ================= CREATE RAIN EFFECT =================
function createRain() {
  rainContainer.innerHTML = ""; // clear old rain

  for (let i = 0; i < 80; i++) {
    const rainDrop = document.createElement("div");
    rainDrop.classList.add("rain");
    rainDrop.style.left = Math.random() * window.innerWidth + "px";
    rainDrop.style.animationDuration = 0.5 + Math.random() + "s";
    rainContainer.appendChild(rainDrop);
  }
}



// ================= UPDATE FORECAST =================
function updateForecast(days) {
  forecastContainer.innerHTML = "";

  days.forEach((day, index) => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    card.innerHTML = `
      <h3>Day ${index + 1}</h3>
      <p>Date: ${day.date}</p>
      <p>Sunrise: ${day.astro.sunrise}</p>
      <p>Sunset: ${day.astro.sunset}</p>
      <p>Condition: ${day.day.condition.text}</p>
      <img src="${day.day.condition.icon}" alt="icon">
      <p>Avg Temp: ${day.day.avgtemp_c} °C</p>
      <p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>
    `;

    forecastContainer.appendChild(card);
  });
}



// ================= FORM SUBMIT =================
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = searchCity.value.trim();

  if (!city) {
    errorMessage.textContent = "Please enter a city name.";
    return;
  }

  fetchWeather(city);
});



// ================= DEFAULT CITY =================
window.addEventListener("load", () => {
  fetchWeather("Asansol");
});