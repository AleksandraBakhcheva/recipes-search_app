
let searchButton = document.querySelector('.search__button');
let input = document.querySelector('.search__input');
let result = document.querySelector('.result__container');
let searchForm = document.querySelector('.search__form')
let errorMessage = document.querySelector('.error_message');
let arrow = document.querySelector('.hidden_arrow');
let API_ID = "9469ba72";
let API_KEY = "4313c2c37d93452e3b4523bb962f8253";
const randomArr = [];

document.addEventListener("DOMContentLoaded", function (){    
    getRandom();
});
//запрос для вывода рандомных рецептов
async function getRandom(){    
    try{
        //нужен цикл
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/random.php`)
    console.log(response)
    let data = await response.json();
    console.log(data.meals[0]);
    //randomArr.push(data.meals[0]);
    //generateHtml(data.meals);
    let generatedHTML = '';
    generatedHTML += `
        <div class="result__item">
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            <div class="item__details">
                <div class="details">
                    <h2 class="item-name">${data.meals[0].strMeal}</h2>
                    <h3 class="item-area">${data.meals[0].strArea}</h3>
                </div>
                <div class="view-button">
                    <a href='page2/index.html?id=${data.meals[0].idMeal}'>View recipe</a>
                </div>
            </div>            
        </div>`
        result.innerHTML = generatedHTML;
}catch (error) {
        console.log(error.message);
    }
}
// render рандомного рецепта
//function renderRandom(results){
    
//==

// поиск рецептов по клику на search
searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    sendApiRequest();    
})

async function sendApiRequest(){    
    try{
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
    console.log(response)
    let data = await response.json();
    generateHtml(data.meals);
}catch (error) {
    errorMessage.innerHTML = `<p>Invalid request</p>`;
}
    searchForm.reset();
    console.log(data);    
}
//render по поиску
function generateHtml(results){
    let generatedHTML = ''; 
    errorMessage.innerHTML = '';
    result.innerHTML = '';
    arrow.style.display = "none";   
    results.map(result => {
        generatedHTML += `
        <div class="result__item">
            <img src="${result.strMealThumb}" alt="${result.strMeal}">
            <div class="item__details">
                <div class="details">
                    <h2 class="item-name">${result.strMeal}</h2>
                    <h3 class="item-area">${result.strArea}</h3>
                </div>
                <div class="view-button">
                    <a href='page2/index.html?id=${result.idMeal}'>View recipe</a>
                </div>
            </div>            
        </div>`
    })
    if (input.value == 0){
        errorMessage.innerHTML = `<p>There's nothing to search</p>`
    }else{
        arrow.style.display = "block";
result.innerHTML = generatedHTML;
}
}

