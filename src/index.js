import './pages/index.css';

function handleDeleteCard(cardElement) {
  cardElement.remove()
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

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const jordanImage = new URL('./images/jordan.jpg', import.meta.url);
const jamesImage = new URL('./images/james.jpg', import.meta.url);
const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', link: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
];
