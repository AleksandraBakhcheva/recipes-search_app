
let searchButton = document.querySelector('.search__button');
let input = document.querySelector('.search__input');
let result = document.querySelector('.result__container');
let API_ID = "9469ba72";
let API_KEY = "4313c2c37d93452e3b4523bb962f8253";

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    sendApiRequest();
})

async function sendApiRequest(){
    let response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
    console.log(response)
    let data = await response.json();
    generateHtml(data.meals);
    console.log(data);
    
}
function generateHtml(results){
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += `
        <div class="result__item">
            <img src="${result.strMealThumb}" alt="${result.strMeal}">
            <div class="item__details">
                <div class="details">
                    <h2 class="item-name">'${result.strMeal}'</h2>
                    <h3 class="item-area">'${result.strArea}'</h3>
                </div>
                <div class="view-button">
                    <a href='../page2/index.html?id=${result.idMeal}'>View recipe</a>
                </div>
            </div>            
        </div>`
    })
result.innerHTML = generatedHTML;
}