// ### IMPORTS & EXPORTS ###
import { greatBritain, germany } from "./base64-imgs.js";
import { initCarousel } from "./carousel.js";
import { openCreatePage } from "./display-miniatures.js";
import { displaySignUp, displayLogIn, closeModals } from "./display-modals.js";

// ### VARIABLES ###
const createNewBtn = document.querySelector("#create-new");
const hamburgerToggler = document.querySelector(".toggler");
let screenWidth;
let screenType;
let cards;

const hardCodedCards = [
  {
    id: 0,
    img: greatBritain,
    title: "Basic English",
    author: "hard-coded",
    description: "5 basic english words",
    body: [
      {
        id: 0,
        question: "a son or daughter",
        answer: "a child",
      },
      {
        id: 1,
        question: "the study of past events",
        answer: "history",
      },
      {
        id: 2,
        question: "the earth and its people",
        answer: "world",
      },
      {
        id: 3,
        question: "a large town",
        answer: "city",
      },
      {
        id: 4,
        question: "someone who performs in a movie or play",
        answer: "actor",
      },
    ],
  },
  {
    id: 1,
    img: germany,
    title: "Basic German",
    author: "hard-coded",
    description: "5 basic german words",
    body: [
      {
        id: 0,
        question: "love",
        answer: "die Liebe",
      },
      {
        id: 1,
        question: "cat",
        answer: "die Katze",
      },
      {
        id: 2,
        question: "dog",
        answer: "der Hund",
      },
      {
        id: 3,
        question: "thank you",
        answer: "Danke",
      },
      {
        id: 4,
        question: "happiness",
        answer: "das Glück",
      },
    ],
  },
];

//  ### FUNCTIONS ###
// Store hard coded cards (basic english, basic german) in local storage
(function () {
  if (localStorage.getItem("cards") === null) {
    localStorage.setItem("cards", JSON.stringify(hardCodedCards));
  }

  cards = JSON.parse(localStorage.getItem("cards"));

  screenWidth = screen.width;
  if (parseInt(screenWidth) <= 768) screenType = "mobile";
  else if (parseInt(screenWidth) < 1024) screenType = "tablet";
  else if (parseInt(screenWidth) < 1440) screenType = "small screen";
  else {
    screenType = "big screen";
    console.log(screenType);
  }
  initCarousel(cards, parseInt(screenWidth));
})();

// Funtions that displays and hides modals
displayLogIn();
displaySignUp();
closeModals();

// ### EVENT LISTENERS ###
window.addEventListener("resize", () => {
  screenWidth = screen.width;
  // console.log("screen type: " + screenType + " " + screenWidth);
  if (screenType !== "mobile" && parseInt(screenWidth) < 768) {
    screenType = "mobile";
    initCarousel(cards, screenWidth);
  } else if (
    screenType !== "tablet" &&
    parseInt(screenWidth) < 1024 &&
    parseInt(screenWidth) >= 768
  ) {
    screenType = "tablet";
    initCarousel(cards, screenWidth);
  } else if (
    screenType !== "small screen" &&
    parseInt(screenWidth) < 1440 &&
    parseInt(screenWidth) >= 1024
  ) {
    screenType = "small screen";
    initCarousel(cards, screenWidth);
  } else if (screenType !== "big screen" && parseInt(screenWidth) >= 1440) {
    screenType = "big screen";
    initCarousel(cards, screenWidth);
  }
});

// Disable scrolling on hamburger toggle
hamburgerToggler.addEventListener("change", () => {
  if (hamburgerToggler.checked) {
    document.body.classList.add("stop-scrolling");
  } else {
    document.body.classList.remove("stop-scrolling");
  }
});

createNewBtn.addEventListener("click", openCreatePage);

// Passes data-attribute through JS files i/e displays proper cards
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("go-to")) {
    let passIndex = e.target
      .closest(".card-miniature")
      .getAttribute("data-cards-id");
    localStorage.setItem("passIndex", passIndex);
  }
});
