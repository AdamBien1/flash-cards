// VIEW-CARDS.HTML VARS
const cardsContainer = document.querySelector("#cards-container");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const currentEl = document.querySelector("#current");
const questionEl = document.querySelector("#question");
const answerEl = document.querySelector("#answer");
let passIndex;

let currentActiveCard = 0;
const cardsEl = [];
const cardsData = getCardsData();

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

// Updates index of card displayed
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Returns cards data from LOCAL STORAGE
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Displays cards in DOM
function createCards() {
  cardsData[passIndex].body.forEach((data, index) => createCard(data, index));
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

// Searches for passIndex to display proper cards
(function () {
  passIndex = localStorage.getItem("passIndex");
})();
console.log(passIndex);
console.log(cardsData);
createCards();
