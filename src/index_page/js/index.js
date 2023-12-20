let searchButton = document.querySelector(".search__button");
let input = document.querySelector(".search__input");
let result = document.querySelector(".result__container");
let searchForm = document.querySelector(".search__form");
let errorMessage = document.querySelector(".error_message");
let arrow = document.querySelector(".hidden_arrow");
let API_ID = "9469ba72";
let API_KEY = "4313c2c37d93452e3b4523bb962f8253";
const randomArr = [];

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
                <button class="view-button" onclick="window.location.href ='recipe.html?id=${randomArr[r].idMeal}'">View recipe</button>
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
                <button class="view-button" onclick="window.location.href ='recipe.html?id=${result.idMeal}'">View recipe</button>
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
