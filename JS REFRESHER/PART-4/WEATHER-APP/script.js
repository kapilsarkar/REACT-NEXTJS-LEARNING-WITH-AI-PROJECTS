document.addEventListener('DOMContentLoaded', () => {

    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "23c67d5ebc030841999a6d90a70e2e46";

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        //it may throw an error
        //server/database is always in another continent


        // Pro Tip: Show a "Loading..." state here
        getWeatherBtn.textContent = "Searching...";
        getWeatherBtn.disabled = true;

        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData);

        } catch (error) {
            showError();
        } finally {
            // Reset the button regardless of success or failure
            getWeatherBtn.textContent = "Get Weather";
            getWeatherBtn.disabled = false;
            cityInput.value = "";

        }

    })

    async function fetchWeatherData(city) {
        //Gets the Data from the API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url)
        console.log(typeof response)
        console.log("RESPONSE:", response)

        if (!response.ok) {
            throw new Error("City Not Found");
        }

        const data = await response.json();
        return data;


    }

    function displayWeatherData(data) {
        //Displays the Data on the Page.
        console.log(data);
        const { name, main, weather } = data;

        // 1. Update Text Content
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp} °C`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;


        // 2. Add/Update Weather Icon
        // We create an <img> element or update an existing one
        const iconCode = weather[0].icon;
        let iconImg = document.getElementById("weather-icon");
        if (!iconImg) {
            iconImg = document.createElement('img');
            iconImg.id = "weather-icon";
            weatherInfo.appendChild(iconImg);

        }
        iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconImg.alt = weather[0].description;

        // 3. Dynamic Background Color Logic
        if (main.temp <= 15) {
            document.body.style.background = "linear-gradient(135deg, #a5f3fc, #38bdf8)";
        } else if (main.temp <= 30) {
            document.body.style.background = "linear-gradient(135deg, #fef08a, #facc15)";
        } else {
            document.body.style.background = "linear-gradient(135deg, #fdba74, #fb923c)";
        }




        //unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

})

