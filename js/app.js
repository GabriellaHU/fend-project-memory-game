/*
 * Create a list that holds all of your cards
 */
function createDeck() {

  const deckList = document.createElement('ul');
  deckList.classList.add('deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

  for (let cardNum = 0; cardNum < 16; cardNum++) {
     const newCard = document.createElement('li');
     newCard.classList.add('card');

     deckList.appendChild(newCard);
   }

   document.body.querySelector('.container').appendChild(deckList);

}

createDeck();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle() {

  // access and store the children of the deckList in the DOM
  const cardNodeList = document.querySelectorAll('.card');
  // console.log(cardNodeList);

  // convert NodeList to Array
  let cardArray = [];
  for(let i = cardNodeList.length; i--; cardArray.unshift(cardNodeList[i]));
  console.log(cardArray);
  // console.log(cardArray.length);

  var currentIndex = cardArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = temporaryValue;
    }

    return cardArray;
}

shuffle();


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
