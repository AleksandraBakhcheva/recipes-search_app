import imgMarkerFilled from "../img/bookmark-filled.svg";
import imgMarkerNonFilled from "../img/bookmark.svg";

let foodImg = document.querySelector(".recipe__food-img");
let foodName = document.querySelector(".recipe__name");
let foodArea = document.querySelector(".recipe__area");
let foodCategory = document.querySelector(".recipe__category");
let foodTags = document.querySelector(".recipe__tags");
let foodYouTube = document.querySelector(".recipe__youtube-link");
let ingridients = document.querySelector(".recipe__ingridients");
let instruction = document.querySelector(".recipe__instructions");
const bookmark = document.querySelector(".recipe__marker-btn-img");
let arrfavorites = [];

async function loadData() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
    let data = await response.json();

    document.title = data.meals[0].strMeal + " Recipe";

    render(data);

    const bookmarkBtn = document.querySelector(".recipe__marker-btn");
    bookmarkBtn.addEventListener("click", addToFavorites);

}

function render(data) {

    foodImg.src = data.meals[0].strMealThumb;
    foodImg.width = 400;

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
            const ingridientSpace = document.createElement('div');
            const ingridient = document.createElement('input');
            const ingridientLabel = document.createElement('label');
            ingridient.setAttribute("type", "checkbox");
            ingridient.value = data.meals[0][`strIngredient${i}`];
            const t = document.createTextNode(data.meals[0][`strMeasure${i}`] + " " + data.meals[0][`strIngredient${i}`]);
            ingridientLabel.setAttribute("for", ingridient.value);
            ingridientLabel.appendChild(t);
            ingridients.append(ingridientSpace);
            ingridientSpace.append(ingridient);
            ingridientSpace.append(ingridientLabel);
        }
    }
}

function addToFavorites() {

    if (!bookmark.classList.contains('active')) {
        bookmark.className += ' active';
        bookmark.src = imgMarkerFilled;

        //function 

    } else {
        bookmark.className = 'recipe__marker-btn';
        bookmark.src = imgMarkerNonFilled;

        //function
    }

}



loadData();