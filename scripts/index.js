//открытие попапа редактирования имени профиля
const popupEdit = document.querySelector('.popup_type_edit');

function openPopup(popup){
  popup.classList.add('popup_opened');
}
function exitPopup(popup){
  popup.classList.remove('popup_opened');
}

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

const formElement = popupEdit.querySelector(".popup__form");
const inputName = formElement.querySelector(".popup__input_type_name");
const inputProfession = formElement.querySelector(".popup__input_type_profession");

const editExit = popupEdit.querySelector('.popup__exit');

function openEditProfilePopup(){
    openPopup(popupEdit);
    
    inputName.value = profileName.textContent;
    
    inputProfession.value = profileProfession.textContent;
    
}
const editButton = document.querySelector('.profile__editt-button');
editButton.addEventListener('click', openEditProfilePopup);
//закрытие попапа
editExit.addEventListener('click', () =>{
  exitPopup(popupEdit);
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
initialCards.forEach(function(item){
      const newCard = createCard(item.name, item.link);
      cardList.append(newCard);
});

const addCardPopupOpenBtn = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_creating');
addCardPopupOpenBtn.addEventListener('click', function(){
  openPopup(popupAddCard);
});
//закрытие окна создания карточки
const formElementCreat = popupAddCard.querySelector(".popup__form");
const formLocation = formElementCreat.querySelector('.popup__input_type_locatio');
const formLink = formElementCreat.querySelector('.popup__input_type_link');
const addCardPopupCloseBtn = popupAddCard.querySelector('.popup__exit');

addCardPopupCloseBtn.addEventListener('click', function(){
  exitPopup(popupAddCard);
  formLocation.value='';
  formLink.value='';
});

//обработка формы и создание карточки

function addCardFormSubmitHandler (evt) {
    evt.preventDefault(); 
    const name =  formLocation.value;
    const link = formLink.value;
    const newCard = createCard(name, link);
    cardList.prepend(newCard);
    formLocation.value='';
    formLink.value='';
    exitPopup(popupAddCard);
}
formElementCreat.addEventListener('submit', addCardFormSubmitHandler); 

function createCard(name, link)
{
  const newCard = card.querySelector('.element').cloneNode(true);
  const newCardImage = newCard.querySelector('.element__image');
  newCard.querySelector('.element__title').textContent = name;
  newCardImage.src =  link;
  newCardImage.alt =  name;
  
  //Лайк карточки
  newCard.querySelector('.element__heart').addEventListener('click', function(event){
    event.target.classList.toggle('element__heart_active');
  });
  //удаление карточки
  newCard.querySelector('.element__delete').addEventListener('click', function(){
    newCard.remove();
  })
  //создание попапа карточки
  newCard.querySelector('.element__image').addEventListener('click', function()
  {
    popupImage.src = link;
    popupImage.alt = name;
    popupText.textContent = name;
    openPopup(popupCardImage);
  });
  return newCard;
}
