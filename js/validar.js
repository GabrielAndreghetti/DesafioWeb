const inputName = document.getElementById("inputName");
const nameFeedback = document.getElementById("inputNameHelp");
const inputYear = document.getElementById("inputYear");
const yearFeedback = document.getElementById("inputYearHelp");
const inputEmail = document.getElementById("inputEmail");
const emailFeedback = document.getElementById("inputEmailHelp");
const inputPassword = document.getElementById("inputPassword");
const passwordFeedback = document.getElementById("inputPasswordHelp");
const inputConfirmPassword = document.getElementById("inputConfirmPassword");
const passwordStrengthMeter = document.getElementById("passStrengthMeter");

inputName.addEventListener("blur", () => validateName(inputName, nameFeedback));
inputYear.addEventListener("blur", () => validateYear(inputYear, yearFeedback));
inputEmail.addEventListener("blur", () => validateEmail(inputEmail, emailFeedback));
inputPassword.addEventListener("input", () => validatePassword(inputPassword, passwordFeedback, passwordStrengthMeter));
inputConfirmPassword.addEventListener("blur", () => validatePasswordConfirmation(inputPassword, inputConfirmPassword, passwordFeedback));

function validateName(input, feedback) {
  const nameRegex = /^[A-Za-z\s]{6,}$/;
  const inputValue = input.value.trim();
  console.log("Nome de usuário testado:", inputValue);
  const isValid = nameRegex.test(inputValue);
  console.log("Nome de usuário válido:", isValid);
  feedback.textContent = isValid ? "" : "Nome deve conter somente letras e espaços, e ter no mínimo 6 caracteres.";
  feedback.style.color = isValid ? "" : "red";
  return isValid;
}

function validateYear(input, feedback) {
  const yearRegex = /^(19[0-9]{2}|20[0-1][0-9]|202[0-4])$/;
  const isValid = yearRegex.test(input.value.trim());
  feedback.textContent = isValid ? "" : "Ano deve estar entre 1900 e 2024.";
  feedback.style.color = isValid ? "" : "red";
  return isValid;
}

function validateEmail(input, feedback) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|br|net|org)$/;
  const isValid = emailRegex.test(input.value.trim());
  feedback.textContent = isValid ? "" : "Formato de email inválido.";
  feedback.style.color = isValid ? "" : "red";
  return isValid;
}

function validatePassword(input, feedback, meter) {
  const passwordValue = input.value;
  feedback.textContent = checkPasswordRules(passwordValue);
  const strength = calculatePasswordStrength(passwordValue);
  meter.value = strength.value;
  updatePasswordStrengthVisuals(meter, strength.color);
  return feedback.textContent === "";
}

function checkPasswordRules(password) {
  if (password.includes(inputName.value.trim()) || password.includes(inputYear.value.trim())) {
    return "Senha inválida. Não deve conter seu nome ou ano de nascimento.";
  }
  const passwordRegex = /^(?=.*[!@#$%^&(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/;
  return passwordRegex.test(password) ? "" : "Senha deve conter 6 a 20 caracteres, incluindo números, letras e ao menos um símbolo especial.";
}

function calculatePasswordStrength(password) {
  if (password.length >= 15) {
    return { value: 30, color: "#32CD32" };
  } else if (password.length >= 8) {
    return { value: 20, color: "#ffa500" };
  } else {
    return { value: 10, color: "#ff3e3e" };
  }
}

function updatePasswordStrengthVisuals(meter, color) {
  meter.style.backgroundColor = color;
}

document.getElementById("singleForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const isNameValid = validateName(inputName, nameFeedback);
  const isYearValid = validateYear(inputYear, yearFeedback);
  const isEmailValid = validateEmail(inputEmail, emailFeedback);
  const isPasswordValid = validatePassword(inputPassword, passwordFeedback, passwordStrengthMeter);

  if (isNameValid && isYearValid && isEmailValid && isPasswordValid) {
    alert("Usuário cadastrado com sucesso!");
  } else {
    alert("Por favor, corrija os campos inválidos.");
  }
});
