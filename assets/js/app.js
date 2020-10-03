let modeColor = "black";

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
  const dial = new SVGDial(document.getElementById("timeDial"));
  dial.buildDial(timeToAngle(1601510277), timeToAngle(1601553257));
  // dial.showTimestamp(timeToAngle(1601510277), "Sunrise: " + formatTimestamp(1601510277));
  // dial.showTimestamp(timeToAngle(1601553257), "Sunset: " + formatTimestamp(1601553257));
  dial.putCurrTimeMark();

  const therm = new Thermometer(-20, 50, document.getElementById("temperature"));
  setTimeout(() => {
    therm.setTemperature(35);
  }, 1000);

  document.querySelector(".fa-location-arrow").style.transform = `rotate(${120 - 45}deg)`;
  document.querySelector("#weather").innerHTML = `
    Haze 
    <i class="wi ${weatherIcon("50d")}"></i> 
  `;
  document.getElementById("timeDial").clientHeight = document.getElementById("sunCard").clientHeight;
});

document.getElementById("subBtn").addEventListener("click", () => {
  const inp = document.getElementById("cityInput");
  console.log(inp.value);
  inp.value = "";
});

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
