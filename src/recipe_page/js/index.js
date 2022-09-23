import imgMarkerFilled from "../img/heart_red.png";
import imgMarkerNonFilled from "../img/heart.png";

//const id = 52959; //для проверки
//const id = 52771;
const id = 53043;

// let params = (new URL(document.location)).searchParams;
// const id = Number(params.get("id"));

let foodImg = document.querySelector(".recipe__food-img");
let foodName = document.querySelector(".recipe__name");
let foodArea = document.querySelector(".recipe__area");
let foodCategory = document.querySelector(".recipe__category");
let foodTags = document.querySelector(".recipe__tags");

let ingredients = document.querySelector(".recipe__ingredients");

const bookmark = document.querySelector(".recipe__marker-btn-img");
let arrFavorites = localStorage.getItem('favorites');

async function loadData() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();

    document.title = data.meals[0].strMeal + " Recipe";

    let screen = window.matchMedia("(max-width: 992px)")
    myFunction(screen, data); // Call listener function at run time
    screen.addListener(myFunction); // Attach listener function on state changes

    render(data);
    checkFavorites(data);


    const bookmarkBtn = document.querySelector(".recipe__marker-btn");
    bookmarkBtn.addEventListener("click", function () {
        addToFavorites(data);
    });
}



function addToFavorites(data) { //при нажатии на кнопку
    if (!bookmark.classList.contains('active')) { //если нет класса active
        bookmark.className += ' active'; //то добавляем ему этот класс
        bookmark.src = imgMarkerFilled; // картинка пустая
        arrFavorites.push(id); //добавляем в массив 
    } else { //если нет
        bookmark.className = 'recipe__marker-btn'; //то класс без active
        bookmark.src = imgMarkerNonFilled; // картинка заполненная
        arrFavorites = arrFavorites.filter(el => el !== id); //удаляем из массива
    }
    localStorage.setItem('favorites', JSON.stringify(arrFavorites));

}

function checkFavorites(data) { //вызывается при загрузке страницы

    if (arrFavorites) { // если в сторадже что-то есть, то парсим
        arrFavorites = JSON.parse(arrFavorites);
        if (arrFavorites.find(el => el == id)) { //если элемент есть в локал сторадж
            //console.log(arrFavorites.find(el => el == id));
            bookmark.className += ' active';
            bookmark.src = imgMarkerFilled;
        }
    } else {
        // если нет, то присвоим дефолтное значение
        arrFavorites = [];
    }

}

function myFunction(screen, data) {
    let Bigscreen = document.querySelector(".bigscreen");
    console.log(Bigscreen)
    let Smallscreen = document.querySelector(".smallscreen");
    console.log(Smallscreen)
    if (screen.matches) { // If media query matches
        console.log(screen)
        Smallscreen.className += ' recipe__instructions';
        Bigscreen.className = 'bigscreen';
    } else {
        console.log(screen)
        Bigscreen.className += ' recipe__instructions';
        Smallscreen.className = 'smallscreen';
    }
}

function render(data) {

    foodImg.src = data.meals[0].strMealThumb;
    foodName.textContent = data.meals[0].strMeal;
    foodArea.textContent = data.meals[0].strArea;
    foodCategory.textContent = data.meals[0].strCategory;
    foodTags.textContent = data.meals[0].strTags;
    let foodYouTube = document.querySelector(".recipe__youtube-link");
    foodYouTube.href = data.meals[0].strYoutube;

    //rendering instruction
    let instruction = document.querySelector(".recipe__instructions");
    //console.log(instruction);
    const instructionSpace = document.createElement('p');
    instructionSpace.innerHTML = data.meals[0].strInstructions;
    instruction.append(instructionSpace);

    //rendering ingredients

    for (let i = 1; i < 20; i++) {
        if (data.meals[0][`strIngredient${i}`] == "") {
            break;
        } else {
            const ingredientSpace = document.createElement('div');
            ingredientSpace.className = "recipe__instructions-forone"
            const ingredient = document.createElement('input');
            const ingredientLabel = document.createElement('label');
            ingredient.setAttribute("type", "checkbox");
            ingredient.value = data.meals[0][`strIngredient${i}`];
            ingredient.setAttribute("id", ingredient.value);
            const t = document.createTextNode(data.meals[0][`strMeasure${i}`] + " " + data.meals[0][`strIngredient${i}`]);
            ingredientLabel.setAttribute("for", ingredient.value);
            ingredientLabel.appendChild(t);
            ingredients.append(ingredientSpace);
            ingredientSpace.append(ingredient);
            ingredientSpace.append(ingredientLabel);
        }
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