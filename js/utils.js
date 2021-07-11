const bodyNode = document.body;

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

const adFormNode = bodyNode.querySelector('.ad-form');

export const commonNodes = {
  adFormNode,
};

export const disableForm = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);
  for (const element of form.elements) {
    element.disabled = true;
  }
};

export const enableForm = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
  for (const element of form.elements) {
    element.disabled = false;
  }
};
