class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header id="header">
    <div class="header__container_color">
      <div class="header__container">
        <div class="logo">
          <a href="index.html">
            <img class="logo__img" src="assets/images/logo.svg" alt="logo" />
          </a>
        </div>
        <nav class="nav">
          <ul class="menu__list">
            <li class="sign-in__box"></li>
            <li class="menu__item"><a href="index.html" class="menu__link">Home</a></li>
            <li class="menu__item"><button class="menu__link menu__link_button">Sign in</button></li>
            <li class="menu__item"><a href="registration.html" class="menu__link">Register</a>
            </li>
            <li class="menu__item"><a href="favourites.html" class="menu__link">My
                Favorites</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>`;
  }
}

customElements.define("my-header", MyHeader);

let login_form = document.createElement("div");
login_form.classList.add("login__form");
document.querySelector(".sign-in__box").append(login_form);
let formAdd = document.createElement("form");
formAdd.classList.add("form");
document.querySelector(".login__form").append(formAdd);

let button = document.querySelector(".menu__link_button");
button.addEventListener("click", function () {
  if (formAdd.innerHTML === ``) {
    formAdd.innerHTML = `<label for="email"><input class="login__input" type="email" placeholder="type your email" name="email" id="email"></label><label for="password"><input class="login__input password" type="password" placeholder="type your password" name="password" id="password"></label><div><button class="menu__link_button button_color" type="submit">Sign in</button></div>`;
  } else {
    formAdd.innerHTML = ``;
  }
});

let div = document.createElement("div");
document.querySelector(".login__form").prepend(div);

let form = document.querySelector(".form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = document.querySelector(".login__input").value;
  let password = document.querySelector(".password").value;
  let users = JSON.parse(localStorage.getItem("useremails") || "[]");
  let passwords = JSON.parse(localStorage.getItem("userpasswords") || "[]");
  for (let i = 0; i < users.length; i++) {
    if (email === users[i] && password === passwords[i]) {
      localStorage.setItem("welcomeemail", email);
      window.location.href = "../favourites_page/favourites.html";
      break;
    } else if (email !== users[i] || password !== passwords[i]) {
      div.textContent =
        "Your email or password are not correct. Please try again...";
    }
  }
  if (users.length === 0 || passwords.length === 0) {
    div.textContent = "You're not registered. Please register first";
  }
  div.classList.add("wrong_login_email_message");
  div.style.color = "rgb(192, 17, 17)";
  setTimeout(() => {
    div.textContent = "";
  }, "5000");
  document.querySelector(".login__input").value = "";
  document.querySelector(".password").value = "";
});
