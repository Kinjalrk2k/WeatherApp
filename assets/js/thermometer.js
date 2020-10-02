class Thermometer {
  constructor(minTemp, maxTemp, DOMtarget) {
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
    this.temperature = DOMtarget;
  }

  setTemperature(val) {
    temperature.style.height = ((val - this.minTemp) / (this.maxTemp - this.minTemp)) * 100 + "%";
    temperature.dataset.value = val + "°C";
  }
}
