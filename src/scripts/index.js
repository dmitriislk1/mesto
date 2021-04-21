import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import '../pages/index.css';
import {initialCards,
  containerSelector,
  addCardPopupOpenBtn,
  defaultFormConfig,
  profileNameSelector,
  profileProfessionSelector,
  editProfilePopupOpenBtn
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const imagePopup = new PopupWithImage('.popup_type_image');//попап изображения
imagePopup.setEventListeners();
//создание дефолтных карточек из списка
const CardList = new Section({items: initialCards, renderer: (item)=>{
      const card = new Card({data: item, handleCardClick: ()=>{
        imagePopup.open({link: item.link, name: item.name })
        
      }
    },'#element');
      return card.generateCard();
    }
  },containerSelector
);
CardList.renderItems();

//создания карточки создания попапа
const addCardPopup  = new PopupWithForm('.popup_type_creating', (inputValues)=>{
  const cardName = inputValues[0].value;
  const cardLink = inputValues[1].value;
  const newCard = new Card({data: {link: cardLink, name: cardName}, handleCardClick: ()=>{
    imagePopup.open({link: cardLink, name: cardName});
  }
}, '#element');
  CardList.addItem(newCard.generateCard());
  addCardPopup.close();
});
addCardPopup.setEventListeners(); //вызов слушателя для попапа создания новой карточки


//установка валидации формы
const addFormValidator = new FormValidator(defaultFormConfig, addCardPopup.getPopupForm());
addFormValidator.enableValidation();//установка валидации формы

//наложение слушателя нажатия кнопки открытия попапа создания новой карточки
addCardPopupOpenBtn.addEventListener('click', ()=>{
  addCardPopup.open();
});


//создание класса управления отображением информации
const editProfile = new UserInfo({nameSelector: profileNameSelector, profesionSelector: profileProfessionSelector});

//создани попапа редактирования профиля
const editProfilePopup  = new PopupWithForm('.popup_type_edit', (inputValues)=>{
  editProfile.setUserInfo(inputValues[0].value, inputValues[1].value);
  editProfilePopup.close();
});
//установка слушателей для попапа редактирования профиля
editProfilePopup.setEventListeners();

//установка валидации формы редактирования профиля
const editFormValidator = new FormValidator(defaultFormConfig, editProfilePopup.getPopupForm());
editFormValidator.enableValidation();

//наложение слушателя нажатия кнопки открытия попапа редактирования профиля
editProfilePopupOpenBtn.addEventListener('click', ()=>{
  const infoList = editProfile.getUserInfo();
  editProfilePopup.getPopupForm().querySelector('.popup__input_type_name').value = infoList.name;
  editProfilePopup.getPopupForm().querySelector('.popup__input_type_profession').value = infoList.profesion;
  editProfilePopup.open();
});

