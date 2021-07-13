import { isEscape } from './utils.js';

const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
const successTemplateNode = document.querySelector('#success').content.querySelector('.success');

let currentMessage = null;

const onDocumentClick = () => hide();

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    hide();
  }
};

const createMessage = (type) => {
  type = type.toLowerCase();
  const templateNode = type === 'success' ? successTemplateNode : errorTemplateNode;
  const messageNode = templateNode.cloneNode(true);
  return messageNode;
};

function hide() {
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;

    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
}

export function show(type) {
  if (currentMessage) {
    hide();
  }

  currentMessage = createMessage(type);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

  document.body.appendChild(currentMessage);
}
