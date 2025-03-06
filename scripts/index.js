function showOneCard (card, deleteFunction) {
  const cardTemplate = document.getElementById('card-template').content.cloneNode(true);
  cardTemplate.querySelector('.card__image').src = card.link;
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
  const cardElement = showOneCard(card, deleteCard);
  document.querySelector('.places__list').append(cardElement);
});
