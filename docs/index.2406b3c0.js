let e=document.createElement("div");e.classList.add("login__form"),document.querySelector(".sign-in__box").append(e);let t=document.createElement("form");t.classList.add("form"),document.querySelector(".login__form").append(t),document.querySelector(".menu__link_button").addEventListener("click",(function(){""===t.innerHTML?t.innerHTML='<label for="email"><input class="login__input" type="email" placeholder="type your email" name="email" id="email"></label><label for="password"><input class="login__input password" type="password" placeholder="type your password" name="password" id="password"></label><div><button class="menu__link_button button_color" type="submit">Sign in</button></div>':t.innerHTML=""}));let o=document.createElement("div");document.querySelector(".login__form").prepend(o),document.querySelector(".form").addEventListener("submit",(function(e){e.preventDefault();let t=document.querySelector(".login__input").value,r=document.querySelector(".password").value,l=JSON.parse(localStorage.getItem("useremails")||"[]"),n=JSON.parse(localStorage.getItem("userpasswords")||"[]");for(let e=0;e<l.length;e++){if(t===l[e]&&r===n[e]){localStorage.setItem("welcomeemail",t),window.location.href="../favourites_page/favourites.html";break}t===l[e]&&r===n[e]||(o.textContent="Your email or password are not correct. Please try again...")}0!==l.length&&0!==n.length||(o.textContent="You're not registered. Please register first"),o.classList.add("wrong_login_email_message"),o.style.color="rgb(192, 17, 17)",setTimeout((()=>{o.textContent=""}),"5000"),document.querySelector(".login__input").value="",document.querySelector(".password").value=""}));
//# sourceMappingURL=index.2406b3c0.js.map