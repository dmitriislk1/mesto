import {popupExitSelector} from '../utils/constants.js';
export default class Popup{
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (evt)=>{
            this._handleEscClose(evt);
        });
    }
    close(){
        this._popup.classList.remove('popup_opened')
    }
    _handleEscClose(evt){
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners(){
        this._closePopupBtn = this._popup.querySelector(popupExitSelector);
        this._closePopupBtn.addEventListener('click', ()=>{
            this.close();
        })
        this._popup.addEventListener('click', (evt)=>{
            if(evt.target.classList.contains('popup')){
                this.close();
            }
          });
    }
}