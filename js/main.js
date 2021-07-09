import { getData } from './api.js';
import { renderCards } from './cards.js';
import { disableForm } from './utils.js';

getData((cards) => {console.log(cards); renderCards([cards[0]]);}, console.log);

const adFormNode = document.querySelector('.ad-form');
const mapFiltersNode = document.querySelector('.map__filters');

disableForm(adFormNode);
disableForm(mapFiltersNode);
