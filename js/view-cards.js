// ### IMPORTS & EXPORTS
import { displaySignUp, displayLogIn, closeModals } from "./display-modals.js";

// ### VARIABLES ###
const cardsContainer = document.querySelector("#cards-container");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const currentEl = document.querySelector("#current");
const hamburgerToggler = document.querySelector(".toggler");
let passIndex;

let currentActiveCard = 0;
const cardsEl = [];
const cardsData = getCardsData();

// ### FUNCTIONS ###
// Searches for passIndex to display proper cards
(function () {
  passIndex = localStorage.getItem("passIndex");
})();
createCards();

// Funtions that displays and hides modals
displaySignUp();
displayLogIn();
closeModals();

// Returns cards data from LocalStorage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Creates card element
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
  </div>
    `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
}

// Displays cards in DOM
function createCards() {
  cardsData[passIndex].body.forEach((data, index) => createCard(data, index));
}

// Updates index of card displayed
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// ### EVENT LISTENERS ###
// Shuffles to the next card
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard++;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// Shuffles to the previous card
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard--;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";
  updateCurrentText();
});

// Disable scrolling on hamburger toggle
hamburgerToggler.addEventListener("change", () => {
  if (hamburgerToggler.checked) {
    document.body.classList.add("stop-scrolling");
  } else {
    document.body.classList.remove("stop-scrolling");
  }
});
