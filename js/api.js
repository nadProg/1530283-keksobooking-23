const Url = {
  POST: 'https://23.javascript.pages.academy/keksobooking',
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
};

const adoptOffers = ({ author, offer, location }) => {
  const adoptedData = {
    ...offer,
    location,
    roomsAmount: offer.rooms,
    guestsAmount: offer.guests,
    authorAvatar: author.avatar,
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

export const getOffers = async () => (await fetchData('GET')).map(adoptOffers);

export const postOffer = (body) => fetchData('POST', body);
