import { createMiniature } from "./display-miniatures.js";
import { greatBritain } from "./base64-imgs.js";

export { initCarousel };

const prevBtn = document.querySelector(".prev-arrow");
const nextBtn = document.querySelector(".next-arrow");

function howManyCards(screenWidth) {
  const cards = JSON.parse(localStorage.getItem("cards"));

  if (screenWidth > 768 && screenWidth <= 1024) {
    return cards.length > 2 ? true : false;
  } else if (screenWidth > 1024) {
    return cards.length > 3 ? true : false;
  }
}

function displayCarouselBtns(condition) {
  console.log(condition);
  if (condition) {
    prevBtn.classList.add("show");
    nextBtn.classList.add("show");
  } else {
    prevBtn.classList.remove("show");
    nextBtn.classList.remove("show");
  }
}

function displayDecks(cardsArr, startID, screenWidth) {
  if (howManyCards(screenWidth) && screenWidth > 768 && screenWidth <= 1024) {
    for (let i = startID; i <= startID + 1; i++) {
      createMiniature(cardsArr[i]);
    }
  } else if (howManyCards(screenWidth) && screenWidth >= 1024) {
    for (let i = startID; i <= startID + 2; i++) {
      createMiniature(cardsArr[i]);
    }
  } else {
    cardsArr.forEach((card) => {
      createMiniature(card);
    });
  }
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
  if (screenWidth > 768 && screenWidth <= 1024) {
    console.log("tablet " + howManyCards(screenWidth));
    let startID = 0;
    displayCarouselBtns(howManyCards(screenWidth));
    displayDecks(cardsArr, startID, screenWidth);
    disableArrows(cardsArr);

    prevBtn.addEventListener("click", () => {
      if (!prevBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID--;
        displayDecks(cardsArr, startID, screenWidth);
        disableArrows(cardsArr);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (!nextBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID++;
        console.log(startID);
        displayDecks(cardsArr, startID, screenWidth);
        disableArrows(cardsArr);
      }
    });
  } else if (screenWidth > 1024) {
    let startID = 0;
    displayCarouselBtns(howManyCards(screenWidth));
    displayDecks(cardsArr, startID, screenWidth);
    disableArrows(cardsArr);

    prevBtn.addEventListener("click", () => {
      if (!prevBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID--;
        displayDecks(cardsArr, startID, screenWidth);
        disableArrows(cardsArr);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (!nextBtn.classList.contains("disabled")) {
        clearMiniatures();
        startID++;

        displayDecks(cardsArr, startID, screenWidth);
        disableArrows(cardsArr);
      }
    });
  } else {
    console.log("mobile");
    let startID = 0;
    displayDecks(cardsArr, startID, screenWidth);
  }
}
