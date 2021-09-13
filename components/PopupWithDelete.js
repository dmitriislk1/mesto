import Popup from './Popup.js'; 
export default class PopupWithDelete extends Popup{
    constructor(popupSelector, formSubmitHandler){
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
    }
    setEventListeners(){
        super.setEventListeners();
        this._popup.querySelector('.popup__button').addEventListener('click', (evt)=>{
            this._formSubmitHandler();
        })
    }
    open(card){
        this.card = card;
        super.open();
    }
}