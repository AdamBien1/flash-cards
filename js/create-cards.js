// ### IMPORTS & EXPORTS ###
import { customer } from "./base64-imgs.js";
import { displaySignUp, displayLogIn, closeModals } from "./display-modals.js";

// ### VARIABLES ###
const list = document.querySelector("#list");
const form = document.querySelector("#add-card-form");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const cardTitle = document.querySelector("#card-title");
const cardDescription = document.querySelector("#card-description");
const saveCardsBtn = document.querySelector("#save-cards");
const deleteCardsBtn = document.querySelector("#delete-cards");

let localStorageCards;
let passIndex;
let modify = false;
let cards = [];

// ### FUNCTIONS ###
// Determines if user wants to modify existing deck or create a new one
(function () {
  modify = JSON.parse(localStorage.getItem("modify"));

  if (modify) {
    passIndex = JSON.parse(localStorage.getItem("passIndex"));
    localStorageCards = JSON.parse(localStorage.getItem("cards"));

    cardTitle.innerText = localStorageCards[passIndex].title;
    cardDescription.innerText = localStorageCards[passIndex].description;

    localStorageCards[passIndex].body.forEach((card) => {
      cards.push(card);
    });
    init();

    saveCardsBtn.classList.add("modify-cards");
    deleteCardsBtn.classList.add("modify-cards");
  } else {
    init();
    saveCardsBtn.classList.remove("modify-cards");
    deleteCardsBtn.classList.remove("modify-cards");
  }
})();

// Funtions that displays and hides modals
displayLogIn();
displaySignUp();
closeModals();

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

// Creates and displays "li" element of card object
function addCardDOM(card) {
  const item = document.createElement("li");
  item.innerHTML = `
  <button class="close-btn" onclick="removeCard(${card.id})"><i class="fas fa-times"></i></button>
  <span class="text-question">
      <strong>Question: </strong> <span class="question" style="width: 100vw;">${card.question}</span>
  </span>
  <span class="text-answer">
      <strong>Answer: </strong> <span class="answer">${card.answer}</span>
  </span>
          `;

  list.appendChild(item);
}

// Removes card from Array and DOM
window.removeCard = removeCard;
function removeCard(cardID) {
  cards = cards.filter((card) => card.id !== cardID);
  if (isEmpty(cards)) {
    saveCardsBtn.style.cursor = "not-allowed";
  }
  init();
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

// Generates temporary ID (in order to removing it from Array/DOM)
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Checks if cards Array is empty or not
function isEmpty(cardsArr) {
  return cards.length < 1;
}

// Saves completed deck to Local Storage and return to index.html
function saveInLocalStorage(cardsArr, modify) {
  // Pushes new item into LocalStorage
  if (!modify) {
    localStorageCards =
      localStorage.getItem("cards") !== null
        ? JSON.parse(localStorage.getItem("cards"))
        : [];

    let deck = {
      id: localStorageCards.length,
      img: customer,
      title: cardTitle.innerText.trim(),
      author: "user",
      description: cardDescription.innerText.trim(),
      body: cardsArr,
    };

    // Modifies existing decks and overrides LocalStorage item
    localStorageCards.push(deck);
    localStorage.setItem("cards", JSON.stringify(localStorageCards));
    window.location.replace("../html/index.html");
  } else {
    let deck = {
      id: passIndex,
      img: customer,
      title: cardTitle.innerText.trim(),
      author: "user",
      description: cardDescription.innerText.trim(),
      body: cardsArr,
    };

    localStorageCards[passIndex] = deck;
    localStorage.setItem("cards", JSON.stringify(localStorageCards));
    window.location.replace("../html/index.html");
  }
}

// Selects all text when user focuses on contenteditable Title
function selectElementContents(contenteditable) {
  var range = document.createRange();
  range.selectNodeContents(contenteditable);
  var select = window.getSelection();
  select.removeAllRanges();
  select.addRange(range);
}

// Checks if title has been changed and it's not empty
function validateTitle() {
  if (
    cardTitle.innerText.trim() === "Name your deck!" ||
    cardTitle.innerText.trim() === ""
  ) {
    cardTitle.style.borderColor = "#e74c3c";
    return false;
  } else {
    cardTitle.style.borderColor = "#ddf0ff";
    return true;
  }
}

// Checks if description has been changed and it's not empty
function validateDescription() {
  if (
    cardDescription.innerText.trim() ===
      "Deck description: Tell everyone what your custom deck is all about!" ||
    cardDescription.innerText.trim() === ""
  ) {
    cardDescription.style.border = "solid 1px #e74c3c";
    return false;
  } else {
    cardDescription.style.border = "none";
    return true;
  }
}

// ### EVENT LISTENERS ###
// Event listener for "Add Card" button
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addCard();
});

// Listener for saving new or modified card decks in LocalStorage
saveCardsBtn.addEventListener("click", () => {
  if (window.getComputedStyle(saveCardsBtn).cursor !== "not-allowed") {
    if (validateTitle() && validateDescription()) {
      cards = setIDs(cards);
      saveInLocalStorage(cards, modify);
    }
  }
});

// Listener for deleting a card deck from LocalStorage (only in modify-mode)
deleteCardsBtn.addEventListener("click", () => {
  if (modify) {
    localStorageCards.splice(passIndex, 1);
    localStorage.setItem("cards", JSON.stringify(localStorageCards));
    window.location.replace("../html/index.html");
  }
});

// Restrics user for using more characters in the title, than specified
cardTitle.addEventListener("keydown", (e) => {
  const maxLength = parseInt(cardTitle.getAttribute("maxlength"));

  if (cardTitle.innerText.length === maxLength && e.keyCode != 8) {
    e.preventDefault();
  }
});

// Restrics user for using more characters in the description, than specified
cardDescription.addEventListener("keydown", (e) => {
  const maxLength = parseInt(cardDescription.getAttribute("maxlength"));

  if (cardDescription.innerText.length === maxLength && e.keyCode != 8) {
    e.preventDefault();
  }
});

cardTitle.addEventListener("focus", () => selectElementContents(cardTitle));

cardDescription.addEventListener("focus", () =>
  selectElementContents(cardDescription)
);
