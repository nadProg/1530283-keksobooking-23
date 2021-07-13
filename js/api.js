const Url = {
  POST: 'https://23.javascript.pages.academy/keksobooking',
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
};

const adoptData = ({author, offer, location}) => {
  const adoptedData = {
    authorAvatar: author.avatar,
    location,
    guestsAmount: offer.guests,
    roomsAmount: offer.rooms,
    ...offer,
  };

  delete adoptedData.guests;
  delete adoptedData.rooms;
  return adoptedData;
};

const fetchData = async (method, body) => {
  method = method.toUpperCase();

  const response = await fetch(Url[method], { method, body });

  if (!response.ok) {
    throw new Error(`${response.status} — ${response.statusText}`);
  }

  return response.json();
};

export const getData = async () => (await fetchData('GET')).map(adoptData);

export const postData = async (body) => fetchData('POST', body);
