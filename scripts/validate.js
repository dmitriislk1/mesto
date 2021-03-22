
 
 const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...res}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...res}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, res) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, res);
    } else {
      hideInputError(formElement, inputElement, res);
    }
  };
  
  const hasInvalidInput = (inputList) =>{
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  const toggleButtonState = (inputList, submitButton, {inactiveButtonClass, ...res} ) =>{
    if(hasInvalidInput(inputList)){
        submitButton.classList.add(inactiveButtonClass);
    }
    else {
        submitButton.classList.remove(inactiveButtonClass);
    }
  }

  const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...res}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, submitButton, res);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement,  res);
        toggleButtonState(inputList, submitButton, res);
      });
    });
  };
  const enableValidation = ({ formSelector, ...rest }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, rest);
    });
  };
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 