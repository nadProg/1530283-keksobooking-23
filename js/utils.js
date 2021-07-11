const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_COORDINATE_DIGIT = 5;

export const adFormNode = document.body.querySelector('.ad-form');

export const debounce = (cb, time = 500) => {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, arguments), time);
  };
};

export const isEscape = ({ code }) => code === 'Escape';

export const isFunction = (func) => typeof func === 'function';

export const renderNodes = (nodes, container) => {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => fragment.appendChild(node));
  container.appendChild(fragment);
};

export const enableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
  Array.from(form.elements).forEach((element) => element.disabled = false);
};

export const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
  Array.from(form.elements).forEach((element) => element.disabled = true);
};

const getURLfromFile = (file) => new Promise((resolve, reject) => {
  const fileName = file.name.toLowerCase();
  const isTypeMatch = ALLOWED_FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!isTypeMatch) {
    reject(new Error('File type mismatch'));
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    resolve(reader.result);
  });

  reader.addEventListener('error', () => {
    reject(new Error(reader.error));
  });

  reader.readAsDataURL(file);
});

export const loadImage = (file, imageNode) => getURLfromFile(file)
  .then((url) => new Promise((resolve, reject) => {
    imageNode.addEventListener('load', onImageNodeLoad);
    imageNode.addEventListener('error', onImageNodeError);

    imageNode.src = url;

    function onImageNodeLoad() {
      imageNode.removeEventListener('load', onImageNodeLoad);
      imageNode.removeEventListener('error', onImageNodeError);
      resolve();
    }

    function onImageNodeError() {
      imageNode.removeEventListener('load', onImageNodeLoad);
      imageNode.removeEventListener('error', onImageNodeError);
      reject(new Error('Image load error'));
    }
  }));

export const sortOffersByDistance = (offerA, offerB) => offerA.distance - offerB.distance;

export const roundCoordinate = (coordinate) => Number(coordinate.toFixed(MAX_COORDINATE_DIGIT));

export const sliceFromStart = (items, number) => items.slice(0, number);
