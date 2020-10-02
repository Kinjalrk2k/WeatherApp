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
});


