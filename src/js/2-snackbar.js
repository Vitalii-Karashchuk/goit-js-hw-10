// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const btnEl = document.querySelector('button');
const radioInputFulfEL = document.querySelector('input[value="fulfilled"]');
const radioInputRejEl = document.querySelector('input[value="rejected"]');
const inputDelay = document.querySelector('input[name="delay"]');

const handleBtn = ((event) => {
    event.preventDefault();
        const delay = parseInt(inputDelay.value, 10);

      const promise = new Promise((resolve, reject) => {              
        setTimeout(() => {
            if (radioInputFulfEL.checked) {
                iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms`,
                                   position: 'topRight',
                });
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else if (radioInputRejEl.checked) {
                iziToast.error({ message: `❌ Rejected promise in ${delay}ms`,
                                 position: 'topRight',
                 });
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });
       
        promise.then(
            value => {
            console.log(value);
            }).catch(error => {
                console.log(error);
            });   
});

btnEl.addEventListener('click', handleBtn);
