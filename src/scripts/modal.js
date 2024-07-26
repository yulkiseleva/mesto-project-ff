export { openPopup, animatePopup, closePopup, closePopupButton, closePopupOverlay, closePopupEsc };

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
};

function animatePopup(popup){
    popup.classList.add('popup_is-animated');
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
};

function closePopupButton(evt){
    closePopup(evt.target.closest('.popup'));
};

function closePopupOverlay(evt){
    if(evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}; 

function closePopupEsc(evt){
    if(evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'));
    }
};

