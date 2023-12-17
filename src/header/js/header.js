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
    </header>
    <div class="modal-sign-in">
        <div class="modal-content-sign-in">
          <div class="modal-header-sign-in">
            <h2>Sign In Form</h2>
            <span class="modal-close">&times;</span>
          </div>
          <div class="modal-body-form"></div>
        </div>
    </div>`;
  }
}

customElements.define("my-header", MyHeader);

let modal = document.querySelector(".modal-sign-in");
let modalClose = document.querySelector(".modal-close");

let login_form = document.createElement("div");
login_form.classList.add("login__form");
document.querySelector(".modal-body-form").append(login_form);
let formAdd = document.createElement("form");
formAdd.classList.add("form");
document.querySelector(".login__form").append(formAdd);

let button = document.querySelector(".menu__link_button");
button.addEventListener("click", function () {
  modal.style.display = "block";
  if (formAdd.innerHTML === ``) {
    formAdd.innerHTML = `<label for="email"><input class="login__input" type="email" placeholder="type your email" name="email" id="email"></label><label for="password"><input class="login__input password" type="password" placeholder="type your password" name="password" id="password"></label><div><button class="menu__link_button button_color" type="submit">Sign in</button></div>`;
  } else {
    formAdd.innerHTML = ``;
  }
  modalClose.onclick = function () {
    modal.style.display = "none";
    formAdd.innerHTML = ``;
  };
});

let error = document.createElement("div");
document.querySelector(".login__form").append(error);

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
      window.location.href = "favourites.html";
      break;
    } else if (email !== users[i] || password !== passwords[i]) {
      error.textContent =
        "Your email or password are not correct. Please try again...";
    }
  }
  if (users.length === 0 || passwords.length === 0) {
    error.textContent = "You're not registered. Please register first";
  }
  error.classList.add("wrong_login_email_message");
  error.style.color = "rgb(192, 17, 17)";
  setTimeout(() => {
    error.textContent = "";
  }, "5000");
  document.querySelector(".login__input").value = "";
  document.querySelector(".password").value = "";
});
