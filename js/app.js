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

// function that shuffles the starter cards
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
  removeFragmentCards();
  resetMoves();
  });



// ------------------------------------------------------------
// --------------- INSPECTON OF THE OPEN CARDS ----------------
// ------------------------------------------------------------

// a fragment that stores the currently open 1 or 2 cards
const openCardFragment = document.createDocumentFragment();

// a function that copies the open cards to the fragment
deckList.addEventListener('click', inspectCard);


function inspectCard(e) {
    // the deck shouldn't get the card classname
   if (e.target.className != 'deck' ) {
     e.target.classList.add('open');
     let clonedCard = e.target.firstChild.cloneNode();
     openCardFragment.appendChild(clonedCard);
   };
   checkMatching();
 };


// compares the open cards based on the information stored in the fragment
 function checkMatching() {

   const checkedCards = openCardFragment.children;

   if (checkedCards.length > 1 && checkedCards[0].className.toString() === checkedCards[1].className.toString()) {
     // console.log('same card');
    deckList.style = 'pointer-events: none';
    increaseCounter();
    matchTimer();
  }

  else if (checkedCards.length > 1 && checkedCards[0].className.toString() != checkedCards[1].className.toString()) {
    // console.log('not the same');
    deckList.style = 'pointer-events: none';
    increaseCounter();
    noMatchTimer();
  }
}



// ------------------------------------------------------------
// -------------------- DELAYING OUTCOMES ---------------------
// ------------------------------------------------------------

function matchTimer() {
 window.setTimeout(matchCards, 1000);
 // console.log('matchTimer started');
 animateMatch();
}

 function noMatchTimer() {
   window.setTimeout(turnBackCards, 1500);
   // console.log('Timer started');
   animateNoMatch();
}

function messageTimer() {
  // console.log('messageTimer started');
  window.setTimeout(scoreMessage, 1000);
}

// ------------------------------------------------------------
// ------------------- MATCHING ANIMATION ---------------------
// ------------------------------------------------------------

function animateMatch() {
  const animCards = deckList.querySelectorAll('.open');

  animCards[0].classList.add('pulse', 'match');
  animCards[1].classList.add('pulse', 'match');
}

function animateNoMatch() {
  const animatedSymbol = document.querySelectorAll('.open');

  animatedSymbol[0].classList.add('wobble', 'nomatch');
  animatedSymbol[1].classList.add('wobble', 'nomatch');
}


// ------------------------------------------------------------
// -------------------- MATCHING OUTCOMES ---------------------
// ------------------------------------------------------------

 function matchCards() {

   let matchedCards = deckList.querySelectorAll('.open');

   matchedCards[0].classList.remove('pulse');
   matchedCards[1].classList.remove('pulse');

   deckList.style = 'pointer-events: auto';

  removeFragmentCards();
  countScore();

 };

 function turnBackCards() {

  let noMatchCards = document.querySelectorAll('.nomatch');

    noMatchCards[0].classList.remove('wobble', 'nomatch');
    noMatchCards[1].classList.remove('wobble', 'nomatch');

    deckList.style = 'pointer-events: auto';

  removeFragmentCards();

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
};

// if all cards have matched, display a message
function countScore() {
  scoreNum++;
  if (scoreNum === 8) {
    messageTimer();
    }
};

function scoreMessage() {

  if (moveNum <=25) {
      window.alert('Congratulations! You have solved the game in ' + moveNum + ' moves. You are a real pro!');
    }
  else if (25 < moveNum & moveNum <= 45) {
      window.alert('Congratulations! You have solved the game in ' + moveNum + ' moves. Well done!');
    }

  else {
      window.alert('You have solved the game in ' + moveNum + ' moves. Dont worry, practice makes perfect');
   }

   createDeck();
   removeFragmentCards();
   resetMoves();
}

// ------------------------------------------------------------
// ----------- REMOVE OPEN CARDS & RESET VALUES ---------------
// ------------------------------------------------------------


function removeFragmentCards() {

   // remove cloned cards from the fragment
   while (openCardFragment.firstChild) {
     openCardFragment.removeChild(openCardFragment.firstChild);
   }

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
