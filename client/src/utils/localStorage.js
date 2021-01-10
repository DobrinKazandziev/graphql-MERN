const LS_KEYS = {
  EMAIL_FOR_REGISTRATION: "emailFormRegistration",
  CURRENT_USER_EMAIL: 'currentUserEmail',
  CURRENT_USER_TOKEN: 'currentUserToken',
}

const isKeyValid = (enteredKey) => {
  if (!Object.values(LS_KEYS).includes(enteredKey)) {
    throw new Error('Invalid LocalStorage Key');
  }
  return true;
}

const setLSItem = (key, value) => {
  isKeyValid(key);
  window.localStorage.setItem(key,value);
}

const getLSItem = (key) => {
  isKeyValid(key);
  return window.localStorage.getItem(key);
}

const removeLSItem = (key) => {
  isKeyValid(key);
  window.localStorage.removeItem(key);
}

const clearLS = () => {
  window.localStorage.clear();
}

export {
  LS_KEYS,
  setLSItem,
  getLSItem,
  removeLSItem,
  clearLS,
}
