const hours = document.querySelector("#clock-hr"),
  minutes = document.querySelector("#clock-min"),
  seconds = document.querySelector("#clock-sec"),
  dateEl = document.querySelector("#date"),
  stopwatchMinutes = document.querySelector("#s-min"),
  stopwatchSeconds = document.querySelector("#s-sec"),
  stopwatchMseconds = document.querySelector("#s-ms"),
  tab1 = document.querySelector("#tab-1"),
  tab2 = document.querySelector("#tab-2"),
  tab3 = document.querySelector("#tab-3"),
  container1 = document.querySelector("#tab-content-1"),
  container2 = document.querySelector("#tab-content-2"),
  container3 = document.querySelector("#tab-content-3"),
  themeSwitcher = document.querySelector(".theme-switcher"),
  startStopwatch = document.querySelector("#start-btn"),
  stopStopwatch = document.querySelector("#stop-btn"),
  resetStopwatch = document.querySelector("#reset-btn"),
  hrInput = document.querySelector("#hr-in"),
  minInput = document.querySelector("#min-in"),
  secInput = document.querySelector("#sec-in"),
  startTimerBtn = document.querySelector("#start-timer-btn"),
  addOneTimerBtn = document.querySelector("#add-one-btn"),
  addTenTimerBtn = document.querySelector("#add-ten-btn"),
  pauseTimerBtn = document.querySelector("#pause-timer-btn"),
  resetTimerBtn = document.querySelector("#reset-timer-btn"),
  inputsEl = document.querySelector(".inputs"),
  remainingEl = document.querySelector(".remaining");
function updateTime() {
  const e = new Date();
  (hours.innerText =
    e.getHours() < 10 ? "0" + e.getHours() + ":" : e.getHours() + ":"),
    (minutes.innerText =
      e.getMinutes() < 10 ? "0" + e.getMinutes() + ":" : e.getMinutes() + ":"),
    (seconds.innerText =
      e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds()),
    (dateEl.innerText = e);
}
setInterval(updateTime, 1e3),
  tab1.addEventListener("click", () => {
    container1.classList.remove("hidden"),
      container2.classList.add("hidden"),
      container3.classList.add("hidden");
  }),
  tab2.addEventListener("click", () => {
    container2.classList.remove("hidden"),
      container1.classList.add("hidden"),
      container3.classList.add("hidden");
  }),
  tab3.addEventListener("click", () => {
    container3.classList.remove("hidden"),
      container1.classList.add("hidden"),
      container2.classList.add("hidden");
  }),
  themeSwitcher.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
let ms = 0,
  sec = 0,
  min = 0,
  isRunning = !1;
function start() {
  isRunning && ms++,
    ms > 99 ? ((ms = 0), sec++) : sec > 59 && ((sec = 0), min++),
    (stopwatchMinutes.innerText = String(min).padStart(2, "0") + ":"),
    (stopwatchSeconds.innerText = String(sec).padStart(2, "0") + "."),
    (stopwatchMseconds.innerText = String(ms).padStart(2, "0")),
    setTimeout(start, 10);
}
startStopwatch.addEventListener("click", () => {
  start(),
    (isRunning = !0),
    startStopwatch.classList.add("hidden"),
    stopStopwatch.classList.remove("hidden"),
    resetStopwatch.classList.remove("hidden");
}),
  stopStopwatch.addEventListener("click", () => {
    (isRunning = !1),
      startStopwatch.classList.remove("hidden"),
      stopStopwatch.classList.add("hidden"),
      resetStopwatch.classList.remove("hidden");
  }),
  resetStopwatch.addEventListener("click", () => {
    (isRunning = !1),
      (ms = 0),
      (sec = 0),
      (min = 0),
      startStopwatch.classList.remove("hidden"),
      stopStopwatch.classList.add("hidden"),
      resetStopwatch.classList.add("hidden");
  });
let timerInterval,
  hrPlace = document.querySelector("#hr_place"),
  minPlace = document.querySelector("#min_place"),
  secPlace = document.querySelector("#sec_place");
function updateTimerDisplay() {
  (hrPlace.innerText = hrInput.value.padStart(2, "0")),
    (minPlace.innerText = minInput.value.padStart(2, "0")),
    (secPlace.innerText = secInput.value.padStart(2, "0"));
}
let beepAudio = document.getElementById("beepAudio");
function playBeepSound() {
  beepAudio.play();
}
function startTimer() {
  timerInterval = setInterval(() => {
    secInput.value > 0
      ? secInput.value--
      : minInput.value > 0
      ? (minInput.value--, (secInput.value = 59))
      : hrInput.value > 0
      ? (hrInput.value--, (minInput.value = 59), (secInput.value = 59))
      : (clearInterval(timerInterval),
        playBeepSound(),
        alert("Timer is up!"),
        resetTimer()),
      updateTimerDisplay();
  }, 1e3);
}
function pauseTimer() {
  clearInterval(timerInterval);
}
function resetTimer() {
  clearInterval(timerInterval),
    (hrInput.value = 0),
    (minInput.value = 0),
    (secInput.value = 0),
    updateTimerDisplay();
}
startTimerBtn.addEventListener("click", () => {
  startTimer(),
    document.querySelector(".inputs").classList.add("hidden"),
    document.querySelector(".remaining").classList.remove("hidden"),
    pauseTimerBtn.classList.remove("hidden"),
    resetTimerBtn.classList.remove("hidden"),
    startTimerBtn.classList.add("hidden");
}),
  pauseTimerBtn.addEventListener("click", () => {
    pauseTimer(),
      startTimerBtn.classList.remove("hidden"),
      pauseTimerBtn.classList.add("hidden");
  }),
  resetTimerBtn.addEventListener("click", () => {
    resetTimer(),
      document.querySelector(".inputs").classList.remove("hidden"),
      document.querySelector(".remaining").classList.add("hidden"),
      pauseTimerBtn.classList.add("hidden"),
      startTimerBtn.classList.remove("hidden");
  }),
  document.getElementById("add-ten-btn").addEventListener("click", () => {
    if (
      ((secInput.value = parseInt(secInput.value) + 10), secInput.value >= 60)
    ) {
      const e = Math.floor(secInput.value / 60);
      if (
        ((secInput.value = secInput.value % 60),
        (minInput.value = parseInt(minInput.value) + e),
        minInput.value >= 60)
      ) {
        const e = Math.floor(minInput.value / 60);
        (minInput.value = minInput.value % 60),
          (hrInput.value = parseInt(hrInput.value) + e);
      }
    }
    updateTimerDisplay();
  }),
  document.getElementById("add-one-btn").addEventListener("click", () => {
    (secInput.value = parseInt(secInput.value) + 1),
      secInput.value >= 60 &&
        ((secInput.value = secInput.value % 60),
        (minInput.value = parseInt(minInput.value) + 1),
        minInput.value >= 60 &&
          ((minInput.value = minInput.value % 60),
          (hrInput.value = parseInt(hrInput.value) + 1))),
      updateTimerDisplay();
  });
