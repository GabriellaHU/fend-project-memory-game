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
     newCard.classList.add('card');

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

function removeFragmentCards() {
  while (openCardFragment.firstChild) {
    openCardFragment.removeChild(openCardFragment.firstChild);
  }
}

const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function () {
  console.log('The restart button was clicked!');
  createDeck();
  removeFragmentCards();
  });



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var openCardFragment = document.createDocumentFragment();

 deckList.addEventListener('click', function(e) {
   if (e.target.className != 'deck' ) {
    e.target.classList.add('open');

    var clonedCard = e.target.cloneNode();
    openCardFragment.appendChild(clonedCard);
   }

 }, );
