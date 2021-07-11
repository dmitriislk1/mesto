
export default class Card{
    constructor({data, handleCardClick,handlerDeletCard, handlerLikeCard}, cardSelector){
      this._id = data.id;
      this._name = data.name;
      this._link = data.link;
      this._counter = data.counter;
      this._root = data.root;
      this._likeStatus = data.likeStatus;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handlerDeletCard = handlerDeletCard;
      this._handlerLikeCard = handlerLikeCard;
      //this._handlerDeletePopup = handlerDeletPopup;
    }
    generateCard(){
      this._element = this._getTemplate();
      this._heart = this._element.querySelector('.element__heart');
      this._event = this._setEventListeners();
      const newCardImage = this._element.querySelector('.element__image');
      this._element.querySelector('.element__title').textContent = this._name;
      newCardImage.src = this._link;
      newCardImage.alt = this._name;

      this._element.querySelector('.element__counter').textContent = this._counter;
      if(this._likeStatus){
        this._heart.classList.toggle('element__heart_active');
      }
      if(!this._root){
        this._element.querySelector('.element__delete').classList.add('element__delete_unvisible');
      }
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
      this._heart.classList.toggle('element__heart_active');
      this._handlerLikeCard(this._likeStatus);
      this._likeStatus = !this._likeStatus;
      if(this._likeStatus){
        this._element.querySelector('.element__counter').textContent++;
      }else{
        this._element.querySelector('.element__counter').textContent--;
      }
      
    }
    _handleRemoveClick(){
      this._handlerDeletCard();
    
      //this._element.remove();
    }
    _handleOpenPopupCard(){
      this._handleCardClick(this);
    }
    setId(id){
      this._id = id;
    }
    getId(){
      return this._id;
    }
    deletCardlis(){
      this._element.remove();
    }
  }
 