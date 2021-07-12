import { debounce, sortOffersByDistance, sliceFromStart } from './utils.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';
import * as map from './map.js';
import * as adForm from './ad-form.js';
import * as mapFilter from './map-filter.js';

const DEBOUNCE_TIME = 500;
const MAX_SIMILAR_OFFERS_AMOUNT = 10;

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

    map.addMarkers(sliceFromStart(sortedOffers, MAX_SIMILAR_OFFERS_AMOUNT));
  }
}, DEBOUNCE_TIME);

const afterMapFilterNodeChange = () => {
  showSimilarOffers();
  map.setViewToCurrentLocation();
};

const onMainMarkerMove = () => {
  setCurrentAddress();
  showSimilarOffers();
};

const afterAdFormNodeReset = () => {
  map.reset();
  mapFilter.reset();
};

const start = async () => {
  try {
    await map.initialize(onMainMarkerMove);
    adForm.initialize(afterAdFormNodeReset);

    try {
      const offers = await getData();
      mapFilter.initialize(offers, afterMapFilterNodeChange);
    } catch (error) {
      showAlert('Ошибка загрузки данных с сервера');
    }
  } catch (error) {
    showAlert('Ошибка инициализации приложения');
  }
};

start();
