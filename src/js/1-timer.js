// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


// Вибір елементів
const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
const timerFields = document.querySelectorAll('.field .value');

let userSelectedDate = null;

// Ініціалізація flatpickr для вибору дати та часу
flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    // Перевірка, чи дата вибрана в майбутньому
    if (userSelectedDate && userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future!',
      });
      btnEl.disabled = true;
    } else {
      btnEl.disabled = false;
    }
  },
});

let timerInterval;

// Перетворення мілісекунд в дні, години, хвилини, секунди
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

// Форматування чисел з додаванням нулів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Оновлення інтерфейсу таймера
function updateClockface({ days, hours, minutes, seconds }) {
  timerFields[0].textContent = addLeadingZero(days);
  timerFields[1].textContent = addLeadingZero(hours);
  timerFields[2].textContent = addLeadingZero(minutes);
  timerFields[3].textContent = addLeadingZero(seconds);
}

// Запуск таймера
function startTimer() {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;
    const time = convertMs(deltaTime);

    // Оновлення інтерфейсу
    updateClockface(time);

    // Перевірка, чи час закінчився
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      btnEl.disabled = true;
      inputEl.disabled = false;
      iziToast.success({
        title: 'Success',
        message: 'Timer has ended!',
      });
    }
  }, 1000);
}

// Обробник події на кнопку Start
btnEl.addEventListener('click', () => {
  inputEl.disabled = true;
  btnEl.disabled = true;
  startTimer();
});


