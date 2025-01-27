// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const formEl = document.querySelector('.form');
const radioInputFulfEL = document.querySelector('input[value="fulfilled"]');
const radioInputRejEl = document.querySelector('input[value="rejected"]');
const inputDelay = document.querySelector('input[name="delay"]');

const handleBtn = ((event) => {
    event.preventDefault();
        const delay = parseInt(inputDelay.value, 10);

      const promise = new Promise((resolve, reject) => {              
        setTimeout(() => {
            if (radioInputFulfEL.checked) {
                
                resolve(`${delay}`);
            } else if (radioInputRejEl.checked) {
               
                reject(`${delay}`);
            }
        }, delay);
    });
       
        promise.then(
            value => {
                   iziToast.success({ message: `✅ Fulfilled promise in ${value}ms`,
                    position: 'topRight',
                });    
            }).catch(error => {
                iziToast.error({ message: `❌ Rejected promise in ${error}ms`,
                    position: 'topRight',
                    });
            });   
});

formEl.addEventListener('submit', handleBtn);
