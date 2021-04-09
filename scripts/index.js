
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const defaultFormConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
const popupEdit = document.querySelector('.popup_type_edit');
//закрытие попапа клавишей эскейп
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    exitPopup(openedPopup);
  }
}
function createCard(name, link, selector){
  return new Card(name, link, selector);
}
//открытие принимаемого попапа
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
//закрытие принимаемого попапа
function exitPopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const formElement = popupEdit.querySelector(".popup__form");
const editFormValidator = new FormValidator(defaultFormConfig, formElement);
editFormValidator.enableValidation();
const inputName = formElement.querySelector(".popup__input_type_name");
const inputProfession = formElement.querySelector(".popup__input_type_profession");

const editExit = popupEdit.querySelector('.popup__exit');

const errorEditMesageList = popupEdit.querySelectorAll('.popup__input-error');
//открытие попапа редактирования профиля
function openEditProfilePopup(){
    editFormValidator.resetValidation();
    
    openPopup(popupEdit);
    inputName.value = profileName.textContent;
    inputProfession.value = profileProfession.textContent;
    
}
const editButton = document.querySelector('.profile__editt-button');
editButton.addEventListener('click', openEditProfilePopup);
//закрытие попапа редактирования

editExit.addEventListener('click', () =>{
  exitPopup(popupEdit);
});
//закрытие попапа редактирования про нажатии на пустоту
popupEdit.addEventListener('click',function(evt){
  if(evt.target.classList.contains('popup')){
    exitPopup(popupEdit);
  }
});


//обработка сохранения формы
function editProfileFormSubmitHandle (evt) {
    evt.preventDefault(); 
    const name = inputName.value;
    const job = inputProfession.value;
    profileName.textContent = name;
    profileProfession.textContent = job;
    exitPopup(popupEdit);
}
formElement.addEventListener('submit', editProfileFormSubmitHandle); 
//список начальных карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
  
const cardList = document.querySelector('.elements__list');
const card = document.querySelector('#element').content;
//заполнение карточек
const popupCardImage = document.querySelector('.popup_type_image');
const popupImage = popupCardImage.querySelector('.popup__image');
const popupText = popupCardImage.querySelector('.popup__text');
const imagePopupCloseBtn = popupCardImage.querySelector('.popup__exit');
imagePopupCloseBtn.addEventListener('click', function(){
  exitPopup(popupCardImage);
})
popupCardImage.addEventListener('click',function(evt){
  if(evt.target.classList.contains('popup')){
    exitPopup(popupCardImage);
  }
});

initialCards.forEach(function(item){
      const newCard = createCard(item.name, item.link, '#element');
      cardList.append(newCard.generateCard());
});

const addCardPopupOpenBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_creating');

//закрытие окна создания карточки
const formElementCreat = popupAddCard.querySelector(".popup__form");
const creatFormValidator = new FormValidator(defaultFormConfig, formElementCreat);
creatFormValidator.enableValidation();
const formLocation = formElementCreat.querySelector('.popup__input_type_locatio');
const formLink = formElementCreat.querySelector('.popup__input_type_link');
const addCardPopupCloseBtn = popupAddCard.querySelector('.popup__exit');
const errorAddMesageList = popupAddCard.querySelectorAll('.popup__input-error')
addCardPopupOpenBtn.addEventListener('click', function(){
  formLocation.value='';
  formLink.value='';
  creatFormValidator.resetValidation();
  
  openPopup(popupAddCard);
});

popupAddCard.addEventListener('click',function(evt){
  if(evt.target.classList.contains('popup')){
    exitPopup(popupAddCard);
  }
});

addCardPopupCloseBtn.addEventListener('click', function(){
  exitPopup(popupAddCard);
});

//обработка формы и создание карточки

function addCardFormSubmitHandler (evt) {
    evt.preventDefault(); 
    const name =  formLocation.value;
    const link = formLink.value;
    const newCard = createCard(name, link, '#element');
    cardList.prepend(newCard.generateCard());
    exitPopup(popupAddCard);
}
formElementCreat.addEventListener('submit', addCardFormSubmitHandler); 

export {popupCardImage, popupImage, popupText, openPopup} 