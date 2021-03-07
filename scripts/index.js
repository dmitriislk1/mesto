//открытие попапа редактирования имени профиля
const popupEdit = document.querySelector('.popup_type_edit');
function mackePopup(){
    popupEdit.classList.add('popup_opened');

    let inputName = popupEdit.querySelector(".popup__input_type_name");
    inputName.value = document.querySelector(".profile__name").textContent;

    let inputProfession = popupEdit.querySelector(".popup__input_type_profession");
    inputProfession.value = document.querySelector(".profile__profession").textContent;
}
//закрытие попапа
function exitPopupEdit(){
    popupEdit.classList.remove('popup_opened');
}

let editButton = document.querySelector('.profile__editt-botton');
let exit = popupEdit.querySelector('.popup__exit');

editButton.addEventListener('click', mackePopup);
exit.addEventListener('click', exitPopupEdit);

let formElement = popupEdit.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__input_type_name");
let jobInput = formElement.querySelector(".popup__input_type_profession");

//обработка сохранения формы
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let name = nameInput.value;
    let job = jobInput.value;
    document.querySelector(".profile__name").textContent = name;
    document.querySelector(".profile__profession").textContent = job;
    exitPopupEdit();
}
formElement.addEventListener('submit', formSubmitHandler); 
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
  for(let i = 0; i < initialCards.length; i++){
      const newCard = card.querySelector('.element').cloneNode(true);
      newCard.querySelector('.element__title').textContent = initialCards[i].name;
      newCard.querySelector('.element__image').src = initialCards[i].link;
      newCard.querySelector('.element__image').alt = initialCards[i].name;
      newCard.querySelector('.popup__image').src = initialCards[i].link;
      newCard.querySelector('.popup__image').alt = initialCards[i].name;
      newCard.querySelector('.popup__text').textContent = initialCards[i].name;
      cardList.append(newCard);
      //Лайк карточки
      newCard.querySelector('.element__heart').addEventListener('click', function(event){
        event.target.classList.toggle('element__heart_active');
      });
      //удаление карточки
      newCard.querySelector('.element__delete').addEventListener('click', function(){
        newCard.remove();
      });
      //открытие попапа карточки
      newCard.querySelector('.element__image').addEventListener('click', function(){
        newCard.querySelector('.popup').classList.add('popup_opened');
      });
      //закрытие попапа карточки
      newCard.querySelector('.popup__exit').addEventListener('click', function(){
        newCard.querySelector('.popup').classList.remove('popup_opened');
      })
  }
//открытие окна создания карточки
let add =document.querySelector('.profile__add-button');
const popupCreat = document.querySelector('.popup_type_creating');
add.addEventListener('click', function(){
    popupCreat.classList.add('popup_opened');
    popupCreat.querySelector('.popup__input_type_locatio').placeholder = 'Название';
    popupCreat.querySelector('.popup__input_type_link').placeholder = 'Ссылка на картинку';
});
//закрытие окна создания карточки
popupCreat.querySelector('.popup__exit').addEventListener('click', popupExitCreat);
function popupExitCreat(){
    popupCreat.classList.remove('popup_opened');
}
//обработка формы и создание карточки
const formElementCreat = popupCreat.querySelector(".popup__form");
function formSubmitHandlerCreat (evt) {
    evt.preventDefault(); 
    const newCard = card.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__title').textContent =  formElementCreat.querySelector('.popup__input_type_locatio').value;
    newCard.querySelector('.element__image').src =  formElementCreat.querySelector('.popup__input_type_link').value;
    cardList.prepend(newCard);
    formElementCreat.querySelector('.popup__input_type_locatio').value='';
    formElementCreat.querySelector('.popup__input_type_link').value='';
    popupExitCreat();
    //Лайк карточки
    newCard.querySelector('.element__heart').addEventListener('click', function(event){
      event.target.classList.toggle('element__heart_active');
    });
    //удаление карточки
    newCard.querySelector('.element__delete').addEventListener('click', function(){
      newCard.remove();
    })
}
formElementCreat.addEventListener('submit', formSubmitHandlerCreat); 




