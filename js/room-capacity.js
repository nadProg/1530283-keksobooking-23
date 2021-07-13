import { adFormNode } from './utils.js';

const VALID_MESSAGE = '';
const INVALID_MESSAGE = 'Данное количество недоступно для выбранного количества комнат';

const RoomsValue = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100,
};

const GuestsValue = {
  NONE: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const roomsValueToEnabledGuestsValues = {
  [RoomsValue.ONE]: [GuestsValue.ONE],
  [RoomsValue.TWO]: [GuestsValue.ONE, GuestsValue.TWO],
  [RoomsValue.THREE]: [GuestsValue.ONE, GuestsValue.TWO, GuestsValue.THREE],
  [RoomsValue.HUNDRED]: [GuestsValue.NONE],

};

const roomsNode = adFormNode.querySelector('#room_number');
const guestsNode = adFormNode.querySelector('#capacity');

const guestsValueToGuestsNode = {};
for (const capacityOptionNode of guestsNode.options) {
  const { value } = capacityOptionNode;
  guestsValueToGuestsNode[value] = capacityOptionNode;
}

let enabledGuestsValues = [GuestsValue.ONE];

const setGuestsValidity = () => {
  const chosenRoomsNode = guestsValueToGuestsNode[guestsNode.value];
  const validity = chosenRoomsNode.disabled ? INVALID_MESSAGE : VALID_MESSAGE;
  guestsNode.setCustomValidity(validity);
};

const onRoomsNodeChange = () => {
  enabledGuestsValues.forEach((value) => guestsValueToGuestsNode[value].disabled = true);
  enabledGuestsValues = roomsValueToEnabledGuestsValues[roomsNode.value];
  enabledGuestsValues.forEach((value) => guestsValueToGuestsNode[value].disabled = false);

  setGuestsValidity();
};

const onGuestsNodeChange = () => guestsNode.setCustomValidity(VALID_MESSAGE);

const initialize = () => {
  enabledGuestsValues = [GuestsValue.ONE];
  roomsNode.addEventListener('change', onRoomsNodeChange);
  guestsNode.addEventListener('change', onGuestsNodeChange);
};

export { initialize };
