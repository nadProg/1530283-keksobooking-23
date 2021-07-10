import { commonNodes } from './utils.js';
import { enableForm, disableForm } from './utils.js';
import { initPrice } from './price.js';
import { initRoomCapacity } from './room-capacity.js';
import { initCheckTime} from './check-time.js';

const { adFormNode } = commonNodes;

disableForm(adFormNode);

export const initAdForm = () => {
  enableForm(adFormNode);
  initPrice();
  initRoomCapacity();
  initCheckTime();
};
