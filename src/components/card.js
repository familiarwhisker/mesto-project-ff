import { deleteCard, likeCard, unlikeCard } from './api.js';

function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`);
    });
};

function createCard(card, userId, deleteFunction, likeFunction, imageClickFunction) {
  const cardTemplate = document
    .getElementById('card-template')
    .content.querySelector('.card')
    .cloneNode(true);

  const image = cardTemplate.querySelector('.card__image');
  image.src = card.link;
  image.alt = `Изображение места: ${card.name}`;
  cardTemplate.querySelector('.card__title').textContent = card.name;

  // 🗑 Удаление карточки, если она твоя
  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  if (card.owner && card.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      deleteFunction(cardTemplate, card._id);
    });
  } else {
    deleteButton.remove();
  }

  // ❤️ Лайки
  const likeButton = cardTemplate.querySelector('.card__like-button');
  const likeCounter = cardTemplate.querySelector('.card__like-count');
  likeCounter.textContent = card.likes.length;

  // 💡 Если пользователь лайкал — подсвечиваем
  if (card.likes.some(liker => liker._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeFunction(likeButton, likeCounter, card._id);
  });

  // 🖼️ Клик по картинке
  image.addEventListener('click', () => {
    imageClickFunction(card.name, card.link);
  });

  return cardTemplate;
};

export { handleDeleteCard, createCard };
