let searchButton = document.querySelector(".search__button");
let input = document.querySelector(".search__input");
let result = document.querySelector(".result__container");
let searchForm = document.querySelector(".search__form");
let errorMessage = document.querySelector(".error_message");
let arrow = document.querySelector(".hidden_arrow");
let API_ID = "9469ba72";
let API_KEY = "4313c2c37d93452e3b4523bb962f8253";
let modal = document.querySelector(".modal-sign-in");
let modalClose = document.querySelector(".modal-close");
const randomArr = [];

let login_form = document.createElement("div");
login_form.classList.add("login__form");
document.querySelector(".modal-body-form").append(login_form);
let formAdd = document.createElement("form");
formAdd.classList.add("form");
document.querySelector(".login__form").append(formAdd);

let button = document.querySelector(".menu__link_button");
button.addEventListener("click", function () {
  modal.style.display = "block";
  if (formAdd.innerHTML === ``) {
    formAdd.innerHTML = `<label for="email"><input class="login__input" type="email" placeholder="type your email" name="email" id="email"></label><label for="password"><input class="login__input password" type="password" placeholder="type your password" name="password" id="password"></label><div><button class="menu__link_button button_color" type="submit">Sign in</button></div>`;
  } else {
    formAdd.innerHTML = ``;
  }
  modalClose.onclick = function () {
    modal.style.display = "none";
    formAdd.innerHTML = ``;
  };
});

let error = document.createElement("div");
document.querySelector(".login__form").append(error);

let form = document.querySelector(".form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = document.querySelector(".login__input").value;
  let password = document.querySelector(".password").value;
  let users = JSON.parse(localStorage.getItem("useremails") || "[]");
  let passwords = JSON.parse(localStorage.getItem("userpasswords") || "[]");
  for (let i = 0; i < users.length; i++) {
    if (email === users[i] && password === passwords[i]) {
      localStorage.setItem("welcomeemail", email);
      window.location.href = "src/favourites.html";
      break;
    } else if (email !== users[i] || password !== passwords[i]) {
      error.textContent =
        "Your email or password are not correct. Please try again...";
    }
  }
  if (users.length === 0 || passwords.length === 0) {
    error.textContent = "You're not registered. Please register first";
  }
  error.classList.add("wrong_login_email_message");
  error.style.color = "rgb(192, 17, 17)";
  setTimeout(() => {
    error.textContent = "";
  }, "5000");
  document.querySelector(".login__input").value = "";
  document.querySelector(".password").value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  getRandom();
});

async function getRandom() {
  try {
    let i = 0;
    while (i < 15) {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/random.php`
      );
      let data = await response.json();
      randomArr.push(data.meals[0]);
      i++;
    }
    renderRandom(randomArr);
  } catch (error) {
    console.log(error.message);
  }
}

function renderRandom(randomArr) {
  let generatedHTML = "";
  for (let r = 0; r < randomArr.length; r++)
    generatedHTML += `
        <div class="result__item">
            <img src="${randomArr[r].strMealThumb}" alt="${randomArr[r].strMeal}">
            <div class="item__details">
                <div class="details">
                    <h2 class="item-name">${randomArr[r].strMeal}</h2>
                    <h3 class="item-area">${randomArr[r].strArea}</h3>
                </div>
                <button class="view-button" onclick="window.location.href ='src/recipe.html?id=${randomArr[r].idMeal}'">View recipe</button>
            </div>            
        </div>`;
  result.innerHTML = generatedHTML;
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  sendApiRequest();
});

async function sendApiRequest() {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`
    );
    let data = await response.json();
    generateHtml(data.meals);
  } catch (error) {
    errorMessage.innerHTML = `<p>Nothing found</p>`;
    result.innerHTML = "";
  }
  searchForm.reset();
}

function generateHtml(results) {
  let generatedHTML = "";
  errorMessage.innerHTML = "";
  arrow.style.display = "none";
  results.map((result) => {
    generatedHTML += `
        <div class="result__item">
            <img src="${result.strMealThumb}" alt="${result.strMeal}">
            <div class="item__details">
                <div class="details">
                    <h2 class="item-name">${result.strMeal}</h2>
                    <h3 class="item-area">${result.strArea}</h3>
                </div>
                <button class="view-button" onclick="window.location.href ='src/recipe.html?id=${result.idMeal}'">View recipe</button>
            </div>            
        </div>`;
  });
  if (input.value == 0) {
    errorMessage.innerHTML = `<p>Please, enter your search request</p>`;
  } else {
    arrow.style.display = "block";
    result.innerHTML = generatedHTML;
  }
}
