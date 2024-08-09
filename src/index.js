import './pages/index.css';
import { createCard } from './scripts/card.js';
import { openPopup, animatePopup, closePopup, closePopupButton, closePopupOverlay} from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserInfo, getInitialCards, updateProfileInfo, postNewCard, updateAvatar } from './scripts/api.js';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton= document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
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
const popupEditAvatar = document.querySelector('.popup_type_edit_avatar');
const formProfileAvatar = document.forms['edit-profile-avatar'];
const linkAvatarInput = formProfileAvatar.elements['avatar-link'];
const currentUserIdValue = 'f142314f79bd777cf5274cc2';


Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      
      initialCards.forEach((card) => {
        const cardData = {
            cardId: card._id,
            title: card.name,
            imageLink: card.link,
            openPopupImage,
            likeNumber: card.likes.length,
            ownerId: card.owner._id,
            currentUserId: `${currentUserIdValue}`,
        };
        const cardElement = createCard(cardData); 
        placesList.append(cardElement);
      });
    })
    .catch((err) => {
        console.log('Произошла ошибка' + err)
    }); 

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
 
function toggleSaveButtonState(popup, isSaving) {
    const saveButton = popup.querySelector('.popup__button');
    if(isSaving) {
        saveButton.textContent = "Сохранение...";
    } else {
        saveButton.textContent = "Сохранить";
    }   
};

 
function handleEditFormSubmit(evt) {
     evt.preventDefault();
     toggleSaveButtonState(popupEditElement, true);
     updateProfileInfo({
        name: `${profileTitle.textContent}`,
        about: `${profileDescription.textContent}`,
    })
    .then(() => {
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = jobInput.value;
        closePopup(popupEditElement);
        formEdit.reset();
    }) 
    .catch(err => {
        console.log('Произошла ошибка при сохранении' + err);
    })
    .finally(() => {
        toggleSaveButtonState(popupEditElement, false);
    });
 };

 function handleProfileAvatarSubmit(evt) {
    evt.preventDefault();
    toggleSaveButtonState(popupEditAvatar, true);
    updateAvatar({avatar: `${linkAvatarInput.value}`})
    .then(() => {
        profileImage.style.backgroundImage = `url(${linkAvatarInput.value})`;
        closePopup(popupEditAvatar);
        formProfileAvatar.reset();
        clearValidation(popupEditAvatar, validationConfig);
    }) 
    .catch(err => {
        console.log('Произошла ошибка при сохранении' + err);
    })
    .finally(() => {
        toggleSaveButtonState(popupEditAvatar, false);
    });
 };

 function addNewPlace(evt) {
    evt.preventDefault();
    toggleSaveButtonState(popupAddElement, true);
    postNewCard({
        name: `${placeName.value}`,
        link: `${placeLink.value}`,
        owner:{
            _id: `${currentUserIdValue}`,
        },
    })
    .then((newCardData) => {
        const newCard = createCard({
            cardId: newCardData._id,
            title: newCardData.name,
            imageLink: newCardData.link,
            openPopupImage,
            likeNumber: newCardData.likes.length,
            ownerId: newCardData.owner._id,
            currentUserId: `${currentUserIdValue}`,
        });
        placesList.prepend(newCard);
      })
    .then(() => {
        closePopup(popupAddElement);
        formNew.reset();
        clearValidation(popupAddElement, validationConfig);
    }) 
    .catch(err => {
        console.log('Произошла ошибка при сохранении' + err);
    })
    .finally(() => {
        toggleSaveButtonState(popupAddElement, false);
    });
    
};

popupElements.forEach(popup => {
    animatePopup(popup);
    popup.addEventListener('click', closePopupOverlay);
});

profileEditButton.addEventListener('click', () => {
    clearValidation(popupEditElement, validationConfig);
    openPopup(popupEditElement);
    editForm();
});

profileImage.addEventListener('click', () => {
    openPopup(popupEditAvatar);
});

profileAddButton.addEventListener('click', () => {
    openPopup(popupAddElement);
});

popupCloseButtons.forEach(button => {
    button.addEventListener('click', closePopupButton)
});


formEdit.addEventListener('submit', handleEditFormSubmit);

formNew.addEventListener('submit', addNewPlace);

formProfileAvatar.addEventListener('submit', handleProfileAvatarSubmit);


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; 

enableValidation(validationConfig);


