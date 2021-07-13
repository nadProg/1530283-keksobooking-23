import { adFormNode } from './utils.js';

const checkInNode = adFormNode.querySelector('#timein');
const checkOutNode = adFormNode.querySelector('#timeout');

const synchronizeValues = (currentTarget) => {
  const boundTarget = currentTarget === checkInNode ? checkOutNode : checkInNode;
  boundTarget.value = currentTarget.value;
};

const onCheckInNodeChange = ({ currentTarget }) => synchronizeValues(currentTarget);

const onCheckOutNodeChange = ({ currentTarget }) => synchronizeValues(currentTarget);

export const initialize = () => {
  checkInNode.addEventListener('change', onCheckInNodeChange);
  checkOutNode.addEventListener('change', onCheckOutNodeChange);
};
