import { checkRegister, checkLogin } from "./register-login.js";
// import { createMiniature } from "./display-miniatures.js";
import { greatBritain, germany } from "./base64-imgs.js";
import { initCarousel } from "./carousel.js";
import { openCreatePage } from "./display-miniatures.js";
import { displaySignUp, displayLogIn, closeModals } from "./display-modals.js";

// INDEX.HTML VARS
const modalCloseBtnArr = document.querySelectorAll("#modal-close");
const modalArr = document.querySelectorAll(".modal");
const signUpBtn = document.querySelector("#sign-up");
const logInBtn = document.querySelector("#log-in");
const createNewBtn = document.querySelector("#create-new");
const hamburgerToggler = document.querySelector(".toggler");

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

// select cards deck ID
let passIndex;

// Disable scrolling on hamburger toggle
hamburgerToggler.addEventListener("change", () => {
  if (hamburgerToggler.checked) {
    document.body.classList.add("stop-scrolling");
    console.log("class added");
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

// Modals
displayLogIn();
displaySignUp();
closeModals();

// Store hard coded cards (basic english, basic german) in local storage
(function () {
  if (localStorage.getItem("cards") === null) {
    localStorage.setItem("cards", JSON.stringify(hardCodedCards));
  }

  const cards = JSON.parse(localStorage.getItem("cards"));
  // cards.forEach((card) => {
  //   createMiniature(card);
  // });

  let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  initCarousel(cards, width);
})();
