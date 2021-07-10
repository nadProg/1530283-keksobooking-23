import { commonNodes } from './utils.js';
import { enableForm, disableForm } from './utils.js';
import { initPrice, destroyPrice } from './price.js';
import { initRoomCapacity, destroyRoomCapacity } from './room-capacity.js';
import { initCheckTime, destroyCheckTime} from './check-time.js';

const { adFormNode } = commonNodes;

export const initAdForm = () => {
  enableForm(adFormNode);
  initPrice();
  initRoomCapacity();
  initCheckTime();
};

export const destroyAdForm = () => {
  adFormNode.reset();
  disableForm(adFormNode);
  destroyPrice();
  destroyRoomCapacity();
  destroyCheckTime();
};
