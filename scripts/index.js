//открытие попапа редактирования имени профиля
const popupEdit = document.querySelector('.popup_type_edit');

function openPopup(popup){
  popup.classList.add('popup_opened');
}
function exitPopup(popup){
  popup.classList.remove('popup_opened');
}

function openEditProfilePopup(){
    openPopup(popupEdit);
    const inputName = popupEdit.querySelector(".popup__input_type_name");
    inputName.value = document.querySelector(".profile__name").textContent;
    const inputProfession = popupEdit.querySelector(".popup__input_type_profession");
    inputProfession.value = document.querySelector(".profile__profession").textContent;

    //закрытие попапа
    popupEdit.querySelector('.popup__exit').addEventListener('click', () =>{
      exitPopup(popupEdit);
    });
}

document.querySelector('.profile__editt-botton').addEventListener('click', openEditProfilePopup);


const formElement = popupEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_profession");

//обработка сохранения формы
function editProfileFormSubmitHandle (evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    document.querySelector(".profile__name").textContent = name;
    document.querySelector(".profile__profession").textContent = job;
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
initialCards.forEach(function(item){
      const newCard = card.querySelector('.element').cloneNode(true);
      createCard(item.name, item.link, newCard);
      cardList.append(newCard);
});

const add = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_creating');
add.addEventListener('click', function(){
  openPopup(popupAddCard);
});
popupAddCard.querySelector('.popup__input_type_locatio').placeholder = 'Название';
popupAddCard.querySelector('.popup__input_type_link').placeholder = 'Ссылка на картинку';
//закрытие окна создания карточки
popupAddCard.querySelector('.popup__exit').addEventListener('click', function(){
  exitPopup(popupAddCard);
  formElementCreat.querySelector('.popup__input_type_locatio').value='';
  formElementCreat.querySelector('.popup__input_type_link').value='';
});

//обработка формы и создание карточки
const formElementCreat = popupAddCard.querySelector(".popup__form");
function addCardFormSubmitHandler (evt) {
    evt.preventDefault(); 
    const newCard = card.querySelector('.element').cloneNode(true);
    const name =  formElementCreat.querySelector('.popup__input_type_locatio').value;
    const link = formElementCreat.querySelector('.popup__input_type_link').value;
    createCard(name, link, newCard);
    cardList.prepend(newCard);
    formElementCreat.querySelector('.popup__input_type_locatio').value='';
    formElementCreat.querySelector('.popup__input_type_link').value='';
    exitPopup(popupAddCard);
}
formElementCreat.addEventListener('submit', addCardFormSubmitHandler); 


function createCard(name, link, newCard)
{
  const newCardImage = newCard.querySelector('.element__image');
  newCard.querySelector('.element__title').textContent = name;
  newCardImage.src =  link;
  newCardImage.alt =  name;
  const popupImage = newCard.querySelector('.popup__image');
  popupImage.src = link;
  popupImage.alt = name;
  newCard.querySelector('.popup__text').textContent = name;
  //Лайк карточки
  newCard.querySelector('.element__heart').addEventListener('click', function(event){
    event.target.classList.toggle('element__heart_active');
  });
  //удаление карточки
  newCard.querySelector('.element__delete').addEventListener('click', function(){
    newCard.remove();
  })
  //создание попапа карточки
  const newPopup = newCard.querySelector('.popup');
  newCard.querySelector('.element__image').addEventListener('click', function()
  {
    openPopup(newPopup);
  });
  //закрытие попапа карточки
  
  newCard.querySelector('.popup__exit').addEventListener('click', function(){
    exitPopup(newPopup);
  })
  return newCard;
}
