const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start'); 
const resetBtn = document.querySelector('.btn-reset'); 
const session = document.querySelector('.minutes'); 
let myInterval; 
let state = true;
let totalSeconds; 

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent)

  if(state) {
    state = false;
    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds/60);
        let secondsLeft = totalSeconds % 60;

        if(secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else {
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`

        if(minutesLeft === 0 && secondsLeft === 0) {
            bells.play()
            clearInterval(myInterval);
        }


    }

    
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.')
  }
}

const resetTimer = () => {
  clearInterval(myInterval); 
  document.querySelector('.minutes').textContent = "25";
  document.querySelector('.seconds').textContent = "00";
  state = true; 
};

 startBtn.addEventListener('click', appTimer);
 resetBtn.addEventListener('click', resetTimer);