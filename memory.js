const ROWS = 4;
const COLS = 4;
const GRIDS_N = ROWS * COLS;

const CARD_GRID = document.getElementById("card_grid");

let SCORE_PER_CARD = 25;
let score = 0;

const VOLUME = 0.2;

const SND_CARD_SWIPE = "Assets/Sounds/sndCardSwipe.mp3";
const SND_CARD_SWIPE_BACK = "Assets/Sounds/sndCardSwipeBack.mp3";
const SND_INVALID = "Assets/Sounds/sndInvalid.mp3";
const SND_SCORE_UP = "Assets/Sounds/sndScoreUp.mp3";

function playSound(src, volume = 1.0) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.play();
}

const themes = {
    Videogiochi: [
        "Temi/Videogiochi/brawl_stars.jpg",
        "Temi/Videogiochi/fortnite.jpg",
        "Temi/Videogiochi/moco.jpg",
        "Temi/Videogiochi/rocket_league.jpg",
        "Temi/Videogiochi/sakte.jpg",
        "Temi/Videogiochi/undertale.jpg",
        "Temi/Videogiochi/geomtry_dash.jpg",
        "Temi/Videogiochi/roblox.jpg"
    ],
    Anime: [
        "Temi/Anime/aot.jpg",
        "Temi/Anime/blue_lock.jpg",
        "Temi/Anime/chainsaw_man.jpg",
        "Temi/Anime/death_note.jpg",
        "Temi/Anime/dragon_ball.jpg",
        "Temi/Anime/jujutsu.jpg",
        "Temi/Anime/lain.jpg",
        "Temi/Anime/naruto.jpg"
    ],
    Cartoni: [
        "Temi/Cartoni/bluey.jpg",
        "Temi/Cartoni/doraemon.jpg",
        "Temi/Cartoni/puffi.jpg",
        "Temi/Cartoni/rick_morty.jpg",
        "Temi/Cartoni/Simpson.jpg",
        "Temi/Cartoni/south_park.jpg",
        "Temi/Cartoni/spongebob.jpg",
        "Temi/Cartoni/teen_titans.jpg"
    ],
    Cibo: [
            "Temi/Cibo/burger.jpg",
            "Temi/Cibo/carbonara.jpg",
            "Temi/Cibo/chocolate_strawberry.jpg",
            "Temi/Cibo/cous_cous.jpg",
            "Temi/Cibo/lasagne.jpg",
            "Temi/Cibo/pizza.jpg",
            "Temi/Cibo/sushi.jpg",
            "Temi/Cibo/tiramisu.jpg"
    ],
    Albums: [
        "Temi/Albums/central_cee.jpg",
        "Temi/Albums/dark_side_of_the_moon.jpg",
        "Temi/Albums/doja.jpg",
        "Temi/Albums/doors.jpg",
        "Temi/Albums/leteralus.jpg",
        "Temi/Albums/nirvana.jpg",
        "Temi/Albums/scorpion.jpg",
        "Temi/Albums/un_verano.png"
    ],
    Scuola: [
        "Temi/Scuola/cartesio.jpg",
        "Temi/Scuola/goldoni.jpg",
        "Temi/Scuola/hopital.jpg",
        "Temi/Scuola/leonardo_da_vinci.jpg",
        "Temi/Scuola/leopardi.jpg",
        "Temi/Scuola/macchiavelli.jpg",
        "Temi/Scuola/napoleone.jpg",
        "Temi/Scuola/newton.jpg"
    ],
};

let cards = [];
let selectedCards = [];
let selectedTheme = themes.Videogiochi;

class Card {
    constructor(img) {
        this.img = img;
        this.found = false;
    }
}

const Themes = Object.freeze({
   ALBUMS: "Albums",
   ANIME: "Anime",
   CARTONI: "Cartoni",
   CIBO: "Cibo",
   SCUOLA: "Scuola",
   VIDEOGIOCHI: "Videogiochi",
});

function restartGame() {
    emptyLoadedCards();
    emptyCardGrid();

    loadCards();
    createCards();
}

function chooseTheme() {
    let selections = document.getElementById("themeSelect");
    let selection = selections.value;

    switch (selection) {
        case Themes.ALBUMS: selectedTheme = themes.Albums; break;
        case Themes.ANIME: selectedTheme = themes.Anime; break;
        case Themes.CARTONI: selectedTheme = themes.Cartoni; break;
        case Themes.CIBO: selectedTheme = themes.Cibo; break;
        case Themes.SCUOLA: selectedTheme = themes.Scuola; break;
        case Themes.VIDEOGIOCHI: selectedTheme = themes.Videogiochi; break;
    }

    alert("Tema " + selection + " perfettamente impostato!");
    loadCards();
    createCards();
}

/*

    QUANDO SI SVUOTA LA LISTA DI CARTE,
    LA TABELLA RESTA ANCORA CON LE INFORMAZIONI DI PRIMA.
    BISOGNA MODIFICARE .innerHTML della GRIGLIA per
    SVUOTARLA EFFETTIVAMENTE.

*/

function emptyLoadedCards() {
    cards = [];
}

function emptyCardGrid() {
    CARD_GRID.innerHTML = "";
}

function insertCardCouple(card) {
    cards.push(new Card(card));
    cards.push(new Card(card));
}

/*
    QUANDO SI MODIFICA LA L'ARRAY DI CARTE,
    BISOGNA ANCHE MODIFICARE LA GRIGLIA.
    L'ARRAY SI RESETTA, MA LE INFORMAZIONI DELLA GRIGLIA
    RIMANGONO INVARIATE.
    fare domani (oggi)
*/

function rearrangeCards() {
    cards.sort(() => Math.random() - 0.5);
}

function loadCards() {
    emptyLoadedCards();

    for (let i = 0; i < GRIDS_N / 2; i++) {
        let img = selectedTheme[i];
        insertCardCouple(img);
    }

    rearrangeCards();
}

function setUpGrid() {
    cards.forEach((card, index) => {
        grid.innerHTML += `
            <div class="card" onclick="selectCard(${index})">
                <div class="inner">
                    <img class="front" src="Assets/back_card.jpg">
                    <img class="back" src="${card.img}">
                </div>
            </div>
        `;
    });
}

function createCards() {
    CARD_GRID.innerHTML = "";
    setUpGrid();
}

function hideCardCouple(cardElements, c1, c2, delay = 500) {
    setTimeout(() => {
        cardElements[c1.index].classList.remove("flipped");
        cardElements[c2.index].classList.remove("flipped");
        playSound(SND_CARD_SWIPE_BACK, VOLUME);
    }, delay);
}

function cardIsFlipped(card) {
    return card.classList.contains("flipped");
}

function cardsAreEquals(card1, card2) {
    return cards[card1.index].img === cards[card2.index].img;
}

function obtainPoints() {
    return SCORE_PER_CARD * 2;
}

function scoreUp(additionalScore = 0) {
    playSound(SND_SCORE_UP, VOLUME);
    score += obtainPoints() + additionalScore;
    updateScoreLabel();
}

function updateScoreLabel() {
    document.getElementById("scoreLabel").textContent = `Punteggio: ${score}`;
}

function selectCard(index) {

    let cardElements = document.querySelectorAll(".card");
    let cardEl = cardElements[index];

    if (cardIsFlipped(cardEl)) {
        playSound(SND_INVALID, VOLUME);
        return;
    }

    cardEl.classList.add("flipped");

    playSound(SND_CARD_SWIPE, VOLUME);

    selectedCards.push({ index, card: cards[index] });

    if (selectedCards.length === 2) {

        let a = selectedCards[0];
        let b = selectedCards[1];

        if (cardsAreEquals(a, b)) {
            cards[a.index].found = true;
            cards[b.index].found = true;
            scoreUp();
        } else hideCardCouple(cardElements, a, b);

        selectedCards = [];
    }
}