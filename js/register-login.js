// Show input error message
function showError(input, message) {
  const small = input.parentElement.querySelector("small");
  input.parentElement.className = "error";
  small.innerText = message;
  small.style.display = "block";
}

// Show input success message
function showSuccess(input) {
  input.parentElement.className = "success";
  const small = input.parentElement.querySelector("small");
  small.style.display = "none";
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(input.value.trim())) {
    showError(input, `${getFieldName(input)} is not a valid`);
  } else {
    showSuccess(input);
  }
}

function getFieldName(field) {
  if (field.id.includes("sign-up-")) {
    return (
      field.id.replace("sign-up-", "").charAt(0).toUpperCase() +
      field.id.replace("sign-up-", "").slice(1)
    );
  } else if (field.id.includes("log-in-")) {
    return (
      field.id.replace("log-in-", "").charAt(0).toUpperCase() +
      field.id.replace("log-in-", "").slice(1)
    );
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLengh(inputArr) {
  inputArr.forEach((inputObject) => {
    if (inputObject.input.value.length < inputObject.min) {
      showError(
        inputObject.input,
        `${getFieldName(inputObject.input)} must be at least ${inputObject.min}`
      );
    } else if (inputObject.input.value.length > inputObject.max) {
      showError(
        inputObject.input,
        `${getFieldName(inputObject.input)} must be less than ${
          inputObject.max
        }`
      );
    } else {
      showSuccess(inputObject.input);
    }
  });
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

function checkRegister(username, email, password1, password2) {
  checkRequired([username, email, password1, password2]);
  checkLengh([
    { input: username, min: 3, max: 15 },
    { input: password1, min: 6, max: 25 },
  ]);
  checkEmail(email);
  checkPasswordsMatch(password1, password2);
}

function checkLogin(username, password) {
  checkRequired([username, password]);
  checkLengh([
    { input: username, min: 3, max: 15 },
    { input: password, min: 6, max: 26 },
  ]);
}

export { checkRegister, checkLogin };
