import { adFormNode, enableForm, disableForm } from './utils.js';
import { postData } from './api.js';
import { showModalMessage } from './modal-message.js';
import * as avatar from './avatar.js';
import { initPrice } from './price.js';
import { initCheckTime} from './check-time.js';
import { initRoomCapacity } from './room-capacity.js';

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

const onAdFormReset = () => {
  avatar.reset();
};

export const initAdForm = (afterResetCallback) => {
  enableForm(adFormNode);
  avatar.initialize();
  initPrice();
  initCheckTime();
  initRoomCapacity();

  adFormNode.addEventListener('submit', onAdFormSubmit);
  adFormNode.addEventListener('reset', onAdFormReset);

  if (afterResetCallback) {
    adFormNode.addEventListener('reset', () => setTimeout(() => afterResetCallback()));
  }
};

export const setAddress = ({ lat, lng }) => {
  addressNode.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};
