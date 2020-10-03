let modeColor = "black";
const currWeather = new Weather();

function toggleMode() {
  halfmoon.toggleDarkMode();

  modeColor = modeColor === "black" ? "white" : "black";

  document.querySelectorAll("svg").forEach((svg) => {
    svg.querySelectorAll("text").forEach((text) => {
      text.setAttribute("fill", modeColor);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timeDial").clientHeight = document.getElementById("sunCard").clientHeight;
});

document.getElementById("subBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city !== "") {
    console.log(city);
    weather = currWeather.getWeather(city).then((data) => {
      console.log(data);
      buildDOM(data);
    });
    city.value = "";
  }
});

function buildDOM(weatherData) {
  const dial = new SVGDial(document.getElementById("timeDial"));
  dial.buildDial(
    timeToAngle(weatherData.sys.sunrise + weatherData.timezone),
    timeToAngle(weatherData.sys.sunset + weatherData.timezone)
  );
  dial.putCurrTimeMark(weatherData.dt + weatherData.timezone);

  const therm = new Thermometer(-20, 50, document.getElementById("temperature"));
  setTimeout(() => {
    therm.setTemperature(kelvinToCelsius(weatherData.main.temp));
  }, 1000);

  document.querySelector(".fa-location-arrow").style.transform = `rotate(${weatherData.wind.deg - 45}deg)`;

  document.querySelector("#weather").innerHTML = `
    ${weatherData.weather[0].main} 
    <i class="wi ${weatherIcon(weatherData.weather[0].icon)}"></i> 
  `;

  document.getElementById("temp").innerHTML = kelvinToCelsius(weatherData.main.temp) + " °C";
  document.getElementById("feels_like").innerHTML = kelvinToCelsius(weatherData.main.feels_like);
  document.getElementById("pressure").innerHTML = weatherData.main.pressure;
  document.getElementById("humidity").innerHTML = weatherData.main.humidity;
  document.getElementById("clouds").innerHTML = weatherData.clouds.all;
  document.getElementById("visibility").innerHTML = weatherData.visibility;
  document.getElementById("wind_deg").innerHTML = weatherData.wind.deg;
  document.getElementById("sunrise").innerHTML = formatTimestamp(
    weatherData.sys.sunrise + weatherData.timezone
  );
  document.getElementById("sunset").innerHTML = formatTimestamp(
    weatherData.sys.sunset + weatherData.timezone
  );
  document.getElementById("cityName").innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
}

function kelvinToCelsius(temp) {
  return Math.round(temp - 273.15);
}

function weatherIcon(iconId) {
  switch (iconId) {
    case "01d":
      return "wi-day-sunny";
    case "01n":
      return "wi-night-clear";

    case "02d":
      return "wi-day-cloudy";
    case "02n":
      return "wi-night-alt-cloudy";

    case "03d":
    case "03n":
      return "wi-cloud";

    case "04d":
    case "04n":
      return "wi-cloudy";

    case "09d":
      return "wi-day-showers";
    case "09n":
      return "wi-night-alt-showers";

    case "10d":
      return "wi-rain";
    case "10n":
      return "wi-night-alt-rain";

    case "11d":
      return "wi-day-thunderstorm";
    case "11n":
      return "wi-night-thunderstorm";

    case "13d":
    case "13n":
      return "wi-snow";

    case "50d":
    case "50n":
      return "wi-windy";
  }
}
