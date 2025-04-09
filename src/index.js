import './pages/index.css';
import { handleDeleteCard, createCard } from './components/card.js';
// import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, postCard, likeCard, unlikeCard } from './components/api.js';

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
let userId;

// Открытие изображения в попапе
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Валидация
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

addButton.addEventListener('click', () => {
  cardForm.reset();
  clearValidation(cardForm, validationConfig);
  openModal(newCardPopup);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openModal(editPopup);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const about = jobInput.value;

  updateUserInfo(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении профиля: ${err}`);
    });
};

editForm.addEventListener('submit', handleEditFormSubmit);

popups.forEach(setPopupListeners);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    // console.log(cards);
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cards.forEach((card) => {
      const cardElement = createCard(card, userId, handleDeleteCard, handleLikeClick, handleCardImageClick, userData._id);
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке данных: ${err}`);
  });

cardForm.addEventListener('submit', handleAddCardFormSubmit);

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  postCard(name, link)
    .then((newCardData) => {
      const cardElement = createCard(newCardData, userId, handleDeleteCard, handleLikeClick, handleCardImageClick);
      placesList.prepend(cardElement);
      cardForm.reset();
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    });
};

function handleLikeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

function handleCardImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = `Изображение места: ${name}`;
  popupCaption.textContent = name;

  openModal(imagePopup);
};
