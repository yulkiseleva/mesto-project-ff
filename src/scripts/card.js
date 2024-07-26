export { createCard, deleteCard, likeButton };

function deleteCard(card) {
    card.remove();
};

function likeButton(evt){
    evt.target.classList.toggle('card__like-button_is-active');
};

function createCard({title, imageLink, deleteCard,likeButton, openPopupImage}) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const card = cardElement.querySelector('.places__item');
    const cardImage =  cardElement.querySelector('.card__image');
    const likeButtonElement = cardElement.querySelector('.card__like-button');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = title;
    cardImage.src = imageLink; 
    cardImage.alt = title;
    
    likeButtonElement.addEventListener('click', likeButton);
   
    cardImage.addEventListener('click', () => openPopupImage({title, imageLink}));

    cardDeleteButton.addEventListener('click', () => deleteCard(card));

    return cardElement;
};



