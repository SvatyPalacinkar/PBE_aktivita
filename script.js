const gameBoard = document.getElementById('game-board');
const list = [ 
                { id: "0", duo : "0", src: "img_offline_ups.png"},
                { id: "1", duo : "0", src: "Offline UPS"},
                { id: "2", duo : "1", src: "img_Online_ups.png"},
                { id: "3", duo : "1", src: "Online UPS"},
                { id: "4", duo : "2", src: "img_Line_interactive_ups.png"},
                { id: "5", duo : "2", src: "Line interactive UPS"},
                { id: "6", duo : "3", src: "img_Raid_6.png"},
                { id: "7", duo : "3", src: "RAID 6"},
                { id: "8", duo : "4", src: "img_Bez_VPN.png"},
                { id: "9", duo : "4", src: "Štandartné pripojenie"},
                { id: "10", duo : "10", src: "img_VPN.png"},
                { id: "11", duo : "10", src: "VPN"},
                { id: "12", duo : "11", src: "img_vertikalne_skalovanie.png"},
                { id: "13", duo : "11", src: "Vertikálne škálovanie"},
                { id: "14", duo : "12", src: "img_horizontalne_skalovanie.png"},
                { id: "15", duo : "12", src: "Horizontálne škálovanie"},
                { id: "16", duo : "13", src: "img_enigma.png"},
                { id: "17", duo : "13", src: "Šifrovanie (enigma)"},
            ];
let cards = [], pomoc = [];
let firstCard = null;
let secondCard = null;

const createCard = (cardId, cardClass, imgSrc) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(cardClass);
    cardElement.id = cardId;

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-face', 'card-front');
    if(imgSrc.substring(0,4) == "img_"){
        const cardBack = document.createElement('img');
        cardBack.src = imgSrc;
        cardBack.classList.add('card-face', 'card-back');
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
    }
    else{
        const cardBack = document.createElement('div');
        cardBack.textContent = imgSrc;
        cardBack.classList.add('card-face', 'card-back');
        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
    }
    

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
        console.log("Prvá karta")
        firstCard = this;
    }
    else {
        if (firstCard == this) {
            console.log("Otočenie tej istej karty naspäť")
            firstCard = null;
        }
        else{
            console.log("Druhá karta")
            secondCard = this;
            
            if (firstCard.classList[1] != secondCard.classList[1]) {
                console.log("Karty sa nezhoduju")
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    firstCard = null;
                    secondCard = null;
                }, 250);
            }
            else if (firstCard.id != secondCard.id){
                console.log("Karty sa zhoduju")
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
                firstCard = null;
                secondCard = null;
            }
        }
    }
}

const randomizer = () => {
    let j;
    cards = [];
    pomoc = [];
    pomoc = list.concat();
    for(let i = 0; i < 18; i++){
        j = Math.floor(Math.random() * pomoc.length)
        cards.push(pomoc[j]);
        pomoc.splice(j,1);
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

const reset = () => {
    for (let i = gameBoard.childElementCount; i > 0; i--) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    randomizer();
    for (let i = 0; i < cards.length; i++) {
        const card = createCard(cards[i].id, ("duoID"+cards[i].duo), cards[i].src);
        gameBoard.appendChild(card);
    }
    firstCard = null;
    secondCard = null;
}

randomizer();
for (let i = 0; i < cards.length; i++) {
    const card = createCard(cards[i].id, ("duoID"+cards[i].duo), cards[i].src);
    gameBoard.appendChild(card);
}