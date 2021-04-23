export const initialCards = [
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
  export const defaultFormConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
  export const containerSelector = '.elements__list';
  export const popupExitSelector = '.popup__exit';
  export const addCardPopupOpenBtn = document.querySelector('.profile__add-button');
  export const editProfilePopupOpenBtn = document.querySelector('.profile__editt-button');
  export const profileNameSelector = '.profile__name';
  export const profileProfessionSelector = '.profile__profession';
  export const cardSelector = '#element';
  export const popupImageSelector = '.popup_type_image';
  export const popupEditSelector = '.popup_type_edit';
  export const popupCreatingSelector = '.popup_type_creating';
  export const popupInputNameSelector = '.popup__input_type_name';
  export const popupInputProfessionSelector = '.popup__input_type_profession';