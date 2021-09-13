export default class FormValidator{
  constructor(params, form){
    this._params = params;
    this._form = form;
  }
  _showInputError(inputElement, errorMessage){
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._params.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._params.errorClass);
  };
  
  _hideInputError(inputElement){
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._params.inputErrorClass);
    this._errorElement.classList.remove(this._params.errorClass);
    this._errorElement.textContent = '';
  };
  
  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  _toggleButtonState(inputList, submitButton){
    if(this._hasInvalidInput(inputList)){
        submitButton.classList.add(this._params.inactiveButtonClass);
        submitButton.setAttribute("disabled", "disabled");
    }
    else {
        submitButton.classList.remove(this._params.inactiveButtonClass);
        submitButton.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._params.inputSelector));
    this._submitButton = this._form.querySelector(this._params.submitButtonSelector);
    this._toggleButtonState(this._inputList, this._submitButton);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      });
    });
  };
  enableValidation () {
   
    
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    
  };
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(this._inputList, this._submitButton);
  }
}

