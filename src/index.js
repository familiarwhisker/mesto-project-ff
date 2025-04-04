import './pages/index.css';
import { handleDeleteCard, createCard } from './components/card.js';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';

// DOM
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Попап
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

// Редактирование в модалке
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Добавление карточки
const cardForm = newCardPopup.querySelector('.popup__form');
const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardForm.querySelector('.popup__input_type_url');

addButton.addEventListener('click', () => openModal(newCardPopup));

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}
editForm.addEventListener('submit', handleEditFormSubmit);

popups.forEach(setPopupListeners);

initialCards.forEach((card) => {
  const cardElement = createCard(card, handleDeleteCard, handleLikeClick);
  placesList.append(cardElement);
});

cardForm.addEventListener('submit', handleAddCardFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  const cardElement = createCard(newCard, handleDeleteCard, handleLikeClick);
  placesList.prepend(cardElement);

  cardForm.reset();

  closeModal(newCardPopup);
};

function handleLikeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};
