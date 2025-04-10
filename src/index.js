import './pages/index.css';
import { handleDeleteCard, createCard } from './components/card.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';
import { renderLoading } from './components/utils.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, postCard, likeCard, unlikeCard, updateAvatar } from './components/api.js';

// DOM
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');
const avatarButton = document.querySelector('.profile__avatar-button');
const profileAvatar = document.querySelector('.profile__image');

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

avatarButton.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const newAvatarLink = avatarInput.value;
  const submitButton = avatarForm.querySelector(validationConfig.submitButtonSelector);

  renderLoading(true, submitButton);

  updateAvatar(newAvatarLink)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

addButton.addEventListener('click', () => {
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
  const submitButton = editForm.querySelector(validationConfig.submitButtonSelector);

  renderLoading(true, submitButton);

  updateUserInfo(name, about)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении профиля: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
};

editForm.addEventListener('submit', handleEditFormSubmit);

popups.forEach(setPopupListeners);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

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
  const submitButton = cardForm.querySelector(validationConfig.submitButtonSelector);

  renderLoading(true, submitButton);

  postCard(name, link)
    .then((newCardData) => {
      const cardElement = createCard(newCardData, userId, handleDeleteCard, handleLikeClick, handleCardImageClick);
      placesList.prepend(cardElement);
      cardForm.reset();
      clearValidation(cardForm, validationConfig);
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
};

function handleLikeClick(likeButton, likeCounter, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeRequest = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  likeRequest
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;

      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(`Ошибка при смене лайка: ${err}`);
    });
};

function handleCardImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = `Изображение места: ${name}`;
  popupCaption.textContent = name;

  openModal(imagePopup);
};
