import { enableForm, disableForm } from './utils.js';
import { initPrice, destroyPrice } from './price.js';
import { initRoomCapacity, destroyRoomCapacity } from './room-capacity.js';

const adFormNode = document.querySelector('.ad-form');

export const initAdForm = () => {
  enableForm(adFormNode);
  initPrice();
  initRoomCapacity();
};

export const destroyAdForm = () => {
  disableForm(adFormNode);
  destroyPrice();
  destroyRoomCapacity();
};
