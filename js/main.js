import { getData } from './api.js';
import { initAdForm } from './ad-form.js';
import { enableForm, disableForm } from './utils.js';
import { initMap, addMarkers, setMainMarkerCallback } from './map.js';
import { showAlert } from './alert.js';
import { setAddress } from './address.js';

const mapFiltersNode = document.querySelector('.map__filters');

disableForm(mapFiltersNode);

const start = async () => {
  try {
    await initMap();
    initAdForm();

    try {
      const data = await getData();
      console.log(data);

      enableForm(mapFiltersNode);
      addMarkers(data.slice(10, 20));
      setMainMarkerCallback(setAddress);
    } catch (error) {
      showAlert('Ошибка загрузки данных с сервера');
    }
  } catch (error) {
    showAlert('Ошибка инициализации приложения');
  }
};

start();
