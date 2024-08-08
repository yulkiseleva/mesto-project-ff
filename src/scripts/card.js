export { createCard };
import { deleteCardFromServer, putLike, deleteLike } from "./api";


function deleteCard(card, cardId) {
    deleteCardFromServer(cardId)
    .then(() => {
        card.remove();
    })
    .catch((err) => {
        console.log('Произошла ошибка' + err)
    }); 
};

function likeCard(button, cardId, numberOfLikesData) {
    const isLiked = button.classList.toggle('card__like-button_is-active');
    if(isLiked) {
       putLike(cardId)
       .then(card => {
        numberOfLikesData.textContent = card.likes.length;
       })
       .catch((err) => {
        console.log('Произошла ошибка' + err)
       }); 
    } else {
        deleteLike(cardId)
        .then(card => {
            numberOfLikesData.textContent = card.likes.length;
        })
        .catch((err) => {
            console.log('Произошла ошибка' + err)
        }); 
    }
};

function createCard({cardId, title, imageLink, openPopupImage, likeNumber, ownerId, currentUserId }) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.places__item');
    const cardImage =  cardElement.querySelector('.card__image');
    const likeButtonElement = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const numberOfLikesData = cardElement.querySelector('.card__like-number');

    cardElement.querySelector('.card__title').textContent = title;
    cardImage.src = imageLink; 
    cardImage.alt = title;
    numberOfLikesData.textContent = likeNumber;
    likeButtonElement.addEventListener('click', () => likeCard(likeButtonElement, cardId, numberOfLikesData));
   
    cardImage.addEventListener('click', () => openPopupImage({title, imageLink}));

    if (ownerId == currentUserId) {
        cardDeleteButton.addEventListener('click', () => deleteCard(card, cardId));
    } else {
        cardDeleteButton.remove();
    }

    return cardElement;
};



