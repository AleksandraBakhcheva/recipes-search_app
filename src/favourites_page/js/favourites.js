const imgMarkerNonFilled = "assets/images/heart-blank.png";
const imgMarkerFilled = "assets/images/heart-red.png";

let email = localStorage.getItem("welcomeemail");
let users = JSON.parse(localStorage.getItem("useremails") || "[]");
let names = JSON.parse(localStorage.getItem("usernames") || "[]");
let i = users.indexOf(email);

let welcomeMsg = document.querySelector("h1");
let result = document.querySelector(".result__container");

let arrFavorites = localStorage.getItem("favorites");

let array = [];
let dataArr = [];

function checkRegistration() {
  if (email && email != "") {
    welcomeMsg.innerHTML = `Welcome, <span>${names[i]}</span>`;
    welcomeMsg.classList.add("welcome-msg");
    if (arrFavorites) {
      arrFavorites = JSON.parse(arrFavorites);
    } else {
      arrFavorites = [
        {
          email: email,
          favRecipes: [],
        },
      ];
      document.querySelector("h2").textContent = "No favourites";
    }
  } else {
    document.querySelector("h2").textContent =
      "You need to register or sign in";
  }

  let index = arrFavorites.findIndex((el) => el.email === email);
  if (index > -1) {
    array = arrFavorites[index].favRecipes.slice();
  }
}

function renderFav(dataArr) {
  let generatedFav = "";
  result.innerHTML = "";
  for (let id = 0; id < dataArr.length; id++) {
    generatedFav += `
                <div class="result__item">
                <a href='recipe.html?id=${dataArr[id].idMeal}'><img src="${dataArr[id].strMealThumb}" alt="${dataArr[id].strMeal}"></a>
                    <div class="item__details">
                        <div class="details">
                            <h2 class="item-name">${dataArr[id].strMeal}</h2>
                            <h3 class="item-area">${dataArr[id].strArea}</h3>
                        </div>
                        
                        <button class="view-button" onclick="window.location.href = 'recipe.html?id=${dataArr[id].idMeal}'">View recipe</button>
                    </div>            
                </div>`;
  }
  result.innerHTML = generatedFav;
}

async function getRecipes() {
  try {
    if (array.length == 0) {
      document.querySelector("h2").textContent = "No favourites";
    } else {
      for (let id of array) {
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        dataArr.push(data.meals[0]);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    renderFav(dataArr);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkRegistration();
  getRecipes(dataArr);
});
