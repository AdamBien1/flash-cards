// ### IMPORTS & EXPORTS
import { createMiniature } from "./display-miniatures.js";

export { initCarousel };

// ### VARIABLES ###
const prevBtn = document.querySelector(".prev-arrow");
const nextBtn = document.querySelector(".next-arrow");

// ### FUNCTIONS ###
// initiates all of carousel components according to window size, given carousel is necessary to view all decks
function initCarousel(cardsArr, screenWidth) {
  clearMiniatures();
  displayCarouselBtns(false);
  if (screenWidth >= 1024 && screenWidth < 1440) {
    let startID = 0;
    displayCarouselBtns(howManyCards(screenWidth));
    displayMiniatures(cardsArr, startID, screenWidth);
    disableBtns(cardsArr);

    prevBtn.addEventListener("click", () => {
      if (!prevBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID--;
        displayMiniatures(cardsArr, startID, screenWidth);
        disableBtns(cardsArr);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (!nextBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID++;
        displayMiniatures(cardsArr, startID, screenWidth);
        disableBtns(cardsArr);
      }
    });
  } else if (screenWidth >= 1440) {
    let startID = 0;
    displayCarouselBtns(howManyCards(screenWidth));
    displayMiniatures(cardsArr, startID, screenWidth);
    disableBtns(cardsArr);

    prevBtn.addEventListener("click", () => {
      if (!prevBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID--;
        displayMiniatures(cardsArr, startID, screenWidth);
        disableBtns(cardsArr);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (!nextBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID++;

        displayMiniatures(cardsArr, startID, screenWidth);
        disableBtns(cardsArr);
      }
    });
  } else {
    let startID = 0;
    displayMiniatures(cardsArr, startID, screenWidth);
  }
}

// Displays as many deck miniatures to DOM, as window size  denotes
function displayMiniatures(cardsArr, startID, screenWidth) {
  if (howManyCards(screenWidth) && screenWidth >= 1024 && screenWidth < 1440) {
    for (let i = startID; i <= startID + 1; i++) {
      createMiniature(cardsArr[i]);
    }
  } else if (howManyCards(screenWidth) && screenWidth >= 1440) {
    for (let i = startID; i <= startID + 2; i++) {
      createMiniature(cardsArr[i]);
    }
  } else {
    cardsArr.forEach((card) => {
      createMiniature(card);
    });
  }
}

// Gets rid of deck miniatures in DOM
function clearMiniatures() {
  const miniatures = document.querySelectorAll(".card-miniature");

  miniatures.forEach((miniature) => {
    miniature.remove();
  });
}

// Determines if carousel buttons (next arrow, prev arrow) should be displayed
function displayCarouselBtns(condition) {
  if (condition) {
    prevBtn.classList.add("show");
    nextBtn.classList.add("show");
  } else {
    prevBtn.classList.remove("show");
    nextBtn.classList.remove("show");
  }
}

// Disables buttons (next arrow, prev arrow), when you can't select previous or next element
function disableBtns(cardsArr) {
  let farLeftID = document
    .querySelector(".card-miniature")
    .getAttribute("data-cards-id");
  let farRightID = document
    .querySelector(".card-miniature:last-child")
    .getAttribute("data-cards-id");

  if (parseInt(farLeftID) === 0) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }

  if (parseInt(farRightID) === cardsArr.length - 1) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}

// Check how many card decks are stored in LocalStorage
function howManyCards(screenWidth) {
  const cards = JSON.parse(localStorage.getItem("cards"));

  if (screenWidth >= 1024 && screenWidth < 1440) {
    return cards.length > 2;
  } else if (screenWidth >= 1440) {
    return cards.length > 3;
  }
}
