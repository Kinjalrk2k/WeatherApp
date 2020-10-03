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
