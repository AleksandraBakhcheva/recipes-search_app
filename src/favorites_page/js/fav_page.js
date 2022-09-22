let email = localStorage.getItem("welcomeemail");
let users = JSON.parse(localStorage.getItem('useremails') || '[]');
let names = JSON.parse(localStorage.getItem('usernames') || '[]');
let i = users.indexOf(email);
let div = document.createElement("div");
document.querySelector("h1").append(div);
div.textContent = `Welcome ${names[i]}`;

let result = document.querySelector('.result__container');
let arrFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
console.log(arrFavorites);
//function load() {
//for (let a of arrFavorites) {
    //console.log(a);    
document.addEventListener("DOMContentLoaded", function (){    
        
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${arrFavorites[0]}`)
    .then((response) =>{
        return response.json();}).then((data) =>{
            console.log(data.meals);
            let generatedFav = ''; 
            result.innerHTML = ''; 
            for (let d of data.meals){
                generatedFav += `
                <div class="result__item">
                    <img src="${d.strMealThumb}" alt="${d.strMeal}">
                    <div class="item__details">
                        <div class="details">
                            <h2 class="item-name">${d.strMeal}</h2>
                            <h3 class="item-area">${d.strArea}</h3>
                        </div>
                        <div class="bookmark"><img src="./img/bookmark-filled.svg" alt"fav"></div>
                        <div class="view-button">
                            <a href='../page2/index.html?id=${d.idMeal}'>View recipe</a>
                        </div>
                    </div>            
                </div>`
            }           
        result.innerHTML = generatedFav;
        }) 
});