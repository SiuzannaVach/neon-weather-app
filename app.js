const API_KEY = "250075bc1053d94633330ba751ec2462";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const bodyElement = document.getElementById("weather-body");
const effectsContainer = document.getElementById("dynamic-effects");
const cardElement = document.querySelector(".weather-card");
function updateWeatherUI(weatherMain) {
    effectsContainer.innerHTML = "";
    bodyElement.className = "";
    if (weatherMain === "Clear") {
        // Солнечно + Добавляем неоновую радугу!
        bodyElement.classList.add("sunny-bg");
        effectsContainer.innerHTML =
            '<div class="sun-element"></div><div class="rainbow-element"></div>';
        cardElement.style.borderColor = "#ffaa00";
        cardElement.style.boxShadow = "0 0 25px rgba(255, 170, 0, 0.4)";
    }
    else if (weatherMain === "Clouds") {
        // Облачно
        bodyElement.classList.add("cloudy-bg");
        effectsContainer.innerHTML = '<div class="cloud-element"></div>';
        cardElement.style.borderColor = "#9b51e0";
        cardElement.style.boxShadow = "0 0 25px rgba(155, 81, 224, 0.4)";
    }
    else if (weatherMain === "Thunderstorm") {
        // ГРОЗА С МОЛНИЯМИ
        bodyElement.classList.add("thunder-bg");
        cardElement.style.borderColor = "#ff0055"; // Карточка горит тревожным красным неоном
        cardElement.style.boxShadow = "0 0 30px rgba(255, 0, 85, 0.6)";
    }
    else if (weatherMain === "Rain" || weatherMain === "Drizzle") {
        // ДОЖДЬ + НАМОКАНИЕ ЭКРАНА
        bodyElement.classList.add("rainy-bg");
        cardElement.style.borderColor = "#00f2fe";
        cardElement.style.boxShadow = "0 0 25px rgba(0, 242, 254, 0.4)";
        const rainContainer = document.createElement("div");
        rainContainer.classList.add("rain-container");
        for (let i = 0; i < 60; i++) {
            // Увеличили количество капель для эффекта ливня
            const drop = document.createElement("div");
            drop.classList.add("rain-drop");
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.animationDelay = `${Math.random() * 1}s`;
            drop.style.animationDuration = `${0.4 + Math.random() * 0.4}s`;
            rainContainer.appendChild(drop);
        }
        effectsContainer.appendChild(rainContainer);
    }
    else {
        bodyElement.classList.add("sunny-bg");
        cardElement.style.borderColor = "#00f2fe";
    }
}
async function getWeather(city) {
    try {
        const response = await fetch(`https://openweathermap.org{city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        // ЗДЕСЬ СТРОГО УКАЗАНЫ ИНДЕКСЫ МАССИВА [0], ЧТОБЫ КНОПКА НЕ ЗАВИСАЛА:
        description.textContent = data.weather[0].description;
        updateWeatherUI(data.weather[0].main);
    }
    catch (error) {
        alert(error instanceof Error ? error.message : "An error occurred");
    }
}
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});
export {};
