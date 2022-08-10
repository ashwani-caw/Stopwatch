const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const ring = document.querySelector(".ring");
const circle = document.querySelector("circle");
const startBtn = document.querySelector(".start");

let totalDuration = parseInt(seconds.value) + parseInt(minutes.value) * 60;
let timeRemaing = totalDuration;
const perimeter = 1602;
let interval;
let offset = 0;

//adding event listenenr to input box of minutes
minutes.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    minutes.disabled = true;
    startBtn.disabled = false;
    totalDuration = parseInt(seconds.value) + parseInt(minutes.value) * 60;
    timeRemaing = totalDuration;
  }
});

//adding event listenenr to input box of seconds
seconds.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    seconds.disabled = true;
    startBtn.disabled = false;
    totalDuration = parseInt(seconds.value) + parseInt(minutes.value) * 60;
    timeRemaing = totalDuration;
  }
});

//function to start the timer
function startTimer() {
  interval = setInterval(() => {
    timeRemaing -= 1;
    offset = perimeter * (timeRemaing / totalDuration) - perimeter;
    circle.setAttribute("stroke-dashoffset", offset);
    if (!parseInt(seconds.value) && minutes.value >= 1) {
      minutes.value = (minutes.value - 1).toString().padStart(2, 0);
      seconds.value = 60;
    }

    seconds.value = (seconds.value - 1).toString().padStart(2, 0);

    if (!timeRemaing) {
      ring.classList.remove("ending");
      circle.setAttribute("stroke-dashoffset", 0);
      stopTimer();
    }
  }, 1000);
}

//function to stop the timer
function stopTimer() {
  clearInterval(interval);
}

//adding clcik event to stat and stop Btn
function stopAndStartTimer(event) {
  if (event.target.innerHTML === "start") {
    startTimer();
    event.target.innerHTML = "stop";
  } else {
    stopTimer(interval);
    event.target.innerHTML = "start";
  }
}

//adding click event for the grear Btn
function inputTime(event) {
  minutes.disabled = false;
  seconds.disabled = false;
  startBtn.disabled = true;
}
