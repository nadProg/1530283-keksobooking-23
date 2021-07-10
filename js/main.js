import { getData } from './api.js';
// import { renderCards } from './cards.js';
import { initAdForm, destroyAdForm } from './ad-form.js';
import { enableForm, disableForm } from './utils.js';
import { initMap, addMarkers } from './map.js';

const mapFiltersNode = document.querySelector('.map__filters');

destroyAdForm();
disableForm(mapFiltersNode);

const start = async () => {
  await initMap();
  initAdForm();
  enableForm(mapFiltersNode);

  const data = await getData();
  console.log(data);

  for (let i = 0; i < 5; i++) {
    setTimeout(() => addMarkers(data.slice(i * 10, i * 10 + 10)), 500 * i);
  }
};

start();
