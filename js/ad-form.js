import {
  adFormNode, enableForm, disableForm, isFunction, roundCoordinate
} from './utils.js';
import { postOffer } from './api.js';
import { show as showModalMessage } from './modal-message.js';
import * as avatar from './avatar.js';
import * as photo from './photo.js';
import * as price from './price.js';
import * as capacity from './capacity.js';
import * as checkTime from './check-time.js';

const addressNode = adFormNode.querySelector('#address');
const submitBtnNode = adFormNode.querySelector('.ad-form__submit');

const onAdFormNodeSubmit = async (evt) => {
  evt.preventDefault();
  submitBtnNode.disabled = true;

  try {
    await postOffer(new FormData(adFormNode));
    adFormNode.reset();
    showModalMessage('success');
  } catch (error) {
    showModalMessage('error');
  }

  submitBtnNode.disabled = false;
};

const getOnAdFormNodeReset = (callback) => () => {
  photo.reset();
  avatar.reset();

  if (isFunction(callback)) {
    setTimeout(callback);
  }
};

const initialize = (callback) => {
  enableForm(adFormNode);

  photo.initialize();
  avatar.initialize();
  price.initialize();
  capacity.initialize();
  checkTime.initialize();

  adFormNode.addEventListener('submit', onAdFormNodeSubmit);
  adFormNode.addEventListener('reset', getOnAdFormNodeReset(callback));

  adFormNode.reset();
};

const setAddress = ({ lat, lng }) => {
  addressNode.value = `${roundCoordinate(lat)}, ${roundCoordinate(lng)}`;
};

disableForm(adFormNode);

export { initialize, setAddress };
