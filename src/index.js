import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeButton } from './scripts/card.js';
import { openPopup, animatePopup, closePopup, closePopupButton, closePopupOverlay} from './scripts/modal.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton= document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEditElement = document.querySelector('.popup_type_edit');
const popupAddElement = document.querySelector('.popup_type_new-card');
const popupImageElement = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupElements = document.querySelectorAll('.popup');
const formEdit = document.forms['edit-profile'];
const nameInput =  formEdit.elements['name'];
const jobInput = formEdit.elements['description'];
const formNew = document.forms['new-place'];
const placeName = formNew.elements['place-name'];
const placeLink = formNew.elements['link'];


function openPopupImage({title, imageLink}){
    openPopup(popupImageElement);
    image.src = imageLink;
    caption.textContent = title;
    image.alt = title;
};

function editForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;    
 };
 
 
 function handleEditFormSubmit(evt) {
     evt.preventDefault();
     profileTitle.textContent = nameInput.value;
     profileDescription.textContent = jobInput.value;
     closePopup(popupEditElement);
     formEdit.reset();
 };

 function addNewPlace(evt) {
    evt.preventDefault();
    const cardData = {
        title: placeName.value,
        imageLink: placeLink.value,
        deleteCard,
        likeButton,
        openPopupImage,
    };
    const newCard = createCard(cardData);
    placesList.prepend(newCard);
    closePopup(popupAddElement);
    formNew.reset();
};

initialCards.forEach((card) => {
    const cardData = {
        title: card.name,
        imageLink: card.link,
        deleteCard,
        likeButton,
        openPopupImage,
    };

    const cardElement = createCard(cardData); 
    placesList.append(cardElement);
});

popupElements.forEach(popup => {
    animatePopup(popup);
});

profileEditButton.addEventListener('click', () => {
    openPopup(popupEditElement);
    editForm();
});

profileAddButton.addEventListener('click', () => {
    openPopup(popupAddElement);
});

popupCloseButtons.forEach(button => {
    button.addEventListener('click', closePopupButton)
});

popupElements.forEach(popup => {
    popup.addEventListener('click', closePopupOverlay);
});

formEdit.addEventListener('submit', handleEditFormSubmit);

formNew.addEventListener('submit', addNewPlace);



