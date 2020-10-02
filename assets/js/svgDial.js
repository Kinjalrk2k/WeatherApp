function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    "L",
    x,
    y,
    "L",
    start.x,
    start.y,
  ].join(" ");

  return d;
}

function timeToAngle(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const minsElapsed = date.getHours() * 60 + date.getMinutes();

  const angle = (minsElapsed / (24 * 60)) * 360;
  return angle;
}

class SVGDial {
  constructor(DOMtarget) {
    this.DOMtarget = DOMtarget;
    this.svgNS = "http://www.w3.org/2000/svg";
    this.height = this.DOMtarget.clientHeight;
    this.width = this.DOMtarget.clientWidth;
    this.radius = this.height > this.width ? this.width / 2 : this.height / 2;
    this.circleCenter = {
      x: this.width / 2,
      y: this.height / 2,
    };
  }

  buildDial(angle1, angle2) {
    const heuStart = 65;
    const heuEnd = 0;
    const hueStep = (heuEnd - heuStart) / (180 - angle1);
    let heuStepCount = 0;
    for (let i = angle1; i < 180; i++) {
      const path = document.createElementNS(this.svgNS, "path");
      path.setAttribute("id", "angle1");
      path.setAttribute("d", describeArc(this.circleCenter.x, this.circleCenter.y, this.radius, i, i + 2));
      path.setAttribute("fill", `hsl(${heuStart + heuStepCount * hueStep}, 100%, 50%)`);
      heuStepCount++;
      this.DOMtarget.appendChild(path);
    }

    let lightnessStart = 50;
    let lightnessEnd = 10;
    let lightnessStep = (lightnessEnd - lightnessStart) / (angle2 - 180);
    let lightnessStepCount = 0;
    for (var i = 180; i < angle2; i++) {
      const path = document.createElementNS(this.svgNS, "path");
      path.setAttribute("d", describeArc(this.circleCenter.x, this.circleCenter.y, this.radius, i, i + 2));
      path.setAttribute("fill", `hsl(0, 100%, ${lightnessStart + lightnessStepCount * lightnessStep}%)`);
      lightnessStepCount++;
      this.DOMtarget.appendChild(path);
    }

    lightnessStart = 5;
    lightnessEnd = 0;
    lightnessStep = (lightnessEnd - lightnessStart) / (360 - angle2);
    lightnessStepCount = 0;
    for (var i = angle2; i < 360; i++) {
      const path = document.createElementNS(this.svgNS, "path");
      path.setAttribute("d", describeArc(this.circleCenter.x, this.circleCenter.y, this.radius, i, i + 2));
      path.setAttribute("fill", `hsl(0, 100%, ${lightnessStart + lightnessStepCount * lightnessStep}%)`);
      lightnessStepCount++;
      this.DOMtarget.appendChild(path);
    }

    lightnessStart = 0;
    lightnessEnd = 30;
    lightnessStep = (lightnessEnd - lightnessStart) / angle1;
    lightnessStepCount = 0;
    for (var i = 0; i < angle1; i++) {
      const path = document.createElementNS(this.svgNS, "path");
      path.setAttribute("d", describeArc(this.circleCenter.x, this.circleCenter.y, this.radius, i, i + 2));
      path.setAttribute("fill", `hsl(65, 100%, ${lightnessStart + lightnessStepCount * lightnessStep}%)`);
      lightnessStepCount++;
      this.DOMtarget.appendChild(path);
    }
  }

  putCurrTimeMark() {
    const currDate = new Date();
    const angle = timeToAngle(currDate.getTime() / 1000);

    const anglePoint = polarToCartesian(this.circleCenter.x, this.circleCenter.y, this.radius, angle);
    const mark = document.createElementNS(this.svgNS, "line");
    mark.setAttributeNS(null, "x1", this.circleCenter.x);
    mark.setAttributeNS(null, "y1", this.circleCenter.y);
    mark.setAttributeNS(null, "x2", anglePoint.x);
    mark.setAttributeNS(null, "y2", anglePoint.y);
    if (angle > 30 && angle < 120) {
      mark.setAttributeNS(null, "stroke", "black");
    } else {
      mark.setAttributeNS(null, "stroke", "white");
    }
    this.DOMtarget.appendChild(mark);
  }

  showTimestamp(angle, textTimestamp) {
    const textPoint = polarToCartesian(this.circleCenter.x, this.circleCenter.y, 1.15 * this.radius, angle);
    const text = document.createElementNS(this.svgNS, "text");
    text.setAttribute("x", textPoint.x);
    text.setAttribute("y", textPoint.y);
    text.textContent = textTimestamp;
    this.DOMtarget.appendChild(text);
    if (angle > 180 && angle < 360) {
      text.setAttribute("x", textPoint.x - text.getBoundingClientRect().width);
    }
    if ((angle < 90 && angle > 90) || (angle > 270 && angle < 360)) {
      text.setAttribute("y", textPoint.y - text.getBoundingClientRect().height);
    }
  }
}

function formatTimestamp(unixTimestamp) {
  var date = new Date(unixTimestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();

  var formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}
