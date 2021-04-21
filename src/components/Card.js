
export default class Card{
    constructor({data, handleCardClick}, cardSelector){
      this._name = data.name;
      this._link = data.link;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
    }
    generateCard(){
      this._element = this._getTemplate();
      this._event = this._setEventListeners();
      const newCardImage = this._element.querySelector('.element__image');
      this._element.querySelector('.element__title').textContent = this._name;
      newCardImage.src = this._link;
      newCardImage.alt = this._name;
      return this._element;
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
    _setEventListeners(){
      this._element.querySelector('.element__heart').addEventListener('click', () => {
        this._handleLikeClick();
      });
      this._element.querySelector('.element__delete').addEventListener('click', () => {
        this._handleRemoveClick();
      });
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._handleOpenPopupCard();
      });
    }
    _handleLikeClick(){
      this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
    }
    _handleRemoveClick(){
      this._element.remove();
    }
    _handleOpenPopupCard(){
      this._handleCardClick();
    }
  }
 