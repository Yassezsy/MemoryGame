/* ============================================= */
/* ----------------- CONSTANTS ----------------- */
/* ============================================= */
const ROWS = 4;
const COLS = 4;
const GRIDS_N = ROWS * COLS;
const POP_UP = document.getElementById("winPopup");
const POP_UP_CONTENTS = document.getElementById("popupIdContents");

const CARD_GRID = document.getElementById("card_grid");
const THEME_SELECT = document.getElementById("themeSelect");
const BACK_GROUND_1 = document.querySelector(".bg1");
const BACK_GROUND_2 = document.querySelector(".bg2");

const SHOW_HIDE_CARDS_DELAY = 2000;

const SCORE_ADDITIONAL_PER_CARD_RANGE = 50;
let SCORE_PER_CARD = 25 + Math.floor(Math.random() * SCORE_ADDITIONAL_PER_CARD_RANGE);

const themes = {
    Videogames: [
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
    Cartoons: [
        "Temi/Cartoni/bluey.jpg",
        "Temi/Cartoni/doraemon.jpg",
        "Temi/Cartoni/puffi.jpg",
        "Temi/Cartoni/rick_morty.jpg",
        "Temi/Cartoni/Simpson.jpg",
        "Temi/Cartoni/south_park.jpg",
        "Temi/Cartoni/spongebob.jpg",
        "Temi/Cartoni/teen_titans.jpg"
    ],
    Food: [
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
    School: [
        "Temi/Scuola/cartesio.jpg",
        "Temi/Scuola/goldoni.jpg",
        "Temi/Scuola/hopital.jpg",
        "Temi/Scuola/leonardo_da_vinci.jpg",
        "Temi/Scuola/leopardi.jpg",
        "Temi/Scuola/macchiavelli.jpg",
        "Temi/Scuola/napoleone.jpg",
        "Temi/Scuola/newton.jpg"
    ],
    Series: [
        "Temi/Series/boys.jpg",
        "Temi/Series/breaking_good.jpg",
        "Temi/Series/call_saul.jpg",
        "Temi/Series/from.jpg",
        "Temi/Series/neve.jpg",
        "Temi/Series/prison_break.jpg",
        "Temi/Series/text_her.jpg",
        "Temi/Series/twd.jpg",
    ]
};

const Themes = Object.freeze({
   ALBUMS: "Albums",
   ANIME: "Anime",
   CARTOONS: "Cartoons",
   FOOD: "Food",
   SCHOOL: "School",
   VIDEOGAMES: "Videogames",
   SERIES: "Series"
});

const gradients = [
    "var(--purple-fucsia-gradent)",
    "var(--dark-green-gradient)",
    "var(--aqua-gradient)",
    "var(--warm-gradient)",
    "var(--green-gradient)",
    "var(--cyber-blue-purple)",
    "var(--candy-pop)",
    "var(--purple-night)",
    "var(--electric-green)",
    "var(--fire-red)",
    "var(--blood-red)",
    "var(--cyber-red)",
];

function getIRandom(max) { return Math.floor(Math.random() * max); }

/* ============================================== */
/* ----------------- GAME STATE ----------------- */
/* ============================================== */
let cards = [];
let selectedCards = [];
let selectedTheme = themes.Videogames;
let activeBg = 1;
let streak = 0;
let score = 0;
let gameStarted = false;     // FIX 1: aggiunto "let"
let selectedGradient = gradients[0];
let startTime = null;        // FIX 2: startTime inizializzato a null

function shakePage(duration = 400) {
    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, duration);
}

/* ============================================== */
/* -------------------- AUDIO ------------------- */
/* ============================================== */
const VOLUME = 0.2;

const SND_CARD_SWIPE      = "Assets/Sounds/sndCardSwipe.mp3";
const SND_CARD_SWIPE_BACK = "Assets/Sounds/sndCardSwipeBack.mp3";
const SND_INVALID         = "Assets/Sounds/sndInvalid.mp3";
const SND_SCORE_UP        = "Assets/Sounds/sndScoreUp.mp3";
const SND_STREAK_UP       = "Assets/Sounds/sndStreakSound.mp3";

function playSound(src, volume = 1.0) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.play();
}
function playMusic() {
    const music = document.getElementById("bgmusic");
    music.volume = VOLUME * 2;
    music.play();
}

/* ============================================== */
/* ----------------- GAME LOGIC ----------------- */
/* ============================================== */
class Card {
    constructor(img) {
        this.img = img;
        this.found = false;
    }
}

function hideBg(bg) { bg.style.opacity = 0; }
function showBg(bg) { bg.style.opacity = 1; }
function setNewBgGradient(bg, gradient, show = true) {
    bg.style.background = gradient;
    if (show) showBg(bg);
}
function changeGradient() {
    const btn = document.querySelector(".btn");
    const sel = document.querySelector(".selectThemeBox");

    let prevGradient = selectedGradient;
    let newGradient;

    do {
        newGradient = gradients[getIRandom(gradients.length)];
    } while (newGradient === prevGradient);

    selectedGradient = newGradient;

    if (activeBg === 1) {
        setNewBgGradient(BACK_GROUND_2, newGradient);
        hideBg(BACK_GROUND_1);
        activeBg = 2;
    } else {
        setNewBgGradient(BACK_GROUND_1, newGradient);
        hideBg(BACK_GROUND_2);
        activeBg = 1;
    }

    btn.style.setProperty("--selected-gradient", newGradient);
    sel.style.setProperty("--selected-gradient", newGradient);
}
function initThemeSelect() {
    let contents = '<option value="">SCEGLI UN TEMA</option>';
    for (const theme in Themes) {
        let name = Themes[theme];
        contents += createSelectOptionRow(name, name);
    }
    THEME_SELECT.innerHTML = contents;
}

function goToGame() {
    hidePopUp();

    emptyLoadedCards();
    emptyCardGrid();

    changeGradient();
    resetStreak();
    resetScore();
    loadCards();
    createCards();
    showAllCards();
    hideAllCards(SHOW_HIDE_CARDS_DELAY);

    startTime = Date.now();
}
function restartGame() {
    if (!gameStarted) {
        createSimplePopUp("Alright", "Make sure to start a game first...");
        return;
    }

    resetPopUpContents();

    setPopupContents(`
        <h1 id="popUpLabel"></h1>
        <button class="btn" onclick="goToGame()">YES! Cool!</button>
        <button class="btn" onclick="hidePopUp()">NO! Get me back!</button>
    `);

    showPopUp("Restart Game?");
}
function showCards_DEBUG() {
    hidePopUp();
    showAllCards();
    hideAllCards(SHOW_HIDE_CARDS_DELAY);
}
function startGame() {
    if (!gameStarted) gameStarted = true;
    startTime = Date.now(); // FIX 5: timer parte qui
    hidePopUp();
    loadCards();
    createCards();
    showAllCards();
    hideAllCards(SHOW_HIDE_CARDS_DELAY);
    playMusic();
}
function chooseTheme() {
    let selections = document.getElementById("themeSelect");
    let selection = selections.value;

    document.getElementById("logo").style.display = "none"; 

    if (!selection) return; 

    switch (selection) {
        case Themes.ALBUMS:     selectedTheme = themes.Albums;     break;
        case Themes.ANIME:      selectedTheme = themes.Anime;      break;
        case Themes.CARTOONS:   selectedTheme = themes.Cartoons;   break;
        case Themes.FOOD:       selectedTheme = themes.Food;       break;
        case Themes.SCHOOL:     selectedTheme = themes.School;     break;
        case Themes.VIDEOGAMES: selectedTheme = themes.Videogames; break;
        case Themes.SERIES:     selectedTheme = themes.Series;     break;
    }

    showSelectedThemePopUp("Theme<br>" + selection + "<br>succesfully set!");
}
function emptyLoadedCards()  { cards = []; }
function emptyCardGrid()     { CARD_GRID.innerHTML = ""; }
function insertCardCouple(card) {
    cards.push(new Card(card));
    cards.push(new Card(card));
}
function rearrangeCards() { cards.sort(() => Math.random() - 0.5); }
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
        CARD_GRID.innerHTML += `
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
    emptyCardGrid();
    setUpGrid();
}
function showAllCards() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(card => { flipCard(card); });
}
function hideAllCards(delay = 500) {
    const allCards = document.querySelectorAll(".card");
    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove("flipped");
        });
        playSound(SND_CARD_SWIPE_BACK, VOLUME);
    }, delay);
}
function hideCardCouple(cardElements, c1, c2, delay = 500) {
    setTimeout(() => {
        cardElements[c1.index].classList.remove("flipped");
        cardElements[c2.index].classList.remove("flipped");
        playSound(SND_CARD_SWIPE_BACK, VOLUME);
    }, delay);
}
function flipCard(card) { card.classList.add("flipped"); }
function cardIsFlipped(card) { return card.classList.contains("flipped"); }
function cardsAreEquals(card1, card2) { return cards[card1.index].img === cards[card2.index].img; }
function obtainPoints() { return SCORE_PER_CARD * 2; }
function resetScore() {
    score = 0;
    updateScoreLabel();
}
function updateScoreLabel() { document.getElementById("scoreLabel").textContent = `Punteggio: ${score}`; }
function streakFX() {
    playSound(SND_STREAK_UP, VOLUME);
    shakePage();
}
function scoreUp(additionalScore = 0) {
    if (isOnStreak()) streakFX();
    playSound(SND_SCORE_UP, VOLUME);
    score += obtainPoints() + additionalScore;
    updateScoreLabel();
}
function isOnStreak()        { return streak >= 1; }
function resetStreak()       { streak = 0; }
function resetSelectedCards(){ selectedCards = []; }
function selectCard(index) {
    let cardElements = document.querySelectorAll(".card");
    let cardEl = cardElements[index];

    if (!cards[index]) return;

    if (cardIsFlipped(cardEl) || cards[index].found) {
        playSound(SND_INVALID, VOLUME);
        shakePage(200);
        return;
    }

    if (selectedCards.length >= 2) return;

    flipCard(cardEl);
    playSound(SND_CARD_SWIPE, VOLUME);
    selectedCards.push({ index, card: cards[index] });

    if (selectedCards.length === 2) {
        let a = selectedCards[0];
        let b = selectedCards[1];

        if (cardsAreEquals(a, b)) {
            cards[a.index].found = true;
            cards[b.index].found = true;
            scoreUp( getIRandom(500) * streak );
            streak += 1;
            checkWin();
        } else {
            hideCardCouple(cardElements, a, b);
            resetStreak();
        }
        resetSelectedCards();
    }
}
function createSelectOptionRow(value, txt) { return '<option value="' + value + '"> ' + txt + ' </option>'; }
function checkWin() {
    if (cards.length === 0) return;
    let allFound = cards.every(c => c.found === true);
    if (allFound) { showWinPopup(); }
}

/* ============================================== */
/* ------------------ POP UP LOGIC -------------- */
/* ============================================== */

function resetPopUpContents() { POP_UP_CONTENTS.innerHTML = ""; }
function setPopupContents(contents) { POP_UP_CONTENTS.innerHTML = contents; }
function createSimplePopUp(label, msg) {
    resetPopUpContents();
    setPopupContents(`
        <h1 id="popUpLabel"></h1>
        <button class="btn" onclick="hidePopUp()">${label}</button>
    `);

    showPopUp(msg);
}
function showPopUp(label) {
    POP_UP.classList.add("show");
    document.getElementById("popUpLabel").innerHTML = label;
}

function showShowHideCardsPopUp() {
    resetPopUpContents();

    setPopupContents(`
        <h1 id="popUpLabel"></h1>
        <button class="btn" onclick="showCards_DEBUG()">Show/Hide</button>
        <button class="btn" onclick="hidePopUp()">Do not</button>
    `);

    if (!gameStarted) {
        createSimplePopUp("Alright", "Be sure to start a game first...");
        return;
    }

    showPopUp("This will show all the cards. All the cards you found will be flipped as well...");
}

function hidePopUp() { POP_UP.classList.remove("show"); }
function showSelectedThemePopUp(msg) {
    resetPopUpContents();

    setPopupContents(`
        <h1 id="popUpLabel"></h1>
        <button class="btn" onclick="startGame()">Start Game</button>
    `);

    showPopUp(msg);
}
function showWinPopup(winMsg = "🏆 You WON!") {
    resetPopUpContents();

    let endTime = Date.now();
    let timeTaken = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
    setPopupContents(`
        <h1 id="popUpLabel"></h1>
        <p id="popupScore"></p>
        <p id="popupTime"></p>
        <button class="btn" onclick="restartGame()">Play Again</button>
    `);

    document.getElementById("popupScore").textContent = "Score: " + score;
    document.getElementById("popupTime").textContent  = "Time: " + timeTaken + "s";

    showPopUp(winMsg);
}

initThemeSelect();