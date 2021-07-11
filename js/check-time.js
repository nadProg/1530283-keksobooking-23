import { commonNodes } from './utils.js';

const { adFormNode } = commonNodes;

const checkInNode = adFormNode.querySelector('#timein');
const checkOutNode = adFormNode.querySelector('#timeout');

const synchronizeTime = (currentTarget) => {
  const boundTarget = currentTarget === checkInNode ? checkOutNode : checkInNode;
  boundTarget.value = currentTarget.value;
};

const onCheckInNodeChange = ({ currentTarget }) => synchronizeTime(currentTarget);

const onCheckOutNodeChange = ({ currentTarget }) => synchronizeTime(currentTarget);

export const initCheckTime = () => {
  checkInNode.addEventListener('change', onCheckInNodeChange);
  checkOutNode.addEventListener('change', onCheckOutNodeChange);
};
