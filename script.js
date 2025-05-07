document.addEventListener("DOMContentLoaded", ()=>{
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityNameDisplay = document.getElementById("city-name")
    const temperatureDisplay = document.getElementById("temperature")
    const descriptionDisplay = document.getElementById("description")
    const errorMessageDisplay = document.getElementById("error-message")

    const API_KEY = "d7b8f170ae70782095969a654e560c36";

    getWeatherBtn.addEventListener("click", async function getCityName(){
        const city = cityInput.value.trim();
        if(!city) return;
        cityInput.value = "";

        try {
            const weatherData = await fetchData(city)
            displayfetchedData(weatherData);
        } catch (error) {
            showError()
        }
    })

    async function fetchData(city){
        // fetching data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error(showError());
        }

        const data = await response.json();
        return data;
    }

    function displayfetchedData(data){
        displayWeatherInfo();
        // Displaying fetch data
        console.log(data);

        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature: ${main.temp}`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`
    }

    function showError(){
        weatherInfo.classList.add("hidden");
        errorMessageDisplay.classList.remove("hidden");
    }

    // function is to unlock display.
    function displayWeatherInfo(){
        weatherInfo.classList.remove("hidden");
        errorMessageDisplay.classList.add("hidden");
    }
})
