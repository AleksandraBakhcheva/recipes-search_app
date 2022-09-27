import imgMarkerFilled from "../img/heart_red.png";
import imgMarkerNonFilled from "../img/heart.png";

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
let ingredients = document.querySelector(".recipe__ingredients");
const bookmark = document.querySelector(".recipe__marker-btn-img");

let email = localStorage.getItem("welcomeemail");
let arrFavorites = localStorage.getItem('favorites');

async function loadData() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();

    document.title = data.meals[0].strMeal + " Recipe";

    render(data);

    // let massiv = [{
    //         email: 'Inga_petrova91@mail.ru',
    //         favRecipes: [2959, 52771, 53043]
    //     },
    //     {
    //         email: 'chuka@mail.ru',
    //         favRecipes: [2959, 53043]
    //     },
    //     {
    //         email: 'sasha@mail.ru',
    //         favRecipes: []
    //     },
    // ]
    // localStorage.setItem('favorites', JSON.stringify(massiv));

    const bookmarkBtn = document.querySelector(".recipe__marker-btn");
    const message = document.querySelector(".recipe__message");
    if (email) {

        arrFavorites = checkFavorites();
        bookmarkBtn.addEventListener("click", function () {
            addToFavorites(data);
        });
    } else {
        bookmarkBtn.addEventListener('mouseover', (event) => {
            message.style.display = "block";
        });
        bookmarkBtn.addEventListener('mouseout', (event) => {
            message.style.display = "none";
        });
    }
}


function addToFavorites(data) { //при нажатии на кнопку
    let index = arrFavorites.findIndex((el) => el.email === email);
    if (index > -1) {
        {
            if (!bookmark.classList.contains('active')) { //если нет класса active
                bookmark.className += ' active'; //то добавляем ему этот класс
                bookmark.src = imgMarkerFilled;
                arrFavorites[index].favRecipes.push(id);
            } else {
                bookmark.className = 'recipe__marker-btn'; //то класс без active
                bookmark.src = imgMarkerNonFilled;
                arrFavorites[index].favRecipes = arrFavorites[index].favRecipes.filter((el) => el !== id); //удаляем из массива
            }
        }
        localStorage.setItem('favorites', JSON.stringify(arrFavorites));
    }
}

function checkFavorites() {

    if (arrFavorites) { // если в сторадже что-то есть
        arrFavorites = JSON.parse(arrFavorites);
    } else {
        arrFavorites = [{
            email: email,
            favRecipes: []
        }]
    }

    let index = arrFavorites.findIndex((el) => el.email === email);
    if (index > -1) {
        let array = arrFavorites[index].favRecipes.slice();
        if (array.find((el) => el == id)) { //если элемент есть в локал сторадж
            bookmark.className += ' active';
            bookmark.src = imgMarkerFilled;
        }
    } else {
        arrFavorites.push({
            email: email,
            favRecipes: []
        });
        console.log(arrFavorites)
    }
    return arrFavorites;
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

    let instructions = document.querySelectorAll(".recipe__instructions");
    for (let index = 0; index < instructions.length; index++) {
        const instructionSpace = document.createElement('p');
        instructionSpace.innerHTML = data.meals[0].strInstructions;
        instructions[index].append(instructionSpace);
    }

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

try {
    loadData();
} catch (e) {
    console.log("error");
} finally {
    console.log('We do cleanup here');
}