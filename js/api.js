import { isFunction } from './utils.js';

const Url = {
  POST: 'https://23.javascript.pages.academy/keksobooking',
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
};

const fetchData = async (method, onSuccess, onError, body) => {
  method = method.toUpperCase();

  try {
    const response = await fetch(Url[method], { method, body });

    if (!response.ok) {
      throw new Error(`${response.status} — ${response.statusText}`);
    }

    const result = await response.json();
    return isFunction(onSuccess) ? onSuccess(result) : result;

  } catch (error) {
    if (isFunction(onError)) {
      onError(error);
    }
  }
};

export const getData = (onSuccess, onError) => fetchData('GET', onSuccess, onError);

export const postData = (onSuccess, onError, body) => fetchData('POST', onSuccess, onError, body);
