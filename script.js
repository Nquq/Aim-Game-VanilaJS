const startButton = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timer = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = [
    '#e74c3c',
    '#800080',
    '#5353d0',
    '#e67e22',
    '#2ecc71',
    '#4e23cc',
    '00ffff',
];

let time = 0;
let score = 0;

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        startGame();
        screens[1].classList.add('up');
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (!time) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timer.innerHTML = `00:${value}`;
}

function finishGame() {
    timer.parentNode.classList.add('hide');
    board.innerHTML = `
    <button class="reset-btn">Начать заново</button>
    <h1>Cчет: <span class="primary">${score}</span></h1>
    `;

    const resetButton = document.querySelector('.reset-btn');

    resetButton.addEventListener('click', () => resetGame());
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    setColor(circle);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function resetGame() {
    time = 0;
    score = 0;
    screens.forEach((screen) => {
        screen.classList.remove('up');
    });
    location.reload();
}
