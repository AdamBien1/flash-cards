import { checkRegister, checkLogin } from "./register-login.js";
// import { createMiniature } from "./display-miniatures.js";
import { greatBritain, germany } from "./base64-imgs.js";
import { initCarousel } from "./carousel.js";

// INDEX.HTML VARS
const modalCloseBtnArr = document.querySelectorAll("#modal-close");
const modalArr = document.querySelectorAll(".modal");
const signUpBtn = document.querySelector("#sign-up");
const logInBtn = document.querySelector("#log-in");

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

// Display SIGN UP modal
signUpBtn.addEventListener("click", () => {
  modalArr[1].parentElement.classList.add("show");

  const modalButton = document.querySelector("#modal-sign-up");
  const username = document.querySelector("#sign-up-username");
  const email = document.querySelector("#sign-up-email");
  const password1 = document.querySelector("#sign-up-password1");
  const password2 = document.querySelector("#sign-up-password2");

  modalButton.addEventListener("click", () => {
    checkRegister(username, email, password1, password2);
  });
});

// Display LOG IN modal
logInBtn.addEventListener("click", () => {
  modalArr[0].parentElement.classList.add("show");

  const modalButton = document.querySelector("#modal-log-in");
  const username = document.querySelector("#log-in-username");
  const password = document.querySelector("#log-in-password");

  modalButton.addEventListener("click", () => {
    checkLogin(username, password);
  });
});
// Closes SIGN UP/ LOG IN modals on CLOSE-BTN click
modalCloseBtnArr.forEach((button, index) => {
  button.addEventListener("click", () => {
    modalArr[index].parentElement.classList.remove("show");
  });
});
// Closes SIGN UP/ LOG IN modals on WINDOW click
window.addEventListener("click", (e) => {
  e.target.classList.contains("modal-container")
    ? e.target.classList.remove("show")
    : false;
});

// Passes data-attribute through JS files i/e displays proper cards
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("go-to")) {
    let passIndex = e.target
      .closest(".card-miniature")
      .getAttribute("data-cards-id");
    localStorage.setItem("passIndex", passIndex);
  }
});

// Store hard coded cards (basic english, basic german) in local storage
(function () {
  if (localStorage.getItem("cards") === null) {
    localStorage.setItem("cards", JSON.stringify(hardCodedCards));
  }

  const cards = JSON.parse(localStorage.getItem("cards"));
  // cards.forEach((card) => {
  //   createMiniature(card);
  // });

  initCarousel(cards);
})();
