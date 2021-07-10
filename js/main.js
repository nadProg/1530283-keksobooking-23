import { getData } from './api.js';
import { initAdForm, destroyAdForm } from './ad-form.js';
import { enableForm, disableForm } from './utils.js';
import { initMap, addMarkers, setMainMarkerCallback } from './map.js';

import { setAddress } from './address.js';

const mapFiltersNode = document.querySelector('.map__filters');

destroyAdForm();
disableForm(mapFiltersNode);

const start = async () => {
  await initMap();
  initAdForm();

  const data = await getData();
  console.log(data);

  enableForm(mapFiltersNode);
  addMarkers(data.slice(10, 20));
  setMainMarkerCallback(setAddress);
};

start();
