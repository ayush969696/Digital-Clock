let randomNumber = Math.floor(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevguess = []; // storing all prev guesses
let numguess = 1; // how much player guess

let playgame = true; // allowing player to play game

if (playgame) {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  // validating the player guesses - valid input num or not etc
  if (isNaN(guess)) {
    alert('Please Enter a Valid Number');
  } else if (guess < 1) {
    alert('Please Enter a Number more than 1');
  } else if (guess > 100) {
    alert('Please Enter a Number less than 100');
  } else {
    prevguess.push(guess);
    if (numguess === 11) {
      CleanGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      CleanGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  // checking the num - is right num, wrong guessed num
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess <= randomNumber) {
    displayMessage(`Number is tooo low`);
  } else if (guess >= randomNumber) {
    displayMessage(`Number is tooo high`);
  }
}

function CleanGuess(guess) {
  // clean the value and update arr of prev guesses and reduce remaining guesses
  userInput.value = ''; // clean input number
  guessSlot.innerHTML += `${guess} `;
  numguess++;
  // remaining.innerHTML = `${10 - numguess}`;
  remaining.innerHTML = `${11 - numguess}`;
}

function displayMessage(mssg) {
  // just display the lower and higher message 'lowOrHigh'
  lowOrHigh.innerHTML = `<h2> ${mssg}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
  startOver.appendChild(p);
  playgame = false;
  newGame();
}

function newGame() {
  const newGamenbtn = document.querySelector("#newGame");
  newGamenbtn.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100 + 1);
    prevguess = []; // reset the prev guess
    numguess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numguess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playgame = true;

  })

}
