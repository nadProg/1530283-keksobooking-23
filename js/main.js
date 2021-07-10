import { getData } from './api.js';
import { initAdForm } from './ad-form.js';
import { initMap, addMarkers, resetMap } from './map.js';
import { initMapFilter, getFilteredData } from './map-filter.js';
import { showAlert } from './alert.js';
import { setAddress } from './address.js';

const MAX_SILIMIAR_MARKERS_AMOUNT = 50;

const addSimilarMarkers = () => {
  // наложить текущий фильтр на полученные данные ИЛИ получить уже отфильрованные значения из модуля ?
  const filteredData = getFilteredData();

  // взять текущее местоположение - с карты или с формы ?

  // отсортировать отфильтрованный массив по расстоянию от текущего положения

  // отобразить маркеры, не более 10
  addMarkers(filteredData.slice(0, MAX_SILIMIAR_MARKERS_AMOUNT));
};

const start = async () => {
  try {
    await initMap(setAddress);
    initAdForm(resetMap);

    try {
      const data = await getData();

      initMapFilter(data, addSimilarMarkers);
    } catch (error) {
      showAlert('Ошибка загрузки данных с сервера');
    }
  } catch (error) {
    showAlert('Ошибка инициализации приложения');
  }
};

start();
