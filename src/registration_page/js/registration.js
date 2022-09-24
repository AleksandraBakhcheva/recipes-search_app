const IMPORTANTMESSAGE = "Mandatory field";
const INCORRECTLANG = "Incorrect input";
const INCORRECTPASSWORD = "The password must contain English letters, numbers, different case and one of special (!^@%=<>+#_$&*) characters. The minimum password length is 8 characters";
const QUESTION_REPLY = "Please use latin or cyrillic symbols, numbers or special characters. The minimum number of characters is 5";
const ERRORCOLOR = "rgb(192, 17, 17)";
const CORRECTCOLOR = "rgba(0, 128, 0, 0.876)";
let users = [];
let passwords = [];
let names = [];

let registrationForm = document.querySelector(".registration__form");
registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    checkInput();
    });

// ВЫВОД ОШИБКИ НА НЕЗАПОЛНЕННОЕ ПОЛЕ
function setErrorMessage(input, msg) {
    document.querySelector(input).style.color = ERRORCOLOR;
    document.querySelector(msg).innerHTML = IMPORTANTMESSAGE;
}

// ПРОВЕРКА НА НЕЗАПОЛНЕННОЕ ПОЛЕ 
function isFieldEmpty(field) {
    let inputField = document.querySelector(field).value;
    if (inputField === '') {
        return true;
    }
}

// ПРОВЕРКА ЗАПОЛНЕННОСТИ ПОЛЕЙ
function checkInput() {
    if (isFieldEmpty(".input1")) {
        setErrorMessage('.surname', '.mandatory1');
    }
    if (isFieldEmpty(".input2")) {
        setErrorMessage('.name', '.mandatory2');
    }
    if (isFieldEmpty(".input3")) {
        setErrorMessage('.email', '.mandatory3');
    }
    if (isFieldEmpty(".input4")) {
        setErrorMessage('.password1', '.mandatory4');
    }
    if (isFieldEmpty(".input5")) {
        setErrorMessage('.password2', '.mandatory5');
    }

    if ((isPasswordValid() === true) && (isInputValid(FIOCHECK, inputSurname) === true) && (isInputValid(FIOCHECK, inputName) === true) && (isInputValid(EMAILCHECK, inputEmail) === true) && (isInputValid(PASSWORDCHECK, inputPassword1) === true) && (isInputValid(PASSWORDCHECK, inputPassword2) === true) && (isEmailUsed() === false)) {
        let userName = document.querySelector(".input2").value;
        let userEmail = document.querySelector(".input3").value;
        let userPassword = document.querySelector(".input4").value;
        let names = JSON.parse(localStorage.getItem('usernames') || '[]');
        let users = JSON.parse(localStorage.getItem('useremails') || '[]');
        let passwords = JSON.parse(localStorage.getItem('userpasswords') || '[]');
        names.push(userName);
        users.push(userEmail);
        passwords.push(userPassword);
        localStorage.setItem("usernames", JSON.stringify(names));
        localStorage.setItem("useremails", JSON.stringify(users));
        localStorage.setItem("userpasswords", JSON.stringify(passwords));
        window.location.href = "../index.html";
    } 
}

// ПРОВЕРКА НА ВВОД ОБЯЗАТЕЛЬНЫХ ПОЛЕЙ
function provideInput(input, clear) {
    document.querySelector(input).style.color = CORRECTCOLOR;
    document.querySelector(clear).innerHTML = "";
}

const FIOCHECK = /^[a-zA-Zа-яА-ЯЁё]{2,20}$/;

let inputSurname = document.querySelector('.input1');
inputSurname.addEventListener("keyup", function() {
    provideInput('.surname', '.mandatory1');
    isInputValid(FIOCHECK, inputSurname, '.surname', '.mandatory1', INCORRECTLANG);
});

let inputName = document.querySelector('.input2');
inputName.addEventListener("keyup", function() {
    provideInput('.name', '.mandatory2');
    isInputValid(FIOCHECK, inputName, '.name', '.mandatory2', INCORRECTLANG);
});

const EMAILCHECK = /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)$/i;

let inputEmail = document.querySelector('.input3');
inputEmail.addEventListener("keyup", function() {
    provideInput('.email', '.mandatory3');
    isInputValid(EMAILCHECK, inputEmail, '.email', '.mandatory3', INCORRECTLANG);
});

const PASSWORDCHECK = /^(?=.*\d)(?=.*[a-z])(?=.*[!^@%=<>+#_$&*])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/;

let inputPassword1 = document.querySelector('.input4');
inputPassword1.addEventListener("keyup", function() {
    provideInput('.password1', '.mandatory4');
    isInputValid(PASSWORDCHECK, inputPassword1, '.password1', '.mandatory4', INCORRECTPASSWORD);
});

let inputPassword2 = document.querySelector('.input5');
inputPassword2.addEventListener("keyup", function() {
    provideInput('.password2', '.mandatory5');
    isInputValid(PASSWORDCHECK, inputPassword2, '.password2', '.mandatory5', INCORRECTPASSWORD);
});

inputPassword2.addEventListener("keyup", isPasswordValid);

const QUESTION_REPLYCHECK = /^[?!,.a-zA-Zа-яА-ЯёЁ0-9\s]{5,50}$/;

let inputQuestion = document.querySelector('.question');
inputQuestion.addEventListener("keyup", function() {
    provideInput('.security-question', '.optional1');
    isInputValid(QUESTION_REPLYCHECK, inputQuestion, '.security-question', '.optional1', QUESTION_REPLY);
});

let inputReply = document.querySelector('.answer');
inputReply.addEventListener("keyup", function() {
    provideInput('.security-answer', '.optional2');
    isInputValid(QUESTION_REPLYCHECK, inputReply, '.security-answer', '.optional2', QUESTION_REPLY);
});

// ПРОВЕРКА НА СОВПАДЕНИЕ ПАРОЛЕЙ 
function isPasswordValid() {
    if (inputPassword1.value !== inputPassword2.value) {
        document.querySelector('.mandatory5').innerHTML = "Password does not match"; 
    }
    else { 
        document.querySelector('.mandatory5').innerHTML = "";
        return true;
    }
}   

// ВАЛИДАЦИЯ ПОЛЯ 
function isInputValid(regex, input, labelcolor, message, error) {
    if (regex.test(input.value) === false) {
        document.querySelector(labelcolor).style.color = ERRORCOLOR;
        document.querySelector(message).innerHTML = error;
    }
    else {
        return true;
    }
}

// ПРОВЕРКА НА УЖЕ СУЩЕСТВУЮЩИЙ EMAIL
function isEmailUsed() {
    if (document.querySelector('.mandatory3').textContent !== "") {
        document.querySelector('.mandatory3').textContent = "";
    }
    users = JSON.parse(localStorage.getItem('useremails') || '[]');
    let userEmail = document.querySelector(".input3").value;
    for (let i = 0; i < users.length; i++) {
        if (userEmail === users[i]) {
            let div = document.createElement("div");
            document.querySelector(".mandatory3").append(div);
            div.textContent = "User with the same email already exists";
            div.style.color = ERRORCOLOR;
            return true;
        }
    }
    return false;
};