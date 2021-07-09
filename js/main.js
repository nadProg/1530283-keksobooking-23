import { getData } from './api.js';
import { renderCards } from './cards.js';
import { initAdForm, destroyAdForm } from './ad-form.js';
import { enableForm, disableForm } from './utils.js';

getData((cards) => {console.log(cards); renderCards([cards[0]]);}, console.log);

const mapFiltersNode = document.querySelector('.map__filters');

destroyAdForm();
disableForm(mapFiltersNode);

setTimeout(() => {
  initAdForm();
  enableForm(mapFiltersNode);
}, 1000);
