// timer if not started by default
let timerOn = false;

// ------------------------------------------------------------
// ------------------- CREATE STARTER DECK --------------------
// ------------------------------------------------------------

// new array that holds all symbol classes
// eliminate duplications from the array by using the spread syntax
const IconClasses = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle'];
const cardIconClasses = [...IconClasses, ...IconClasses];

// add new list element that holds all cards
const deckList = document.createElement('ul');
deckList.classList.add('deck');
document.body.querySelector('.container').appendChild(deckList);

//create the deck of cards
// called by default + by the restart button
createDeck();


function createDeck() {

  //removes all existing cards - in case there is any
  while (deckList.firstChild) {
    deckList.removeChild(deckList.firstChild);
  }


  // shuffles the array of card icons using the provided "shuffle" method
  shuffle(cardIconClasses);

  // loops through each card and creates its HTML
  for (let cardNum = 0; cardNum < 16; cardNum++) {

    const newCard = document.createElement('li');
    const newIcon = document.createElement('i');
    // the iconNum variable stores the random classname from the shuffled array
    const iconNum = cardIconClasses[cardNum];

    newCard.classList.add('card', 'animated');
    // the new card symbol gets the stored classname
    newIcon.classList.add('fa', iconNum);

    newCard.appendChild(newIcon);
    deckList.appendChild(newCard);

  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}



// ------------------------------------------------------------
// ---------------------- RESTART BUTTON ----------------------
// ------------------------------------------------------------

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function () {
  // console.log('The restart button was clicked!');
  createDeck();
  removeOpenClass();
  resetMoves();
  resetRating();
  stopWatch();
  resetTime();
});



// ------------------------------------------------------------
// --------------- INSPECTON OF THE OPEN CARDS ----------------
// ------------------------------------------------------------


deckList.addEventListener('click', inspectCard);

function inspectCard(e) {
  // the deck shouldn't get the card classname
  if (e.target.className != 'deck' ) {
    e.target.classList.add('open');

    if (timerOn === false) {
      startWatch();
    }

  }

  const comparedCards = deckList.querySelectorAll('.open');

  if (comparedCards.length > 1) {
    checkMatching(comparedCards);
  }
}


// compares the open cards
function checkMatching(comparedCards) {

  const comparedSymbols = deckList.querySelectorAll('.open > i')

  if (comparedSymbols[0].classList.toString() === comparedSymbols[1].classList.toString()) {
    // console.log('same card');
    deckList.style = 'pointer-events: none';
    increaseCounter();
    matchTimer(comparedCards);
  }

  else {
    // console.log('not the same');
    deckList.style = 'pointer-events: none';
    increaseCounter();
    noMatchTimer(comparedCards);
  }
}



// ------------------------------------------------------------
// -------------------- DELAYING OUTCOMES ---------------------
// ------------------------------------------------------------

function matchTimer(array) {

  animateMatch(array);
  window.setTimeout(matchCards, 1000, array);
  // console.log('matchTimer started');

}

function noMatchTimer(array) {

  animateNoMatch(array);
  window.setTimeout(turnBackCards, 1500, array);
  // console.log('Timer started');
}



// ------------------------------------------------------------
// ------------------- MATCHING ANIMATION ---------------------
// ------------------------------------------------------------

function animateMatch(array) {

  array.forEach(function(mCard) {
    mCard.classList.add('pulse', 'match');
  });
}

function animateNoMatch(array) {

  array.forEach(function(nMCard) {
    nMCard.classList.add('wobble', 'nomatch');
  });
}



// ------------------------------------------------------------
// -------------------- MATCHING OUTCOMES ---------------------
// ------------------------------------------------------------

function matchCards(comparedCards) {

  comparedCards.forEach(function(mCard) {
    mCard.classList.remove('pulse');
  });

  deckList.style = 'pointer-events: auto';

  removeOpenClass();
  countScore();

}


function turnBackCards(comparedCards) {

  comparedCards.forEach(function(nMCard) {
    nMCard.classList.remove('wobble', 'nomatch');
  });

  deckList.style = 'pointer-events: auto';

  removeOpenClass();

}



// ------------------------------------------------------------
// ----------------------- COUNT MOVES ------------------------
// ------------------------------------------------------------

let moveNum = 0;
let scoreNum = 0;

const moveCounter = document.querySelector('.moves');
moveCounter.textContent = moveNum;

function increaseCounter() {
  moveNum++;
  moveCounter.textContent = moveNum;
  if (moveNum === 10 || moveNum === 20) {
    decreaseRating();
  }
}


// if all cards have been matched, display a message
function countScore() {
  scoreNum++;
  if (scoreNum === 8) {
    stopWatch();
    messageTimer();
  }
}

function messageTimer() {
  // console.log('messageTimer started');
  window.setTimeout(scorePopup, 1500, moveNum, rating, getMins, getSecs);
}


// ------------------------------------------------------------
// ---------------------- DISPLAY RATING ----------------------
// ------------------------------------------------------------

let rating = 3;
const stars = document.querySelectorAll('.stars > li > i');

function decreaseRating() {

  rating--;

  if (rating === 2) {
    stars[2].classList.add('inactive');
  }

  if (rating === 1) {
    stars[1].classList.add('inactive');
  }
}




// ------------------------------------------------------------
// ----------------------- SCORE POPUP ------------------------
// ------------------------------------------------------------



function scorePopup(num1, num2, num3, num4) {


  const popup = document.createElement('div');
  // popup.classList.add('fadeIn');
  popup.classList.add('popup');
  document.body.appendChild(popup);

  const popupContent = document.createElement('div');
  popupContent.classList.add('popup-content');
  popup.appendChild(popupContent);

  const popupTitle = document.createElement('p');
  popupTitle.classList.add('popup-title');
  popupTitle.textContent = 'Congratulations! You won the game';
  popupContent.appendChild(popupTitle);

  const popupText = document.createElement('p');
  popupText.classList.add('popup-text');
  popupText.textContent = `You have solved the game in ${num1} moves and are rated with ${num2} stars. Your complete game time was ${num3}${num4}.`;
  popupContent.appendChild(popupText);

  const popupBtn= document.createElement('button');
  popupBtn.classList.add('popup-btn');
  popupBtn.setAttribute('type', 'button');
  popupBtn.innerHTML = 'Play again';
  popupContent.appendChild(popupBtn);

  popupBtn.addEventListener('click', dismissPopup);

  resetTime();


}

function dismissPopup() {


  const popup = document.querySelector('.popup');
  document.body.removeChild(popup);

  resetMoves();
  resetRating();
  createDeck();
}




// ------------------------------------------------------------
// -------------------------- TIMER ---------------------------
// ------------------------------------------------------------
// code based on https://www.ostraining.com/blog/coding/stopwatch/

let gameTime = document.querySelector('.gametime');
gameTime.innerHTML = 'Time 00 : 00';

let getSecs;
let getMins;

let seconds = 0;
let minutes = 0;

let clearTime;


function startWatch() {

  // for checking wether the timer is already running
  timerOn = true;

  /* check if seconds is equal to 60 and add a +1 to minutes, and set seconds to 0 */
  if (seconds === 60 && minutes < 60) {
    seconds = 0;
    minutes++;
  }

  /* use javascript ternary operator to format how the minutes look and add 0 to minutes if less than 10 */
  getMins = (minutes < 10) ? (`0${minutes} : `) : (`${minutes} : `);
  getSecs = (seconds < 10) ? (`0${seconds}`) : (`${seconds}`);

  // count second
  seconds++;
  // display the stopwatch / timer
  gameTime.innerHTML = 'Time ' + getMins + getSecs;


  /* call the setTimeout() to keep the stop watch alive ! */
  clearTime = setTimeout('startWatch()', 1000);
};


// function to stop the timer


function stopWatch() {

  timerOn = false;

  clearTimeout(clearTime);

};

// ------------------------------------------------------------
// ---------------------- RESET VALUES ------------------------
// ------------------------------------------------------------


function resetTime() {
  seconds = 0;
  minutes = 0;
  gameTime.innerHTML = 'Time 00 : 00';
}


function removeOpenClass() {

  // remove all open classes
  let openCardRemoval = document.querySelectorAll('.open');
  //
  if (openCardRemoval[0]) {
    openCardRemoval[0].classList.remove('open');
  }
  if (openCardRemoval[1]) {
    openCardRemoval[1].classList.remove('open');
  }
}


function resetMoves() {
  scoreNum = 0;
  moveNum = 0;
  moveCounter.textContent = moveNum;
};

function resetRating() {

  if (rating === 2) {
    stars[2].classList.remove('inactive');
  };

  if (rating === 1) {
    stars[1].classList.remove('inactive');
    stars[2].classList.remove('inactive');
  };

  rating = 3;

}
