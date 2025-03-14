function handleDeleteCard(cardElement) {
  cardElement.remove();
};

function createCard (card, deleteFunction) {
  const cardTemplate = document.getElementById('card-template').content.querySelector('.card').cloneNode(true);
  const image = cardTemplate.querySelector('.card__image');
  image.src = card.link;
  image.alt = `Изображение места: ${card.name}`;
  cardTemplate.querySelector('.card__title').textContent = card.name;

  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteFunction(cardTemplate);
  });

  return cardTemplate;
};

const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardElement = createCard(card, handleDeleteCard);
  placesList.append(cardElement);
});
