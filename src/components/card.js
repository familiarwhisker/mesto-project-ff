import { deleteCard } from './api.js';

function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`);
    });
};

function createCard (card, userId, deleteFunction, likeFunction, imageClickFunction) {
    const cardTemplate = document
    .getElementById('card-template')
    .content.querySelector('.card')
    .cloneNode(true);

    const image = cardTemplate.querySelector('.card__image');
    image.src = card.link;
    image.alt = `Изображение места: ${card.name}`;
    cardTemplate.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    if (card.owner && card.owner._id === userId) {
      deleteButton.addEventListener('click', () => {
        deleteFunction(cardTemplate, card._id);
      });
    } else {
      deleteButton.remove();
    };

    const likeButton = cardTemplate.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeFunction(likeButton);
    });

    image.addEventListener('click', () => {
        imageClickFunction(card.name, card.link);
    });

    return cardTemplate;
  };

export { handleDeleteCard, createCard };
