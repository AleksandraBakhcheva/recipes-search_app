let email = localStorage.getItem("welcomeemail");
let users = JSON.parse(localStorage.getItem('useremails') || '[]');
let names = JSON.parse(localStorage.getItem('usernames') || '[]');
let i = users.indexOf(email);
let div = document.createElement("div");
document.querySelector("h1").append(div);
div.textContent = `Welcome ${names[i]}`;

let result = document.querySelector('.result__container');
let idArr = JSON.parse(localStorage.getItem('favorites') || '[]');
console.log(idArr);
let dataArr = [];

async function getRecipes(idArr) {    
   try{
    for (let i of idArr) {
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`;
    const response = await fetch(url);
    const data = await response.json();    
        dataArr.push(data.meals[0]);
   }}
   catch(error) {
    console.error('Error:', error);
  }
   finally{
    generateFav(dataArr);
   }            
}

function generateFav(dataArr){
    let generatedFav = ''; 
    result.innerHTML = '';
    for (let d = 0; d < dataArr.length; d++){
            generatedFav += `
                <div class="result__item">
                    <img src="${dataArr[d].strMealThumb}" alt="${dataArr[d].strMeal}">
                    <div class="item__details">
                        <div class="details">
                            <h2 class="item-name">${dataArr[d].strMeal}</h2>
                            <h3 class="item-area">${dataArr[d].strArea}</h3>
                        </div>
                        <div class="bookmark"><img src="./img/bookmark-filled.svg" alt"fav"></div>
                        <div class="view-button">
                            <a href='../page2/index.html?id=${dataArr[d].idMeal}'>View recipe</a>
                        </div>
                    </div>            
                </div>`
            }
        result.innerHTML = generatedFav;
}
document.addEventListener("DOMContentLoaded", function (){  
    getRecipes(idArr);
});