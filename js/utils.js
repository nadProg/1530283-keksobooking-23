const HIDDEN_CLASS = 'hidden';
const MODAL_OPEN_CLASS = 'modal-open';
const TRAILING_SPACES = /[ ]+/g;
const ALPHANUMERICALS = /^[а-яёa-z0-9]+$/;

const bodyNode = document.body;

/**
 * Проверяет соответствие длины строки максимально допустимому значению.
 * @param {string} string - Проверяемая строка.
 * @param {number} maxLength - Максимально допустимое значение длины строки.
 * @returns {boolean} Возвращает true, если длина строки не превышает максимально допустимого значения. Возвращает false, в остальных случаях.
 */
export const checkMaxLength = (string, maxLength) => string.length <= maxLength;

export const deleteTrailingSpaces = (string) => string.trim().replace(TRAILING_SPACES, ' ');

export const isAlphaNumeric = (string) => ALPHANUMERICALS.test(string.toLowerCase());

export const isArrayUnique = (items) => items.length === [...new Set(items)].length;

/**
 * Перемешивает элементы массива случайным образом.
 * Использует алгоритм тасования Фишера-Йетса (источник: https://learn.javascript.ru/task/shuffle)
 * @param {Array} items - Исходный массив.
 * @returns {Array} Вовзращает перемешанную неглубокую копию исходного массива.
 */
export const shuffle = (items) => {
  items = [...items];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
};

export const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

export const debounce = (cb, time = 500) => {
  let timeoutId;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, arguments), time);
  };
};

export const isEscape = ({ code }) => code === 'Escape';

export const isEnter = ({ code }) => code === 'Enter';

export const isFunction = (func) => typeof func === 'function';

export const renderNodes = (nodes, container) => {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => fragment.appendChild(node));
  container.appendChild(fragment);
};

export const hideNode = (node) => node.classList.add(HIDDEN_CLASS);

export const showNode = (node) => node.classList.remove(HIDDEN_CLASS);

export const switchOnModalMode = () => bodyNode.classList.add(MODAL_OPEN_CLASS);

export const switchOffModalMode = () => bodyNode.classList.remove(MODAL_OPEN_CLASS);

// const picturesContainerNode = bodyNode.querySelector('.pictures');

// const bigPictureContainerNode = bodyNode.querySelector('.big-picture');

// const uploadFormNode = picturesContainerNode.querySelector('.img-upload__form');

// const uploadImageNode = uploadFormNode.querySelector('.img-upload__preview img');

// export const commonNodes = {
//   uploadFormNode,
//   uploadImageNode,
//   picturesContainerNode,
//   bigPictureContainerNode,
// };

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
