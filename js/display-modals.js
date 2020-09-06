import { checkRegister, checkLogin } from "./register-login.js";

const modalCloseBtnArr = document.querySelectorAll("#modal-close");
const modalArr = document.querySelectorAll(".modal");
const signUpBtn = document.querySelectorAll(".sign-up");
const logInBtn = document.querySelectorAll(".log-in");

// Display SIGN UP modal
function displaySignUp() {
  signUpBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalArr[1].parentElement.classList.add("show");

      const modalButton = document.querySelector("#modal-sign-up");
      const username = document.querySelector("#sign-up-username");
      const email = document.querySelector("#sign-up-email");
      const password1 = document.querySelector("#sign-up-password1");
      const password2 = document.querySelector("#sign-up-password2");

      modalButton.addEventListener("click", () => {
        checkRegister(username, email, password1, password2);
      });
      document.body.classList.add("stop-scrolling");
    });
  });
}

// Display LOG IN modal
function displayLogIn() {
  logInBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modalArr[0].parentElement.classList.add("show");

      const modalButton = document.querySelector("#modal-log-in");
      const username = document.querySelector("#log-in-username");
      const password = document.querySelector("#log-in-password");

      modalButton.addEventListener("click", () => {
        checkLogin(username, password);
      });

      //   stop scrolling
      document.body.classList.add("stop-scrolling");
    });
  });
}

function closeModals() {
  // Closes SIGN UP/ LOG IN modals on CLOSE-BTN click
  modalCloseBtnArr.forEach((button, index) => {
    button.addEventListener("click", () => {
      modalArr[index].parentElement.classList.remove("show");

      //   document.body.classList.remove("stop-scrolling");
    });
  });
  // Closes SIGN UP/ LOG IN modals on WINDOW click
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-container")) {
      e.target.classList.remove("show");
      document.body.classList.remove("stop-scrolling");
    }
  });
}

export { displaySignUp, displayLogIn, closeModals };
