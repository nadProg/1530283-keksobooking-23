import { enableForm, disableForm } from './utils.js';
import { initPrice, destroyPrice } from './price.js';
import { initRoomCapacity, destroyRoomCapacity } from './room-capacity.js';
import { commonNodes } from './utils.js';

const { adFormNode }= commonNodes;

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
