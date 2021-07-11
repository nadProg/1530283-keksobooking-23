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

const onTypeNodeChange = (evt) => {
  const minPrice = typeToMinPrice[evt.currentTarget.value];
  priceNode.min = minPrice;
  priceNode.placeholder = minPrice;
};

export const initialize = () => {
  typeNode.addEventListener('change', onTypeNodeChange);
};
