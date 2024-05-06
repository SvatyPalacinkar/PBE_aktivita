const gameBoard = document.getElementById('game-board');
const cards = [ { id: "0", duo : "0"},   { id: "1", duo : "1"},   { id: "2", duo : "2"},
                { id: "3", duo : "2"},   { id: "4", duo : "0"},   { id: "5", duo : "4"},
                { id: "6", duo : "3"},   { id: "7", duo : "3"},   { id: "8", duo : "1"},
                { id: "9", duo : "4"},   { id: "10", duo : "10"}, { id: "11", duo : "11"},
                { id: "12", duo : "12"}, { id: "13", duo : "12"}, { id: "14", duo : "10"},
                { id: "15", duo : "14"}, { id: "16", duo : "13"}, { id: "17", duo : "13"},
                { id: "18", duo : "11"}, { id: "19", duo : "14"} ];

let firstCard = null;
let secondCard = null;

const createCard = (cardText, cardId, cardClass) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(cardClass);
    cardElement.id = cardId;

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-front');
    cardFront.textContent = cardText;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-face', 'card-back');

    cardElement.appendChild(cardFront);
    cardElement.appendChild(cardBack);

    cardElement.addEventListener('click', flipCard);

    return cardElement;
}

function flipCard(){
    
    if (is_in('flip', this.classList)) {
        this.classList.remove('flip');
    }
    else {
        this.classList.add('flip');
    }
    if (firstCard == null) {
        firstCard = this;
    }
    else {
        if ( firstCard == this) {
            firstCard = null;
        }
        else{

            secondCard = this;
            
            if (firstCard.classList[1] != secondCard.classList[1]) {
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    firstCard = null;
                    secondCard = null;
                }, 250);
            }
            else if (firstCard.id != secondCard.id){
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
                firstCard = null;
                secondCard = null;
            }
        }
    }
}

const is_in = (text, list) => {
    let output = false;
    list.forEach(element => {
        if (text == element){
            output = true;
        }
    });
    return output
}

for (let i = 0; i < cards.length; i++) {
    const card = createCard(/*card text*/cards[i].duo, cards[i].id, ("duoID"+cards[i].duo));
    gameBoard.appendChild(card);
}

const reset = () => {
    for ( let card of gameBoard.children ) {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    }
    firstCard = null;
    secondCard = null;
}