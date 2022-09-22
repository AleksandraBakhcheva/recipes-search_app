let email = localStorage.getItem("welcomeemail");
let users = JSON.parse(localStorage.getItem('useremails') || '[]');
let names = JSON.parse(localStorage.getItem('usernames') || '[]');
let i = users.indexOf(email);
let div = document.createElement("div");
document.querySelector("h1").append(div);
div.textContent = `Welcome ${names[i]}`;