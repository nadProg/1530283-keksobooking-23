const Url = {
  POST: 'https://23.javascript.pages.academy/keksobooking',
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
};

const fetchData = async (method, body) => {
  method = method.toUpperCase();

  const response = await fetch(Url[method], { method, body });

  if (!response.ok) {
    throw new Error(`${response.status} — ${response.statusText}`);
  }

  return response.json();
};

export const getData = () => fetchData('GET');

export const postData = (body) => fetchData('POST', body);
