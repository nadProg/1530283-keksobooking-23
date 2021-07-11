import { adFormNode, loadImage } from './utils.js';
import { showAlert, hideAlert } from './alert.js';

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarInputNode = adFormNode.querySelector('#avatar');
const avatarImageNode = adFormNode.querySelector('.ad-form-header__preview img');

const reset = () => avatarImageNode.src = DEFAULT_AVATAR;

const onAvatartNodeClick = () => hideAlert();

const onAvatarInputNodeChange = async () => {
  const file = avatarInputNode.files[0];

  if (!file) {
    reset();
    return;
  }

  try {
    await loadImage(file, avatarImageNode);
  } catch (error) {
    reset();
    avatarInputNode.value = '';
    showAlert('Ошибка загрузки фото');
  }
};

const initialize = () => {
  avatarInputNode.addEventListener('click', onAvatartNodeClick);
  avatarInputNode.addEventListener('change', onAvatarInputNodeChange);
};

export { initialize, reset };
