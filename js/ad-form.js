import { adFormNode, enableForm, disableForm, isFunction } from './utils.js';
import { postData } from './api.js';
import { showModalMessage } from './modal-message.js';
import * as avatar from './avatar.js';
import * as photo from './photo.js';
import * as price from './price.js';
import * as checkTime from './check-time.js';
import * as roomCapacity from './room-capacity.js';

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
  photo.reset();
  avatar.reset();
};

export const initialize = (afterResetCallback) => {
  enableForm(adFormNode);
  photo.initialize();
  avatar.initialize();
  price.initialize();
  checkTime.initialize();
  roomCapacity.initialize();

  adFormNode.addEventListener('submit', onAdFormSubmit);
  adFormNode.addEventListener('reset', onAdFormReset);

  if (isFunction(afterResetCallback)) {
    adFormNode.addEventListener('reset', () => setTimeout(() => afterResetCallback()));
  }
};

export const setAddress = ({ lat, lng }) => {
  addressNode.value = `${Number(lat.toFixed(5))}, ${Number(lng.toFixed(5))}`;
};
