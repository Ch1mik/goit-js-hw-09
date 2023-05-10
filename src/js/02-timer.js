import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataInput = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');
const start_btn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const seconds = document.querySelector('span[data-seconds]');
const minutes = document.querySelector('span[data-minutes]');
const hours = document.querySelector('span[data-hours]');
start_btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      start_btn.disabled = true;
    } else {
      start_btn.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(dataInput, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
start_btn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(dataInput.value) - new Date();
    start_btn.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      days.textContent = addLeadingZero(timeObject.days);
      hours.textContent = addLeadingZero(timeObject.hours);
      minutes.textContent = addLeadingZero(timeObject.minutes);
      seconds.textContent = addLeadingZero(timeObject.seconds);
    } else {
      Notiflix.Notify.success('Countdown finished');
      timerHtml.style.color = 'red';
      clearInterval(timer);
    }
  }, 1000);
});

days.style.display = 'flex';
days.style.fontWeight = '600';
days.style.fontSize = '40px';
seconds.style.display = 'flex';
seconds.style.fontWeight = '600';
seconds.style.fontSize = '40px';
minutes.style.display = 'flex';
minutes.style.fontWeight = '600';
minutes.style.fontSize = '40px';
hours.style.display = 'flex';
hours.style.fontWeight = '600';
hours.style.fontSize = '40px';
timerHtml.style.display = 'flex';
timerHtml.style.gap = ' 40px';
timerHtml.style.marginTop = ' 20px';
timerHtml.style.fontSize = ' 20px';
timerHtml.style.fontWeight = '600';
