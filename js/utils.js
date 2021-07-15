const MAX_COORDINATE_DIGIT = 5;
const DEFAULT_DEBOUNCE_TIME = 500;

export const adFormNode = document.body.querySelector('.ad-form');

export const enableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
  Array.from(form.elements).forEach((element) => {
    element.disabled = false;
  });
};

export const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
  Array.from(form.elements).forEach((element) => {
    element.disabled = true;
  });
};

export const renderNodes = (nodes, containerNode) => {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => fragment.appendChild(node));
  containerNode.appendChild(fragment);
};

export const isEscape = ({ code }) => code === 'Escape';

export const isFunction = (func) => typeof func === 'function';

export const debounce = (callback, time = DEFAULT_DEBOUNCE_TIME) => {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, arguments), time);
  };
};

export const sliceFromStart = (items, number) => items.slice(0, number);

export const sortOffersByDistance = (offerA, offerB) => offerA.distance - offerB.distance;

export const roundCoordinate = (coordinate) => Number(coordinate.toFixed(MAX_COORDINATE_DIGIT));
