import imgMarkerFilled from "../../recipe_page/img/heart_red.png";
import imgMarkerNonFilled from "../../recipe_page/img/heart.png";


let email = localStorage.getItem("welcomeemail");
let users = JSON.parse(localStorage.getItem('useremails') || '[]');
let names = JSON.parse(localStorage.getItem('usernames') || '[]');
let i = users.indexOf(email);

let welcomeMsg = document.querySelector("h1");
let result = document.querySelector('.result__container');
let res = document.querySelector('.result');

let arrFavorites = localStorage.getItem('favorites');

if (email) {
    welcomeMsg.textContent = `Welcome, ${names[i]}`;
    welcomeMsg.classList.add('welcome-msg');
    if (arrFavorites) { // если в сторадже что-то есть
        arrFavorites = JSON.parse(arrFavorites);
    } else {
        document.querySelector("h2").textContent = "No favourites";
        arrFavorites = [{
            email: email,
            favRecipes: []
        }]
    }
} else {
    document.querySelector("h2").textContent = "You need to register. No email";
};



let array = [];

let index = arrFavorites.findIndex((el) => el.email === email);
if (index > -1) {
    array = arrFavorites[index].favRecipes.slice();
}
// } else {
//     document.querySelector("h2").textContent = "You need to register";
// }

let div = document.createElement("div");
for (let arr of array) {
    div.textContent += `${arr}, `;
}

res.append(div);

let dataArr = [];

async function getRecipes() {
    try {
        for (let id of array) {
            let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            const response = await fetch(url);
            const data = await response.json();
            dataArr.push(data.meals[0]);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        renderFav(dataArr);
    }
}

function renderFav(dataArr) {
    let generatedFav = '';
    result.innerHTML = '';
    console.log(dataArr);
    for (let d = 0; d < dataArr.length; d++) {
        generatedFav += `
                <div class="result__item">
                    <img src="${dataArr[d].strMealThumb}" alt="${dataArr[d].strMeal}">
                    <div class="item__details">
                        <div class="details">
                            <h2 class="item-name">${dataArr[d].strMeal}</h2>
                            <h3 class="item-area">${dataArr[d].strArea}</h3>
                        </div>
                        
                        <div class="view-button">
                            <a href='../recipe_page/recipe.html?id=${dataArr[d].idMeal}'>View recipe</a>
                        </div>
                    </div>            
                </div>`
    }
    result.innerHTML = generatedFav;
}

/* <div class = "recipe__marker" >
    <
    button class = "recipe__marker-btn" > < img src = "./img/bookmark-filled.svg"
alt = "bookmark"
class = "recipe__marker-btn-img"
data - id = $ {
        dataArr[d].idMeal
    } > < /button> <
    /div> */


document.addEventListener("DOMContentLoaded", function () {
    getRecipes(dataArr);
});


// document.addEventListener('click', function (e) {
//     if (e.target.classList.contains('recipe__marker-btn-img')) {
//         e.target.classList.toggle('active');
//     }
//     addFav(e);
// });

// function addFav(e) {
//     console.log(e.target.dataset.id);
//     if (e.target.classList.contains('active')) {
//         arrFavorites.push(e.target.dataset.id);
//         e.target.src = "img/bookmark-filled.svg";
//     } else {
//         e.target.src = "img/bookmark.svg";
//         arrFavorites = arrFavorites.filter(el => el !== e.target.dataset.id);
//     }
//     localStorage.setItem('favorites', JSON.stringify(arrFavorites));
//     // checkFav(e);
// }
/* function checkFav(e) {
    if (arrFavorites) { // если в сторадже что-то есть, то парсим
        arrFavorites = JSON.parse(arrFavorites);
        if (arrFavorites.find(el => el == e.target.dataset.id)) {
            console.log(arrFavorites.find(el => el == e.target.dataset.id));
            this.className += ' active';
            this.src = "img/bookmark-filled.svg";
        }
    } else {
        // если нет, то присвоим дефолтное значение
        arrFavorites = [];
    }

}*/