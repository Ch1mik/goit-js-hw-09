const refs = {
  start_btn: document.querySelector('[data-start]'),
  stop_btn: document.querySelector('[data-stop]'),
};
refs.start_btn.addEventListener('click', startChange);
refs.stop_btn.addEventListener('click', stopChange);
let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeBackgroundColor() {
  document.body.style.background = getRandomHexColor();
}

function startChange() {
  refs.start_btn.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
}

function stopChange() {
  refs.start_btn.disabled = false;
  clearInterval(intervalId);
}

refs.start_btn.style.display = 'flex';
refs.start_btn.style.justifyContent = 'center';
refs.start_btn.style.width = '100px';
refs.start_btn.style.fontSize = '30px';
refs.start_btn.style.position = 'absolute';
refs.start_btn.style.top = '50%';
refs.start_btn.style.left = '50%';

refs.stop_btn.style.display = 'flex';
refs.stop_btn.style.justifyContent = 'center';
refs.stop_btn.style.width = '100px';
refs.stop_btn.style.fontSize = '30px';
refs.stop_btn.style.position = 'absolute';
refs.stop_btn.style.top = '50%';
refs.stop_btn.style.left = '40%';
