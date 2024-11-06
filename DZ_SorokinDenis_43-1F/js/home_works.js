document.getElementById('gmail_button').addEventListener('click', function() {
    const gmailInput = document.getElementById('gmail_input').value;
    const gmailResult = document.getElementById('gmail_result');
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (gmailRegex.test(gmailInput)) {
        gmailResult.textContent = "Правильный Gmail.";
        gmailResult.style.color = "green";
    } else {
        gmailResult.textContent = "Неправильны Gmail. Введите снова.";
        gmailResult.style.color = "red";
    }
});


const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0,
    positionY = 0;

const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const offsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

let direction = "right";

const moveBlock = () => {
    if (direction === "right") {
        if (positionX < offsetWidth) {
            positionX++;
            childBlock.style.left = `${positionX}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "down";
            requestAnimationFrame(moveBlock);
        }
    } else if (direction === "down") {
        if (positionY < offsetHeight) {
            positionY++;
            childBlock.style.top = `${positionY}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "left";
            requestAnimationFrame(moveBlock);
        }
    } else if (direction === "left") {
        if (positionX > 0) {
            positionX--;
            childBlock.style.left = `${positionX}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "up";
            requestAnimationFrame(moveBlock);
        }
    } else if (direction === "up") {
        if (positionY > 0) {
            positionY--;
            childBlock.style.top = `${positionY}px`;
            requestAnimationFrame(moveBlock);
        } else {
            direction = "right";
            requestAnimationFrame(moveBlock);
        }
    }
};

moveBlock();


const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let seconds = 0;
let interval = null;

function startTimer() {
    if (!interval) {
        interval = setInterval(() => {
            seconds++;
            secondsDisplay.textContent = seconds;
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    secondsDisplay.textContent = seconds;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
