const modalCloseBtnArr = document.querySelectorAll("#modal-close");
const modalArr = document.querySelectorAll(".modal");
const signUpBtn = document.querySelector("#sign-up");
const logInBtn = document.querySelector("#log-in");

signUpBtn.addEventListener("click", () => {
  modalArr[1].parentElement.classList.add("show");
});
logInBtn.addEventListener("click", () => {
  modalArr[0].parentElement.classList.add("show");
});
modalCloseBtnArr.forEach((button, index) => {
  button.addEventListener("click", () => {
    modalArr[index].parentElement.classList.remove("show");
  });
});
window.addEventListener("click", (e) => {
  e.target.classList.contains("modal-container")
    ? e.target.classList.remove("show")
    : false;
});
