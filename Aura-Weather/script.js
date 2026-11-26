
var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var locationBtn = document.getElementById("locationBtn");

var message = document.getElementById("message");

var cityName = document.getElementById("cityName");
var temperature = document.getElementById("temperature");
var weatherIcon = document.getElementById("weatherIcon");
var weatherDescription = document.getElementById("weatherDescription");

var feelsLike = document.getElementById("feelsLike");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var visibility = document.getElementById("visibility");
var rain = document.getElementById("rain");

var sunrise = document.getElementById("sunrise");
var sunset = document.getElementById("sunset");

var forecastList = document.getElementById("forecastList");


// Weather information

function getWeatherInfo(code) {

    if (code === 0) {
        return ["Clear Sky", "☀️"];
    }

    else if (code === 1 || code === 2) {
        return ["Partly Cloudy", "🌤️"];
    }

    else if (code === 3) {
        return ["Cloudy", "☁️"];
    }

    else if (code === 45 || code === 48) {
        return ["Foggy", "🌫️"];
    }

    else if (code >= 51 && code <= 57) {
        return ["Drizzle", "🌦️"];
    }

    else if (code >= 61 && code <= 67) {
        return ["Rainy", "🌧️"];
    }

    else if (code >= 71 && code <= 77) {
        return ["Snowy", "❄️"];
    }

    else if (code >= 80 && code <= 82) {
        return ["Rain Showers", "🌧️"];
    }

    else if (code >= 85 && code <= 86) {
        return ["Snow Showers", "🌨️"];
    }

    else if (code >= 95) {
        return ["Thunderstorm", "⛈️"];
    }

    else {
        return ["Unknown Weather", "🌡️"];
    }

}


// Format time

function formatTime(time) {

    var date = new Date(time);

    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

}


// Search city

function searchCity() {

    var city = cityInput.value.trim();

    if (city === "") {
        message.innerText = "Please enter a city name!";
        return;
    }

    getCityWeather(city);

}


// Get city coordinates

function getCityWeather(city) {

    message.innerText = "Searching weather...";

    fetch(
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) +
        "&count=1&language=en&format=json"
    )

    .then(function(response) {
        if (!response.ok) {
            throw new Error("Unable to search city");
        }
        return response.json();
    })

    .then(function(data) {

        if (!data.results || data.results.length === 0) {
            throw new Error("City not found! Try another city.");
        }

        var place = data.results[0];

        var fullName = place.name;

        if (place.admin1) {
            fullName += ", " + place.admin1;
        }

        if (place.country) {
            fullName += ", " + place.country;
        }

        getWeather(
            place.latitude,
            place.longitude,
            fullName
        );

    })

    .catch(function(error) {
        message.innerText = error.message;
    });

}


// Get live weather data

function getWeather(latitude, longitude, name) {

    message.innerText = "Loading weather...";

    var url =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + latitude +
        "&longitude=" + longitude +
        "&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,visibility" +
        "&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset" +
        "&forecast_days=5" +
        "&timezone=auto";

    fetch(url)

    .then(function(response) {
        if (!response.ok) {
            throw new Error("Weather data not available!");
        }
        return response.json();
    })

    .then(function(data) {

        var current = data.current;

        // City and date

        cityName.innerText = name;

        document.getElementById("date").innerText =
            new Date().toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });

        // Temperature

        temperature.innerText =
            Math.round(current.temperature_2m) + "°";

        feelsLike.innerText =
            Math.round(current.apparent_temperature) + "°";

        // Weather condition

        var weather = getWeatherInfo(current.weather_code);

        weatherDescription.innerText = weather[0];
        weatherIcon.innerText = weather[1];

        // Weather details

        humidity.innerText =
            current.relative_humidity_2m + "%";

        wind.innerText =
            current.wind_speed_10m + " km/h";

        visibility.innerText =
            (current.visibility / 1000).toFixed(1) + " km";

        rain.innerText =
            current.precipitation + " mm";

        // Sunrise and sunset

        sunrise.innerText =
            formatTime(data.daily.sunrise[0]);

        sunset.innerText =
            formatTime(data.daily.sunset[0]);

        // Show forecast

        showForecast(data.daily);

        message.innerText = "";

    })

    .catch(function(error) {

        message.innerText = error.message;

    });

}


// Show five day forecast

function showForecast(daily) {

    forecastList.innerHTML = "";

    for (var i = 0; i < daily.time.length; i++) {

        var date = new Date(daily.time[i] + "T12:00:00");

        var day = date.toLocaleDateString("en-US", {
            weekday: "short"
        });

        var weather = getWeatherInfo(daily.weather_code[i]);

        var card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <p>${i === 0 ? "Today" : day}</p>

            <div class="forecast-icon">
                ${weather[1]}
            </div>

            <h3>${Math.round(daily.temperature_2m_max[i])}°</h3>

            <small>${Math.round(daily.temperature_2m_min[i])}°</small>
        `;

        forecastList.appendChild(card);

    }

}


// Current location

function getMyLocation() {

    message.innerText = "Getting your location...";

    if (!navigator.geolocation) {

        message.innerText = "Location is not supported by your browser.";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            getWeather(latitude, longitude, "My Location");

        },

        function() {

            message.innerText =
                "Location permission denied. Search your city instead.";

        }

    );

}


// Button events

searchBtn.onclick = searchCity;

cityInput.onkeydown = function(event) {

    if (event.key === "Enter") {
        searchCity();
    }

};

locationBtn.onclick = getMyLocation;


// Load default city

getCityWeather("Karachi");
