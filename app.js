const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const session = document.querySelector('.minutes'); 
let myInterval; 
let state = true;
let endTime;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if(state) {
    state = false;
    endTime = Date.now() + sessionAmount * 60 * 1000; // Guardamos la hora de finalización

    const updateSeconds = () => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now); // Diferencia entre ahora y el final

        let minutesLeft = Math.floor(remaining / 1000 / 60);
        let secondsLeft = Math.floor((remaining / 1000) % 60);

        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        minuteDiv.textContent = minutesLeft;
        secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

        // Cuando se acabe el tiempo
        if (remaining <= 0) {
            bells.play();
            clearInterval(myInterval);
            state = true;
        }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
};

startBtn.addEventListener('click', appTimer);
