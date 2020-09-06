import { createMiniature } from "./display-miniatures.js";

export { initCarousel };

const prevBtn = document.querySelector(".prev-arrow");
const nextBtn = document.querySelector(".next-arrow");

function moreThanThreeDecks() {
  let nDecks = 0;
  const cards = JSON.parse(localStorage.getItem("cards"));

  return cards.length > 3 ? true : false;
}

function displayCarouselBtns(condition) {
  if (condition) {
    prevBtn.classList.add("show");
    nextBtn.classList.add("show");
  } else {
    prevBtn.classList.remove("show");
    nextBtn.classList.remove("show");
  }
}

function displayThreeDecks(cardsArr, startID) {
  if (moreThanThreeDecks()) {
    for (let i = startID; i <= startID + 2; i++) {
      createMiniature(cardsArr[i]);
    }
  } else {
    displayAllDecks(cardsArr);
  }
}

function displayAllDecks(cardsArr) {
  cardsArr.forEach((card) => {
    createMiniature(card);
  });
}

function disableArrows(cardsArr) {
  let farLeftID = document
    .querySelector(".card-miniature")
    .getAttribute("data-cards-id");
  let farRightID = document
    .querySelector(".card-miniature:last-child")
    .getAttribute("data-cards-id");

  console.log(farLeftID, farRightID);

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

function clearMiniatures() {
  const miniatures = document.querySelectorAll(".card-miniature");

  miniatures.forEach((miniature) => {
    miniature.remove();
  });
}

function initCarousel(cardsArr, screenWidth) {
  if (screenWidth > 480) {
    let startID = 0;
    displayCarouselBtns(moreThanThreeDecks());
    displayThreeDecks(cardsArr, startID);
    disableArrows(cardsArr);

    prevBtn.addEventListener("click", () => {
      if (!prevBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID--;
        displayThreeDecks(cardsArr, startID);
        disableArrows(cardsArr);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (!nextBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID++;
        displayThreeDecks(cardsArr, startID);
        disableArrows(cardsArr);
      }
    });
  } else {
    displayAllDecks(cardsArr);
  }
}
