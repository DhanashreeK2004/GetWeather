const apiKey = '0b25ec0f691b65dc6bb04b517d0cab01';

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    }, () => {
      alert("Location permission denied.");
    });
  } else {
    alert("Geolocation not supported by this browser.");
  }
}

function fetchWeatherData(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById('weatherCard').classList.remove('hidden');
      document.getElementById('locationName').textContent = data.name;
      document.getElementById('description').textContent = data.weather[0].description;
      document.getElementById('temperature').textContent = Math.round(data.main.temp) + '°';
      document.getElementById('humidity').textContent = data.main.humidity + '%';
      document.getElementById('wind').textContent = data.wind.speed + ' Kph';

      const weather = data.weather[0].main.toLowerCase();
      if (weather.includes("cloud")) {
        document.body.style.backgroundImage = "url('clouds.jpg')";
      } else if (weather.includes("rain")) {
        document.body.style.backgroundImage = "url('rain.jpg')";
      } else if (weather.includes("clear")) {
        document.body.style.backgroundImage = "url('clear.jpg')";
      } else {
        document.body.style.backgroundImage = "url('default.jpg')";
      }
    })
    .catch(() => alert("Weather data could not be loaded."));
}

function goBack() {
  document.getElementById('weatherCard').classList.add('hidden');
  document.getElementById('cityInput').value = '';
}