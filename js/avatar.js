import { adFormNode, loadImage } from './utils.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarInputNode = adFormNode.querySelector('#avatar');
const avatarImageNode = adFormNode.querySelector('.ad-form-header__preview img');

const onAvatarInputNodeChange = async ({ currentTarget }) => {
  try {
    const file = currentTarget.files[0];
    await loadImage(file, avatarImageNode);
    currentTarget.setCustomValidity('');
  } catch (error) {
    avatarImageNode.src = '';
    currentTarget.setCustomValidity('Ошибка загрузки фото');
    currentTarget.reportValidity();
  }
};

export const initialize = () => {
  avatarInputNode.addEventListener('change', onAvatarInputNodeChange);
};

export const reset = () => {
  avatarImageNode.src = DEFAULT_AVATAR;
  avatarInputNode.setCustomValidity('');
};
