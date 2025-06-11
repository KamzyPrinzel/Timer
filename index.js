const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const timerEL = document.getElementById("timer");
const setTimeEl = document.getElementById("setTime");
const timeInputEl = document.getElementById("timeInput");

let interval; 
let timeLeft = 0; 

function updateTimer(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    timerEL.innerHTML = formattedTime;
}

function startTimer(){
    interval = setInterval(()=>{
        timeLeft--;
        updateTimer();
        if(timeLeft === 0){
            clearInterval(interval);
            alert("Time is up!");
            timeLeft = 0;
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(interval);
}

function resetTimer(){
    clearInterval(interval);
    timeLeft = 0;
    updateTimer();
}

function setCustomTime() {
    const userTime = parseInt(timeInputEl.value); // Get user input in minutes
    if (!isNaN(userTime) && userTime > 0) {
        timeLeft = userTime * 60; // Convert to seconds
        updateTimer();
    } else {
        alert("Please enter a valid time in minutes.");
    }
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
setTimeEl.addEventListener("click", setCustomTime);

updateTimer();
