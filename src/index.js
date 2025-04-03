import './pages/index.css';
import { handleDeleteCard, createCard } from './components/card.js';
import { initialCards } from './scripts/cards.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
  const cardElement = createCard(card, handleDeleteCard);
  placesList.append(cardElement);
});
