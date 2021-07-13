import { adFormNode, loadImage, renderNodes } from './utils.js';
import * as alert from './alert.js';

const PHOTO_CLASS = 'ad-form__photo';

const photoInputNode = adFormNode.querySelector('#images');
const photoContainerNode = adFormNode.querySelector('.ad-form__photo-container');

const photoTemplateNode = document.createElement('img');
photoTemplateNode.classList.add(PHOTO_CLASS);
photoTemplateNode.alt = 'Фотография квартиры';

const clearPhotoContainerNode = () => {
  photoContainerNode.querySelectorAll(`.${PHOTO_CLASS}`)
    .forEach((photoNode) => photoNode.remove());
};

const renderPhotoNodes = (photoNodes) => {
  clearPhotoContainerNode();
  renderNodes(photoNodes, photoContainerNode);
};

const createEmptyPhotoNode = () => {
  const emptyPhotoNode = document.createElement('div');
  emptyPhotoNode.classList.add(PHOTO_CLASS);
  return emptyPhotoNode;
};

const createPhotoNodeFromFile = async (file) => {
  const photoNode = photoTemplateNode.cloneNode(true);
  await loadImage(file, photoNode);
  return photoNode;
};

const reset = () => {
  clearPhotoContainerNode();
  const emptyPhotoNode = createEmptyPhotoNode();
  photoContainerNode.appendChild(emptyPhotoNode);
};

const onPhotoNodeClick = () => alert.hide();

const onPhotoInputNodeChange = async () => {
  const files = Array.from(photoInputNode.files);

  if (!files.length) {
    reset();
    return;
  }

  try {
    const photoNodes = await Promise.all(files.map(createPhotoNodeFromFile));
    renderPhotoNodes(photoNodes);
  } catch (error) {
    reset();
    photoInputNode.value = '';
    alert.show('Ошибка загрузки фото');
  }
};

const initialize = () => {
  photoInputNode.addEventListener('click', onPhotoNodeClick);
  photoInputNode.addEventListener('change', onPhotoInputNodeChange);
};

export { initialize, reset };
