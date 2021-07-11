import { commonNodes } from './utils.js';
import { enableForm, disableForm } from './utils.js';
import { initPrice } from './price.js';
import { initRoomCapacity } from './room-capacity.js';
import { initCheckTime} from './check-time.js';
import { postData } from './api.js';
import { showModalMessage } from './modal-message.js';

const { adFormNode } = commonNodes;
const addressNode = adFormNode.querySelector('#address');
const submitBtnNode = adFormNode.querySelector('.ad-form__submit');

disableForm(adFormNode);

const onAdFormSubmit = async (evt) => {
  evt.preventDefault();
  submitBtnNode.disabled = true;

  try {
    const body = new FormData(adFormNode);
    await postData(body);
    await new Promise((resolve) => setTimeout(() => resolve(), 1500));
    adFormNode.reset();
    showModalMessage('success');
  } catch (error) {
    showModalMessage('error');
  }

  submitBtnNode.disabled = false;
};

export const initAdForm = (afterResetCallback) => {
  enableForm(adFormNode);
  initPrice();
  initCheckTime();
  initRoomCapacity();

  adFormNode.addEventListener('submit', onAdFormSubmit);

  if (afterResetCallback) {
    adFormNode.addEventListener('reset', () => setTimeout(() => afterResetCallback()));
  }
};

export const setAddress = ({ lat, lng }) => {
  addressNode.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};
