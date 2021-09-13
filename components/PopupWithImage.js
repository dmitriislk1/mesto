import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
    open({link, name}){
        this._popupImage = this._popup.querySelector('.popup__image')
        this._popupImage.alt = name;
        this._popupImage.src = link;
        this._popup.querySelector('.popup__text').textContent = name;
        super.open();
    }

}