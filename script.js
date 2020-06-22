const pomodoroTimer = document.querySelector('#pomodoro-timer');
const startButton = document.querySelector('#pomodoro-start');
const pauseButton = document.querySelector('#pomodoro-pause');
const stopButton = document.querySelector('#pomodoro-stop');

let tupe = 'Work'
let timeSpentInCurrentSession = 0;

//START
startButton.addEventListener('click', () => {
    toggleClock();
})

//PAUSE
pauseButton.addEventListener('click', () => {
    toggleClock();
})

//STOP
stopButton.addEventListener('click', () => {
    toggleClock(true);
})

let isClockRunning = false;

//in seconds = 25 mins
let workSessionDuration = 1500;
let currentTimeLeftInSession = 1500;

//in seconds = 5 mins
let breakSessionDuration = 300;



//now let's start writing our toggleclock function.
const toggleClock = (reset) => {
    if (reset) {
        stopClock();
        //stop the timer
    } else {
        if (isClockRunning === true) {
            //pause the timer 
            isClockRunning = false;
            clearInterval(clockTimer);
        } else {
            //start the timer
            isClockRunning = true;
            clockTimer = setInterval(() => {
                //decrease time left / increase time spent
                stepDown()
                displayCurrentTimeLeftInSession();
            },1000)
        }
    }
}

const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession;
    let result = '';
    const seconds = secondsLeft % 60;
    const minutes = parseInt(secondsLeft / 60) % 60;
    let hours = parseInt(secondsLeft / 3600);
    // add leading zeroes if it's less than 10
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString();
  }

pomodoroTimer.innerText = result;

const stopClock = () => {
    displaySessionLog(type);
    clearInterval(clockTimer);
    isClockRunning = false;
    currentTimeLeftInSession = workSessionDuration;
    displayCurrentTimeLeftInSession();
    type = 'Work';
}   

const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
        //decrease time left / increase time spent
        currentTimeLeftInSession--;
        timeSpentInCurrentSession++;
    } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0;
        //Timer is over -> if work switch to break, viceversa        
        if (type === 'Work') {
            currentTimeLeftInSession = breakSessionDuration;
            displaySessionLog('Work');
            type = 'Break';
            currentTaskLabel.value = 'break';
            currentTaskLabel.disabled = true; //disable input when entering an 'interrupt' section
        } else {
            currentTimeLeftInSession = workSessionDuration;
            type = 'Work';
            if (currentTaskLabel.value === 'Break'){
                currentTaskLabel.disabled.value - workSessionLabel;
            }
            currentTaskLabel.disabled = false;
            displaySessionLog('Break');
        }
    }
    displayCurrentTimeLeftInSession();
}

//creating a log session 
const displaySessionLog = (type) => {
    const sessionsList = document.querySelector('#pomodoro-sessions');
    //append li to it
    const li = document.createElement('li');
    if (type === 'Work') {
        sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work'
        workSessionLabel = sessionLabel
    } else {
        sessionLabel = 'Break'
    }
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60) 
    elapsedTime = elapsedTime > 0 ?
    elapsedTime : '<1';
    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`)
    li.appendChild(text);
    sessionsList.appendChild(li);
}

let currentTaskLabel = document.querySelector('#pomodoro-clock-task');
let updatedWorkSessionDuration;
let updatedBreakSessionDuration;
let workDurationInput = document.querySelector('#input-work-duration');
let breakDurationInput = document.querySelector('#input=break-duration');

workDurationInput.value = '25';
breakDurationInput.value = '5';
