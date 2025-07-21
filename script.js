const apiKey = "0b25ec0f691b65dc6bb04b517d0cab01";
const container = document.getElementById("container");

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  fetchWeatherByCity(city);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by your browser.");
  }

  function success(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
  }

  function error() {
    alert("Unable to retrieve your location.");
  }
}

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => updateWeather(data))
    .catch(() => alert("Weather info not found. Check city name."));
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => updateWeather(data))
    .catch(() => alert("Could not retrieve weather from location."));
}

function updateWeather(data) {
  document.getElementById("location").innerText = data.name;
  document.getElementById("condition").innerText = capitalize(data.weather[0].description);
  document.getElementById("temperature").innerText = Math.round(data.main.temp);
  document.getElementById("humidity").innerText = `${data.main.humidity}%`;
  document.getElementById("wind").innerText = `${data.wind.speed} Kph`;

  setBackground(data.weather[0].main);
  document.getElementById("weatherInfo").classList.remove("hidden");
}

function setBackground(condition) {
  let img = "images/default.jpg";

  switch (condition.toLowerCase()) {
    case "clear":
      img = "images/clear.jpg";
      break;
    case "clouds":
      img = "images/clouds.jpg";
      break;
    case "rain":
    case "drizzle":
    case "mist":
      img = "images/rain.jpg";
      break;
  }

  container.style.backgroundImage = `url('${img}')`;
}

function goBack() {
  document.getElementById("weatherInfo").classList.add("hidden");
  document.getElementById("cityInput").value = "";
  container.style.backgroundImage = `url('images/default.jpg')`;
}

function capitalize(str) {
  return str
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
