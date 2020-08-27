import { checkAll } from "./register.js";

// INDEX.HTML VARS
const modalCloseBtnArr = document.querySelectorAll("#modal-close");
const modalArr = document.querySelectorAll(".modal");
const signUpBtn = document.querySelector("#sign-up");
const logInBtn = document.querySelector("#log-in");
const gotoBtns = document.querySelectorAll("#go-to");

const hardCodedCards = [
  {
    id: 0,
    body: [
      {
        question: "a son or daughter",
        answer: "a child",
      },
      {
        question: "the study of past events",
        answer: "history",
      },
      {
        question: "the earth and its people",
        answer: "world",
      },
      {
        question: "a large town",
        answer: "city",
      },
      {
        question: "someone who performs in a movie or play",
        answer: "actor",
      },
    ],
  },
  {
    id: 1,
    body: [
      {
        question: "love",
        answer: "die Liebe",
      },
      {
        question: "cat",
        answer: "die Katze",
      },
      {
        question: "dog",
        answer: "der Hund",
      },
      {
        question: "thank you",
        answer: "Danke",
      },
      {
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
    checkAll(username, email, password1, password2);
  });
});

// Display LOG IN modal
logInBtn.addEventListener("click", () => {
  modalArr[0].parentElement.classList.add("show");
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

gotoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    passIndex = btn.closest(".card-miniature").getAttribute("data-cards-id");
    localStorage.setItem("passIndex", passIndex);
  });
});

// Store hard coded cards (basic english, basic german) in local storage
(function () {
  if (localStorage.getItem("cards") === null) {
    localStorage.setItem("cards", JSON.stringify(hardCodedCards));
  }
})();
