import { adFormNode } from './utils.js';

const RoomsValue = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100,
};

const CapacityValue = {
  THREE: 3,
  TWO: 2,
  ONE: 1,
  NONE: 0,
};

const roomsValueToCapacityValues = {
  [RoomsValue.ONE]: [CapacityValue.ONE],
  [RoomsValue.TWO]: [CapacityValue.ONE, CapacityValue.TWO],
  [RoomsValue.THREE]: [CapacityValue.ONE, CapacityValue.TWO, CapacityValue.THREE],
  [RoomsValue.HUNDRED]: [CapacityValue.NONE],

};

const roomsNode = adFormNode.querySelector('#room_number');
const capacityNode = adFormNode.querySelector('#capacity');

const capacityValueToNode = {};
for (const capacityOptionNode of capacityNode.options) {
  const { value } = capacityOptionNode;
  capacityValueToNode[value] = capacityOptionNode;
}

let currentCapacityValues = [];

const getCapacityValidity = () => {
  const roomsValue = roomsNode.value;
  const capacityValue = capacityNode.value;

  const isValid = roomsValueToCapacityValues[roomsValue].includes(capacityValue);

  return isValid ? '' : 'Данное количество недоступно для выбранного количества комнат';
};

const onRoomsNodeChange = () => {
  const roomsValue = roomsNode.value;

  currentCapacityValues.forEach((value) => capacityValueToNode[value].disabled = true);

  currentCapacityValues = roomsValueToCapacityValues[roomsValue];
  currentCapacityValues.forEach((value) => capacityValueToNode[value].disabled = false);

  capacityNode.setCustomValidity(getCapacityValidity());
};

const onCapacityNodeChange = () => {
  capacityNode.setCustomValidity('');
};

export const initialize = () => {
  roomsNode.addEventListener('change', onRoomsNodeChange);
  capacityNode.addEventListener('change', onCapacityNodeChange);
};
