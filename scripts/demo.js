import { wordList } from './word.js';

const wordDisplay = document.querySelector(".word");
const keyboardDiv = document.querySelector(".keyboard");
const hangMan = document.querySelector(".hangman-box img");
const guess = document.querySelector(".guess p");
const modal = document.querySelector(".modal");
const again = document.querySelector(".replay");

let newWord, correct, wrongGuess = 0;
const maxGuesses = 6;

const resetGame = () => {
    correct = [];
    wrongGuess = 0;
    hangMan.src = `images/hangman-${wrongGuess}.svg`;
    guess.innerText = `${wrongGuess} /${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = newWord.split("").map(() => `<li class="alpha"></li>`).join("");
    modal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    newWord = word;
    console.log(word);
    document.querySelector(".hint p").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You did it:` : `The correct word was:`;
        modal.querySelector("img").src = `images/${isVictory ? 'victory' : 'loser'}.gif`;
        modal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        modal.querySelector("p").innerHTML = `${modalText} <b>${newWord}</b>`;
        modal.classList.add("show");
    }, 300);
}

const initGame = (button, clickedLetter) => {
    if (newWord.includes(clickedLetter)) {
        [...newWord].forEach((alpha, index) => {
            if (alpha === clickedLetter) {
                correct.push(alpha);
                wordDisplay.querySelectorAll("li")[index].innerText = alpha;
                wordDisplay.querySelectorAll("li")[index].classList.add("guess");
            }
        });
    } else {
        wrongGuess++;
        hangMan.src = `images/hangman-${wrongGuess}.svg`;
    }

    button.disabled = true;
    guess.innerText = `${wrongGuess} /${maxGuesses}`;

    if (wrongGuess === maxGuesses) return gameOver(false);
    if (correct.length === newWord.length) return gameOver(true);
}
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    button.setAttribute("data-key", String.fromCharCode(i).toUpperCase());
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}


// // Create virtual keyboard and add event listeners to print in asdf manner
// letterLayout.forEach(letter => {
//     const button = document.createElement("button");
//     button.innerText = letter;
//     button.setAttribute("data-key", letter.toLowerCase());
//     keyboardDiv.appendChild(button);
//     button.addEventListener("click", e => initGame(e.target, letter.toLowerCase()));
// });

const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    console.log(`Key pressed: ${key}`);
    const button = document.querySelector(`button[data-key="${key.toUpperCase()}"]`);
    if (button) {
        console.log(`Button found for key: ${key}`);
        if (!button.disabled) {
            button.click(); // Simulate a click event
        } else {
            console.log(`Button for key ${key} is disabled`);
        }
    } else {
        console.log(`No button found for key: ${key}`);
    }
}

document.addEventListener('keydown', handleKeyPress);
again.addEventListener("click", getRandomWord);


getRandomWord();

document.addEventListener('DOMContentLoaded', () => {
    const copyrightIcon = document.getElementById('copyright-icon');
    const popupMessage = document.getElementById('popup-message');
    const closeButton = document.querySelector('.close-button');

    copyrightIcon.addEventListener('click', () => {
        popupMessage.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        popupMessage.style.display = 'none';
    });

    // Hide the popup when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === popupMessage) {
            popupMessage.style.display = 'none';
        }
    });
});
