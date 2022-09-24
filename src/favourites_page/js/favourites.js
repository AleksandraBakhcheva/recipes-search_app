// welcome==
let email = localStorage.getItem("welcomeemail");
let users = JSON.parse(localStorage.getItem('useremails') || '[]');
let names = JSON.parse(localStorage.getItem('usernames') || '[]');
let i = users.indexOf(email);
let welcomeMsg = document.createElement("div");
document.querySelector("h1").append(welcomeMsg);
welcomeMsg.textContent = `Welcome, ${names[i]}`;
welcomeMsg.classList.add('welcome-msg');
//load from local storage==
let result = document.querySelector('.result__container');
let arrFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
console.log(arrFavorites);
let dataArr = [];

async function getRecipes() {    
    try{
    for (let i of arrFavorites) {
        let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`;
    const response = await fetch(url);
    const data = await response.json();    
        dataArr.push(data.meals[0]);
    }}
    catch(error) {
    console.error('Error:', error);
    }
    finally{
    renderFav(dataArr);
    }            
}

function renderFav(dataArr){
    let generatedFav = ''; 
    result.innerHTML = '';
    console.log(dataArr);
    for (let d = 0; d < dataArr.length; d++){        
            generatedFav += `
                <div class="result__item">
                    <img src="${dataArr[d].strMealThumb}" alt="${dataArr[d].strMeal}">
                    <div class="item__details">
                        <div class="details">
                            <h2 class="item-name">${dataArr[d].strMeal}</h2>
                            <h3 class="item-area">${dataArr[d].strArea}</h3>
                        </div>
                        <div class="recipe__marker">
                            <button class="recipe__marker-btn" ><img src="./img/bookmark-filled.svg" alt="bookmark"
                                    class="recipe__marker-btn-img" data-id=${dataArr[d].idMeal}></button>
                        </div>
                        <div class="view-button">
                            <a href='../page2/index.html?id=${dataArr[d].idMeal}'>View recipe</a>
                        </div>
                    </div>            
                </div>`
            }
        result.innerHTML = generatedFav;
}
document.addEventListener("DOMContentLoaded", function (){  
    getRecipes(dataArr);
});

//bookmark=====

    document.addEventListener('click', function(e){
        if (e.target.classList.contains('recipe__marker-btn-img')){
            e.target.classList.toggle('active');} 
            addFav(e); 
    });
    
    function addFav(e) {
        console.log(e.target.dataset.id);
        if (e.target.classList.contains('active')){
            arrFavorites.push(e.target.dataset.id);
            e.target.src = "img/bookmark-filled.svg";
        }else{
            e.target.src = "img/bookmark.svg";
            arrFavorites = arrFavorites.filter(el => el !== e.target.dataset.id);
        }
        localStorage.setItem('favorites', JSON.stringify(arrFavorites));
       // checkFav(e);
    }
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