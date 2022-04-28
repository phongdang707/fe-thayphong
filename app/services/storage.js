export const getToken = () => localStorage.getItem('Authorization');
export const setLocalStorage = (key, value) => localStorage.setItem(key, value);
export const getLocalStorage = (key) => localStorage.getItem(key);
