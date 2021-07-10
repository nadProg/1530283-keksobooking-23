import { commonNodes } from './utils.js';

const { adFormNode } = commonNodes;

const addressNode = adFormNode.querySelector('#address');

export const setAddress = ({lat, lng}) => {
  addressNode.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};
