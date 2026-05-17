export {};

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: Array<{ main: string; description: string }>;
}

const API_KEY: string = "250075bc1053d94633330ba751ec2462";

const cityInput = document.getElementById("city-input") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const cityName = document.getElementById("city-name") as HTMLElement;
const temperature = document.getElementById("temperature") as HTMLElement;
const description = document.getElementById("description") as HTMLElement;

const bodyElement = document.getElementById("weather-body") as HTMLBodyElement;
const effectsContainer = document.getElementById(
  "dynamic-effects",
) as HTMLDivElement;
const cardElement = document.querySelector(".weather-card") as HTMLElement;

function updateWeatherUI(weatherMain: string) {
  effectsContainer.innerHTML = "";
  bodyElement.className = "";

  if (weatherMain === "Clear") {
    // ☀️ СОЛНЦЕ И РАДУГА
    bodyElement.classList.add("sunny-bg");
    effectsContainer.innerHTML =
      '<div class="sun-element"></div><div class="rainbow-element"></div>';
    cardElement.style.borderColor = "#ffaa00";
    cardElement.style.boxShadow = "0 0 25px rgba(255, 170, 0, 0.4)";
  } else if (weatherMain === "Clouds") {
    // ☁️ КИБЕР-ТУЧИ
    bodyElement.classList.add("cloudy-bg");
    effectsContainer.innerHTML = '<div class="cloud-element"></div>';
    cardElement.style.borderColor = "#9b51e0";
    cardElement.style.boxShadow = "0 0 25px rgba(155, 81, 224, 0.4)";
  } else if (weatherMain === "Thunderstorm") {
    // ⚡ ГРОЗА И МОЛНИИ
    bodyElement.classList.add("thunder-bg");
    cardElement.style.borderColor = "#ff0055";
    cardElement.style.boxShadow = "0 0 30px rgba(255, 0, 85, 0.6)";
  } else if (weatherMain === "Rain" || weatherMain === "Drizzle") {
    // 🌧️ ЛАЗЕРНЫЙ ДОЖДЬ
    bodyElement.classList.add("rainy-bg");
    cardElement.style.borderColor = "#00f2fe";
    cardElement.style.boxShadow = "0 0 25px rgba(0, 242, 254, 0.4)";

    const rainContainer = document.createElement("div");
    rainContainer.classList.add("rain-container");
    for (let i = 0; i < 50; i++) {
      const drop = document.createElement("div");
      drop.classList.add("rain-drop");
      drop.style.left = `${Math.random() * 100}%`;
      drop.style.animationDelay = `${Math.random() * 1}s`;
      drop.style.animationDuration = `${0.4 + Math.random() * 0.4}s`;
      rainContainer.appendChild(drop);
    }
    effectsContainer.appendChild(rainContainer);
  } else if (weatherMain === "Snow") {
    // ❄️ НОВАЯ ФИЧА: НЕОНОВЫЙ СНЕГОПАД
    bodyElement.style.backgroundColor = "#050f26";
    cardElement.style.borderColor = "#ffffff";
    cardElement.style.boxShadow = "0 0 25px rgba(255, 255, 255, 0.4)";

    const snowContainer = document.createElement("div");
    snowContainer.classList.add("rain-container"); // используем тот же контейнер
    for (let i = 0; i < 40; i++) {
      const flake = document.createElement("div");
      flake.classList.add("rain-drop");
      flake.style.width = "4px";
      flake.style.height = "4px"; // круглые снежинки
      flake.style.borderRadius = "50%";
      flake.style.background = "#fff";
      flake.style.boxShadow = "0 0 8px #fff";
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDelay = `${Math.random() * 2}s`;
      flake.style.animationDuration = `${2 + Math.random() * 2}s`; // падают медленнее
      snowContainer.appendChild(flake);
    }
    effectsContainer.appendChild(snowContainer);
  } else if (
    ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Ash"].includes(
      weatherMain,
    )
  ) {
    // 1354519965 НОВАЯ ФИЧА: КИБЕРПАНК-ТУМАН И СМОГ
    bodyElement.style.backgroundColor = "#110a1c";
    cardElement.style.borderColor = "#a29bfe";
    cardElement.style.boxShadow = "0 0 30px #6c5ce7";
    effectsContainer.innerHTML =
      '<div class="cloud-element" style="background:#6c5ce7; width:100%; height:100%; top:0; left:0; border-radius:0; opacity:0.15; filter:blur(40px);"></div>';
  } else if (weatherMain === "Tornado" || weatherMain === "Squall") {
    // 🌪️ НОВАЯ ФИЧА: УРАГАН И ТОРНАДО
    bodyElement.style.backgroundColor = "#2c000e";
    cardElement.style.borderColor = "#ff7675";
    cardElement.style.boxShadow = "0 0 35px #ff7675";
  } else {
    bodyElement.classList.add("sunny-bg");
    cardElement.style.borderColor = "#00f2fe";
  }
}

async function getWeather(city: string) {
  try {
    const response = await fetch(
      `https://openweathermap.org{city}&appid=${API_KEY}&units=metric`,
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data: WeatherData = await response.json();

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    // Исправленный индекс для стабильной работы
    description.textContent = data.weather[0].description;
    updateWeatherUI(data.weather[0].main);
  } catch (error) {
    alert(error instanceof Error ? error.message : "An error occurred");
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});
