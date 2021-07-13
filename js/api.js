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

  return (await response.json()).map(adoptData);
};

export const getData = () => fetchData('GET');

export const postData = (body) => fetchData('POST', body);
