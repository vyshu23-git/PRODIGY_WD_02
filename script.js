let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  let milliseconds = Math.floor((ms % 1000) / 10); 
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor(ms / (1000 * 60 * 60));

  return (
    (hours > 0 ? String(hours).padStart(2, "0") + ":" : "") +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(milliseconds).padStart(2, "0")
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateDisplay();
  laps.innerHTML = "";
}

function recordLap() {
  if (running) {
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}`;
    laps.appendChild(li);
  }
}


document.getElementById("start").onclick = startTimer;
document.getElementById("pause").onclick = pauseTimer;
document.getElementById("reset").onclick = resetTimer;
document.getElementById("lap").onclick = recordLap;


updateDisplay();
