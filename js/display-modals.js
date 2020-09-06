const modalCloseBtnArr = document.querySelectorAll("#modal-close");
const modalArr = document.querySelectorAll(".modal");
const signUpBtn = document.querySelector("#sign-up");
const logInBtn = document.querySelector("#log-in");

// Display SIGN UP modal
function displaySignUp() {
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
}

// Display LOG IN modal
function displayLogIn() {
  logInBtn.addEventListener("click", () => {
    modalArr[0].parentElement.classList.add("show");

    const modalButton = document.querySelector("#modal-log-in");
    const username = document.querySelector("#log-in-username");
    const password = document.querySelector("#log-in-password");

    modalButton.addEventListener("click", () => {
      checkLogin(username, password);
    });
  });
}

function closeModals() {
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
}

export { displaySignUp, displayLogIn, closeModals };
