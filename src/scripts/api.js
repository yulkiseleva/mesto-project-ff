export { getUserInfo, getInitialCards, updateProfileInfo, postNewCard, deleteCardFromServer, putLike, deleteLike, updateAvatar };
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-19',
    headers: {
      authorization: 'c5607a82-245c-4a9b-9fb3-cec36a8ef3e8',
      'Content-Type': 'application/json'
    }
  }

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
      .then(handleResponse)
  };

  const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(handleResponse)
  };

  const updateProfileInfo = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(data)
  })
};

const postNewCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(handleResponse)
};

const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'Delete',
    headers: config.headers,
})
  .then(handleResponse)
};

const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
})
  .then(handleResponse)
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'Delete',
    headers: config.headers,
})
  .then(handleResponse)
};

const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avatar),
})
  .then(handleResponse)
};

