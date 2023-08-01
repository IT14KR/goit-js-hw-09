import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  createPromiseBtn: document.querySelector('.btn-submit'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const firstDelay = Number(formData.get('delay'));
  const delayStep = Number(formData.get('step'));
  const promisesAmount = Number(formData.get('amount'));

  for (let i = 0; i < promisesAmount; i += 1) {
    const delay = firstDelay + i * delayStep;

    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay + step;
  }
});
