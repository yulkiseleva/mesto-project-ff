import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeButton } from './scripts/card.js';
import { openPopup, closePopup, closePopupButton, closePopupOverlay, closePopupEsc } from './scripts/modal.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton= document.querySelector('.profile__add-button');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupElements = document.querySelectorAll('.popup');
export const formEdit = document.forms['edit-profile'];
const nameInput =  formEdit.elements['name'];
const jobInput = formEdit.elements['description'];
const formNew = document.forms['new-place'];
const placeName = formNew.elements['place-name'];
const placeLink = formNew.elements['link'];

function openPopupImage(evt){
    openPopup(popupImageElement);

    const image = document.querySelector('.popup__image');
    const caption = document.querySelector('.popup__caption');

    image.src = evt.target.src;
    caption.textContent = evt.target.closest('.places__item').querySelector('.card__title').textContent;
};

initialCards.map((card) => {
    const cardElement = createCard(card.name, card.link, deleteCard,likeButton, openPopupImage); 
    placesList.append(cardElement);
});


function openFormPopup(button, popup) {
    button.addEventListener('click', evt => {
    openPopup(popup);
    editForm();
})
};

openFormPopup(profileEditButton, popupEditElement);
openFormPopup(profileAddButton, popupAddElement);


popupCloseButtons.forEach(button => {
    button.addEventListener('click', closePopupButton)
});

popupElements.forEach(popup => {
    popup.addEventListener('click', closePopupOverlay);
    popup.addEventListener('keydown', closePopupEsc);
});


function editForm() {
   nameInput.value = document.querySelector('.profile__title').textContent;
   jobInput.value = document.querySelector('.profile__description').textContent;    
};


function handleEditFormSubmit(evt) {
    evt.preventDefault();
    if (nameInput.value.length >0 && jobInput.value.length > 0) {
        document.querySelector('.profile__title').textContent = nameInput.value;
        document.querySelector('.profile__description').textContent = jobInput.value;  
    };
    closePopup(popupEditElement);
}


formEdit.addEventListener('submit', handleEditFormSubmit);

function addNewPlace(evt) {
    evt.preventDefault();
    const newCard = createCard(placeName.value, placeLink.value, deleteCard, likeButton, openPopupImage);
    placesList.prepend(newCard);
    closePopup(popupAddElement);
    formNew.reset();
};

formNew.addEventListener('submit', addNewPlace);



