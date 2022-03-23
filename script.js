// global scoped variables
let countdown;
let setCounter = 0;

// target DOM elements
const timerDisplay = document.querySelector(".display__time-left");
const buttons = document.querySelectorAll("[data-time]");
const totalSets = document.querySelector("#timer__total");
const resetButton = document.querySelector("#reset");
const timerMessage = document.querySelector(".display__time-message");
const hintButton = document.querySelector("#hint");
const hintModal = document.querySelector("#modal-hint");
const closeButton = document.querySelector("#modal-close");

function timer(seconds) {
  // set start/end times
  const now = Date.now();
  const then = now + seconds * 1000;

  // clear existing timers
  clearInterval(countdown);

  // show initial time
  displayTimeLeft(seconds);

  // store the countdown in a variable
  countdown = setInterval(() => {
    // calculate the seconds left between now/then
    const secondsLeft = Math.round((then - Date.now()) / 1000); // display as integers
    // when timer runs out, stop function
    if (secondsLeft < 0) {
      clearInterval(countdown);
      toggleStates(seconds);
      return;
    } // change display states when timer ends and start break timer
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function toggleStates(seconds) {
  // toggle states and restart timer
  timerDisplay.classList.remove("reset");
  timerDisplay.classList.toggle("active");
  timerDisplay.classList.toggle("resting");

  // update the set counter, when 'active' state ends
  if (timerDisplay.classList.contains("active")) {
    showActiveMessage();
  } else {
    showBreakMessage();
    updateCounter();
  }
  // start the timer
  timer(seconds);
}

function displayTimeLeft(secondsLeft) {
  // determine minutes/seconds
  const remMinutes = Math.floor(secondsLeft / 60);
  const remSeconds = secondsLeft % 60;
  const display = `${remMinutes}:${remSeconds < 10 ? "0" : ""}${remSeconds}`;

  // update the display
  if (timerDisplay.classList.contains("active")) {
    document.title = `Workout: ${display}`;
  } else {
    document.title = `Break: ${display}`;
  }
  timerDisplay.textContent = display;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  // start the timer in 'resting' state
  showCounter();
  showStartingMessage();
  showResetButton();
  timer(seconds);
}
function enableActiveState() {
  timerDisplay.classList.add("active");
  timerDisplay.classList.remove("resting");
  timerDisplay.classList.remove("reset");
}

function showCounter() {
  totalSets.textContent = `Total Sets: ${setCounter}`;
  totalSets.classList.remove("hidden");
  totalSets.classList.add("display-flex");
}
function hideCounter() {
  totalSets.textContent = "";
  totalSets.classList.add("hidden");
  totalSets.classList.remove("display-flex");
}

function updateCounter() {
  // update the total counter
  setCounter += 1;
  showCounter();
}

function showBreakMessage() {
  timerMessage.textContent = "BREAK";
}

function showActiveMessage() {
  timerMessage.textContent = "WORKOUT!";
}

function showStartingMessage() {
  timerMessage.textContent = "STARTING IN...";
}

function hideMessage() {
  timerMessage.textContent = "";
}

function hideResetButton() {
  resetButton.classList.add("hidden");
}

function showResetButton() {
  resetButton.classList.remove("hidden");
}

function clearTitle() {
  document.title = "Kettlebell Workout App";
}

function resetTimerDisplay() {
  timerDisplay.textContent = "Pick a Kettlebell Workout";
  timerDisplay.classList.add("reset");
  timerDisplay.classList.add("resting");
  timerDisplay.classList.remove("active");
}

function reset() {
  // restart the counter, clear timer, update UI
  setCounter = 0;
  clearInterval(countdown);
  clearTitle();
  hideMessage();
  hideCounter();
  hideResetButton();
  resetTimerDisplay();
}

function showModal() {
  hintModal.style.display = "block";
}

function closeModal() {
  hintModal.style.display = "none";
}

// listen for button click events
buttons.forEach((button) => button.addEventListener("click", startTimer));
hintButton.addEventListener("click", showModal);
resetButton.addEventListener("click", reset);
closeButton.addEventListener("click", closeModal);

// listen for modal click-out event
window.addEventListener("click", (e) => {
  if (e.target == hintModal) {
    closeModal();
  }
});
