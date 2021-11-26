/*
 * Метод setInterval(callback, delay, args)
 */

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  timerId: null,
};

function changeColor() {
  document.body.style.background = `${getRandomHexColor()}`;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStartBtn() {
  changeColor();
  refs.startBtn.setAttribute('disabled', true);
  refs.stopBtn.removeAttribute('disabled');
  refs.timerId = setInterval(() => {
    changeColor();
  }, 1000);
}

/*
 * Очистка интервала с clearInterval(intervalId)
 */

function onClickStopBtn() {
  clearInterval(refs.timerId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
}

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);
refs.stopBtn.setAttribute('disabled', true);

//
