import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";


const currentDate = new Date()
let selectedDate = null;
const startButtonEl = document.querySelector('button[data-start]')
const countdownValuesEls = document.querySelectorAll('.value')
console.log(countdownValuesEls)
startButtonEl.disabled = true

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    selectedDate = new Date(selectedDates[0])
      if(selectedDate < currentDate){
        Notiflix.Notify.failure("Please select a date in future", {
            position: 'right-top',
            timeout: 2000
          });
    }
    else{
        startButtonEl.disabled = false
    }
    }
});


startButtonEl.addEventListener('click', ()=>{
    console.log(convertMs(selectedDate - currentDate))
    addLeadingZero(convertMs(selectedDate - currentDate));

})


function addLeadingZero(value) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + value.days);
    targetDate.setHours(targetDate.getHours() + value.hours);
    targetDate.setMinutes(targetDate.getMinutes() + value.minutes);
    targetDate.setSeconds(targetDate.getSeconds() + value.seconds);
  
    const countdownInterval = setInterval(() => {
      const currentDate = new Date();
      let remainingTime = Math.floor((targetDate - currentDate));
  
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        console.log("Countdown complete!");
        return;
      }
  
      remainingTime = convertMs(remainingTime)
      //const days = Math.floor(remainingTime / (24 * 60 * 60));
      //const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
      //const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
      //const seconds = remainingTime % 60;
  
      countdownValuesEls[3].innerHTML = String(remainingTime.seconds).padStart(2, '0');
      countdownValuesEls[2].innerHTML = String(remainingTime.minutes).padStart(2, '0');
      countdownValuesEls[1].innerHTML = String(remainingTime.hours).padStart(2, '0');
      countdownValuesEls[0].innerHTML = String(remainingTime.days).padStart(2, '0');

    }, 1000);
  }
  


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  