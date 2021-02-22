let popup = document.querySelector('.popup');

function mackePopup(){
    popup.classList.add('popup_opened');

    let inputName = document.querySelector(".popup__name");
    inputName.value = document.querySelector(".profile__name").textContent;

    let inputProfession = document.querySelector(".popup__profession");
    inputProfession.value = document.querySelector(".profile__profession").textContent;
}
function exitPopup(){
    popup.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__editt-botton');
let exit = document.querySelector('.popup__exit');

editButton.addEventListener('click', mackePopup);
exit.addEventListener('click', exitPopup);

let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__name");
let jobInput = formElement.querySelector(".popup__profession");


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let name = nameInput.value;
    let job = jobInput.value;
    document.querySelector(".profile__name").textContent = name;
    document.querySelector(".profile__profession").textContent = job;
    exitPopup();
    
}
formElement.addEventListener('submit', formSubmitHandler); 