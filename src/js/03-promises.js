import Notiflix from 'notiflix';
const formElement = document.querySelector('form');
const delayElement = formElement.querySelector('input[ name="delay"]');
const stepElement = formElement.querySelector('input[name="step"]');
const amountElement = formElement.querySelector('input[name="amount"]');
const create_btn = formElement.querySelector('button[type="submit"]');
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
create_btn.addEventListener('click', e => {
  e.preventDefault();
  let firstDelay = Number(delayElement.value);
  let delayStep = Number(stepElement.value);
  let promiseAmount = Number(amountElement.value);
  for (let i = 0; i < promiseAmount; i++) {
    const delay = firstDelay + i * delayStep;
    const position = i + 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
