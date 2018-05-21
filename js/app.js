// new array to hold all card icon classes
// TODO get rid off duplications
const cardIconClasses = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle']

// shuffle the array of card icons using the provided "shuffle" method

// * Create a list that holds all of my cards
let deckList = document.createElement('ul');
deckList.classList.add('deck');

document.body.querySelector('.container').appendChild(deckList);

function createDeck() {

  shuffle(cardIconClasses);

  // let cardList = document.querySelector('.card');
  // if (cardList != null) {
  // cardList.remove();
  // }
  //
  // let allCards = document.querySelectorAll('.card');
  // console.log(allCards);

  // convert NodeList to Array
  //let allCardsArray = [];
  // for(let i = allCards.length; i--; allCardsArray.unshift(allCards[i]));
  // console.log(allCardsArray);
  // console.log(allCardsArray.length);

  // allCards.forEach(function() {
  //   $0.remove();
  // });
//
//   if (allCards != null) {
//   for (let cardNum = 0; cardNum < 16; cardNum++) {
//   this.remove();
// }

  //if removes all existing cards, in case of a restart
  while (deckList.firstChild) {
    deckList.removeChild(deckList.firstChild);
  }


  // loop through each card and create its HTML
  for (let cardNum = 0; cardNum < 16; cardNum++) {
     const newCard = document.createElement('li');
     newCard.classList.add('card', 'animated');

     // newCard.textContent = 'number' + (cardNum+1);
     const newIcon = document.createElement('i');
     // newIcon.insertAdjacentText('afterbegin', (cardNum+1));

     const iconNum = cardIconClasses[cardNum];
     // console.log(iconNum);
     newIcon.classList.add('fa', iconNum);

     newCard.appendChild(newIcon);
     deckList.appendChild(newCard);

   }

}

createDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

  // access and store the children of the deckList in the DOM
  // let cardNodeList = document.querySelectorAll('.card');

  // convert NodeList to Array
  // let cardArray = [];
  // for(let i = cardNodeList.length; i--; cardArray.unshift(cardNodeList[i]));
  //
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

  return array;

  // document.body.querySelector('.container').querySelector('.deck').removeChildren();

  // for (let newCardNum = 0; newCardNum < 16; newCardNum++) {
  //    deckList.appendChild(cardNodeList[newCardNum]);
  // }

}


const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function () {
  console.log('The restart button was clicked!');
  createDeck();
  removeFragmentCards();
  resetMoves();
  });


 const openCardFragment = document.createDocumentFragment();

  deckList.addEventListener('click', inspectCard);

 function inspectCard(e) {

   if (e.target.className != 'deck' ) {
    e.target.classList.add('open');
    let clonedCard = e.target.firstChild.cloneNode();
    openCardFragment.appendChild(clonedCard);
  };

   checkMatching();

 };

 function Timer() {
   window.setTimeout(turnBackCards, 1500);
   console.log('Timer started');
   animateNoMatch();

 }

 function matchTimer() {
  window.setTimeout(matchCards, 1000);
  console.log('matchTimer started');
  animateMatch();

}

function messageTimer() {
  console.log('messageTimer started');
  window.setTimeout(scoreMessage, 1000);
}

 function turnBackCards() {

   console.log('cards turned back');
   removeFragmentCards();

   let noMatchCard = document.querySelectorAll('.nomatch');

   noMatchCard[0].classList.remove('wobble', 'nomatch');
   noMatchCard[1].classList.remove('wobble', 'nomatch');


   deckList.style = 'pointer-events: auto';

 }

 function matchCards() {
   //
   // let checkedCards = openCardFragment.children;

   let matchedCards = deckList.querySelectorAll('.open');

   matchedCards[0].classList.remove('pulse');
   matchedCards[1].classList.remove('pulse');

   deckList.style = 'pointer-events: auto';


   // matchedCards[0].style = 'pointer-events: none';
   // matchedCards[1].style = 'pointer-events: none';

   // let matchedSymbol = checkedCards[1].classList[1];
   //
   // let finalSymbol = deckList.querySelectorAll('.' + CSS.escape(matchedSymbol));

   // finalSymbol[0].parentNode.classList.remove('open', 'pulse');
   // finalSymbol[0].parentNode.classList.add('match');
   // finalSymbol[1].parentNode.classList.remove('open', 'pulse');
   // finalSymbol[1].parentNode.classList.add('match');
   //
   // finalSymbol[0].parentNode.style = 'pointer-events: none';
   // finalSymbol[1].parentNode.style = 'pointer-events: none';

   // deckList.style = 'pointer-events: auto';
  //
  // while (checkedCards.firstChild) {
  //   checkedCards.removeChild(checkedCards.firstChild);}

  removeFragmentCards();
  countScore();

 };

function animateMatch() {

  let animCards = deckList.querySelectorAll('.open');

  animCards[0].classList.add('pulse', 'match');
  animCards[1].classList.add('pulse', 'match');
}

function animateNoMatch() {

  let animatedSymbol = document.querySelectorAll('.open');

  animatedSymbol[0].classList.add('wobble', 'nomatch');
  animatedSymbol[1].classList.add('wobble', 'nomatch');
}

 function checkMatching() {
   let checkedCards = openCardFragment.children;



   if (checkedCards.length <= 1) {
     console.log('open more cards!');
   }
   else if (checkedCards.length > 1 & checkedCards[0].className.toString() === checkedCards[1].className.toString()) {
  console.log('same card');

    deckList.style = 'pointer-events: none';
    increaseCounter();
    matchTimer();

  }

  else {
    console.log('not the same');

    deckList.style = 'pointer-events: none';
    increaseCounter();
    Timer();


    // while (checkedCards.firstChild) {
    //   checkedCards.removeChild(checkedCards.firstChild);
    // }
  }

 }

 function removeFragmentCards() {
   while (openCardFragment.firstChild) {
     openCardFragment.removeChild(openCardFragment.firstChild);
   }

   // remove matched cards from the fragment
   let openCardRemoval = document.querySelectorAll('.open');
   //
   if (openCardRemoval[0]) {
  openCardRemoval[0].classList.remove('open');
  }
  if (openCardRemoval[1]) {
 openCardRemoval[1].classList.remove('open');
 }

 }

// + increment the move counter and display it on the page

let moveNum = 0;
let moveCounter = document.querySelector('.moves');
moveCounter.textContent = 0;

function increaseCounter() {
  moveNum++;
  moveCounter.textContent = moveNum;
};


// + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

let scoreNum = 0;

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

   resetMoves();
   removeFragmentCards();
   createDeck();

}

function resetMoves() {
  scoreNum = 0;
  moveNum = 0;
  moveCounter.textContent = moveNum;
};
