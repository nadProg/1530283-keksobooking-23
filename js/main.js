import { getData } from './api.js';
// import { renderCards } from './cards.js';
import { initAdForm, destroyAdForm } from './ad-form.js';
import { enableForm, disableForm } from './utils.js';
import { initMap } from './map.js';

const mapFiltersNode = document.querySelector('.map__filters');

destroyAdForm();
disableForm(mapFiltersNode);

const start = async () => {
  await initMap();
  initAdForm();
  enableForm(mapFiltersNode);
  getData(console.log, console.log);
};

start();
