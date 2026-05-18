const ROWS = 4;
const COLS = 4;
const GRIDS_N = ROWS * COLS;


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
    ]
};

let cards = [];
let selectedCards = [];
let selectedTheme = themes.Videogiochi;
let SCORE_PER_CARD = 25;
let score = 0;

class Card {
    constructor(img) {
        this.img = img;
        this.found = false;
    }
}

function chooseTheme() {
    let selections = document.getElementById("themeSelect");
    let selection = selections.value;

    if (selection == "Albums") {
        selectedTheme = themes.Albums;
    } else if (selection == "Anime") {
        selectedTheme = themes.Anime;
    } else if (selection == "Cartoni") {
        selectedTheme = themes.Cartoni;
    } else if (selection == "Cibo") {
        selectedTheme = themes.Cibo;
    } else if (selection == "Scuola") {
        selectedTheme = themes.Scuola;
    } else if (selection == "Videogiochi") {
        selectedTheme = themes.Videogiochi;
    }

    alert("Tema " + selection + " perfettamente impostato!");

   loadCards();
   createCards();
}

function emptyLoadedCards() {
    cards = [];
}

function insertCardCouple(card) {
    cards.push(new Card(card));
    cards.push(new Card(card));
}

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

function createCards() {
    const grid = document.getElementById("card_grid");
    grid.innerHTML = "";

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

function obtainPoints() {
    return SCORE_PER_CARD * 2;
}

function updateScoreLabel() {
    document.getElementById("scoreLabel").textContent = `Punteggio: ${score}`;
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
            score += obtainPoints();
            updateScoreLabel();
        } else hideCardCouple(cardElements, a, b);

        selectedCards = [];
    }
}

