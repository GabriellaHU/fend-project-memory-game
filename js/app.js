// new array to hold all card icon classes
// TODO get rid off duplications
const cardIconClasses = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-bomb', 'fa-leaf', 'fa-bicycle']



function createDeck() {


   // * Create a list that holds all of my cards
  const deckList = document.createElement('ul');
  deckList.classList.add('deck');

 // shuffle the list of cards using the provided "shuffle" method below

  // loop through each card and create its HTML
  for (let cardNum = 0; cardNum < 16; cardNum++) {
     const newCard = document.createElement('li');
     newCard.classList.add('card', 'match');

     // newCard.textContent = 'number' + (cardNum+1);
     const newIcon = document.createElement('i');
     // newIcon.insertAdjacentText('afterbegin', (cardNum+1));

     let iconNum = cardIconClasses[cardNum];
     console.log(iconNum);
     newIcon.classList.add('fa', iconNum);

     newCard.appendChild(newIcon);
     deckList.appendChild(newCard);

   }

  // add each card's HTML to the page
  document.body.querySelector('.container').appendChild(deckList);

  // shuffle();

}

createDeck();



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cardArray) {

  // access and store the children of the deckList in the DOM
  let deckList = document.querySelector('.deck');
  // console.log(deckList.children);
  let cardNodeList = document.querySelectorAll('.card');
  // console.log(cardNodeList);

  // convert NodeList to Array
  let cardArray = [];
  for(let i = cardNodeList.length; i--; cardArray.unshift(cardNodeList[i]));

  let currentIndex = cardArray.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = temporaryValue;
    }

  return cardArray;

  document.body.querySelector('.container').querySelector('.deck').removeChildren();
  console.log('hurray');

 //  for (let newCardNum = 0; newCardNum < 16; newCardNum++) {
 //     deckList.appendChild(cardNodeList[newCardNum]);
 // }

}




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
