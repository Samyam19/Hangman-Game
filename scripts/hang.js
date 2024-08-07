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
    //resettig all the game element
    correct = [];
    wrongGuess = 0;
    hangMan.src = `images/hangman-${wrongGuess}.svg`;
    guess.innerText = `${wrongGuess} /${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = newWord.split("").map(() => `<li class="alpha"></li>`).join("");
    modal.classList.remove("show");
}


const getRandomWord = () => {
    // to select a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    newWord = word;
    console.log(word);
    document.querySelector(".hint p").innerText = hint;
    resetGame();

}

const gameOver = (isVictory) => {
    //after the games ends the detail of game over will show up
    setTimeout(() => {
        const modalText = isVictory ? `You did it:` : `The correct word was:`;
        modal.querySelector("img").src = `images/${isVictory ? 'victory' : 'loser'}.gif`;
        modal.querySelector("img").src = `images/${isVictory ? 'victory' : 'loser'}.gif`;
        modal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        modal.querySelector("p").innerHTML = `${modalText} <b>${newWord}</b>`;
        modal.classList.add("show");
    }, 300);
}
//keyboard
//here the button displays the letter only if it is present in the word
const initGame = (button, clickedLetter) => {
    if (newWord.includes(clickedLetter)) {
        //displaying correct letters on screen
        [...newWord].forEach((alpha, index) => {
            if (alpha === clickedLetter) {
                correct.push(alpha);
                wordDisplay.querySelectorAll("li")[index].innerText = alpha;
                wordDisplay.querySelectorAll("li")[index].classList.add("guess");
            }
        })
        // console.log(clickedLetter ,"it exists in the word");
    } else {
        //if we click wrong letter which is not present in word image occur of hangamn
        wrongGuess++;
        hangMan.src = `images/hangman-${wrongGuess}.svg`;
    }

    button.disabled = true;
    guess.innerText = `${wrongGuess} /${maxGuesses}`;

    //calls gameover if any of these function conditions are met
    if (wrongGuess === maxGuesses) return gameOver(false);
    if (correct.length === newWord.length) return gameOver(true);
}


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    button.setAttribute("data-key", String.fromCharCode(i).toLowerCase());
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}


  // Create virtual keyboard and add event listeners
//   letterLayout.forEach(letter => {
//     const button = document.createElement("button");
//     button.innerText = letter;
//     button.setAttribute("data-key", letter.toLowerCase());
//     keyboardDiv.appendChild(button);
//     button.addEventListener("click", () => handleGuess(button, letter.toLowerCase()));
//   });
const handleKeyPress = (event) => {
    const key = event.key.toLowerCase();
    console.log(`Key pressed: ${key}`);
    const button = document.querySelector(`button[data-key="${key}"]`);
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