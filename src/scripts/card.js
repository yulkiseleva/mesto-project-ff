export { createCard, deleteCard, likeButton };

function createCard(title, imageLink, deleteCard,likeButton, openPopupImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage =  cardElement.querySelector('.card__image');
    const likeButtons = document.querySelectorAll('.card__like-button');
   
    cardElement.querySelector('.card__title').textContent = title;
    cardImage.src = imageLink; 
    cardImage.alt = title;

    
    likeButtons.forEach(button => {
        button.addEventListener('click', likeButton)
    });
   
    cardImage.addEventListener('click', openPopupImage);

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardElement;
}

function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

function likeButton(evt){
    evt.target.classList.toggle('card__like-button_is-active');
};

