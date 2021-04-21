import Popup from './Popup.js'; 
export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmitHandler){
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupForm = this._popup.querySelector('.popup__form')
    }
    _getInputValues(){
        return Array.from(this._popup.querySelector('.popup__form').querySelectorAll('.popup__input'));
    }
    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt)=>{
            evt.preventDefault(); 
            this._formSubmitHandler(this._getInputValues());
        })
    }
    getPopupForm(){
        return this._popupForm;
    }
    close(){
        super.close();
        this._getInputValues().forEach(input => {
            input.value = '';
        });
    }
}