import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import './index.css';
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
  popupCreatingSelector
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const imagePopup = new PopupWithImage(popupImageSelector);//попап изображения
imagePopup.setEventListeners();
//создание дефолтных карточек из списка
const cardList = new Section({items: initialCards, renderer: (item)=>{
      const card = new Card({data: item, handleCardClick: ()=>{
        imagePopup.open({link: item.link, name: item.name })
        
      }
    },cardSelector);
      return card.generateCard();
    }
  },containerSelector
);
cardList.renderItems();

//создания карточки создания попапа
const addCardPopup  = new PopupWithForm(popupCreatingSelector, (inputValues)=>{
  const cardName = inputValues.location;
  const cardLink = inputValues.link;
  const newCard = new Card({data: {link: cardLink, name: cardName}, handleCardClick: ()=>{
    imagePopup.open({link: cardLink, name: cardName});
  }
}, cardSelector);
  cardList.addItem(newCard.generateCard());
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
  editProfilePopup.close();
  
});
//установка слушателей для попапа редактирования профиля
editProfilePopup.setEventListeners();

//установка валидации формы редактирования профиля
const editFormValidator = new FormValidator(defaultFormConfig, editProfilePopup.getPopupForm());
editFormValidator.enableValidation();


const inputName = editProfilePopup.getPopupForm().querySelector('.popup__input_type_name');
const inputProfession = editProfilePopup.getPopupForm().querySelector('.popup__input_type_profession');
//наложение слушателя нажатия кнопки открытия попапа редактирования профиля
editProfilePopupOpenBtn.addEventListener('click', ()=>{
  const infoList = editProfile.getUserInfo();
  inputName.value = infoList.name;
  inputProfession.value = infoList.profesion;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});
