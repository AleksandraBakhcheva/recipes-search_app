let div = document.createElement("div");
div.classList.add("login__form");
document.querySelector(".sign-in__box").append(div);

let button = document.querySelector(".menu__link_button");
button.addEventListener("click", function() {
        if (div.innerHTML === ``) {
            div.innerHTML = `<form class="form"><label for="email"><input class="login__input" type="email" placeholder="type your email" name="email" id="email"></label><label for="password"><input class="login__input password" type="password" placeholder="type your password" name="password" id="password"></label><div><button class="menu__link_button button_color" type="submit">Sign in</button></div></form>`;
        }
        else {
            div.innerHTML = ``;
        }
});