import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      window.alert("Please choose a date in the future");
      refs.dateTimePicker.value = ""; 
      return;
    }

    refs.startButton.disabled = false;
  },
};


const refs = {
  startButton: document.querySelector(".js-btn-start"),
  days: document.querySelector(".js-days"),
  hours: document.querySelector(".js-hours"),
  minutes: document.querySelector(".js-minutes"),
  seconds: document.querySelector(".js-seconds"),
  dateTimePicker: document.getElementById("datetime-picker"),
};

flatpickr(refs.dateTimePicker, options);

refs.startButton.addEventListener("click", () => {
  const selectedDate = flatpickr.parseDate(refs.dateTimePicker.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    window.alert("Please choose a date in the future");
    return;
  }

  refs.startButton.disabled = true;
  let difference = selectedDate.getTime() - currentDate.getTime();
  let countdownInterval;

  function convertMs(ms) {
    function addLeadingZero(value) {
      return value.toString().padStart(2, "0");
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return {
      days: addLeadingZero(days),
      hours: addLeadingZero(hours),
      minutes: addLeadingZero(minutes),
      seconds: addLeadingZero(seconds),
    };
  }

  countdownInterval = setInterval(() => {
    const remainingTime = convertMs(difference);

    refs.days.textContent = remainingTime.days;
    refs.hours.textContent = remainingTime.hours;
    refs.minutes.textContent = remainingTime.minutes;
    refs.seconds.textContent = remainingTime.seconds;

    if (difference <= 0) {
      clearInterval(countdownInterval);
      console.log("Countdown has finished!");
    }

    difference -= 1000;
  }, 1000);
});