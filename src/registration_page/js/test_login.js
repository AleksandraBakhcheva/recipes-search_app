let message = localStorage.getItem("welcomemessage");
let div = document.createElement("div");
div.classList.add("message");
document.querySelector("form").append(div);
div.textContent = message;
div.style.color = "rgb(192, 17, 17)";
setTimeout(() => {
    div.textContent = "";
}, "4000");

let form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;
    let users = JSON.parse(localStorage.getItem('useremails') || '[]');
    let passwords = JSON.parse(localStorage.getItem('userpasswords') || '[]');
    for (let i = 0; i < users.length; i++) {
        if (email === users[i] && password === passwords[i]) {
            localStorage.setItem("welcomeemail", email);
            window.location.href = "favourites.html";
            break;
        }
    else if (email !== users[i] || password !== passwords[i]) {
        div.textContent = "Your email or password are not correct";
    }}
    document.querySelector(".email").value = "";
    document.querySelector(".password").value = "";
});