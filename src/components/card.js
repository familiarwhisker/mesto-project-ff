function handleDeleteCard(cardElement) {
    cardElement.remove()
  };

function createCard (card, deleteFunction, likeFunction, imageClickFunction) {
    const cardTemplate = document
    .getElementById('card-template')
    .content.querySelector('.card')
    .cloneNode(true);

    const image = cardTemplate.querySelector('.card__image');
    image.src = card.link;
    image.alt = `Изображение места: ${card.name}`;
    cardTemplate.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteFunction(cardTemplate);
    });

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
