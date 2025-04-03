  function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
  };

  function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
  };

  function handleEscClose(evt) {
    const openedPopup = document.querySelector('.popup.popup_is-opened');
    if (evt.key === 'Escape' && openedPopup) {
      closeModal(openedPopup);
    }
  };

  function setPopupListeners(popup) {
    popup.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close')
      ) {
        closeModal(popup);
      }
    });
  };

  export { openModal, closeModal, setPopupListeners };

