class FormValidator{
  constructor(rest, form){
    this._rest = rest;
    this._form = form;
  }
  _showInputError(formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...res}){
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(errorClass);
  };
  
  _hideInputError(formElement, inputElement, {inputErrorClass, errorClass, ...res}){
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    this._errorElement.classList.remove(errorClass);
    this._errorElement.textContent = '';
  };
  
  _checkInputValidity(formElement, inputElement, res){
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, res);
    } else {
      this._hideInputError(formElement, inputElement, res);
    }
  };
  
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  _toggleButtonState(inputList, submitButton, {inactiveButtonClass, ...res} ){
    if(this._hasInvalidInput(inputList)){
        submitButton.classList.add(inactiveButtonClass);
    }
    else {
        submitButton.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners(formElement, {inputSelector, submitButtonSelector, ...res}) {
    this._inputList = Array.from(formElement.querySelectorAll(inputSelector));
    this._submitButton = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(this._inputList, this._submitButton, res);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, res);
        this._toggleButtonState(this._inputList, this._submitButton, res);
      });
    });
  };
  enableValidation () {
   
    
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._form, this._rest);
    
  };
}

export {FormValidator};