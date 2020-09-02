import { customer } from "./base64-imgs.js";

const list = document.querySelector("#list");
const form = document.querySelector("#add-card-form");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const cardTitle = document.querySelector("#card-title");
const saveCardsBtn = document.querySelector("#save-cards");

let cards = [];

// Restrics user for using more characters in the title, than specified
cardTitle.addEventListener("keydown", (e) => {
  const maxLength = parseInt(cardTitle.getAttribute("maxlength"));
  console.log(cardTitle.innerText.length);

  if (cardTitle.innerText.length === maxLength && e.keyCode != 8) {
    e.preventDefault();
  }
});

cardTitle.addEventListener("focus", () => selectElementContents(cardTitle));

saveCardsBtn.addEventListener("click", () => {
  if (window.getComputedStyle(saveCardsBtn).cursor !== "not-allowed") {
    cards = setIDs(cards);
    saveInLocalStorage(cards);
  }
});

// Selects all text when user focuses on contenteditable Title
function selectElementContents(contenteditable) {
  var range = document.createRange();
  range.selectNodeContents(contenteditable);
  var select = window.getSelection();
  select.removeAllRanges();
  select.addRange(range);
}

// Event listener for "Add Card" button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addCard();
  console.log("submit");
  console.log(cards);
});

init();

// Loads cards from Array
function init() {
  list.innerHTML = "";
  cards.forEach((card) => addCardDOM(card));
}

// Creates card object and adds it to the Array
function addCard(e) {
  //   e.preventDefault();
  if (question.value.trim() === "" || answer.value.trim() === "") {
    question.value.trim() === ""
      ? (question.style.borderColor = "#e74c3c")
      : (question.style.borderColor = "#262626");
    answer.value.trim() === ""
      ? (answer.style.borderColor = "#e74c3c")
      : (answer.style.borderColor = "#262626");
  } else {
    const card = {
      id: generateID(),
      question: question.value.trim(),
      answer: answer.value.trim(),
    };

    cards.push(card);
    if (!isEmpty(cards)) {
      saveCardsBtn.style.cursor = "pointer";
    }
    addCardDOM(card);
    question.value = "";
    question.style.borderColor = "#262626";
    answer.value = "";
    answer.style.borderColor = "#262626";
  }
}

// Generates temporary ID (in order to removing it from Array/DOM)
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Removes card from Array and DOM
function removeCard(cardID) {
  cards = cards.filter((card) => card.id !== cardID);
  if (!isEmpty(cards)) {
    saveCardsBtn.style.cursor = "not-allowed";
  }
  init();
}

window.removeCard = removeCard;

// Creates and displays "li" element of card object
function addCardDOM(card) {
  const item = document.createElement("li");
  item.innerHTML = `
  <button class="close-btn" onclick="removeCard(${card.id})"><i class="fas fa-times"></i></button>
  <span class="text-question">
      <strong>Question: </strong> <span class="question">${card.question}</span>
  </span>
  <span class="text-answer">
      <strong>Answer: </strong> <span class="answer">${card.answer}</span>
  </span>
          `;

  list.appendChild(item);
}

// Checks if cards Array is empty or not
function isEmpty(cardsArr) {
  cardsArr.length < 1 ? true : false;
}

// Sets proper IDs for ready-to-save cards deck
function setIDs(cardsArr) {
  if (!isEmpty(cardsArr)) {
    for (let i = 0; i < cardsArr.length; i++) {
      cardsArr[i].id = i;
    }

    return cardsArr;
  }
}

// Saves completed deck to Local Storage and return to index.html
function saveInLocalStorage(cardsArr) {
  let localStorageCards =
    localStorage.getItem("cards") !== null
      ? JSON.parse(localStorage.getItem("cards"))
      : [];

  let deck = {
    id: localStorageCards.length,
    img: customer,
    title: cardTitle.innerText.trim(),
    author: "user",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad voluptas ipsam dolor!",
    body: cardsArr,
  };

  localStorageCards.push(deck);
  console.log(localStorageCards);
  localStorage.setItem("cards", JSON.stringify(localStorageCards));
  window.location.replace("../html/index.html");
}
