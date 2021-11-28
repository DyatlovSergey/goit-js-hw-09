import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  Days: document.querySelector('[data-days]'),
  Hours: document.querySelector('[data-hours]'),
  Minutes: document.querySelector('[data-minutes]'),
  Seconds: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  selectedTime: null,
};
refs.startBtn.setAttribute('disabled', true);

const pad = value => {
  return String(value).padStart(2, '0');
};

const onClickStartBtn = () => {
  return refs.selectedTime - new Date().getTime();
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 5000,
      });
      refs.startBtn.setAttribute('disabled', true);
      return;
    }
    refs.selectedTime = selectedDates[0].getTime();
    Notiflix.Notify.success('The countdown can be started');
    refs.startBtn.removeAttribute('disabled');
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const start = () => {
  setInterval(() => {
    if (onClickStartBtn() < 1) {
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(onClickStartBtn());
    updateTime({ days, hours, minutes, seconds });
  }, 1000);

  refs.startBtn.setAttribute('disabled', true);
};

const updateTime = ({ days, hours, minutes, seconds }) => {
  refs.Days.textContent = `${days}`;
  refs.Hours.textContent = `${hours}`;
  refs.Minutes.textContent = `${minutes}`;
  refs.Seconds.textContent = `${seconds}`;
};
refs.startBtn.addEventListener('click', start);
