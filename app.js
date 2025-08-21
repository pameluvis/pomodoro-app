const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const pauseBtn = document.querySelector('.btn-pause'); // nuevo botón
const resetBtn = document.querySelector('.btn-reset'); 
const session = document.querySelector('.minutes'); 

let myInterval; 
let state = true;
let totalSeconds; 
let isPaused = false; 

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (state) {
    state = false;
    totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
      if (!isPaused) { // solo corre si no está en pausa
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        minuteDiv.textContent = minutesLeft;
        secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

        if (minutesLeft === 0 && secondsLeft === 0) {
          bells.play();
          clearInterval(myInterval);
          state = true;
        }
      }
    }

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
};

const pauseTimer = () => {
  if (!state) { 
    isPaused = !isPaused; 
    pauseBtn.textContent = isPaused ? "resume" : "pause";
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  document.querySelector('.minutes').textContent = "25";
  document.querySelector('.seconds').textContent = "00";
  state = true;
  isPaused = false;
  pauseBtn.textContent = "pause"; 
};

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
