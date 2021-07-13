import { adFormNode } from './utils.js';
import { loadImage } from './image.js';
import * as alert from './alert.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarInputNode = adFormNode.querySelector('#avatar');
const avatarImageNode = adFormNode.querySelector('.ad-form-header__preview img');

const reset = () => avatarImageNode.src = DEFAULT_AVATAR;

const onAvatarInputNodeClick = () => alert.hide();

const onAvatarInputNodeChange = async () => {
  const file = avatarInputNode.files[0];

  if (!file) {
    return reset();
  }

  try {
    await loadImage(file, avatarImageNode);
  } catch (error) {
    reset();
    avatarInputNode.value = '';
    alert.show('Ошибка загрузки фото');
  }
};

const initialize = () => {
  avatarInputNode.addEventListener('click', onAvatarInputNodeClick);
  avatarInputNode.addEventListener('change', onAvatarInputNodeChange);
};

export { initialize, reset };
