export { enableValidation, clearValidation };

const showInputError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid});
  }; 

  const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
  }; 

  function setEventListeners (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };

  
  function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt){
        evt.preventDefault();
      });
  
      setEventListeners(formElement, validationConfig);
    });
  }

  function makeButtonInactive (profileForm, validationConfig) {
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector)
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
  };

  function clearValidation(profileForm, validationConfig) {
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach(inputElement => {
        inputElement.classList.remove(validationConfig.inputErrorClass);
        inputElement.setCustomValidity("");
        const errorElement = profileForm.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(validationConfig.errorClass);
        errorElement.textContent = '';
    });
    makeButtonInactive (profileForm, validationConfig);
}
