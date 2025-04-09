const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '329c85f8-9818-410d-a9b6-2a78542b2746',
    'Content-Type': 'application/json'
  }
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export { getUserInfo };
