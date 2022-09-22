import imgMarkerFilled from "../img/bookmark-filled.svg";
import imgMarkerNonFilled from "../img/bookmark.svg";

//const id = 52959; //для проверки
//const id = 52771;
//const id = 53043;

let params = (new URL(document.location)).searchParams;
const id = Number(params.get("id"));

let foodImg = document.querySelector(".recipe__food-img");
let foodName = document.querySelector(".recipe__name");
let foodArea = document.querySelector(".recipe__area");
let foodCategory = document.querySelector(".recipe__category");
let foodTags = document.querySelector(".recipe__tags");
let foodYouTube = document.querySelector(".recipe__youtube-link");
let ingredients = document.querySelector(".recipe__ingredients");
let instruction = document.querySelector(".recipe__instructions");
const bookmark = document.querySelector(".recipe__marker-btn-img");
let arrFavorites = localStorage.getItem('favorites');

async function loadData() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();

    document.title = data.meals[0].strMeal + " Recipe";
    render(data);
    checkFavorites(data);


    const bookmarkBtn = document.querySelector(".recipe__marker-btn");
    bookmarkBtn.addEventListener("click", function () {
        addToFavorites(data);
    });
}

function render(data) {

    foodImg.src = data.meals[0].strMealThumb;
    foodName.textContent = data.meals[0].strMeal;
    foodArea.textContent = data.meals[0].strArea;
    foodCategory.textContent = data.meals[0].strCategory;
    foodTags.textContent = data.meals[0].strTags;
    foodYouTube.href = data.meals[0].strYoutube;

    //rendering instruction
    const instructionSpace = document.createElement('p');
    instructionSpace.innerHTML = data.meals[0].strInstructions;
    instruction.append(instructionSpace);

    //rendering ingredients
    for (let i = 1; i < 20; i++) {
        if (data.meals[0][`strIngredient${i}`] == "") {
            break;
        } else {
            const ingredientSpace = document.createElement('div');
            const ingredient = document.createElement('input');
            const ingredientLabel = document.createElement('label');
            ingredient.setAttribute("type", "checkbox");
            ingredient.value = data.meals[0][`strIngredient${i}`];
            const t = document.createTextNode(data.meals[0][`strMeasure${i}`] + " " + data.meals[0][`strIngredient${i}`]);
            ingredientLabel.setAttribute("for", ingredient.value);
            ingredientLabel.appendChild(t);
            ingredients.append(ingredientSpace);
            ingredientSpace.append(ingredient);
            ingredientSpace.append(ingredientLabel);
        }
    }
}

function addToFavorites(data) {
    if (!bookmark.classList.contains('active')) {
        bookmark.className += ' active';
        bookmark.src = imgMarkerFilled;
        arrFavorites.push(id);
    } else {
        bookmark.className = 'recipe__marker-btn';
        bookmark.src = imgMarkerNonFilled;
        arrFavorites = arrFavorites.filter(el => el !== id);
    }
    localStorage.setItem('favorites', JSON.stringify(arrFavorites));

}

function checkFavorites(data) {

    if (arrFavorites) { // если в сторадже что-то есть, то парсим
        arrFavorites = JSON.parse(arrFavorites);
        if (arrFavorites.find(el => el == id)) {
            console.log(arrFavorites.find(el => el == id));
            bookmark.className += ' active';
            bookmark.src = imgMarkerFilled;
        }
    } else {
        // если нет, то присвоим дефолтное значение
        arrFavorites = [];
    }

}

loadData();

// try {
//     loadData();
// } catch (e) {
//     console.log("error");
// } finally {
//     console.log('We do cleanup here');
// }