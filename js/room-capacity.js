import { adFormNode } from './utils.js';

const VALID_MESSAGE = '';
const INVALID_MESSAGE = 'Данное количество недоступно для выбранного количества комнат';

const RoomsValue = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100,
};

const CapacityValue = {
  NONE: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
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

let currentCapacityValues = [CapacityValue.ONE];

const getCapacityValidity = () => {
  const isValueDisabled = capacityValueToNode[capacityNode.value].disabled;
  return isValueDisabled ? INVALID_MESSAGE : VALID_MESSAGE;
};

const onRoomsNodeChange = () => {
  currentCapacityValues.forEach((value) => capacityValueToNode[value].disabled = true);
  currentCapacityValues = roomsValueToCapacityValues[roomsNode.value];
  currentCapacityValues.forEach((value) => capacityValueToNode[value].disabled = false);

  capacityNode.setCustomValidity(getCapacityValidity());
};

const onCapacityNodeChange = () => {
  capacityNode.setCustomValidity('');
};

export const initialize = () => {
  currentCapacityValues = [CapacityValue.ONE];
  roomsNode.addEventListener('change', onRoomsNodeChange);
  capacityNode.addEventListener('change', onCapacityNodeChange);
};
