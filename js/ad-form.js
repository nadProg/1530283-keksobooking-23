import { adFormNode, enableForm, disableForm, isFunction, roundCoordinate } from './utils.js';
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
    await postData(new FormData(adFormNode));
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

export const initialize = (afterAdFormNodeReset) => {
  enableForm(adFormNode);
  photo.initialize();
  avatar.initialize();
  price.initialize();
  checkTime.initialize();
  roomCapacity.initialize();

  adFormNode.addEventListener('submit', onAdFormSubmit);
  adFormNode.addEventListener('reset', onAdFormReset);

  if (isFunction(afterAdFormNodeReset)) {
    adFormNode.addEventListener('reset', () => setTimeout(() => afterAdFormNodeReset()));
  }

  adFormNode.reset();
};

export const setAddress = ({ lat, lng }) => {
  addressNode.value = `${roundCoordinate(lat)}, ${roundCoordinate(lng)}`;
};
