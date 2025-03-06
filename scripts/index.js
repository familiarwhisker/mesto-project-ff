function createCard (card, deleteFunction) {
  const cardTemplate = document.getElementById('card-template').content.querySelector('.card').cloneNode(true);
  const image = cardTemplate.querySelector('.card__image');
  image.src = card.link;
  image.alt = `Изображение места: ${card.name}`;
  cardTemplate.querySelector('.card__title').textContent = card.name;

  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function (event) {
    deleteCard(event);
  });

  return cardTemplate;
};

const deleteCard = (event) => {
  event.target.closest('.card').remove();
};

initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard);
  document.querySelector('.places__list').append(cardElement);
});
