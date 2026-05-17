const ROWS = 4;
const COLS = 4;
const GRIDS_N = ROWS * COLS;

const STYLES = Object.freeze({
    ALBUMS: "Albums",// Can't rush greatness,
    CARTOONS: "Cartoons", //
    FOOD: "Food",
    SCHOOL: "School", //leopardi, goldoni
    ANIME: "Anime",// Goku kid, itadori yuji
    VIDEOGAMES: "Videogames" //Brawl stars, Fortnite
});

let STYLE = STYLES.FOOD;

class Card {
    constructor(img) {
        this.img = img;
        this.selected = false;
        this.MAX_INSERTIONS = 2;
        this.inserted = 0;
    }
}

let cards = [];
let selectedCards = [];

function loadCards(cardStyle) {
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            let c = new Card("mkozxqcsgoxc1.jpeg");
            cards.push(c);
        }
    }
}

loadCards();

function resetSelectedCards() {
    selectedCards = [];
}

function cardsAreEquals() {

}

function selectCard() {

}


function cardPositionIsValid(cardPos) {

}


function canInsertCardCouple(card) {

}


function generateCardsCouples() {

}

cards.sort(() => Math.random() - 0.5);


function createCard(index) {
    let grid = document.getElementById("card_grid");
    let card = cards[index];

    grid.innerHTML += '<div><img src="' + card.img + '"></div>';
}

function createCards() {
    for (let i = 0; i < GRIDS_N; i++) createCard(i);
}

createCards();