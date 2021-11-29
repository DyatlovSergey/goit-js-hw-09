import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        return;
      }
      reject({ position, delay });
    }, delay);
  });
}

function generatePromises() {
  const referral = {
    delay: Number(refs.firstDelay.value),
    delayStep: Number(refs.delayStep.value),
    amount: Number(refs.amount.value),
  };
  for (let i = 1; i <= referral.amount; i += 1) {
    createPromise(i, referral.delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    referral.delay += referral.delayStep;
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

const onFormSubmit = e => {
  e.preventDefault();
  generatePromises();
  e.currentTarget.reset();
};
refs.form.addEventListener('submit', onFormSubmit);
