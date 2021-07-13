import { adFormNode } from './utils.js';

const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const typeNode = adFormNode.querySelector('#type');
const priceNode = adFormNode.querySelector('#price');

const onTypeNodeChange = () => {
  const minPrice = typeToMinPrice[typeNode.value];
  priceNode.min = minPrice;
  priceNode.placeholder = minPrice;
};

const initialize = () => {
  typeNode.addEventListener('change', onTypeNodeChange);
};

export { initialize };
