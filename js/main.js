import { debounce, sortOffersByDistance } from './utils.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import * as adForm from './ad-form.js';
import * as map from './map.js';
import * as mapFilter from './map-filter.js';

const MAX_SIMILAR_OFFERS_AMOUNT = 10;
const DEBOUNCE_TIME = 500;

const setCurrentAddress = () => {
  const currentLocation = map.getCurrentLocation();
  adForm.setAddress(currentLocation);
};

const showSimilarOffers = debounce(() => {
  const filteredOffers = mapFilter.getFilteredOffers();

  if (filteredOffers) {
    const currentLocation = map.getCurrentLocation();
    const sortedOffers = filteredOffers
      .map((offer) => {
        const location = L.latLng(offer.location);
        return {...offer, distance: Math.round(currentLocation.distanceTo(location))};
      })
      .sort(sortOffersByDistance);

    map.addMarkers(sortedOffers.slice(0, MAX_SIMILAR_OFFERS_AMOUNT));
  }
}, DEBOUNCE_TIME);

// Именование ?
const afterMapFilterChange = () => {
  showSimilarOffers();
  map.setViewToCurrentLocation();
};

const afterMainMarkerMove = () => {
  setCurrentAddress();
  showSimilarOffers();
};

const afterAdFormReset = () => {
  map.reset();
  mapFilter.reset();
};

const start = async () => {
  try {
    await map.initialize(afterMainMarkerMove);
    adForm.initialize(afterAdFormReset);
    setCurrentAddress();

    try {
      const data = await getData();
      mapFilter.initialize(data, afterMapFilterChange);
    } catch (error) {
      showAlert('Ошибка загрузки данных с сервера');
    }
  } catch (error) {
    showAlert('Ошибка инициализации приложения');
  }
};

start();
