export function renderLoading(isLoading, buttonElement, defaultText = 'Сохранить') {
  buttonElement.textContent = isLoading ? 'Сохранение...' : defaultText;
};
