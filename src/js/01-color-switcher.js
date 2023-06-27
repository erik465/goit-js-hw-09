function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButtonEl = document.querySelector('button[data-start]');
const stopButtonEl = document.querySelector('button[data-stop]')
let colorInterval = null


startButtonEl.addEventListener('click', () => {
    startButtonEl.disabled = true;
    colorInterval = setInterval(() => {
        document.querySelector('body').style.backgroundColor = getRandomHexColor();
    }, 1000)
})

stopButtonEl.addEventListener('click', () => {
    startButtonEl.disabled = false
    clearInterval(colorInterval)
})