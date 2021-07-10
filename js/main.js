import { getData } from './api.js';
import { initAdForm } from './ad-form.js';
import { initMap, addMarkers, resetMap } from './map.js';
import { initMapFilter } from './map-filter.js';
import { showAlert } from './alert.js';
import { setAddress } from './address.js';


const start = async () => {
  try {
    await initMap(setAddress);
    initAdForm(resetMap);

    try {
      const data = await getData();

      initMapFilter(data);
      addMarkers(data.slice(10, 20));
    } catch (error) {
      showAlert('Ошибка загрузки данных с сервера');
    }
  } catch (error) {
    showAlert('Ошибка инициализации приложения');
  }
};

start();
