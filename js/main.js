import { debounce, sortOffersByDistance, sliceFromStart } from './utils.js';
import { getOffers } from './api.js';
import { show as showAlert } from './alert.js';
import * as map from './map.js';
import * as adForm from './ad-form.js';
import * as filter from './filter.js';

const MAX_SIMILAR_OFFERS_AMOUNT = 10;

const showSimilarOffers = debounce((filteredOffers) => {
  const currentLocation = map.getCurrentLocation();
  const sortedOffers = filteredOffers.map((offer) => {
    const location = L.latLng(offer.location);
    const distance = Math.round(currentLocation.distanceTo(location));
    return { ...offer, distance};
  }).sort(sortOffersByDistance);

  map.addMarkers(sliceFromStart(sortedOffers, MAX_SIMILAR_OFFERS_AMOUNT));
});

const setCurrentAddress = () => adForm.setAddress(map.getCurrentLocation());

const onMainMarkerMove = () => setCurrentAddress();

const onAdFormNodeReset = () => {
  map.reset();
  filter.reset();
};

const onFilterNodeChange = (filteredOffers) => {
  showSimilarOffers(filteredOffers);
  map.setViewToCurrentLocation();
};

const initialize = async () => {
  try {
    await map.initialize(onMainMarkerMove);
    adForm.initialize(onAdFormNodeReset);

    try {
      const offers = await getOffers();
      filter.initialize(offers, onFilterNodeChange);
    } catch (error) {
      showAlert('Ошибка загрузки данных с сервера');
    }
  } catch (error) {
    showAlert('Ошибка инициализации приложения');
  }
};

initialize();
