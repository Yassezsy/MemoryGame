const ROWS = 4;
const COLS = 4;
const GRIDS_N = ROWS * COLS;

const images = [
    "Temi/Videogiochi/brawl_stars.jpg",
    "Temi/Videogiochi/fortnite.jpg",
    "Temi/Videogiochi/moco.jpg",
    "Temi/Videogiochi/rocket_league.jpg",
    "Temi/Videogiochi/sakte.jpg",
    "Temi/Videogiochi/undertale.jpg",
    "Temi/Videogiochi/geomtry_dash.jpg",
    "Temi/Videogiochi/roblox.jpg"
];

let cards = [];
let selectedCards = [];

class Card {
    constructor(img) {
        this.img = img;
        this.found = false;
    }
}

function insertCardCouple(card) {
    cards.push(new Card(card));
    cards.push(new Card(card));
}

function rearrangeCards() {
    cards.sort(() => Math.random() - 0.5);
}

function generateCards() {
    cards = [];

    for (let i = 0; i < GRIDS_N / 2; i++) {
        let img = images[i];
        insertCardCouple(img);
    }

    rearrangeCards();
}

function createCards() {
    const grid = document.getElementById("card_grid");
    grid.innerHTML = "";

    cards.forEach((card, index) => {
        grid.innerHTML += `
            <div class="card" onclick="selectCard(${index})">
                <div class="inner">
                    <img class="front" src="back_card.jpg">
                    <img class="back" src="${card.img}">
                </div>
            </div>
        `;
    });
}

function hideCardCouple(cardElements, c1, c2, delay = 500) {
    setTimeout(() => {
        cardElements[c1.index].classList.remove("flipped");
        cardElements[c2.index].classList.remove("flipped");
    }, delay);
}

function cardIsFlipped(card) {
    return card.classList.contains("flipped");
}

function cardsAreEquals(card1, card2) {
    return cards[card1.index].img === cards[card2.index].img;
}

function selectCard(index) {

    let cardElements = document.querySelectorAll(".card");
    let cardEl = cardElements[index];

    if (cardIsFlipped(cardEl)) return;

    cardEl.classList.add("flipped");

    selectedCards.push({ index, card: cards[index] });

    if (selectedCards.length === 2) {

        let a = selectedCards[0];
        let b = selectedCards[1];

        if (cardsAreEquals(a, b)) {
            cards[a.index].found = true;
            cards[b.index].found = true;
        } else hideCardCouple(cardElements, a, b);

        selectedCards = [];
    }
}

generateCards();
createCards();