import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
//import './index.css';
import {initialCards,
  containerSelector,
  addCardPopupOpenBtn,
  defaultFormConfig,
  profileNameSelector,
  profileProfessionSelector,
  editProfilePopupOpenBtn,
  cardSelector,
  popupImageSelector,
  popupEditSelector,
  popupCreatingSelector,
  popupInputNameSelector,
  popupInputProfessionSelector,
  popupDeletCardSelector
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import PopupWithDelete from '../components/PopupWithDelete.js';

const api =new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: 'b7b056fb-2a8d-4b35-bd7b-18676b54a6f3'
  }
})
let myId;
api.getProfileInfo().then((data) => {
  document.querySelector('.profile__name').textContent = data.name
  document.querySelector('.profile__profession').textContent = data.about;
  document.querySelector('.profile__avatar').src = data.avatar;
  myId = data._id;
})

let cardList;
api.getAllCards().then((data) =>{
//создание дефолтных карточек из списка
    cardList = new Section({
      items: data.map((item) => {
        let root = false;
        let likeStatus = false;
        item.likes.forEach(function(element){
          if(element.name === document.querySelector('.profile__name').textContent){
            likeStatus = true;
          }
        })
       
        if(item.owner._id === myId){
          root = true;
        }
        return {name: item.name, link: item.link, counter: item.likes.length, id: item._id, root: root, likeStatus: likeStatus}
      }), 
      renderer: (item)=>{
        const card  = createCard(item, cardSelector);
        return card.generateCard();
    }
    },
    containerSelector,
    api
    );
    cardList.renderItems();
});

const popupDeletCard = new PopupWithDelete(popupDeletCardSelector, ()=>{
  popupDeletCard.close();
  api.deleteCard(popupDeletCard.card.getId());
  popupDeletCard.card.deletCardlis();
})


// функция создания карточки
function createCard(data, cardSelector){
  const card = new Card({data, handleCardClick: ()=>{
     imagePopup.open({link: data.link, name: data.name })
    }, 
    handlerDeletCard: ()=>{
      popupDeletCard.open(card);
    },
    handlerLikeCard: (flag)=>{
      if(flag === true){
        api.deleteLike(card.getId());
      }else{ 
        api.setLike(card.getId());
      }
     
    }
  },cardSelector);

  return card;
}

popupDeletCard.setEventListeners();


const imagePopup = new PopupWithImage(popupImageSelector);//попап изображения
imagePopup.setEventListeners();


//создания карточки создания попапа
const addCardPopup  = new PopupWithForm(popupCreatingSelector, (inputValues)=>{
  const cardName = inputValues.location;
  const cardLink = inputValues.link;
  const data = {link: cardLink, name: cardName};
  const newCard = createCard({link: cardLink, name: cardName, counter: 0, root: true, likeStatus: false}, cardSelector);
  
  cardList.addItem(data, newCard.generateCard()).then((data)=>{
    newCard.setId(data._id);
  });
  
  addCardPopup.close();
  
});
addCardPopup.setEventListeners(); //вызов слушателя для попапа создания новой карточки


//установка валидации формы
const addFormValidator = new FormValidator(defaultFormConfig, addCardPopup.getPopupForm());
addFormValidator.enableValidation();//установка валидации формы

//наложение слушателя нажатия кнопки открытия попапа создания новой карточки
addCardPopupOpenBtn.addEventListener('click', ()=>{
  addFormValidator.resetValidation();
  addCardPopup.open();
});


//создание класса управления отображением информации
const editProfile = new UserInfo({nameSelector: profileNameSelector, profesionSelector: profileProfessionSelector});

//создани попапа редактирования профиля
const editProfilePopup  = new PopupWithForm(popupEditSelector, (inputValues)=>{
  editProfile.setUserInfo(inputValues.name, inputValues.profession);
  api.setProfileInfo(inputValues.name, inputValues.profession);
  editProfilePopup.close();
  
});
//установка слушателей для попапа редактирования профиля
editProfilePopup.setEventListeners();

//установка валидации формы редактирования профиля
const editFormValidator = new FormValidator(defaultFormConfig, editProfilePopup.getPopupForm());
editFormValidator.enableValidation();


const inputName = editProfilePopup.getPopupForm().querySelector(popupInputNameSelector);
const inputProfession = editProfilePopup.getPopupForm().querySelector(popupInputProfessionSelector);
//наложение слушателя нажатия кнопки открытия попапа редактирования профиля
editProfilePopupOpenBtn.addEventListener('click', ()=>{
  const infoList = editProfile.getUserInfo();
  inputName.value = infoList.name;
  inputProfession.value = infoList.profesion;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});