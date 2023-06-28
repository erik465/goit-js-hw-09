import Notiflix from "notiflix";

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise(function (resolve, reject) {
    if(shouldResolve){
      resolve({position, delay})
    }
    else{
      reject({position, delay})
    }
  })

  
  
}



const firstDelayInputEL = document.querySelector('input[name=delay]')
const delayStepInputEL = document.querySelector('input[name=step]')
const promiseAmountInputEL = document.querySelector('input[name=amount]')
const formEl = document.querySelector('form')

formEl.addEventListener('submit', (e)=>{
  e.preventDefault()
  formEl.reset()
  setTimeout(() =>{
    createPromise(1, firstDelayInputEL.value)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {timeout: 3000});
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {timeout: 3000});
  });


    for(let i = 1; i<promiseAmountInputEL.value; i++){
      setTimeout(() =>{
        createPromise(i+1, parseInt(firstDelayInputEL.value) + parseInt(delayStepInputEL.value) * i)
.then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {timeout: 3000});
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {timeout: 3000});
  });
      }, delayStepInputEL.value * i)
    }
  }, firstDelayInputEL.value)
})