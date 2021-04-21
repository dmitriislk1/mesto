import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
    open({link, name}){
        this._popup.querySelector('.popup__image').alt = name;
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__text').textContent = name;
        super.open();
    }

}