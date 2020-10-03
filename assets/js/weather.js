class Weather {
  constructor() {
    this.appid = "e879eb78ebeb8de59a72953878e422da";
  }

  async getWeather(location) {
    const weatherResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.appid}`
    );

    const weather = weatherResponse.json();

    return weather;
  }
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
