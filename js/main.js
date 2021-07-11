import { debounce } from './utils.js';
import { getData } from './api.js';
import { initAdForm, setAddress } from './ad-form.js';
import * as map from './map.js';
import { initMapFilter, getFilteredData } from './map-filter.js';
import { showAlert } from './alert.js';

const MAX_SILIMIAR_MARKERS_AMOUNT = 10;
const DEBOUNCE_TIME = 500;

const addSimilarMarkers = debounce(() => {
  const filteredData = getFilteredData();
  const currentLocation = map.getCurrentLocation();
  const mappedData = filteredData.map((datum) => {
    const location = L.latLng(datum.location);
    return {...datum, distance: Math.round(currentLocation.distanceTo(location))};
  });
  mappedData.sort((a, b) => a.distance - b.distance);

  console.log(mappedData.slice(0, MAX_SILIMIAR_MARKERS_AMOUNT));
  map.addMarkers(mappedData.slice(0, MAX_SILIMIAR_MARKERS_AMOUNT));
}, DEBOUNCE_TIME);

const start = async () => {
  try {
    await map.initialize(({ target }) => setAddress(target.getLatLng()));
    setAddress(map.getCurrentLocation());
    initAdForm(map.reset);

    try {
      const data = await getData();

      initMapFilter(data, () => {
        addSimilarMarkers();
        map.setViewToCurrentLocation();
      });

      map.setMoveMainMarkerHandler(addSimilarMarkers);
    } catch (error) {
      showAlert('Ошибка загрузки данных с сервера');
    }
  } catch (error) {
    showAlert('Ошибка инициализации приложения');
  }
};

start();
