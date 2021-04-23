import Popup from './Popup.js'; 
export default class PopupWithForm extends Popup{
    constructor(popupSelector, formSubmitHandler){
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._popupForm = this._popup.querySelector('.popup__form')
    }
    _getInputValues(){
        this._popupObject = new Object();
        this._popupForm.querySelectorAll('.popup__input').forEach((evt)=>{
            this._popupObject[evt.name] = evt.value;
        })
        
        return this._popupObject;
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
        this._popupForm.reset();
    }
}