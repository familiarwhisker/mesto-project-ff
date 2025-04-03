import './pages/index.css';
import { handleDeleteCard, createCard } from './components/card.js';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';

const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');

editButton.addEventListener('click', () => openModal(editPopup));
addButton.addEventListener('click', () => openModal(newCardPopup));

popups.forEach(setPopupListeners);

initialCards.forEach((card) => {
  const cardElement = createCard(card, handleDeleteCard);
  placesList.append(cardElement);
});
